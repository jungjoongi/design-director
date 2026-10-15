// tells 스캐너: 픽스처 카탈로그로 패턴·색·프로젝트 단위 검사, 건너뛰는 경로, 실제 SSOT 검증.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { cpSync, existsSync, mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { collectFiles, compileTells, parseTellsMarkdown, scanTexts } from '../../plugins/design-director/scripts/lib/tells/scan.mjs';

const ROOT = fileURLToPath(new URL('../..', import.meta.url));
const FIX = join(ROOT, 'tests', 'fixtures', 'tells');
const DD = join(ROOT, 'plugins', 'design-director', 'scripts', 'dd.mjs');
const SSOT = join(ROOT, 'plugins', 'design-director', 'references', 'ai-default-tells.md');
const data = parseTellsMarkdown(readFileSync(join(FIX, 'tells.md'), 'utf8'));

function scanDir(dir) {
  const exts = new Set();
  for (const t of compileTells(data).tells) for (const e of t.exts) exts.add(e);
  return scanTexts(collectFiles([dir], dir, exts), data);
}

test('블록 파싱: 주석 사이 ```json 하나', () => {
  assert.equal(data.schema, 'dd.tells/1');
  assert.equal(data.tells.length, 4);
  assert.throws(() => parseTellsMarkdown('# 없음'), /찾지 못했다/);
  assert.throws(() => parseTellsMarkdown('<!-- dd:tells:begin -->\n```json\n{"schema":"x","tells":[]}\n```\n<!-- dd:tells:end -->'), /dd.tells\/1/);
});

test('패턴·색·absent+when·threshold', () => {
  const r = scanDir(join(FIX, 'project'));
  assert.equal(r.scanned, 2, '*.min.* 는 건너뛴다');
  assert.equal(r.counts['CO-1'], 1);
  assert.equal(r.counts['CO-2'], 3, '#d97757, rgb(217,119,87), #d97758(ΔE 작음) — #2563eb 는 아님');
  assert.equal(r.counts['KR-1'], 1, '한글이 있는데 keep-all 이 없다');
  assert.equal(r.counts['IC-1'], 2);
  assert.deepEqual(r.flagged.map((f) => f.id).sort(), ['CO-1', 'CO-2', 'KR-1'], 'IC-1 은 threshold 3 미달');
  assert.deepEqual(r.summary, { S1: 2, S2: 1, S3: 0 });
  const co1 = r.findings.find((f) => f.id === 'CO-1');
  assert.deepEqual([co1.file, co1.line], ['app/page.tsx', 3]);
  assert.ok(co1.snippet.length <= 80);
  const kr1 = r.findings.find((f) => f.id === 'KR-1');
  assert.equal(kr1.project, true);
});

test('keep-all 이 어딘가 있으면 KR-1 은 없다', () => {
  const r = scanDir(join(FIX, 'project-ok'));
  assert.equal(r.counts['KR-1'], 0);
});

test('건너뛰는 경로: node_modules·dist·.next·.design 등', () => {
  const dir = mkdtempSync(join(tmpdir(), 'dd-tells-'));
  try {
    cpSync(join(FIX, 'project'), dir, { recursive: true });
    for (const d of ['node_modules/pkg', 'dist', '.next/server', '.design/x', 'build', 'coverage']) {
      mkdirSync(join(dir, d), { recursive: true });
      writeFileSync(join(dir, d, 'x.tsx'), 'export const y = <div className="bg-gradient-to-br from-violet-600 to-indigo-600" />;\n');
    }
    const r = scanDir(dir);
    assert.equal(r.counts['CO-1'], 1);
    // CLI 로도 같은 결과(환경변수로 픽스처 카탈로그를 쓴다)
    const out = spawnSync(process.execPath, [DD, 'tells', '.', '--quiet'], { cwd: dir, encoding: 'utf8', env: { ...process.env, DESIGN_DIRECTOR_TELLS: join(FIX, 'tells.md') } });
    assert.equal(out.status, 0, out.stderr);
    const j = JSON.parse(out.stdout);
    assert.equal(j.ok, true);
    assert.equal(j.counts['CO-1'], 1);
    assert.equal(out.stdout.trim().split('\n').length, 1, 'stdout 에는 JSON 하나');
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
});

test('실제 ai-default-tells.md (있으면): JSON 블록·id·심각도·정규식', { skip: !existsSync(SSOT) && 'ai-default-tells.md 가 아직 없다' }, () => {
  const real = parseTellsMarkdown(readFileSync(SSOT, 'utf8'));
  const ids = real.tells.map((t) => t.id);
  assert.equal(new Set(ids).size, ids.length, 'id 중복');
  for (const t of real.tells) {
    assert.match(t.id, /^(TY|CO|LA|SH|IC|MO|CP|KR)-\d+$/);
    assert.ok(['S1', 'S2', 'S3'].includes(t.severity), `${t.id} severity`);
    assert.ok((t.patterns && t.patterns.length) || (t.colors && t.colors.length) || (t.absent && t.when), `${t.id} 검사 없음`);
    assert.ok(Array.isArray(t.files) && t.files.length, `${t.id} files`);
    const flags = String(t.flags || '').replace(/[gy]/g, '');
    for (const p of [...(t.patterns || []), ...(t.absent || []), ...(t.when ? [t.when] : [])]) {
      assert.doesNotThrow(() => new RegExp(p, flags + 'g'), `${t.id}: ${p}`);
    }
  }
  assert.deepEqual(compileTells(real).errors, []);
});

test('실제 카탈로그 오탐 방지 사례 (있으면)', { skip: !existsSync(SSOT) && 'ai-default-tells.md 가 아직 없다' }, () => {
  const real = parseTellsMarkdown(readFileSync(SSOT, 'utf8'));
  const ids = new Set(real.tells.map((t) => t.id));
  const scan = (rel, text) => scanTexts([{ rel, ext: rel.split('.').pop(), text }], real);
  if (ids.has('KR-1')) {
    const r = scan('a.tsx', '// 주석에만 한글이 있다\nexport const A = () => <p>Hello</p>;\n');
    assert.equal(r.counts['KR-1'], 0, 'KR-1: 주석 속 한글만 있으면 안 잡는다');
  }
  if (ids.has('IC-1')) {
    const r = scan('b.tsx', 'export const B = () => <p>© ® ™ → ↗ ▶ ★ ✓ 🇰🇷</p>;\n');
    assert.equal(r.counts['IC-1'], 0, 'IC-1: 기호·국기는 이모지 아이콘이 아니다');
  }
  if (ids.has('MO-4')) {
    const r = scan('c.tsx', 'export const C = () => <div className="animate-spin animate-pulse animate-in data-[state=open]:animate-accordion-down" />;\n');
    assert.equal(r.counts['MO-4'] || 0, 0, 'MO-4: 스피너·펄스·아코디언만으로는 안 잡는다');
  }
});
