// 정적 검사: analyze 순수성, in-page 파일 형식과 금지 API, stdout 계약.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { spawnSync } from 'node:child_process';

const SCRIPTS = fileURLToPath(new URL('../../plugins/design-director/scripts', import.meta.url));
const read = (...p) => readFileSync(join(SCRIPTS, ...p), 'utf8');
// 주석을 지운 코드(금지 패턴을 주석 설명에서 잡지 않게)
const stripComments = (src) => src.replace(/\/\*[\s\S]*?\*\//g, '').replace(/(^|[^:\\'"`])\/\/.*$/gm, '$1');

test('lib/analyze/* 는 node:*·process·Buffer·require 를 쓰지 않는다', () => {
  const dir = join(SCRIPTS, 'lib', 'analyze');
  const files = readdirSync(dir).filter((f) => f.endsWith('.mjs'));
  assert.ok(files.length >= 8);
  for (const f of files) {
    const src = stripComments(read('lib', 'analyze', f));
    assert.doesNotMatch(src, /from\s+['"]node:|import\(\s*['"]node:|require\(/, `${f}: node 모듈`);
    assert.doesNotMatch(src, /\bprocess\b/, `${f}: process`);
    assert.doesNotMatch(src, /\bBuffer\b/, `${f}: Buffer`);
    for (const m of src.matchAll(/from\s+['"]([^'"]+)['"]/g)) assert.match(m[1], /^\.\//, `${f}: analyze 밖 import ${m[1]}`);
  }
});

test('inpage/*.js 는 import 없는 함수 식 하나다', () => {
  for (const f of ['prepare.js', 'extract-tokens.js']) {
    const src = read('inpage', f).trim();
    assert.match(src, /^\(function \w+\(opts\) \{/, `${f}: (function name(opts){ 로 시작`);
    assert.match(src, /\}\)$/, `${f}: })로 끝`);
    assert.doesNotMatch(src, /^\s*(import|export)\s/m, `${f}: import/export`);
    // 문자열로 평가할 수 있어야 한다
    const fn = new Function(`return ${src}`)(); // eslint-disable-line no-new-func
    assert.equal(typeof fn, 'function');
  }
});

test('extract-tokens.js 는 금지 API 를 쓰지 않는다(읽기 전용)', () => {
  const src = stripComments(read('inpage', 'extract-tokens.js'));
  const forbidden = [
    [/\bfetch\s*\(/, 'fetch'], [/XMLHttpRequest/, 'XMLHttpRequest'], [/sendBeacon/, 'sendBeacon'], [/WebSocket/, 'WebSocket'],
    [/\beval\s*\(/, 'eval'], [/\bFunction\s*\(/, 'Function('], [/appendChild/, 'appendChild'], [/insertBefore/, 'insertBefore'],
    [/innerHTML\s*=/, 'innerHTML='], [/outerHTML\s*=/, 'outerHTML='], [/setAttribute/, 'setAttribute'], [/removeAttribute/, 'removeAttribute'],
    [/\.style\.[A-Za-z]+\s*=(?!=)/, '.style.X='], [/\.style\.setProperty/, 'style.setProperty'], [/\.click\s*\(/, 'click('],
    [/dispatchEvent/, 'dispatchEvent'], [/localStorage/, 'localStorage'], [/sessionStorage/, 'sessionStorage'],
    [/document\.cookie/, 'document.cookie'], [/scrollTo\s*\(/, 'scrollTo'], [/scrollBy\s*\(/, 'scrollBy'], [/scrollIntoView/, 'scrollIntoView'],
    [/\.remove\s*\(\s*\)/, 'remove()'], [/classList\.(add|remove|toggle)/, 'classList 쓰기'], [/\.focus\s*\(/, 'focus('],
    [/navigator\.(clipboard|sendBeacon)/, 'navigator 쓰기'], [/window\.open\s*\(/, 'window.open'], [/location\s*=|location\.(assign|replace|reload)/, 'location 이동'],
  ];
  for (const [re, name] of forbidden) assert.doesNotMatch(src, re, `금지: ${name}`);
});

test('prepare.js 만 스크롤·숨김을 하고, 클릭·입력은 하지 않는다', () => {
  const src = stripComments(read('inpage', 'prepare.js'));
  assert.match(src, /scrollTo/);
  for (const [re, name] of [[/\.click\s*\(/, 'click('], [/dispatchEvent/, 'dispatchEvent'], [/\bfetch\s*\(/, 'fetch'], [/XMLHttpRequest/, 'XHR'], [/localStorage|sessionStorage|document\.cookie/, 'storage'], [/\.value\s*=(?!=)/, '입력값 쓰기'], [/\.submit\s*\(/, 'submit']]) {
    assert.doesNotMatch(src, re, `prepare 금지: ${name}`);
  }
});

test('소스에 \\u 이스케이프로 쓴 비ASCII 글자가 없다(편집 도구 사고 방지)', () => {
  const walk = (dir) => readdirSync(dir, { withFileTypes: true }).flatMap((e) => (e.isDirectory() ? walk(join(dir, e.name)) : [join(dir, e.name)]));
  for (const f of walk(SCRIPTS).filter((p) => /\.(mjs|js)$/.test(p))) {
    const src = readFileSync(f, 'utf8');
    // 정규식 리터럴 안에 줄 구분 문자가 날것으로 들어가면 문법 오류가 난다
    const LS = new RegExp(`[${String.fromCodePoint(0x2028)}${String.fromCodePoint(0x2029)}]`);
    assert.ok(!LS.test(src), `${f}: U+2028/2029 날것`);
  }
});

test('dd.mjs: 명령 없음은 USAGE JSON 하나, --help 는 사람용 도움말', () => {
  const dd = join(SCRIPTS, 'dd.mjs');
  const a = spawnSync(process.execPath, [dd], { encoding: 'utf8' });
  assert.equal(a.status, 2);
  assert.equal(a.stdout.trim().split('\n').length, 1);
  assert.equal(JSON.parse(a.stdout).code, 'USAGE');
  for (const cmd of ['doctor', 'slug', 'capture', 'analyze', 'verify', 'tells']) {
    const h = spawnSync(process.execPath, [dd, cmd, '--help'], { encoding: 'utf8' });
    assert.equal(h.status, 0, cmd);
    assert.match(h.stdout, new RegExp(`dd\\.mjs ${cmd}`), cmd);
  }
  const s = spawnSync(process.execPath, [dd, 'slug', 'https://www.29cm.co.kr/', '--quiet'], { encoding: 'utf8' });
  assert.deepEqual(JSON.parse(s.stdout), { ok: true, command: 'slug', slug: '29cm-co-kr', warnings: [], next: [] });
  assert.equal(s.stderr, '');
  const bad = spawnSync(process.execPath, [dd, 'frobnicate'], { encoding: 'utf8' });
  assert.equal(bad.status, 2);
  const an = spawnSync(process.execPath, [dd, 'analyze', '/nonexistent-dir-xyz', '--quiet'], { encoding: 'utf8' });
  assert.equal(an.status, 2);
  assert.equal(JSON.parse(an.stdout).code, 'USAGE');
});
