// 통합 테스트용 픽스처 서버(node:http). tests/fixtures/site/ 를 서빙하고 특수 경로를 흉내 낸다.
import { createServer } from 'node:http';
import { readFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const SITE = join(dirname(fileURLToPath(import.meta.url)), '..', 'fixtures', 'site');

const PALETTE = ['#c7d2fe', '#a5b4fc', '#818cf8', '#fbcfe8', '#bbf7d0', '#fde68a'];

// 이름으로 크기·색이 정해지는 단순 SVG(타사 이미지 없이 레이아웃만 흉내 낸다)
function svgFor(name) {
  const n = Number((name.match(/\d+/) || ['1'])[0]);
  const color = PALETTE[(n - 1) % PALETTE.length];
  let w = 520;
  let h = 360;
  let body = `<rect width="100%" height="100%" rx="12" fill="${color}"/><rect x="24" y="24" width="45%" height="16" rx="4" fill="#ffffff"/>`;
  if (name.startsWith('hero')) { w = 560; h = 420; }
  if (name.startsWith('logo')) { w = 120; h = 32; body = `<rect x="0" y="8" width="16" height="16" rx="4" fill="#6b7280"/><rect x="24" y="12" width="${60 + n * 4}" height="8" rx="4" fill="#9ca3af"/>`; }
  if (name.startsWith('icon')) { w = 40; h = 40; body = `<rect width="40" height="40" rx="8" fill="#eef2ff"/><circle cx="20" cy="20" r="8" fill="#4f46e5"/>`; }
  if (name.startsWith('avatar')) { w = 48; h = 48; body = `<circle cx="24" cy="24" r="24" fill="${color}"/>`; }
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">${body}</svg>`;
}

const BLOCKED = `<!doctype html><html><head><title>Just a moment...</title></head>
<body><div id="challenge-form"><p>Checking your browser before accessing the site.</p></div></body></html>`;

const ERROR_OVERLAY = `<!doctype html><html lang="en"><head><meta charset="utf-8"><title>Local app</title></head>
<body><main><h1>Local app</h1><p>This page renders normally, but the dev server is showing a build error overlay on top of it.</p>
<p>The engine should stop with APP_ERROR on trusted hosts and report the overlay title.</p></main>
<script>
class ViteErrorOverlay extends HTMLElement {
  constructor() {
    super();
    var root = this.attachShadow({ mode: 'open' });
    root.innerHTML = '<div class="window"><pre class="message"><span class="message-body">[plugin:vite:import-analysis] Failed to resolve import "./missing" from "src/App.tsx".</span></pre></div>';
  }
}
customElements.define('vite-error-overlay', ViteErrorOverlay);
document.body.appendChild(document.createElement('vite-error-overlay'));
</script></body></html>`;

// raw 크기 예산을 넘기는 페이지: 변수·글자 스타일·그림자·섹션이 아주 많다.
function hugePage() {
  const vars = [];
  for (let i = 0; i < 400; i++) vars.push(`--token-color-${i}: #${(0x100000 + i * 2654).toString(16).slice(-6)}; --token-space-${i}: ${i % 64}px;`);
  const sections = [];
  for (let s = 0; s < 40; s++) {
    const items = [];
    for (let k = 0; k < 6; k++) {
      const fs = 11 + ((s * 6 + k) % 40);
      items.push(`<div style="padding:${8 + k}px;border-radius:${k * 3}px;box-shadow:0 ${k}px ${k * 4}px rgba(0,0,0,0.${k + 1});border:1px solid #${(s * 40 + k * 7).toString(16).padStart(3, '0')}">
<p style="font-size:${fs}px;font-weight:${100 + (k % 9) * 100};letter-spacing:${(k - 3) / 100}em;line-height:${1.1 + k / 10};color:#${(s * 13 + k * 31).toString(16).padStart(3, '0')}">Item ${s}-${k} text that is long enough to count as visible copy.</p></div>`);
    }
    sections.push(`<section style="padding:${40 + s}px 24px;background:#${(0xf0f0f0 - s * 0x010101).toString(16)}"><h2 style="font-size:${20 + s}px">Section ${s}</h2><div style="display:grid;grid-template-columns:repeat(3,1fr);gap:${s % 30}px">${items.join('')}</div></section>`);
  }
  return `<!doctype html><html lang="en"><head><meta charset="utf-8"><title>Huge</title><style>:root{${vars.join('')}} body{margin:0;font-family:system-ui,sans-serif}</style></head><body><main>${sections.join('')}</main></body></html>`;
}

export function startFixtureServer() {
  const sockets = new Set();
  const server = createServer((req, res) => {
    const url = new URL(req.url, 'http://x');
    const path = url.pathname;
    if (path === '/slow') return; // 응답하지 않는다
    if (path === '/blocked') {
      res.writeHead(403, { 'content-type': 'text/html; charset=utf-8' });
      return res.end(BLOCKED);
    }
    if (path === '/huge') {
      res.writeHead(200, { 'content-type': 'text/html; charset=utf-8' });
      return res.end(hugePage());
    }
    if (path === '/error-overlay') {
      res.writeHead(200, { 'content-type': 'text/html; charset=utf-8' });
      return res.end(ERROR_OVERLAY);
    }
    if (path.startsWith('/img/') && path.endsWith('.svg')) {
      res.writeHead(200, { 'content-type': 'image/svg+xml', 'cache-control': 'no-store' });
      return res.end(svgFor(path.slice(5, -4)));
    }
    const file = path === '/' ? 'index.html' : path.slice(1);
    if (!/^[\w.-]+$/.test(file)) {
      res.writeHead(404);
      return res.end('not found');
    }
    try {
      const body = readFileSync(join(SITE, file));
      const type = file.endsWith('.css') ? 'text/css; charset=utf-8' : 'text/html; charset=utf-8';
      res.writeHead(200, { 'content-type': type, 'cache-control': 'no-store' });
      res.end(body);
    } catch {
      res.writeHead(404);
      res.end('not found');
    }
  });
  server.on('connection', (s) => {
    sockets.add(s);
    s.on('close', () => sockets.delete(s));
  });
  return new Promise((resolve) => {
    server.listen(0, '127.0.0.1', () => {
      const { port } = server.address();
      resolve({
        port,
        url: `http://127.0.0.1:${port}`,
        close: () => new Promise((r) => {
          for (const s of sockets) s.destroy();
          server.close(() => r());
        }),
      });
    });
  });
}
