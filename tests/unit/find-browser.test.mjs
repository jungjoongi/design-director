// 브라우저 탐지: 세 OS 를 주입한 fs·env 로 검사한다.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { findBrowser, guessKind, compareVersions } from '../../plugins/design-director/scripts/lib/browser/find.mjs';
import { fakeFs } from '../helpers/fake-fs.mjs';

const mac = (files, extra = {}) => findBrowser({ platform: 'darwin', homedir: '/Users/u', env: {}, ...fakeFs('darwin', files), ...extra });
const linux = (files, extra = {}) =>
  findBrowser({ platform: 'linux', homedir: '/home/u', env: {}, pathDirs: ['/usr/local/bin', '/usr/bin'], ...fakeFs('linux', files), ...extra });
const WIN_ENV = { LOCALAPPDATA: 'C:\\Users\\u\\AppData\\Local', PROGRAMFILES: 'C:\\Program Files', 'PROGRAMFILES(X86)': 'C:\\Program Files (x86)' };
const win = (files, extra = {}) => findBrowser({ platform: 'win32', homedir: 'C:\\Users\\u', env: WIN_ENV, ...fakeFs('win32', files), ...extra });

test('darwin: 시스템 Chrome 을 먼저 찾는다', () => {
  const r = mac([
    '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
    '/Applications/Microsoft Edge.app/Contents/MacOS/Microsoft Edge',
  ]);
  assert.deepEqual(r, { path: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome', kind: 'chrome', source: 'system' });
});

test('darwin: ~/Applications 의 Brave, Edge 순서', () => {
  const r = mac(['/Users/u/Applications/Brave Browser.app/Contents/MacOS/Brave Browser', '/Applications/Microsoft Edge.app/Contents/MacOS/Microsoft Edge']);
  assert.equal(r.kind, 'edge');
  const r2 = mac(['/Users/u/Applications/Brave Browser.app/Contents/MacOS/Brave Browser']);
  assert.equal(r2.kind, 'brave');
});

test('darwin: 시스템 설치가 없으면 가장 새 Playwright chromium', () => {
  const base = '/Users/u/Library/Caches/ms-playwright';
  const r = mac([
    `${base}/chromium-1208/chrome-mac-arm64/Google Chrome for Testing.app/Contents/MacOS/Google Chrome for Testing`,
    `${base}/chromium-1228/chrome-mac-arm64/Google Chrome for Testing.app/Contents/MacOS/Google Chrome for Testing`,
    `${base}/chromium_headless_shell-1228/chrome-headless-shell-mac-arm64/chrome-headless-shell`,
  ]);
  assert.equal(r.source, 'playwright');
  assert.match(r.path, /chromium-1228/);
  assert.equal(r.kind, 'chrome-for-testing');
});

test('darwin: headless shell 만 있으면 그걸 쓴다', () => {
  const r = mac(['/Users/u/Library/Caches/ms-playwright/chromium_headless_shell-1217/chrome-headless-shell-mac-arm64/chrome-headless-shell']);
  assert.equal(r.kind, 'headless-shell');
  assert.equal(r.source, 'playwright');
});

test('darwin: puppeteer 캐시(동의 후 다운로드 위치)', () => {
  const r = mac(['/Users/u/.cache/puppeteer/chrome-headless-shell/mac_arm-154.0.8037.57/chrome-headless-shell-mac-arm64/chrome-headless-shell']);
  assert.equal(r.source, 'puppeteer');
  assert.equal(r.kind, 'headless-shell');
});

test('플래그가 있으면 그것만 본다. 없으면 null', () => {
  const files = ['/Applications/Google Chrome.app/Contents/MacOS/Google Chrome', '/opt/my/chrome'];
  assert.equal(mac(files, { flag: '/opt/my/chrome' }).source, 'flag');
  const notes = [];
  assert.equal(mac(files, { flag: '/nonexistent', notes }), null);
  assert.match(notes[0], /nonexistent/);
});

test('환경변수 순서: DESIGN_DIRECTOR_BROWSER → CHROME_PATH → PUPPETEER_EXECUTABLE_PATH', () => {
  const files = ['/a/chrome', '/b/chromium', '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'];
  assert.equal(mac(files, { env: { CHROME_PATH: '/a/chrome', PUPPETEER_EXECUTABLE_PATH: '/b/chromium' } }).source, 'env:CHROME_PATH');
  const notes = [];
  const r = mac(files, { env: { DESIGN_DIRECTOR_BROWSER: '/missing' }, notes });
  assert.equal(r.source, 'system');
  assert.equal(notes.length, 1);
});

test('linux: PATH 의 google-chrome-stable 이 chromium 보다 먼저', () => {
  const r = linux(['/usr/bin/chromium', '/usr/bin/google-chrome-stable']);
  assert.equal(r.path, '/usr/bin/google-chrome-stable');
  assert.equal(r.kind, 'chrome');
});

test('linux: 고정 경로와 snap', () => {
  assert.equal(linux(['/opt/microsoft/msedge/msedge']).kind, 'edge');
  const r = linux(['/snap/bin/chromium']);
  assert.equal(r.path, '/snap/bin/chromium');
  assert.equal(r.kind, 'chromium');
});

test('linux: Playwright 캐시와 옛 headless_shell 이름', () => {
  const base = '/home/u/.cache/ms-playwright';
  assert.equal(linux([`${base}/chromium-1140/chrome-linux/chrome`]).source, 'playwright');
  const r = linux([`${base}/chromium_headless_shell-1148/chrome-linux/headless_shell`]);
  assert.equal(r.kind, 'headless-shell');
});

test('linux: puppeteer chrome', () => {
  const r = linux(['/home/u/.cache/puppeteer/chrome/linux-131.0.6778.85/chrome-linux64/chrome']);
  assert.equal(r.source, 'puppeteer');
});

test('win32: LOCALAPPDATA → PROGRAMFILES, Chrome 이 Edge 보다 먼저', () => {
  const r = win(['C:\\Program Files\\Microsoft\\Edge\\Application\\msedge.exe', 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe']);
  assert.equal(r.path, 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe');
  const r2 = win(['C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe']);
  assert.equal(r2.kind, 'edge');
});

test('win32: 환경변수 키 대소문자 무시, Playwright 캐시', () => {
  const env = { LocalAppData: 'C:\\Users\\u\\AppData\\Local' };
  const r = findBrowser({
    platform: 'win32', homedir: 'C:\\Users\\u', env,
    ...fakeFs('win32', ['C:\\Users\\u\\AppData\\Local\\ms-playwright\\chromium-1228\\chrome-win\\chrome.exe']),
  });
  assert.equal(r.source, 'playwright');
  assert.equal(r.kind, 'chrome-for-testing');
});

test('아무것도 없으면 null', () => {
  assert.equal(mac([]), null);
  assert.equal(linux([]), null);
  assert.equal(win([]), null);
});

test('guessKind·compareVersions', () => {
  assert.equal(guessKind('/x/chrome-headless-shell'), 'headless-shell');
  assert.equal(guessKind('C:\\BraveSoftware\\Brave-Browser\\Application\\brave.exe'), 'brave');
  assert.ok(compareVersions('1228', '1217') > 0);
  assert.ok(compareVersions('154.0.8037.57', '154.0.800.1') > 0);
});
