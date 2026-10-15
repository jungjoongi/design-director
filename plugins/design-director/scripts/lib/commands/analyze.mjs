// analyze: raw/*.json (+ capture.json) → tokens.json + summary.md. 결정적·멱등.
import { existsSync, readFileSync, statSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { analyze } from '../analyze/index.mjs';
import { DDError, HINTS } from '../errors.mjs';
import { log } from '../json-out.mjs';
import { relCwd, SCRIPTS_DIR, writeFileAtomic, writeJSON } from '../paths.mjs';
import { summaryMarkdown } from '../report/summary.mjs';

export const help = `dd.mjs analyze <dir>

capture 산출물 폴더의 raw/desktop.json(필수)·raw/mobile.json·capture.json 을 읽어
tokens.json 과 summary.md 를 다시 만든다. 같은 입력이면 같은 출력이다.`;

let fontData = null;
export function loadFontData() {
  if (!fontData) fontData = JSON.parse(readFileSync(join(SCRIPTS_DIR, 'data', 'font-alternatives.json'), 'utf8'));
  return fontData;
}

function readJSON(p) {
  try {
    return JSON.parse(readFileSync(p, 'utf8'));
  } catch (e) {
    throw new DDError('USAGE', `JSON 을 읽지 못했다: ${p} (${e.message})`, { hint: '파일이 손상됐으면 capture 를 --force 로 다시 돌린다.' });
  }
}

function generatorString(capture) {
  if (capture && capture.generator) return capture.generator;
  try {
    const p = JSON.parse(readFileSync(join(SCRIPTS_DIR, '..', '.claude-plugin', 'plugin.json'), 'utf8'));
    return `design-director@${p.version}`;
  } catch {
    return 'design-director';
  }
}

// 폴더 하나 분석. capture 가 부르기도 한다.
export function analyzeDir(dir) {
  const rawDir = join(dir, 'raw');
  const dPath = join(rawDir, 'desktop.json');
  if (!existsSync(dPath)) throw new DDError('USAGE', `raw/desktop.json 이 없다: ${dir}`, { hint: HINTS.NOT_FOUND });
  const desktop = readJSON(dPath);
  const mPath = join(rawDir, 'mobile.json');
  const mobile = existsSync(mPath) ? readJSON(mPath) : null;
  const cPath = join(dir, 'capture.json');
  const capture = existsSync(cPath) ? readJSON(cPath) : null;
  const { tokens, warnings, confidence } = analyze({ desktop, mobile, capture }, { fontData: loadFontData(), generator: generatorString(capture) });
  writeJSON(join(dir, 'tokens.json'), tokens);
  writeFileAtomic(join(dir, 'summary.md'), summaryMarkdown(tokens, capture));
  log(`analyze: ${tokens.structure.sections.length}개 섹션, 신뢰도 ${confidence.overall}`);
  return { tokens, warnings, confidence };
}

export async function run({ positionals, cwd }) {
  const dir = resolve(cwd, positionals[0]);
  if (!existsSync(dir) || !statSync(dir).isDirectory()) throw new DDError('USAGE', `폴더가 없다: ${positionals[0]}`, { hint: HINTS.NOT_FOUND });
  const { warnings, confidence, tokens } = analyzeDir(dir);
  return {
    ok: true,
    command: 'analyze',
    outDir: relCwd(cwd, dir),
    files: { tokens: 'tokens.json', summary: 'summary.md' },
    confidence,
    sequence: tokens.structure.sequence,
    warnings,
    next: ['summary.md'],
  };
}
