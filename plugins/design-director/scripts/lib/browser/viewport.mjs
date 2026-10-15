// 뷰포트 하나 캡처: 탐색 → 잠잠 → prepare → 히어로 → 슬라이스 → extract → raw.
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { join } from 'node:path';
import { openPage, sleep } from './page.mjs';
import { DDError } from '../errors.mjs';
import { SCRIPTS_DIR, writeFileAtomic } from '../paths.mjs';

const cache = {};
export function inpageSource(name) {
  return (cache[name] ||= readFileSync(join(SCRIPTS_DIR, 'inpage', name), 'utf8'));
}
export function dataJSON(name) {
  return (cache[name] ||= JSON.parse(readFileSync(join(SCRIPTS_DIR, 'data', name), 'utf8')));
}

const NET_ERRORS = /ERR_NAME_NOT_RESOLVED|ERR_CONNECTION_REFUSED|ERR_CONNECTION_RESET|ERR_CONNECTION_CLOSED|ERR_ADDRESS_UNREACHABLE|ERR_CERT|ERR_SSL|ERR_INTERNET_DISCONNECTED|ERR_EMPTY_RESPONSE|ERR_HTTP_RESPONSE_CODE_FAILURE|ERR_INVALID_RESPONSE|ERR_ABORTED|ERR_TOO_MANY_REDIRECTS|ERR_UNSAFE_PORT|ERR_BLOCKED/;

function timeoutErr(what) {
  return new DDError('TIMEOUT', `${what} 시간 초과`);
}

// CDP 타임아웃을 TIMEOUT 으로 바꾼다.
async function step(what, fn) {
  try {
    return await fn();
  } catch (e) {
    if (e && e.code === 'CDP_TIMEOUT') throw timeoutErr(what);
    throw e;
  }
}

export async function captureViewport(ctx) {
  const { handle, vp, url, outDir, flags, trusted, verify, deadline, warnings, log } = ctx;
  const files = { hero: null, slices: [], raw: null };
  const timeout = Math.max(1000, Math.min(flags.timeout ?? 30000, deadline.remaining()));
  const page = await openPage(handle, { viewport: vp, collectConsole: trusted && verify, log });
  try {
    log(`${vp.name}: 여는 중 ${vp.width}×${vp.height}`);
    const nav = await step('페이지 탐색', () => page.navigate(url, timeout));
    if (!nav.ok) {
      const t = String(nav.errorText || 'unknown');
      if (NET_ERRORS.test(t) || nav.status) throw new DDError('NAV_FAILED', `접속 실패: ${t}${nav.status ? ` (HTTP ${nav.status})` : ''}`);
      throw new DDError('NAV_FAILED', `접속 실패: ${t}`);
    }
    if (nav.loadTimedOut) {
      if (!nav.status) throw timeoutErr('load');
      warnings.add('LOAD_TIMEOUT', `${vp.name}: load 이벤트가 ${timeout}ms 안에 오지 않아 그대로 진행했다`);
    }
    deadline.check('load');
    const quiet = await page.networkQuiet(500, Math.min(8000, Math.max(500, deadline.remaining() - 1000)));
    if (!quiet) warnings.add('NETWORK_BUSY', `${vp.name}: 네트워크가 8초 안에 잠잠해지지 않았다`);
    deadline.check('network');

    const prepOpts = {
      status: nav.status || 0,
      trusted,
      keepOverlays: !!flags.keepOverlays,
      hide: flags.hide || [],
      challenge: dataJSON('challenge-markers.json'),
      overlay: dataJSON('overlay-markers.json'),
    };
    const prep = await step('prepare', () => page.callFile(inpageSource('prepare.js'), prepOpts, { awaitPromise: true, timeout: Math.min(45000, Math.max(5000, deadline.remaining())) }));
    if (prep.blocked) {
      const shot = await page.screenshot({ format: 'png' }).catch(() => null);
      const partial = [];
      if (shot) {
        writeFileSync(join(outDir, 'blocked.png'), shot);
        partial.push('blocked.png');
      }
      const code = prep.blocked.code === 'EMPTY_RENDER' ? 'EMPTY_RENDER' : 'BLOCKED';
      throw new DDError(code, code === 'BLOCKED' ? `봇 차단·캡차 화면이다 (HTTP ${nav.status || '?'}, ${prep.blocked.marker})` : '보이는 내용이 거의 없는 화면이다', { partial });
    }
    if (prep.httpError) throw new DDError('NAV_FAILED', `HTTP ${nav.status} 응답`);
    if (prep.appError) {
      const shot = await page.screenshot({ format: 'png' }).catch(() => null);
      const partial = [];
      if (shot) {
        writeFileSync(join(outDir, 'app-error.png'), shot);
        partial.push('app-error.png');
      }
      throw new DDError('APP_ERROR', `dev 에러 오버레이: ${prep.appError.title}`, { partial, details: { consoleErrors: page.consoleErrors } });
    }
    if (prep.challengeWarning) warnings.add('CHALLENGE_MARKER', `${vp.name}: 챌린지 표식이 있지만 내용이 있어 계속했다`);
    deadline.check('prepare');

    // 히어로
    writeFileSync(join(outDir, `${vp.name}.png`), await step('스크린샷', () => page.screenshot({ format: 'png' })));
    files.hero = `${vp.name}.png`;

    // 데스크톱 슬라이스: 뷰포트 단위로 스크롤하며 찍는다(captureBeyondViewport 는 쓰지 않는다).
    // 페이지가 maxSlices 화면보다 길면 처음 N 화면 대신 페이지 전체에서 고르게 뽑는다.
    const maxSlices = flags.maxSlices ?? 10;
    const pageHeight = prep.pageHeight || vp.height;
    files.slicesY = [];
    if (vp.name === 'desktop' && !flags.noFullPage && maxSlices > 0) {
      mkdirSync(join(outDir, 'slices'), { recursive: true });
      const maxY = Math.max(0, pageHeight - vp.height);
      const screens = Math.ceil(pageHeight / vp.height);
      const sampled = screens > maxSlices;
      const targets = [];
      for (let i = 0; i < Math.min(screens, maxSlices); i++) {
        targets.push(sampled ? Math.round((i * maxY) / Math.max(1, maxSlices - 1)) : Math.min(i * vp.height, maxY));
      }
      let prevY = -1;
      for (let i = 0; i < targets.length; i++) {
        if (deadline.remaining() < 8000) {
          warnings.add('DEADLINE_SLICES', `deadline 이 가까워 슬라이스를 ${files.slices.length}장에서 멈췄다`);
          break;
        }
        const y = await page.evaluate(`(window.scrollTo(0, ${targets[i]}), Math.round(window.scrollY))`);
        if (i > 0 && y <= prevY) break;
        prevY = y;
        await sleep(350);
        try {
          const jpg = await page.screenshot({ format: 'jpeg', quality: 80 });
          const name = `slices/desktop-${String(files.slices.length + 1).padStart(2, '0')}.jpg`;
          writeFileSync(join(outDir, name), jpg);
          files.slices.push(name);
          files.slicesY.push(y);
        } catch (e) {
          warnings.add('SLICE_FAILED', `슬라이스 ${i + 1} 실패: ${e.message}`);
          break;
        }
      }
      if (sampled) warnings.add('SLICES_SAMPLED', `페이지가 ${screens} 화면이라 슬라이스 ${files.slices.length}장을 페이지 전체에서 고르게 뽑았다(capture.json 의 files.slicesY 참고)`);
      await page.evaluate('window.scrollTo(0, 0)');
      await sleep(300);
    }

    // 추출
    let raw;
    try {
      raw = await page.callFile(inpageSource('extract-tokens.js'), {
        viewport: vp.name, maxElements: 6000, budgetMs: 4000, maxBytes: 29000, headingChars: 60, labelChars: 24, trusted,
      }, { timeout: 15000 });
      if (!raw || raw.schema !== 'dd.raw/1') throw new Error('추출 결과 형식이 다르다');
    } catch (e) {
      throw new DDError('EXTRACT_FAILED', `${vp.name} 토큰 추출 실패: ${String(e.message).slice(0, 200)}`, { partial: [files.hero, ...files.slices] });
    }
    raw.capture = {
      status: nav.status || null,
      finalUrl: page.finalUrl || url,
      viewport: { name: vp.name, width: vp.width, height: vp.height, dpr: vp.dpr },
      pageHeight,
      overlaysHidden: prep.overlaysHidden || [],
      scrollSteps: prep.scrollSteps || 0,
    };
    if (verify && trusted) raw.capture.consoleErrors = page.consoleErrors.slice(0, 5);
    // raw 는 압축 JSON 으로 쓴다(파일 ≤ 30KB).
    writeFileAtomic(join(outDir, 'raw', `${vp.name}.json`), JSON.stringify(raw));
    files.raw = `raw/${vp.name}.json`;
    return { files, prep, nav, finalUrl: page.finalUrl || url, consoleErrors: page.consoleErrors.slice(0, 5), raw };
  } finally {
    await page.close();
  }
}
