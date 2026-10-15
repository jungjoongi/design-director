// 경로 규칙: 쓰기는 --out 아래만, --out 은 cwd 안. .design/.gitignore 관리.
import { existsSync, mkdirSync, readdirSync, realpathSync, statSync, writeFileSync, renameSync } from 'node:fs';
import { dirname, isAbsolute, join, relative, resolve, sep } from 'node:path';
import { fileURLToPath } from 'node:url';
import { DDError, usage } from './errors.mjs';

export const SCRIPTS_DIR = resolve(dirname(fileURLToPath(import.meta.url)), '..');
export const PLUGIN_ROOT = resolve(SCRIPTS_DIR, '..');

export const DESIGN_GITIGNORE = [
  'references/*/*.png',
  'references/*/*.jpg',
  'references/*/slices/',
  'references/*/raw/',
  'verify/',
  '',
].join('\n');

// 존재하는 가장 가까운 조상의 realpath 를 써서 심볼릭 링크 탈출을 막는다.
function realish(p) {
  let cur = resolve(p);
  const tail = [];
  while (!existsSync(cur)) {
    const parent = dirname(cur);
    if (parent === cur) break;
    tail.unshift(cur.slice(parent.length).replace(/^[\\/]+/, ''));
    cur = parent;
  }
  let base;
  try {
    base = realpathSync(cur);
  } catch {
    base = cur;
  }
  return tail.length ? join(base, ...tail) : base;
}

export function isInside(parent, child) {
  const rel = relative(parent, child);
  return rel === '' || (!rel.startsWith('..') && !isAbsolute(rel) && rel.split(sep)[0] !== '..');
}

// --out 해석: cwd 기준, cwd 안이어야 한다. cwd 자체는 허용하지 않는다.
export function resolveOut(cwd, out) {
  const abs = resolve(cwd, out);
  const realCwd = realish(cwd);
  const realOut = realish(abs);
  if (!isInside(realCwd, realOut) || realOut === realCwd) {
    throw usage(`--out 은 현재 폴더 안의 하위 폴더여야 한다: ${out}`);
  }
  return abs;
}

export function isNonEmptyDir(p) {
  try {
    return statSync(p).isDirectory() && readdirSync(p).length > 0;
  } catch {
    return false;
  }
}

// 출력 폴더 준비. 비어 있지 않으면 --force 없이는 EXISTS.
export function prepareOutDir(dir, force) {
  if (existsSync(dir) && !statSync(dir).isDirectory()) throw usage(`--out 이 파일이다: ${dir}`);
  if (isNonEmptyDir(dir) && !force) {
    throw new DDError('EXISTS', `출력 폴더가 이미 있다: ${dir}`);
  }
  mkdirSync(dir, { recursive: true });
}

// out 이 cwd/.design 아래면 .design/.gitignore 를 만든다(있으면 건드리지 않는다).
export function ensureDesignGitignore(cwd, outAbs) {
  const designDir = join(resolve(cwd), '.design');
  if (!isInside(designDir, resolve(outAbs))) return false;
  const gi = join(designDir, '.gitignore');
  if (existsSync(gi)) return false;
  mkdirSync(designDir, { recursive: true });
  writeFileSync(gi, DESIGN_GITIGNORE);
  return true;
}

export function timestamp(d = new Date()) {
  const p = (n) => String(n).padStart(2, '0');
  return `${d.getFullYear()}${p(d.getMonth() + 1)}${p(d.getDate())}-${p(d.getHours())}${p(d.getMinutes())}${p(d.getSeconds())}`;
}

// 결과 JSON 의 경로는 outDir 기준 상대 경로, 구분자는 '/'.
export function relOut(outDir, p) {
  return relative(outDir, p).split(sep).join('/');
}

export function relCwd(cwd, p) {
  const r = relative(cwd, p).split(sep).join('/');
  return r || '.';
}

// 임시 파일에 쓰고 rename 한다(중간에 죽어도 반쯤 쓴 JSON 이 남지 않게).
export function writeFileAtomic(path, data) {
  mkdirSync(dirname(path), { recursive: true });
  const tmp = `${path}.tmp-${process.pid}`;
  writeFileSync(tmp, data);
  renameSync(tmp, path);
}

export function writeJSON(path, obj) {
  writeFileAtomic(path, JSON.stringify(obj, null, 2) + '\n');
}
