// capture: 뷰포트별 스크린샷·슬라이스·raw → overview → capture.json → analyze.
import { existsSync, readFileSync, rmSync, readdirSync } from 'node:fs';
import { join } from 'node:path';
import { parseViewports } from '../args.mjs';
import { detectBrowser } from '../browser/detect.mjs';
import { launchBrowser } from '../browser/launch.mjs';
import { VIEWPORTS } from '../browser/page.mjs';
import { captureViewport } from '../browser/viewport.mjs';
import { contactSheet } from '../browser/composite.mjs';
import { DDError } from '../errors.mjs';
import { log, Warnings } from '../json-out.mjs';
import { ensureDesignGitignore, prepareOutDir, relCwd, resolveOut, writeJSON, PLUGIN_ROOT } from '../paths.mjs';
import { slugify } from '../slug.mjs';
import { validateUrl } from '../url.mjs';
import { analyzeDir } from './analyze.mjs';

export const help = `dd.mjs capture <url> [options]

URL 하나를 headless Chromium 으로 열어 스크린샷·토큰을 뽑고 analyze 까지 돌린다.
  --out <dir>          출력 폴더 (기본 .design/references/<slug>, cwd 안이어야 한다)
  --viewports <list>   desktop,mobile (기본 둘 다. desktop 은 필수)
  --max-slices <n>     데스크톱 슬라이스 최대 장수 (기본 10)
  --no-full-page       히어로 스크린샷만 찍는다
  --keep-overlays      쿠키 배너·모달·채팅 위젯을 숨기지 않는다
  --hide <css>         추가로 숨길 선택자 (반복 가능)
  --timeout <ms>       탐색·load 제한 (기본 30000)
  --deadline <ms>      전체 제한 (기본 100000)
  --lang <tag>         브라우저 언어 (예: ko-KR)
  --browser <path>     브라우저 실행 파일
  --force              출력 폴더가 있으면 엔진 산출물을 지우고 다시 만든다
  --no-analyze         tokens.json·summary.md 를 만들지 않는다
산출물: desktop.png mobile.png slices/ overview.jpg raw/ capture.json tokens.json summary.md`;

export function generator() {
  try {
    const p = JSON.parse(readFileSync(join(PLUGIN_ROOT, '.claude-plugin', 'plugin.json'), 'utf8'));
    return `design-director@${p.version}`;
  } catch {
    return 'design-director@0.0.0';
  }
}

export function makeDeadline(ms) {
  const start = Date.now();
  return {
    start,
    remaining: () => ms - (Date.now() - start),
    check(what) {
      if (Date.now() - start > ms) throw new DDError('TIMEOUT', `전체 제한 시간(${ms}ms)을 넘겼다 (${what})`);
    },
  };
}

// --force 일 때 지난 엔진 산출물만 지운다(profile.md 등 Claude 가 쓴 파일은 둔다).
const ENGINE_FILES = /^(desktop\.png|mobile\.png|overview\.jpg|blocked\.png|app-error\.png|capture\.json|tokens\.json|summary\.md|side-by-side-(desktop|mobile)\.jpg)$/;
export function cleanEngineOutputs(dir) {
  if (!existsSync(dir)) return;
  for (const name of readdirSync(dir)) {
    if (name === 'slices' || name === 'raw' || ENGINE_FILES.test(name)) rmSync(join(dir, name), { recursive: true, force: true });
  }
}

// capture·verify 공용 본체.
export async function captureCore({ url, trusted, viewports, outAbs, flags, verify = false, warnings, after = null }) {
  const deadline = makeDeadline(flags.deadline ?? 100000);
  const notes = [];
  const browser = detectBrowser({ flag: flags.browser, notes });
  if (!browser) throw new DDError('NO_BROWSER', notes.join('; ') || '설치된 Chromium 계열 브라우저를 찾지 못했다');
  const handle = await launchBrowser({ browser, lang: flags.lang, insecureLocalhost: trusted, log });
  const result = { finalUrl: url, files: { slices: [], slicesY: [], raw: {} }, overlaysHidden: [], partial: false, consoleErrors: [], browser: { kind: browser.kind, version: handle.version } };
  try {
    for (const name of viewports) {
      const vp = VIEWPORTS[name];
      try {
        const r = await captureViewport({ handle, vp, url, outDir: outAbs, flags, trusted, verify, deadline, warnings, log });
        result.files[name] = r.files.hero;
        result.files.raw[name] = r.files.raw;
        if (name === 'desktop') {
          result.files.slices = r.files.slices;
          result.files.slicesY = r.files.slicesY;
          result.finalUrl = r.finalUrl;
        }
        for (const o of r.prep.overlaysHidden || []) result.overlaysHidden.push({ viewport: name, ...o });
        if (r.consoleErrors.length && !result.consoleErrors.length) result.consoleErrors = r.consoleErrors;
      } catch (e) {
        if (name === 'desktop') throw e;
        result.partial = true;
        warnings.add(e.code === 'TIMEOUT' ? 'MOBILE_TIMEOUT' : 'MOBILE_FAILED', `mobile 캡처 실패: ${e.message}`);
      }
    }
    if (result.files.slices.length) {
      try {
        await contactSheet(handle, { outDir: outAbs, slices: result.files.slices, out: 'overview.jpg' });
        result.files.overview = 'overview.jpg';
      } catch (e) {
        result.partial = true;
        warnings.add('OVERVIEW_FAILED', `overview.jpg 실패: ${e.message}`);
      }
    }
    // verify 의 나란히 보기처럼 브라우저가 필요한 후처리
    if (after) await after(handle, result);
    return result;
  } finally {
    await handle.close();
  }
}

export function writeManifest(outAbs, { url, res, viewports, warnings, analyzed }) {
  const files = { ...res.files };
  if (analyzed) {
    files.tokens = 'tokens.json';
    files.summary = 'summary.md';
  }
  const manifest = {
    schema: 'dd.capture/1',
    url,
    finalUrl: res.finalUrl,
    capturedAt: res.capturedAt,
    generator: generator(),
    browser: res.browser,
    viewports: viewports.map((n) => ({ name: n, width: VIEWPORTS[n].width, height: VIEWPORTS[n].height, dpr: VIEWPORTS[n].dpr })),
    files,
    overlaysHidden: res.overlaysHidden,
    partial: res.partial,
    warnings: warnings.toJSON(),
  };
  writeJSON(join(outAbs, 'capture.json'), manifest);
  return manifest;
}

export async function run({ positionals, flags, cwd }) {
  const warnings = new Warnings();
  const v = validateUrl(positionals[0]);
  warnings.addAll(v.warnings);
  const viewports = parseViewports(flags.viewports);
  const outAbs = resolveOut(cwd, flags.out || join('.design', 'references', slugify(v.url)));
  prepareOutDir(outAbs, flags.force);
  if (flags.force) cleanEngineOutputs(outAbs);
  ensureDesignGitignore(cwd, outAbs);
  const capturedAt = new Date().toISOString().replace(/\.\d{3}Z$/, 'Z');
  const res = await captureCore({ url: v.url, trusted: v.trusted, viewports, outAbs, flags, warnings });
  res.capturedAt = capturedAt;
  const doAnalyze = !flags.noAnalyze;
  writeManifest(outAbs, { url: v.url, res, viewports, warnings, analyzed: false });
  let analysis = null;
  if (doAnalyze) {
    try {
      analysis = analyzeDir(outAbs);
      warnings.addAll(analysis.warnings);
    } catch (e) {
      warnings.add('ANALYZE_FAILED', `analyze 실패: ${e.message}`);
    }
  }
  writeManifest(outAbs, { url: v.url, res, viewports, warnings, analyzed: !!analysis });
  const next = [analysis ? 'summary.md' : null, res.files.desktop, res.files.mobile, res.files.overview].filter(Boolean);
  return {
    ok: true,
    command: 'capture',
    outDir: relCwd(cwd, outAbs),
    url: v.url,
    finalUrl: res.finalUrl,
    partial: res.partial,
    files: { ...res.files, capture: 'capture.json', ...(analysis ? { tokens: 'tokens.json', summary: 'summary.md' } : {}) },
    overlaysHidden: res.overlaysHidden,
    confidence: analysis ? analysis.confidence : null,
    warnings: warnings.toJSON(),
    next,
  };
}
