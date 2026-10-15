// 정화·인자·slug·경로·에러 형식.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { mkdtempSync, mkdirSync, readFileSync, writeFileSync, existsSync, rmSync, symlinkSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { sanitizeText, stripInvisible } from '../../plugins/design-director/scripts/lib/analyze/sanitize.mjs';
import { parseArgs, parseViewports } from '../../plugins/design-director/scripts/lib/args.mjs';
import { slugify, pageSlug } from '../../plugins/design-director/scripts/lib/slug.mjs';
import { DESIGN_GITIGNORE, ensureDesignGitignore, prepareOutDir, resolveOut, timestamp } from '../../plugins/design-director/scripts/lib/paths.mjs';
import { DDError, EXIT, toFailure } from '../../plugins/design-director/scripts/lib/errors.mjs';
import { isTrustedHost, validateUrl } from '../../plugins/design-director/scripts/lib/url.mjs';

const cp = (...xs) => String.fromCodePoint(...xs);

test('정화: zero-width·bidi·태그 문자는 지우고 제어문자는 공백', () => {
  assert.equal(sanitizeText(`Sim${cp(0x200b)}ple pric${cp(0x202e)}ing${cp(0x202c)} plans`), 'Simple pricing plans');
  assert.equal(sanitizeText(`a${cp(0x2066)}b${cp(0x2069)}c${cp(0xfeff)}d${cp(0x2060)}e`), 'abcde');
  assert.equal(sanitizeText(`tag${cp(0xe0049, 0xe0047)}ged`), 'tagged');
  assert.equal(sanitizeText(`line1\nline2\tx${cp(0x7)}y`), 'line1 line2 x y');
  assert.equal(sanitizeText(`  many   spaces  `), 'many spaces');
  assert.equal(stripInvisible(`x${cp(0x200d)}y`), 'xy');
});

test('정화: NFC 와 코드 포인트 기준 길이 제한', () => {
  const decomposed = '한글'.normalize('NFD');
  assert.equal(sanitizeText(decomposed), '한글');
  assert.equal(sanitizeText('abcdefghij', 5), 'abcd…');
  assert.equal(Array.from(sanitizeText('가'.repeat(80), 60)).length, 60);
  assert.equal(sanitizeText(null), '');
});

test('인자: 플래그·반복·숫자·불리언', () => {
  const r = parseArgs('capture', ['https://x.com', '--out', 'o', '--hide', '.a', '--hide=.b', '--max-slices', '4', '--keep-overlays', '--viewports=desktop']);
  assert.deepEqual(r.positionals, ['https://x.com']);
  assert.deepEqual(r.flags, { out: 'o', hide: ['.a', '.b'], maxSlices: 4, keepOverlays: true, viewports: 'desktop' });
  assert.throws(() => parseArgs('capture', ['u', '--nope']), (e) => e instanceof DDError && e.code === 'USAGE');
  assert.throws(() => parseArgs('capture', ['u', '--timeout', 'abc']), /정수/);
  assert.throws(() => parseArgs('capture', ['u', '--timeout', '10']), /1000 이상/);
  assert.throws(() => parseArgs('capture', []), /부족/);
  assert.throws(() => parseArgs('slug', ['a', 'b']), /너무 많다/);
  assert.equal(parseArgs('capture', ['--help']).flags.help, true);
  assert.deepEqual(parseArgs('tells', ['a', 'b', '--root', 'r']).positionals, ['a', 'b']);
  assert.deepEqual(parseViewports('mobile,desktop'), ['desktop', 'mobile']);
  assert.throws(() => parseViewports('mobile'), /desktop/);
  assert.throws(() => parseViewports('tablet'), /알 수 없는/);
});

test('slug: architecture.md 의 예', () => {
  assert.equal(slugify('https://linear.app/'), 'linear-app');
  assert.equal(slugify('toss.im/career/jobs/123'), 'toss-im-career-jobs');
  assert.equal(slugify('https://www.29cm.co.kr/'), '29cm-co-kr');
  assert.equal(slugify('http://localhost:3000/pricing'), 'localhost-3000-pricing');
  assert.equal(slugify('https://Example.com/A_B/c d/e'), 'example-com-a-b-c-d');
  assert.ok(slugify('https://' + 'a'.repeat(80) + '.com').length <= 48);
  assert.equal(pageSlug('http://localhost:3000/'), 'page');
  assert.equal(pageSlug('http://localhost:3000/pricing/team'), 'pricing-team');
});

test('URL: http(s) 만, user:pass@ 는 떼고 경고, 신뢰 호스트', () => {
  assert.throws(() => validateUrl('file:///etc/passwd'), /http\(s\)/);
  assert.throws(() => validateUrl('javascript:alert(1)'), /http\(s\)/);
  assert.throws(() => validateUrl('data:text/html,x'), /http\(s\)/);
  const v = validateUrl('https://user:secret@example.com/x');
  assert.equal(v.url, 'https://example.com/x');
  assert.equal(v.warnings[0].code, 'CREDENTIALS_STRIPPED');
  assert.equal(validateUrl('linear.app').url, 'https://linear.app/');
  assert.equal(validateUrl('localhost:5173/a').url, 'http://localhost:5173/a');
  for (const h of ['localhost', '127.0.0.1', '[::1]', 'app.localhost']) assert.ok(isTrustedHost(h), h);
  for (const h of ['localhost.evil.com', '127.0.0.2.nip.io', 'example.com']) assert.ok(!isTrustedHost(h), h);
});

test('경로: --out 은 cwd 안, EXISTS, .design/.gitignore', () => {
  const cwd = mkdtempSync(join(tmpdir(), 'dd-paths-'));
  try {
    assert.throws(() => resolveOut(cwd, '../escape'), /현재 폴더 안/);
    assert.throws(() => resolveOut(cwd, '/tmp/elsewhere'), /현재 폴더 안/);
    assert.throws(() => resolveOut(cwd, '.'), /현재 폴더 안/);
    const outside = mkdtempSync(join(tmpdir(), 'dd-outside-'));
    symlinkSync(outside, join(cwd, 'link'));
    assert.throws(() => resolveOut(cwd, 'link/x'), /현재 폴더 안/, '심볼릭 링크 탈출');
    rmSync(outside, { recursive: true, force: true });
    const out = resolveOut(cwd, '.design/references/x');
    prepareOutDir(out, false);
    assert.equal(ensureDesignGitignore(cwd, out), true);
    assert.equal(readFileSync(join(cwd, '.design', '.gitignore'), 'utf8'), DESIGN_GITIGNORE);
    assert.equal(DESIGN_GITIGNORE, 'references/*/*.png\nreferences/*/*.jpg\nreferences/*/slices/\nreferences/*/raw/\nverify/\n');
    writeFileSync(join(cwd, '.design', '.gitignore'), 'custom\n');
    assert.equal(ensureDesignGitignore(cwd, out), false, '이미 있으면 건드리지 않는다');
    assert.equal(readFileSync(join(cwd, '.design', '.gitignore'), 'utf8'), 'custom\n');
    writeFileSync(join(out, 'x.txt'), 'x');
    assert.throws(() => prepareOutDir(out, false), (e) => e.code === 'EXISTS' && e.exit === 2);
    prepareOutDir(out, true);
    mkdirSync(join(cwd, 'other'));
    assert.equal(ensureDesignGitignore(cwd, join(cwd, 'other')), false, '.design 밖이면 쓰지 않는다');
    assert.match(timestamp(new Date(2026, 9, 15, 9, 5, 7)), /^20261015-090507$/);
    assert.ok(existsSync(out));
  } finally {
    rmSync(cwd, { recursive: true, force: true });
  }
});

test('에러: exit code 표와 실패 JSON 형식', () => {
  assert.deepEqual(EXIT, { OK: 0, INTERNAL: 1, USAGE: 2, EXISTS: 2, NO_BROWSER: 3, LAUNCH_FAILED: 4, NAV_FAILED: 5, BLOCKED: 6, EMPTY_RENDER: 6, TIMEOUT: 7, EXTRACT_FAILED: 8, APP_ERROR: 9, NODE_TOO_OLD: 10 });
  const f = toFailure('capture', new DDError('BLOCKED', '차단', { partial: ['blocked.png'] }));
  assert.deepEqual(Object.keys(f), ['ok', 'command', 'code', 'exit', 'message', 'hint', 'partial']);
  assert.equal(f.exit, 6);
  const i = toFailure('capture', new TypeError('boom'));
  assert.equal(i.code, 'INTERNAL');
  assert.equal(i.exit, 1);
});
