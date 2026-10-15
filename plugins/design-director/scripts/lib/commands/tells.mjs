// tells: references/ai-default-tells.md 의 JSON 블록으로 코드를 스캔한다.
import { existsSync, readFileSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { DDError } from '../errors.mjs';
import { log } from '../json-out.mjs';
import { PLUGIN_ROOT } from '../paths.mjs';
import { collectFiles, compileTells, parseTellsMarkdown, scanTexts } from '../tells/scan.mjs';

export const help = `dd.mjs tells <path…> [--root <dir>]

${'${CLAUDE_PLUGIN_ROOT}'}/references/ai-default-tells.md 끝의 JSON 블록(dd.tells/1)으로 파일·폴더를 스캔한다.
건너뛰는 경로: node_modules .git dist build .next .nuxt .output .svelte-kit coverage .design, *.min.*
--root 는 결과의 파일 경로 기준과 프로젝트 단위 검사(absent+when)의 범위다(기본 cwd).
결과: {scanned, findings:[{id,severity,file,line,snippet}], counts, flagged:[{id,severity,title,count}], summary:{S1,S2,S3}}`;

export const TELLS_PATH = join(PLUGIN_ROOT, 'references', 'ai-default-tells.md');

export function loadTells(path = TELLS_PATH) {
  if (!existsSync(path)) throw new DDError('INTERNAL', `ai-default-tells.md 가 없다: ${path}`);
  try {
    return parseTellsMarkdown(readFileSync(path, 'utf8'));
  } catch (e) {
    throw new DDError('INTERNAL', `tells 블록을 읽지 못했다: ${e.message}`);
  }
}

export async function run({ positionals, flags, cwd }) {
  const root = resolve(cwd, flags.root || '.');
  const paths = positionals.map((p) => resolve(cwd, p));
  for (const p of paths) if (!existsSync(p)) throw new DDError('USAGE', `경로가 없다: ${p}`);
  const data = loadTells(process.env.DESIGN_DIRECTOR_TELLS || TELLS_PATH);
  const exts = new Set();
  for (const t of compileTells(data).tells) for (const e of t.exts) exts.add(e);
  const files = collectFiles(paths, root, exts);
  log(`tells: 파일 ${files.length}개 스캔`);
  const res = scanTexts(files, data);
  const warnings = res.errors.map((e) => ({ code: 'TELL_INVALID', message: `${e.id}: ${e.message}` }));
  const MAX = 300;
  if (res.findings.length > MAX) warnings.push({ code: 'FINDINGS_TRUNCATED', message: `findings ${res.findings.length}건 중 ${MAX}건만 실었다(counts 는 전체)` });
  return {
    ok: true,
    command: 'tells',
    scanned: res.scanned,
    findings: res.findings.slice(0, MAX),
    counts: res.counts,
    flagged: res.flagged,
    summary: res.summary,
    warnings,
    next: [],
  };
}
