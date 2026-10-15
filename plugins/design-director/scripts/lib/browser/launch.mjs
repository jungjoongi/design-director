// 브라우저 실행: 임시 프로필 + --remote-debugging-pipe(fd3 쓰기, fd4 읽기). 종료 시 죽이고 프로필을 지운다.
import { spawn, spawnSync } from 'node:child_process';
import { existsSync, mkdirSync, mkdtempSync, readFileSync, rmSync } from 'node:fs';
import { homedir, tmpdir } from 'node:os';
import { join } from 'node:path';
import { CDP } from './cdp.mjs';
import { DDError, HINTS } from '../errors.mjs';

const BASE_FLAGS = [
  '--remote-debugging-pipe',
  '--no-first-run',
  '--no-default-browser-check',
  '--disable-extensions',
  '--disable-sync',
  '--disable-background-networking',
  '--disable-component-update',
  '--hide-scrollbars',
  '--mute-audio',
  '--force-color-profile=srgb',
  '--deny-permission-prompts',
  '--disable-background-timer-throttling',
  '--disable-renderer-backgrounding',
  '--disable-backgrounding-occluded-windows',
  '--disable-default-apps',
  // 크래시 리포터(Crashpad)는 사용자 홈의 Chrome 폴더에 쓰려 한다. Claude Code 샌드박스처럼 홈 쓰기가 막힌
  // 환경에서는 그 실패로 실행 자체가 죽으므로 끈다. 캡처에는 필요 없다.
  '--disable-crash-reporter',
  '--disable-breakpad',
  '--no-crashpad',
];

export function inContainerAsRoot() {
  if (process.platform !== 'linux' || typeof process.getuid !== 'function' || process.getuid() !== 0) return false;
  if (existsSync('/.dockerenv') || existsSync('/run/.containerenv')) return true;
  try {
    return /docker|kubepods|containerd|lxc|podman/.test(readFileSync('/proc/1/cgroup', 'utf8'));
  } catch {
    return false;
  }
}

export function buildFlags({ kind, platform = process.platform, profileDir, lang, insecureLocalhost, noSandbox }) {
  const flags = [...BASE_FLAGS, kind === 'headless-shell' ? '--headless' : '--headless=new', `--user-data-dir=${profileDir}`];
  if (platform === 'darwin') flags.push('--use-mock-keychain');
  if (platform === 'linux') flags.push('--password-store=basic');
  if (kind === 'edge') flags.push('--edge-skip-compat-layer-relaunch');
  if (lang) flags.push(`--lang=${lang}`);
  if (insecureLocalhost) flags.push('--allow-insecure-localhost');
  if (noSandbox) flags.push('--no-sandbox', '--disable-dev-shm-usage');
  flags.push('about:blank');
  return flags;
}

function makeProfileDir(browserPath) {
  // snap chromium 은 /tmp 를 못 본다. 홈 아래 snap 공용 폴더를 쓴다.
  if (browserPath.startsWith('/snap/')) {
    const base = join(homedir(), 'snap', 'chromium', 'common');
    mkdirSync(base, { recursive: true });
    return mkdtempSync(join(base, 'dd-profile-'));
  }
  return mkdtempSync(join(tmpdir(), 'dd-profile-'));
}

function rmWithRetry(dir) {
  for (let i = 0; i < 5; i++) {
    try {
      rmSync(dir, { recursive: true, force: true, maxRetries: 3, retryDelay: 100 });
      return;
    } catch (e) {
      if (!['EBUSY', 'EPERM', 'ENOTEMPTY'].includes(e.code)) return;
      const until = Date.now() + 150;
      while (Date.now() < until) {
        // 짧게 기다렸다가 다시 지운다(Windows 파일 잠금)
      }
    }
  }
}

function killTree(proc) {
  if (!proc || proc.exitCode !== null || proc.signalCode) return;
  try {
    if (process.platform === 'win32') spawnSync('taskkill', ['/PID', String(proc.pid), '/T', '/F'], { stdio: 'ignore' });
    else proc.kill('SIGKILL');
  } catch {
    // 이미 죽었다
  }
}

const live = new Set();
let hooked = false;
function hookExit() {
  if (hooked) return;
  hooked = true;
  process.on('exit', () => {
    for (const b of live) b.closeSync();
  });
  for (const sig of ['SIGINT', 'SIGTERM']) {
    process.on(sig, () => {
      for (const b of live) b.closeSync();
      process.exit(sig === 'SIGINT' ? 130 : 143);
    });
  }
}

// macOS·Linux 의 Chrome 은 --user-data-dir 와 상관없이 홈 폴더에 크래시 리포터(Crashpad) DB 를 만든다.
// 홈 쓰기가 막힌 샌드박스(예: Claude Code 샌드박스)에서는 그 실패로 핸드셰이크 전에 죽는다.
// 그럴 때만 HOME·TMPDIR 을 임시 프로필로 바꿔 한 번 더 띄운다. 평소에는 사용자 환경을 그대로 쓴다.
const CRASHPAD_DENIED = /crashpad/i;
const NOT_PERMITTED = /operation not permitted|permission denied/i;

export async function launchBrowser(opts) {
  try {
    return await launchOnce(opts);
  } catch (e) {
    const tail = e?.details?.stderr || [];
    const denied = tail.some((l) => CRASHPAD_DENIED.test(l) && NOT_PERMITTED.test(l));
    if (!(e instanceof DDError) || e.code !== 'LAUNCH_FAILED' || !denied || process.platform === 'win32') throw e;
    (opts.log || (() => {}))('홈 폴더 쓰기가 막혀 있다(샌드박스). HOME 을 임시 폴더로 바꿔 다시 띄운다');
    return await launchOnce({ ...opts, isolateHome: true });
  }
}

async function launchOnce({ browser, lang, insecureLocalhost = false, log = () => {}, handshakeMs = 15000, isolateHome = false }) {
  const noSandbox = inContainerAsRoot() || process.env.DESIGN_DIRECTOR_NO_SANDBOX === '1';
  const profileDir = makeProfileDir(browser.path);
  const args = buildFlags({ kind: browser.kind, profileDir, lang, insecureLocalhost, noSandbox });
  log(`브라우저 실행: ${browser.kind} (${browser.source})`);
  let proc;
  try {
    // 재시도에서는 HOME 과 임시 폴더를 모두 프로필 폴더로 돌린다(프로세스 싱글턴 소켓·설정 파일이 그 아래에 생긴다)
    const env = isolateHome ? { ...process.env, HOME: profileDir, TMPDIR: profileDir, TMP: profileDir, TEMP: profileDir } : process.env;
    proc = spawn(browser.path, args, { stdio: ['ignore', 'ignore', 'pipe', 'pipe', 'pipe'], windowsHide: true, env });
  } catch (e) {
    rmWithRetry(profileDir);
    throw new DDError('LAUNCH_FAILED', `브라우저 실행 실패: ${e.message}`);
  }
  const stderrLines = [];
  proc.stderr.setEncoding('utf8');
  proc.stderr.on('data', (d) => {
    for (const line of d.split('\n')) if (line.trim()) stderrLines.push(line.slice(0, 300));
    if (stderrLines.length > 200) stderrLines.splice(0, stderrLines.length - 200);
  });
  let spawnError = null;
  proc.on('error', (e) => {
    spawnError = e;
  });

  const handle = {
    proc,
    profileDir,
    closed: false,
    stderrTail: () => stderrLines.slice(-20),
    closeSync() {
      if (this.closed) return;
      this.closed = true;
      live.delete(this);
      killTree(proc);
      rmWithRetry(profileDir);
    },
    async close() {
      if (this.closed) return;
      try {
        await Promise.race([this.cdp?.send('Browser.close', {}, { timeout: 2000 }), new Promise((r) => setTimeout(r, 2500))]);
      } catch {
        // 응답 없이 닫혀도 된다
      }
      await new Promise((r) => {
        if (proc.exitCode !== null || proc.signalCode) return r();
        const t = setTimeout(r, 1500);
        proc.once('exit', () => {
          clearTimeout(t);
          r();
        });
      });
      this.closeSync();
    },
  };
  live.add(handle);
  hookExit();

  const cdp = new CDP(proc.stdio[3], proc.stdio[4]);
  handle.cdp = cdp;
  const exited = new Promise((_, reject) => {
    proc.once('exit', (code, sig) => reject(new Error(`브라우저가 바로 종료됐다 (code ${code}, signal ${sig})`)));
    proc.once('error', (e) => reject(e));
  });
  exited.catch(() => {});
  try {
    const version = await Promise.race([cdp.send('Browser.getVersion', {}, { timeout: handshakeMs }), exited]);
    handle.version = version.product || '';
    handle.userAgent = version.userAgent || '';
    await cdp.send('Browser.setDownloadBehavior', { behavior: 'deny' }).catch(() => {});
    return handle;
  } catch (e) {
    await new Promise((r) => setTimeout(r, 200));
    const tail = stderrLines.slice(-20);
    handle.closeSync();
    const sandbox = tail.some((l) => /sandbox/i.test(l)) || /sandbox/i.test(String(e.message));
    const msg = spawnError ? `브라우저 실행 실패: ${spawnError.message}` : `핸드셰이크 실패: ${e.message}`;
    throw new DDError('LAUNCH_FAILED', msg, {
      hint: sandbox ? HINTS.LAUNCH_SANDBOX : HINTS.LAUNCH_FAILED,
      details: { stderr: tail },
    });
  }
}
