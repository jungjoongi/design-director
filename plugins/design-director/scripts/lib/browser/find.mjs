// 탐지는 fs·env 를 주입받는 순수 함수로 짠다. 세 OS 를 어느 호스트에서든 단위 테스트한다.
import path from 'node:path';

const ENV_KEYS = ['DESIGN_DIRECTOR_BROWSER', 'CHROME_PATH', 'PUPPETEER_EXECUTABLE_PATH'];

const MAC_APPS = [
  ['Google Chrome.app', 'Google Chrome'],
  ['Google Chrome Beta.app', 'Google Chrome Beta'],
  ['Google Chrome Dev.app', 'Google Chrome Dev'],
  ['Google Chrome Canary.app', 'Google Chrome Canary'],
  ['Chromium.app', 'Chromium'],
  ['Microsoft Edge.app', 'Microsoft Edge'],
  ['Brave Browser.app', 'Brave Browser'],
];

const LINUX_BINS = [
  'google-chrome-stable', 'google-chrome', 'chromium', 'chromium-browser',
  'microsoft-edge-stable', 'microsoft-edge', 'brave-browser',
];
const LINUX_FIXED = ['/opt/google/chrome/chrome', '/opt/microsoft/msedge/msedge', '/snap/bin/chromium'];

const WIN_REL = [
  'Google\\Chrome\\Application\\chrome.exe',
  'Google\\Chrome SxS\\Application\\chrome.exe',
  'Microsoft\\Edge\\Application\\msedge.exe',
  'BraveSoftware\\Brave-Browser\\Application\\brave.exe',
  'Chromium\\Application\\chrome.exe',
];

const CFT_MAC = ['Google Chrome for Testing.app/Contents/MacOS/Google Chrome for Testing', 'Chromium.app/Contents/MacOS/Chromium'];

export function guessKind(p) {
  const s = String(p).toLowerCase();
  if (/headless[_-]shell/.test(s)) return 'headless-shell';
  if (s.includes('msedge') || s.includes('microsoft edge') || s.includes('microsoft-edge')) return 'edge';
  if (s.includes('brave')) return 'brave';
  if (s.includes('chrome for testing') || /ms-playwright|puppeteer/.test(s)) return 'chrome-for-testing';
  if (s.includes('chromium')) return 'chromium';
  return 'chrome';
}

function getEnv(env, name) {
  if (!env) return undefined;
  if (env[name] !== undefined) return env[name];
  const k = Object.keys(env).find((x) => x.toUpperCase() === name.toUpperCase());
  return k ? env[k] : undefined;
}

// 버전 비교: 숫자 묶음을 앞에서부터 비교한다(1228 > 1217, 154.0.8037.57 > 153.9).
export function compareVersions(a, b) {
  const pa = String(a).match(/\d+/g) || [];
  const pb = String(b).match(/\d+/g) || [];
  for (let i = 0; i < Math.max(pa.length, pb.length); i++) {
    const d = Number(pa[i] || 0) - Number(pb[i] || 0);
    if (d) return d;
  }
  return 0;
}

export function findBrowser(deps) {
  const { platform, env = {}, homedir = '', exists, readdir, pathDirs = [], flag, notes = [] } = deps;
  const P = platform === 'win32' ? path.win32 : path.posix;
  const ls = (dir) => {
    try {
      return readdir(dir) || [];
    } catch {
      return [];
    }
  };
  const hit = (p, source) => ({ path: p, kind: guessKind(p), source });

  // 1) --browser: 사용자가 지정했으면 없을 때 다른 걸로 넘어가지 않는다.
  if (flag) {
    if (exists(flag)) return hit(flag, 'flag');
    notes.push(`--browser 경로가 없다: ${flag}`);
    return null;
  }
  // 2) 환경변수
  for (const k of ENV_KEYS) {
    const v = getEnv(env, k);
    if (!v) continue;
    if (exists(v)) return hit(v, `env:${k}`);
    notes.push(`${k} 경로가 없다: ${v}`);
  }
  // 3) 시스템 설치
  if (platform === 'darwin') {
    for (const [app, exe] of MAC_APPS) {
      for (const base of ['/Applications', P.join(homedir, 'Applications')]) {
        const p = P.join(base, app, 'Contents', 'MacOS', exe);
        if (exists(p)) return hit(p, 'system');
      }
    }
  } else if (platform === 'win32') {
    const bases = ['LOCALAPPDATA', 'PROGRAMFILES', 'PROGRAMFILES(X86)'].map((k) => getEnv(env, k)).filter(Boolean);
    for (const rel of WIN_REL) {
      for (const base of bases) {
        const p = P.join(base, rel);
        if (exists(p)) return hit(p, 'system');
      }
    }
  } else {
    for (const bin of LINUX_BINS) {
      for (const dir of pathDirs) {
        const p = P.join(dir, bin);
        if (exists(p)) return hit(p, 'system');
      }
    }
    for (const p of LINUX_FIXED) if (exists(p)) return hit(p, 'system');
  }
  // 4) Playwright 캐시
  const exe = (name) => (platform === 'win32' ? `${name}.exe` : name);
  const pwEnv = getEnv(env, 'PLAYWRIGHT_BROWSERS_PATH');
  const pwRoots = [];
  if (pwEnv && pwEnv !== '0') pwRoots.push(pwEnv);
  if (platform === 'darwin') pwRoots.push(P.join(homedir, 'Library', 'Caches', 'ms-playwright'));
  else if (platform === 'win32') {
    const lad = getEnv(env, 'LOCALAPPDATA');
    if (lad) pwRoots.push(P.join(lad, 'ms-playwright'));
  } else pwRoots.push(P.join(homedir, '.cache', 'ms-playwright'));

  const fullCandidates = (dir) => {
    if (platform === 'darwin') return CFT_MAC.map((r) => P.join(dir, ...r.split('/')));
    return [P.join(dir, exe('chrome'))];
  };
  const shellCandidates = (dir) => [P.join(dir, exe('chrome-headless-shell')), P.join(dir, exe('headless_shell'))];

  const newest = (root, prefix) =>
    ls(root)
      .filter((n) => n.startsWith(prefix) && /\d/.test(n.slice(prefix.length)))
      .sort((a, b) => compareVersions(b.slice(prefix.length), a.slice(prefix.length)));

  for (const root of pwRoots) {
    for (const [prefix, cands] of [['chromium-', fullCandidates], ['chromium_headless_shell-', shellCandidates]]) {
      for (const rev of newest(root, prefix)) {
        const revDir = P.join(root, rev);
        for (const sub of ls(revDir).filter((n) => n.startsWith('chrome-')).sort()) {
          for (const p of cands(P.join(revDir, sub))) if (exists(p)) return hit(p, 'playwright');
        }
      }
    }
  }
  // 5) Puppeteer 캐시 (동의 후 받은 headless shell 도 여기에 깔린다)
  const ppEnv = getEnv(env, 'PUPPETEER_CACHE_DIR');
  const ppRoots = [ppEnv, P.join(homedir, '.cache', 'puppeteer')].filter(Boolean);
  const platPrefix = platform === 'darwin' ? /^mac/ : platform === 'win32' ? /^win/ : /^linux/;
  for (const root of ppRoots) {
    for (const [kindDir, cands] of [['chrome', fullCandidates], ['chrome-headless-shell', shellCandidates]]) {
      const base = P.join(root, kindDir);
      const vers = ls(base)
        .filter((n) => platPrefix.test(n))
        .sort((a, b) => compareVersions(b.split('-').pop(), a.split('-').pop()));
      for (const v of vers) {
        const vDir = P.join(base, v);
        for (const sub of ls(vDir).filter((n) => n.startsWith('chrome')).sort()) {
          for (const p of cands(P.join(vDir, sub))) if (exists(p)) return hit(p, 'puppeteer');
        }
      }
    }
  }
  return null;
}
