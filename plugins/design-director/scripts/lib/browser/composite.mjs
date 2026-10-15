// 합성 이미지: 가상 오리진 http://dd.invalid/ 페이지를 Fetch.fulfillRequest 로 공급해 브라우저로 렌더·캡처한다.
// 포트도 file:// 도 쓰지 않는다.
import { readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { openPage, sleep } from './page.mjs';

const ORIGIN = 'http://dd.invalid';
export const MAX_W = 1568;

// PNG·JPEG 헤더에서 크기를 읽는다.
export function imageSize(buf) {
  if (buf.length > 24 && buf.readUInt32BE(0) === 0x89504e47) return { width: buf.readUInt32BE(16), height: buf.readUInt32BE(20) };
  if (buf[0] === 0xff && buf[1] === 0xd8) {
    let i = 2;
    while (i + 9 < buf.length) {
      if (buf[i] !== 0xff) return null;
      const marker = buf[i + 1];
      const len = buf.readUInt16BE(i + 2);
      if (marker >= 0xc0 && marker <= 0xcf && ![0xc4, 0xc8, 0xcc].includes(marker)) {
        return { width: buf.readUInt16BE(i + 7), height: buf.readUInt16BE(i + 5) };
      }
      i += 2 + len;
    }
  }
  return null;
}

const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]);

// 이미지 파일을 가상 경로로 공급하며 HTML 을 렌더한다.
export async function renderSheet(handle, { width, height, html, images, out }) {
  const page = await openPage(handle, { viewport: { name: 'sheet', width, height, dpr: 1, mobile: false } });
  const s = page.session;
  try {
    await s.send('Fetch.enable', { patterns: [{ urlPattern: `${ORIGIN}/*`, requestStage: 'Request' }] });
    const off = s.on('Fetch.requestPaused', (p) => {
      const path = p.request.url.slice(ORIGIN.length);
      let body = null;
      let type = 'text/html; charset=utf-8';
      if (path === '/sheet.html') body = Buffer.from(html, 'utf8');
      else {
        const m = path.match(/^\/img\/(\d+)$/);
        const file = m && images[Number(m[1])];
        if (file) {
          body = readFileSync(file);
          type = /\.png$/i.test(file) ? 'image/png' : 'image/jpeg';
        }
      }
      if (!body) {
        s.send('Fetch.failRequest', { requestId: p.requestId, errorReason: 'BlockedByClient' }).catch(() => {});
        return;
      }
      s.send('Fetch.fulfillRequest', {
        requestId: p.requestId, responseCode: 200,
        responseHeaders: [{ name: 'Content-Type', value: type }, { name: 'Cache-Control', value: 'no-store' }],
        body: body.toString('base64'),
      }).catch(() => {});
    });
    const nav = await page.navigate(`${ORIGIN}/sheet.html`, 20000);
    if (!nav.ok) throw new Error(`합성 페이지를 열지 못했다: ${nav.errorText}`);
    await sleep(150);
    const jpg = await page.screenshot({ format: 'jpeg', quality: 82 });
    off();
    writeFileSync(out, jpg);
  } finally {
    await page.close();
  }
}

// overview.jpg: 슬라이스를 열 단위(위→아래, 왼→오)로 배치한 컨택트시트.
export async function contactSheet(handle, { outDir, slices, out }) {
  const n = slices.length;
  const cols = n <= 1 ? 1 : n <= 4 ? 2 : 3;
  const rows = Math.ceil(n / cols);
  const gap = 8;
  const first = imageSize(readFileSync(join(outDir, slices[0]))) || { width: 1440, height: 900 };
  const colW = Math.floor((Math.min(MAX_W, cols * first.width + (cols + 1) * gap) - (cols + 1) * gap) / cols);
  const cellH = Math.round((first.height * colW) / first.width);
  const width = cols * colW + (cols + 1) * gap;
  const height = rows * (cellH + gap) + gap;
  const images = slices.map((p) => join(outDir, p));
  let cells = '';
  slices.forEach((_, i) => {
    const c = Math.floor(i / rows);
    const r = i % rows;
    const x = gap + c * (colW + gap);
    const y = gap + r * (cellH + gap);
    cells += `<div class="c" style="left:${x}px;top:${y}px;width:${colW}px;height:${cellH}px"><img src="/img/${i}"><b>${String(i + 1).padStart(2, '0')}</b></div>`;
  });
  const html = `<!doctype html><meta charset="utf-8"><style>
html,body{margin:0;background:#d4d4d4;width:${width}px;height:${height}px;overflow:hidden}
.c{position:absolute;background:#fff;overflow:hidden}.c img{width:100%;height:100%;object-fit:cover;object-position:top;display:block}
.c b{position:absolute;left:6px;top:6px;font:600 13px/1 ui-monospace,Menlo,monospace;color:#fff;background:rgba(0,0,0,.72);padding:4px 6px;border-radius:4px}
</style>${cells}`;
  await renderSheet(handle, { width, height, html, images, out: join(outDir, out) });
  return { width, height };
}

// side-by-side: 왼쪽 레퍼런스, 오른쪽 결과. rows = [[leftPath|null, rightPath|null], ...]
export async function sideBySide(handle, { rows, leftLabel = 'REFERENCE', rightLabel = 'RESULT', out, maxH = 1568 }) {
  const gap = 8;
  const labelH = 32;
  const colMax = Math.floor((MAX_W - 3 * gap) / 2);
  const dims = rows.map((pair) => pair.map((p) => (p ? imageSize(readFileSync(p)) : null)));
  // 각 행의 높이는 두 이미지 중 큰 쪽 비율로 정하고, 전체 높이가 maxH 를 넘으면 함께 줄인다.
  let colW = colMax;
  const rowH = (w) => dims.map((d) => Math.max(...d.map((x) => (x ? Math.round((x.height * w) / x.width) : 0)), 40));
  let total = labelH + gap + rowH(colW).reduce((a, b) => a + b + gap, 0);
  if (total > maxH) {
    colW = Math.max(200, Math.floor(colW * ((maxH - labelH - gap * (rows.length + 1)) / (total - labelH - gap * (rows.length + 1)))));
  }
  const hs = rowH(colW);
  const width = 2 * colW + 3 * gap;
  const height = labelH + gap + hs.reduce((a, b) => a + b + gap, 0);
  const images = [];
  let cells = `<div class="l" style="left:${gap}px;width:${colW}px">${esc(leftLabel)}</div><div class="l" style="left:${2 * gap + colW}px;width:${colW}px">${esc(rightLabel)}</div>`;
  let y = labelH + gap;
  rows.forEach((pair, r) => {
    pair.forEach((p, c) => {
      const x = gap + c * (colW + gap);
      if (p) {
        images.push(p);
        cells += `<div class="c" style="left:${x}px;top:${y}px;width:${colW}px;height:${hs[r]}px"><img src="/img/${images.length - 1}"></div>`;
      } else {
        cells += `<div class="c e" style="left:${x}px;top:${y}px;width:${colW}px;height:${hs[r]}px">—</div>`;
      }
    });
    y += hs[r] + gap;
  });
  const html = `<!doctype html><meta charset="utf-8"><style>
html,body{margin:0;background:#d4d4d4;width:${width}px;height:${height}px;overflow:hidden}
.l{position:absolute;top:0;height:${labelH}px;font:700 14px/${labelH}px ui-monospace,Menlo,monospace;letter-spacing:.08em;color:#111;text-align:center;background:#f5f5f5}
.c{position:absolute;background:#fff;overflow:hidden}.c img{width:100%;display:block}.e{display:flex;align-items:center;justify-content:center;color:#999;font:14px sans-serif}
</style>${cells}`;
  await renderSheet(handle, { width, height, html, images, out });
  return { width, height };
}
