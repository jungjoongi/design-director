// 뷰포트마다 새 탭. 에뮬레이션·탐색·네트워크 잠잠·격리 월드 평가·스크린샷.
import { CDPError } from './cdp.mjs';
import { sanitizeText } from '../analyze/sanitize.mjs';

export const VIEWPORTS = Object.freeze({
  desktop: { name: 'desktop', width: 1440, height: 900, dpr: 1, mobile: false },
  mobile: { name: 'mobile', width: 390, height: 844, dpr: 2, mobile: true },
});

// 모바일 UA. HeadlessChrome 토큰은 그대로 둔다(정직하게).
export function mobileUserAgent(desktopUA) {
  const m = String(desktopUA || '').match(/(HeadlessChrome|Chrome)\/([\d.]+)/);
  const token = m ? `${m[1]}/${m[2]}` : 'HeadlessChrome/120.0.0.0';
  return `Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) ${token} Mobile Safari/537.36`;
}

const IGNORED_TYPES = new Set(['WebSocket', 'EventSource', 'Ping', 'CSPViolationReport', 'Preflight']);

export async function openPage(browser, { viewport, collectConsole = false, log = () => {} }) {
  const { cdp } = browser;
  const { targetId } = await cdp.send('Target.createTarget', { url: 'about:blank' });
  browser.ownTargets ||= new Set();
  browser.ownTargets.add(targetId);
  const { sessionId } = await cdp.send('Target.attachToTarget', { targetId, flatten: true });
  const s = cdp.session(sessionId);
  const offs = [];
  const page = { targetId, session: s, viewport, consoleErrors: [], mainFrameId: null, finalUrl: null };

  // 우리가 만들지 않은 팝업은 닫는다.
  if (!browser.popupGuard) {
    browser.popupGuard = true;
    await cdp.send('Target.setDiscoverTargets', { discover: true }).catch(() => {});
    cdp.on('Target.targetCreated', ({ targetInfo }) => {
      // createTarget 응답보다 이벤트가 먼저 올 수 있어서 opener 가 있는 탭만 팝업으로 본다.
      if (targetInfo.type === 'page' && targetInfo.openerId && !browser.ownTargets.has(targetInfo.targetId)) {
        cdp.send('Target.closeTarget', { targetId: targetInfo.targetId }).catch(() => {});
      }
    });
  }

  await Promise.all([s.send('Page.enable'), s.send('Network.enable'), s.send('Runtime.enable')]);
  offs.push(s.on('Page.javascriptDialogOpening', () => s.send('Page.handleJavaScriptDialog', { accept: false }).catch(() => {})));

  // 네트워크 진행 중 요청 추적(잠잠 판정용).
  const inflight = new Map();
  let lastActivity = Date.now();
  offs.push(s.on('Network.requestWillBeSent', (p) => {
    lastActivity = Date.now();
    if (!IGNORED_TYPES.has(p.type) && !/^data:/.test(p.request?.url || '')) inflight.set(p.requestId, Date.now());
  }));
  const done = (p) => {
    if (inflight.delete(p.requestId)) lastActivity = Date.now();
  };
  offs.push(s.on('Network.loadingFinished', done));
  offs.push(s.on('Network.loadingFailed', done));
  offs.push(s.on('Page.frameNavigated', ({ frame }) => {
    if (!frame.parentId) {
      page.mainFrameId = frame.id;
      page.finalUrl = frame.url;
    }
  }));

  if (collectConsole) {
    const push = (text) => {
      if (page.consoleErrors.length >= 5) return;
      page.consoleErrors.push(sanitizeText(text, 200));
    };
    offs.push(s.on('Runtime.consoleAPICalled', (p) => {
      if (p.type !== 'error') return;
      push((p.args || []).map((a) => (a.value !== undefined ? String(a.value) : a.description || '')).join(' '));
    }));
    offs.push(s.on('Runtime.exceptionThrown', (p) => {
      const d = p.exceptionDetails || {};
      push(d.exception?.description?.split('\n')[0] || d.text || 'Uncaught error');
    }));
  }

  // 에뮬레이션
  await s.send('Emulation.setDeviceMetricsOverride', {
    width: viewport.width, height: viewport.height, deviceScaleFactor: viewport.dpr, mobile: viewport.mobile,
    screenWidth: viewport.width, screenHeight: viewport.height,
  });
  await s.send('Emulation.setEmulatedMedia', { features: [{ name: 'prefers-color-scheme', value: 'light' }] });
  if (viewport.mobile) {
    await s.send('Emulation.setTouchEmulationEnabled', { enabled: true, maxTouchPoints: 5 });
    const ua = mobileUserAgent(browser.userAgent);
    const major = (ua.match(/Chrome\/(\d+)/) || [])[1] || '120';
    await s.send('Emulation.setUserAgentOverride', {
      userAgent: ua,
      platform: 'Linux armv8l',
      userAgentMetadata: {
        brands: [{ brand: 'Chromium', version: major }, { brand: 'Not.A/Brand', version: '99' }],
        platform: 'Android', platformVersion: '10', architecture: '', model: 'K', mobile: true,
      },
    }).catch(() => {});
  }

  page.navigate = async (url, timeout) => {
    let loaderId = null;
    let status = null;
    let mimeType = null;
    const offResp = s.on('Network.responseReceived', (p) => {
      if (p.type === 'Document' && (!loaderId || p.loaderId === loaderId) && (!p.frameId || !page.mainFrameId || p.frameId === page.mainFrameId)) {
        status = p.response.status;
        mimeType = p.response.mimeType;
      }
    });
    const load = s.waitFor('Page.loadEventFired', { timeout });
    load.catch(() => {});
    try {
      const nav = await s.send('Page.navigate', { url }, { timeout });
      loaderId = nav.loaderId || null;
      page.mainFrameId = nav.frameId || page.mainFrameId;
      if (nav.errorText) return { ok: false, errorText: nav.errorText, status };
      let loadTimedOut = false;
      try {
        await load;
      } catch {
        loadTimedOut = true;
      }
      return { ok: true, status, mimeType, loadTimedOut };
    } finally {
      offResp();
    }
  };

  page.networkQuiet = async (quietMs = 500, maxMs = 8000) => {
    const start = Date.now();
    while (Date.now() - start < maxMs) {
      // 오래 걸린 요청(롱폴링 등)은 10초 넘으면 무시한다.
      for (const [id, t] of inflight) if (Date.now() - t > 10000) inflight.delete(id);
      if (inflight.size === 0 && Date.now() - lastActivity >= quietMs) return true;
      await sleep(100);
    }
    return false;
  };

  // 격리 월드: 페이지 스크립트가 바꾼 전역(prototype 등)에 휘둘리지 않는다.
  page.world = async () => {
    if (!page.mainFrameId) {
      const tree = await s.send('Page.getFrameTree');
      page.mainFrameId = tree.frameTree.frame.id;
    }
    const { executionContextId } = await s.send('Page.createIsolatedWorld', { frameId: page.mainFrameId, worldName: 'dd', grantUniveralAccess: false });
    page.contextId = executionContextId;
    return executionContextId;
  };

  page.evaluate = async (expression, { timeout = 15000, awaitPromise = false } = {}) => {
    if (!page.contextId) await page.world();
    const r = await s.send('Runtime.evaluate', { expression, contextId: page.contextId, returnByValue: true, awaitPromise, userGesture: false }, { timeout });
    if (r.exceptionDetails) {
      const d = r.exceptionDetails;
      throw new CDPError(`페이지 평가 실패: ${(d.exception && d.exception.description) || d.text}`.slice(0, 400), 'EVAL_ERROR');
    }
    return r.result ? r.result.value : undefined;
  };

  page.callFile = (src, opts, evalOpts) => page.evaluate(`(${src.trim().replace(/;\s*$/, '')})(${JSON.stringify(opts)})`, evalOpts);

  page.screenshot = async ({ format = 'png', quality } = {}) => {
    const params = { format, fromSurface: true, captureBeyondViewport: false };
    if (format === 'jpeg') params.quality = quality ?? 80;
    const { data } = await s.send('Page.captureScreenshot', params, { timeout: 20000 });
    return Buffer.from(data, 'base64');
  };

  page.close = async () => {
    for (const off of offs) off();
    browser.ownTargets.delete(targetId);
    await cdp.send('Target.closeTarget', { targetId }, { timeout: 5000 }).catch(() => {});
  };
  return page;
}

export function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}
