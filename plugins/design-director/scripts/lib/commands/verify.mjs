// verify: 레퍼런스와 같은 뷰포트로 로컬 페이지를 캡처하고 나란히 놓는다.
import { existsSync, readFileSync, statSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { parseViewports } from '../args.mjs';
import { sideBySide } from '../browser/composite.mjs';
import { DDError } from '../errors.mjs';
import { log, Warnings } from '../json-out.mjs';
import { ensureDesignGitignore, prepareOutDir, relCwd, resolveOut, timestamp } from '../paths.mjs';
import { pageSlug, slugify } from '../slug.mjs';
import { validateUrl } from '../url.mjs';
import { analyzeDir } from './analyze.mjs';
import { captureCore, cleanEngineOutputs, writeManifest } from './capture.mjs';
import { sanitizeText } from '../analyze/sanitize.mjs';

export const help = `dd.mjs verify <localUrl> --ref <slug|dir> [--ref-label REFERENCE] [--page <name>] [--out <dir>] [capture 옵션]

레퍼런스(capture 산출물 폴더 또는 .design/references/<slug>)의 뷰포트로 로컬 페이지를 캡처하고
side-by-side-{desktop,mobile}.jpg (왼쪽 --ref-label, 오른쪽 RESULT, 폭 1568px 이하)를 만든다.
기본 출력: .design/verify/<page>/<YYYYMMDD-HHMMSS>/
신뢰 호스트(localhost·127.0.0.1·::1·*.localhost)에서는 클래스명 힌트·가로 넘침 범인·콘솔 에러 5개를 모으고,
dev 에러 오버레이가 떠 있으면 exit 9 로 멈춘다.
v0.1 은 토큰 diff 를 계산하지 않는다. 브리프 토큰 표와 결과 summary.md 를 Claude 가 비교한다.`;

// capture 산출물 폴더뿐 아니라 profile.md 만 있는 폴더(브랜드 카드·카탈로그·비전 프로필)도 받는다.
const REF_MARKERS = ['capture.json', 'profile.md', 'tokens.json', 'desktop.png'];
export function resolveRef(cwd, ref) {
  const candidates = [resolve(cwd, ref), resolve(cwd, '.design', 'references', ref)];
  for (const dir of candidates) {
    if (existsSync(dir) && statSync(dir).isDirectory() && REF_MARKERS.some((f) => existsSync(join(dir, f)))) return dir;
  }
  throw new DDError('USAGE', `레퍼런스를 찾지 못했다: ${ref}`, { hint: '--ref 에 slug(.design/references/<slug>) 나 capture.json·profile.md 가 있는 폴더를 넘긴다.' });
}

const cleanLabel = (s, fallback) => (String(s || '').replace(/[^A-Za-z0-9 _.-]/g, '').trim().slice(0, 24) || fallback);

export async function run({ positionals, flags, cwd }) {
  if (!flags.ref) throw new DDError('USAGE', '--ref 가 필요하다');
  const warnings = new Warnings();
  const v = validateUrl(positionals[0]);
  warnings.addAll(v.warnings);
  const refDir = resolveRef(cwd, flags.ref);
  let refCapture = {};
  if (existsSync(join(refDir, 'capture.json'))) {
    try {
      refCapture = JSON.parse(readFileSync(join(refDir, 'capture.json'), 'utf8'));
    } catch {
      warnings.add('REF_MANIFEST_INVALID', 'capture.json 을 읽지 못해 기본 뷰포트로 찍는다');
    }
  }
  const refNames = (refCapture.viewports || []).map((x) => x.name).filter((n) => n === 'desktop' || n === 'mobile');
  const viewports = flags.viewports ? parseViewports(flags.viewports) : parseViewports(refNames.length ? refNames.join(',') : undefined);
  const page = flags.page ? slugify(`x/${flags.page}`).replace(/^x-/, '') || 'page' : pageSlug(v.url);
  const outAbs = resolveOut(cwd, flags.out || join('.design', 'verify', page, timestamp()));
  prepareOutDir(outAbs, flags.force);
  if (flags.force) cleanEngineOutputs(outAbs);
  ensureDesignGitignore(cwd, outAbs);
  const leftLabel = cleanLabel(flags.refLabel, 'REFERENCE');
  const capturedAt = new Date().toISOString().replace(/\.\d{3}Z$/, 'Z');
  const sbs = {};

  const after = async (handle, res) => {
    for (const name of viewports) {
      if (!res.files[name]) continue;
      const refHero = join(refDir, `${name}.png`);
      if (!existsSync(refHero)) {
        warnings.add('REF_IMAGES_MISSING', `레퍼런스에 ${name}.png 가 없어 side-by-side-${name}.jpg 를 만들지 않았다`);
        continue;
      }
      const rows = [[refHero, join(outAbs, res.files[name])]];
      if (name === 'desktop') {
        const refSlices = (refCapture.files && refCapture.files.slices) || [];
        for (let i = 1; i < 3; i++) {
          const l = refSlices[i] ? join(refDir, refSlices[i]) : null;
          const r = res.files.slices[i] ? join(outAbs, res.files.slices[i]) : null;
          if ((l && existsSync(l)) || r) rows.push([l && existsSync(l) ? l : null, r]);
        }
      }
      try {
        await sideBySide(handle, { rows, leftLabel, rightLabel: 'RESULT', out: join(outAbs, `side-by-side-${name}.jpg`) });
        sbs[name] = `side-by-side-${name}.jpg`;
      } catch (e) {
        warnings.add('SIDE_BY_SIDE_FAILED', `side-by-side-${name}.jpg 실패: ${e.message}`);
      }
    }
  };

  const res = await captureCore({ url: v.url, trusted: v.trusted, viewports, outAbs, flags, verify: true, warnings, after });
  res.capturedAt = capturedAt;
  res.files.sideBySide = sbs;
  writeManifest(outAbs, { url: v.url, res, viewports, warnings, analyzed: false });
  let analysis = null;
  if (!flags.noAnalyze) {
    try {
      analysis = analyzeDir(outAbs);
      warnings.addAll(analysis.warnings);
    } catch (e) {
      warnings.add('ANALYZE_FAILED', `analyze 실패: ${e.message}`);
    }
  }
  writeManifest(outAbs, { url: v.url, res, viewports, warnings, analyzed: !!analysis });
  const t = analysis ? analysis.tokens : null;
  const out = {
    ok: true,
    command: 'verify',
    outDir: relCwd(cwd, outAbs),
    url: v.url,
    finalUrl: res.finalUrl,
    ref: relCwd(cwd, refDir),
    refLabel: leftLabel,
    trusted: v.trusted,
    partial: res.partial,
    files: { ...res.files, capture: 'capture.json', ...(analysis ? { tokens: 'tokens.json', summary: 'summary.md' } : {}) },
    overflowX: t ? t.health.overflowX : null,
    warnings: warnings.toJSON(),
    next: [sbs.desktop, sbs.mobile, analysis ? 'summary.md' : null].filter(Boolean),
  };
  if (v.trusted) {
    out.consoleErrors = res.consoleErrors.map((e) => sanitizeText(e, 200)).slice(0, 5);
    if (t && t.health.offenders) out.overflowOffenders = t.health.offenders;
    if (t) out.classHints = t.structure.sections.filter((s) => s.cls).map((s) => ({ i: s.i, id: s.id, cls: s.cls })).slice(0, 30);
  }
  log(`verify: ${out.outDir}`);
  return out;
}
