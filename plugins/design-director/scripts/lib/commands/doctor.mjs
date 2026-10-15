// doctor: Node·브라우저 탐지와 실행 가능 여부.
import { detectBrowser } from '../browser/detect.mjs';
import { launchBrowser } from '../browser/launch.mjs';
import { DDError } from '../errors.mjs';
import { log } from '../json-out.mjs';

export const help = `dd.mjs doctor [--browser <path>]

Node 버전과 Chromium 계열 브라우저를 찾고, 실제로 띄워 CDP 핸드셰이크까지 확인한다.
결과: {node, platform, browser:{path,kind,source,version}, launchable}
탐지 순서: --browser → DESIGN_DIRECTOR_BROWSER·CHROME_PATH·PUPPETEER_EXECUTABLE_PATH → 시스템 설치 → Playwright·Puppeteer 캐시.`;

export async function run({ flags }) {
  const notes = [];
  const browser = detectBrowser({ flag: flags.browser, notes });
  const base = { node: process.version, platform: `${process.platform}-${process.arch}` };
  if (!browser) {
    throw new DDError('NO_BROWSER', notes.length ? notes.join('; ') : '설치된 Chromium 계열 브라우저를 찾지 못했다', {
      details: { ...base, browser: null, launchable: false },
    });
  }
  let handle;
  try {
    handle = await launchBrowser({ browser, log });
  } catch (e) {
    if (e instanceof DDError) e.details = { ...(e.details || {}), ...base, browser, launchable: false };
    throw e;
  }
  const version = handle.version;
  await handle.close();
  log(`브라우저 확인: ${version}`);
  return {
    ok: true,
    command: 'doctor',
    ...base,
    browser: { ...browser, version },
    launchable: true,
    warnings: notes.map((n) => ({ code: 'BROWSER_ENV_MISSING', message: n })),
    next: [],
  };
}
