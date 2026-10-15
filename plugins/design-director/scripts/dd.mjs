#!/usr/bin/env node
// design-director 엔진 CLI. 서브커맨드 분기만 한다. stdout 에는 JSON 객체 하나만 쓴다.
// 오래된 Node 에서도 버전 검사까지는 돌도록 이 파일은 단순한 문법만 쓰고 나머지는 동적 import 한다.

var COMMANDS = ['doctor', 'slug', 'capture', 'analyze', 'verify', 'tells'];

var GENERAL_HELP = [
  'design-director 엔진 (dd.mjs)',
  '',
  '사용: node dd.mjs <command> [args] [--quiet] [--help]',
  '',
  '  doctor              Node·브라우저 탐지, 실행 가능 여부',
  '  slug <url>          URL → 레퍼런스 폴더 이름',
  '  capture <url>       스크린샷 + 토큰 추출 + analyze (.design/references/<slug>)',
  '  analyze <dir>       raw/*.json → tokens.json + summary.md (결정적)',
  '  verify <localUrl>   --ref <slug|dir> 와 같은 뷰포트로 캡처하고 나란히 놓는다',
  '  tells <path…>       ai-default-tells.md 의 패턴으로 코드를 스캔한다',
  '',
  'stdout 에는 JSON 객체 하나만 나온다. 진행 로그는 stderr.',
  'exit: 0 OK, 1 INTERNAL, 2 USAGE/EXISTS, 3 NO_BROWSER, 4 LAUNCH_FAILED, 5 NAV_FAILED,',
  '      6 BLOCKED/EMPTY_RENDER, 7 TIMEOUT, 8 EXTRACT_FAILED, 9 APP_ERROR, 10 NODE_TOO_OLD',
].join('\n');

function finish(code) {
  process.exitCode = code;
  // 새는 핸들이 있어도 3초 뒤에는 끝낸다.
  var t = setTimeout(function () { process.exit(code); }, 3000);
  if (t.unref) t.unref();
}

async function main() {
  var argv = process.argv.slice(2);
  var command = argv[0];
  var major = Number(String(process.versions.node).split('.')[0]);
  if (major < 20) {
    process.stdout.write(JSON.stringify({
      ok: false, command: command || null, code: 'NODE_TOO_OLD', exit: 10,
      message: 'Node ' + process.version + ' 이다. 20 이상이 필요하다.',
      hint: 'Node 20 이상이 필요하다. Node 를 올리거나 브라우저 MCP(R3)로 진행한다.',
    }) + '\n');
    return finish(10);
  }
  const out = await import('./lib/json-out.mjs');
  const errors = await import('./lib/errors.mjs');
  const rest = argv.slice(1);
  out.setQuiet(rest.includes('--quiet') || argv.includes('--quiet'));

  if (!command || command === '--help' || command === 'help' || command === '-h') {
    if (!command) {
      out.emit({ ok: false, command: null, code: 'USAGE', exit: 2, message: '명령이 없다. ' + COMMANDS.join(', '), hint: errors.HINTS.USAGE });
      return finish(2);
    }
    process.stdout.write(GENERAL_HELP + '\n');
    return finish(0);
  }
  if (!COMMANDS.includes(command)) {
    out.emit({ ok: false, command, code: 'USAGE', exit: 2, message: '알 수 없는 명령: ' + command, hint: errors.HINTS.USAGE });
    return finish(2);
  }
  const mod = await import('./lib/commands/' + command + '.mjs');
  const { parseArgs } = await import('./lib/args.mjs');
  let result;
  try {
    const parsed = parseArgs(command, rest);
    if (parsed.flags.help) {
      process.stdout.write(mod.help + '\n');
      return finish(0);
    }
    result = await mod.run({ positionals: parsed.positionals, flags: parsed.flags, cwd: process.cwd() });
  } catch (err) {
    result = errors.toFailure(command, err);
  }
  out.emit(result);
  finish(result.ok ? 0 : result.exit || 1);
}

main().catch(function (err) {
  process.stdout.write(JSON.stringify({ ok: false, command: process.argv[2] || null, code: 'INTERNAL', exit: 1, message: String(err && err.message || err).slice(0, 500), hint: '엔진 버그다. 출력 JSON 을 보고한다.' }) + '\n');
  finish(1);
});
