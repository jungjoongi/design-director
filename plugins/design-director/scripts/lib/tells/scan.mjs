// tells 스캐너: ai-default-tells.md 끝의 JSON 블록(SSOT)으로 코드를 스캔한다.
import { readdirSync, readFileSync, statSync } from 'node:fs';
import { extname, join, relative, sep } from 'node:path';
import { deltaE, parseCss, rgbToOklab } from '../analyze/color.mjs';
import { sanitizeText } from '../analyze/sanitize.mjs';

export const SKIP_DIRS = new Set(['node_modules', '.git', 'dist', 'build', '.next', '.nuxt', '.output', '.svelte-kit', 'coverage', '.design']);
const MAX_FILE = 1024 * 1024;
const MAX_FILES = 5000;

// 마크다운에서 <!-- dd:tells:begin --> ```json … ``` <!-- dd:tells:end --> 블록을 꺼낸다.
export function parseTellsMarkdown(md) {
  const begin = md.indexOf('<!-- dd:tells:begin -->');
  const end = md.indexOf('<!-- dd:tells:end -->');
  if (begin < 0 || end < 0 || end < begin) throw new Error('dd:tells 블록을 찾지 못했다');
  const inner = md.slice(begin, end);
  const m = inner.match(/```json\s*\n([\s\S]*?)\n```/);
  if (!m) throw new Error('dd:tells 블록 안에 ```json 코드펜스가 없다');
  const data = JSON.parse(m[1]);
  if (data.schema !== 'dd.tells/1' || !Array.isArray(data.tells)) throw new Error('schema 가 dd.tells/1 이 아니다');
  return data;
}

const cleanFlags = (f) => [...new Set(String(f || '').replace(/[gy]/g, ''))].join('');

// 정규식을 미리 컴파일한다. 잘못된 항목은 errors 에 남기고 건너뛴다.
export function compileTells(data) {
  const errors = [];
  const tells = [];
  for (const t of data.tells) {
    try {
      const flags = cleanFlags(t.flags);
      const c = {
        id: t.id, severity: t.severity, title: t.title || t.id, threshold: t.threshold ?? 1,
        exts: new Set((t.files || []).map((e) => String(e).replace(/^\./, '').toLowerCase())),
        patterns: (t.patterns || []).map((p) => new RegExp(p, flags + 'g')),
        absent: (t.absent || []).map((p) => new RegExp(p, flags)),
        when: t.when ? new RegExp(t.when, flags) : null,
        colors: (t.colors || []).map((h) => parseCss(h)).filter(Boolean).map((c2) => rgbToOklab(c2)),
        maxDeltaE: t.maxDeltaE ?? 0.03,
      };
      tells.push(c);
    } catch (e) {
      errors.push({ id: t.id, message: e.message });
    }
  }
  return { tells, errors };
}

const COLOR_RE = /#(?:[0-9a-fA-F]{8}|[0-9a-fA-F]{6}|[0-9a-fA-F]{3,4})(?![0-9A-Za-z_-])|\b(?:rgba?|hsla?|oklch)\([^)]{3,80}\)/g;

function lineIndex(text) {
  const starts = [0];
  for (let i = 0; i < text.length; i++) if (text.charCodeAt(i) === 10) starts.push(i + 1);
  return starts;
}
function lineOf(starts, pos) {
  let lo = 0;
  let hi = starts.length - 1;
  while (lo < hi) {
    const mid = (lo + hi + 1) >> 1;
    if (starts[mid] <= pos) lo = mid;
    else hi = mid - 1;
  }
  return lo;
}
function snippet(text, starts, line) {
  const end = line + 1 < starts.length ? starts[line + 1] - 1 : text.length;
  return sanitizeText(text.slice(starts[line], end), 80);
}

// files: [{rel, ext, text}] → 결과. 순수 함수.
export function scanTexts(files, data) {
  const { tells, errors } = compileTells(data);
  const findings = [];
  const counts = {};
  for (const t of tells) counts[t.id] = 0;
  for (const f of files) {
    let starts = null;
    for (const t of tells) {
      if (!t.exts.has(f.ext)) continue;
      for (const re of t.patterns) {
        re.lastIndex = 0;
        let m;
        let guard = 0;
        while ((m = re.exec(f.text)) && guard++ < 10000) {
          if (m[0] === '') re.lastIndex++;
          starts ||= lineIndex(f.text);
          const line = lineOf(starts, m.index);
          counts[t.id]++;
          findings.push({ id: t.id, severity: t.severity, file: f.rel, line: line + 1, snippet: snippet(f.text, starts, line) });
        }
      }
      if (t.colors.length) {
        COLOR_RE.lastIndex = 0;
        let m;
        while ((m = COLOR_RE.exec(f.text))) {
          const rgb = parseCss(m[0]);
          if (!rgb || rgb.a < 0.1) continue;
          const lab = rgbToOklab(rgb);
          if (t.colors.some((a) => deltaE(a, lab) <= t.maxDeltaE)) {
            starts ||= lineIndex(f.text);
            const line = lineOf(starts, m.index);
            counts[t.id]++;
            findings.push({ id: t.id, severity: t.severity, file: f.rel, line: line + 1, snippet: snippet(f.text, starts, line) });
          }
        }
      }
    }
  }
  // 프로젝트 단위: when 이 어딘가 매치되는데 absent 가 하나도 없으면 1건
  for (const t of tells) {
    if (!t.when || !t.absent.length) continue;
    const pool = files.filter((f) => t.exts.has(f.ext));
    const whenFile = pool.find((f) => t.when.test(f.text));
    if (!whenFile) continue;
    const present = pool.some((f) => t.absent.some((re) => re.test(f.text)));
    if (present) continue;
    const idx = whenFile.text.search(t.when);
    const starts = lineIndex(whenFile.text);
    const line = lineOf(starts, Math.max(0, idx));
    counts[t.id]++;
    findings.push({ id: t.id, severity: t.severity, file: whenFile.rel, line: line + 1, snippet: snippet(whenFile.text, starts, line), project: true });
  }
  const flagged = tells.filter((t) => counts[t.id] >= t.threshold && counts[t.id] > 0).map((t) => ({ id: t.id, severity: t.severity, title: t.title, count: counts[t.id] }));
  const summary = { S1: 0, S2: 0, S3: 0 };
  for (const f of flagged) if (summary[f.severity] !== undefined) summary[f.severity]++;
  findings.sort((a, b) => (a.file < b.file ? -1 : a.file > b.file ? 1 : 0) || a.line - b.line || (a.id < b.id ? -1 : 1));
  return { scanned: files.length, findings, counts, flagged, summary, errors };
}

// 경로 목록을 걸어 스캔 대상 파일을 모은다.
export function collectFiles(paths, root, exts) {
  const out = [];
  const seen = new Set();
  const visit = (p) => {
    if (out.length >= MAX_FILES) return;
    let st;
    try {
      st = statSync(p);
    } catch {
      return;
    }
    if (st.isDirectory()) {
      const base = p.split(sep).pop();
      if (SKIP_DIRS.has(base) && p !== root) return;
      for (const name of readdirSync(p).sort()) {
        if (SKIP_DIRS.has(name)) continue;
        visit(join(p, name));
      }
      return;
    }
    if (!st.isFile() || st.size > MAX_FILE) return;
    const name = p.split(sep).pop();
    if (/\.min\./.test(name)) return;
    const ext = extname(name).slice(1).toLowerCase();
    if (!exts.has(ext) || seen.has(p)) return;
    seen.add(p);
    out.push({ rel: relative(root, p).split(sep).join('/') || name, ext, text: readFileSync(p, 'utf8') });
  };
  for (const p of paths) visit(p);
  return out;
}
