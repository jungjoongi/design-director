// exit code 표와 고정 hint 문자열. hint·next 에는 페이지에서 온 문자열을 넣지 않는다.

export const EXIT = Object.freeze({
  OK: 0,
  INTERNAL: 1,
  USAGE: 2,
  EXISTS: 2,
  NO_BROWSER: 3,
  LAUNCH_FAILED: 4,
  NAV_FAILED: 5,
  BLOCKED: 6,
  EMPTY_RENDER: 6,
  TIMEOUT: 7,
  EXTRACT_FAILED: 8,
  APP_ERROR: 9,
  NODE_TOO_OLD: 10,
});

export const HINTS = Object.freeze({
  INTERNAL: '엔진 버그다. 출력 JSON 을 보고하고 브라우저 MCP(R3) 또는 사용자 스크린샷(R5)으로 진행한다.',
  USAGE: '인자를 확인한다. `node dd.mjs <command> --help` 로 사용법을 본다.',
  EXISTS: '출력 폴더가 이미 있다. 덮어써도 되는지 사용자에게 확인한 뒤 --force 를 붙인다.',
  NO_BROWSER: 'Chromium 계열 브라우저를 찾지 못했다. Chrome 을 설치하거나 --browser <path> 로 지정한다. 사용자가 동의하면 `npx --yes @puppeteer/browsers@2 install chrome-headless-shell@stable --path ~/.cache/puppeteer` 로 받을 수 있다.',
  LAUNCH_FAILED: '브라우저를 띄우지 못했다. stderr 에 crashpad·socket·Operation not permitted 가 보이면 Claude Code 샌드박스가 막은 것이다: 사용자 허락을 받아 이 명령만 샌드박스 밖에서 다시 실행한다. 아니면 --browser 로 다른 브라우저를 지정하거나 브라우저 MCP(R3)로 진행한다.',
  LAUNCH_SANDBOX: '샌드박스 오류로 브라우저가 뜨지 않았다. 신뢰하는 환경이면 DESIGN_DIRECTOR_NO_SANDBOX=1 로 다시 실행한다.',
  NAV_FAILED: 'URL 에 접속하지 못했다. 주소를 확인하고, localhost 면 dev 서버가 떠 있는지 확인한다.',
  BLOCKED: '봇 차단·캡차 페이지다. 우회하지 않는다. 사용자의 실제 브라우저(R3)나 스크린샷(R5)으로 진행한다.',
  EMPTY_RENDER: '화면이 비어 있다. 로그인 벽이거나 JS 렌더 실패일 수 있다. 사용자의 실제 브라우저(R3)나 스크린샷(R5)으로 진행한다.',
  TIMEOUT: '시간 안에 끝나지 않았다. `--timeout 60000 --max-slices 4` 로 한 번만 다시 시도하고, 그래도 안 되면 R3 로 간다.',
  EXTRACT_FAILED: '스크린샷은 있지만 토큰 추출에 실패했다. 스크린샷을 보고 추정값(estimated)으로 진행한다.',
  APP_ERROR: 'dev 서버 에러 오버레이가 떠 있다. 빌드·런타임 에러부터 고친다. message 에 에러 제목이 있다.',
  NODE_TOO_OLD: 'Node 20 이상이 필요하다. Node 를 올리거나 브라우저 MCP(R3)로 진행한다.',
  NOT_FOUND: '경로를 확인한다. capture 산출물 폴더(raw/ 가 있는 폴더)를 넘긴다.',
});

// 엔진 안에서 던지는 에러. code 로 exit 를 정한다.
export class DDError extends Error {
  constructor(code, message, extra = {}) {
    super(message);
    this.name = 'DDError';
    this.code = code;
    this.exit = EXIT[code] ?? EXIT.INTERNAL;
    this.hint = extra.hint ?? HINTS[code] ?? HINTS.INTERNAL;
    this.partial = extra.partial;
    this.details = extra.details;
  }
}

export function usage(message) {
  return new DDError('USAGE', message);
}

// 알 수 없는 예외를 실패 JSON 으로 바꾼다.
export function toFailure(command, err) {
  if (err instanceof DDError) {
    const out = { ok: false, command, code: err.code, exit: err.exit, message: err.message, hint: err.hint };
    if (err.partial && err.partial.length) out.partial = err.partial;
    if (err.details) Object.assign(out, err.details);
    return out;
  }
  const message = String(err && err.stack ? err.stack.split('\n').slice(0, 4).join(' | ') : err).slice(0, 600);
  return { ok: false, command, code: 'INTERNAL', exit: EXIT.INTERNAL, message, hint: HINTS.INTERNAL };
}
