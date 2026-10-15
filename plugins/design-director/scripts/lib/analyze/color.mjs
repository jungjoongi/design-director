// 색 변환·거리·대비. 순수 함수만(node:* 금지).

const clamp01 = (v) => Math.min(1, Math.max(0, v));
const toLin = (c) => (c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4);
const toGam = (c) => (c <= 0.0031308 ? 12.92 * c : 1.055 * c ** (1 / 2.4) - 0.055);

// {r,g,b: 0–255, a: 0–1}
export function rgbToOklab({ r, g, b }) {
  const R = toLin(r / 255);
  const G = toLin(g / 255);
  const B = toLin(b / 255);
  const l = Math.cbrt(0.4122214708 * R + 0.5363325363 * G + 0.0514459929 * B);
  const m = Math.cbrt(0.2119034982 * R + 0.6806995451 * G + 0.1073969566 * B);
  const s = Math.cbrt(0.0883024619 * R + 0.2817188376 * G + 0.6299787005 * B);
  return {
    L: 0.2104542553 * l + 0.793617785 * m - 0.0040720468 * s,
    a: 1.9779984951 * l - 2.428592205 * m + 0.4505937099 * s,
    b: 0.0259040371 * l + 0.7827717662 * m - 0.808675766 * s,
  };
}

export function oklabToRgb({ L, a, b }, alpha = 1) {
  const l = (L + 0.3963377774 * a + 0.2158037573 * b) ** 3;
  const m = (L - 0.1055613458 * a - 0.0638541728 * b) ** 3;
  const s = (L - 0.0894841775 * a - 1.291485548 * b) ** 3;
  const R = 4.0767416621 * l - 3.3077115913 * m + 0.2309699292 * s;
  const G = -1.2684380046 * l + 2.6097574011 * m - 0.3413193965 * s;
  const B = -0.0041960863 * l - 0.7034186147 * m + 1.707614701 * s;
  const f = (v) => Math.round(clamp01(toGam(v)) * 255);
  return { r: f(R), g: f(G), b: f(B), a: alpha };
}

export function oklabToOklch({ L, a, b }) {
  const C = Math.sqrt(a * a + b * b);
  let H = (Math.atan2(b, a) * 180) / Math.PI;
  if (H < 0) H += 360;
  return { L, C, H };
}

export function oklchToOklab({ L, C, H }) {
  const h = (H * Math.PI) / 180;
  return { L, a: C * Math.cos(h), b: C * Math.sin(h) };
}

export const deltaE = (x, y) => Math.sqrt((x.L - y.L) ** 2 + (x.a - y.a) ** 2 + (x.b - y.b) ** 2);

function hslToRgb(h, s, l) {
  h = ((h % 360) + 360) % 360;
  const k = (n) => (n + h / 30) % 12;
  const A = s * Math.min(l, 1 - l);
  const f = (n) => l - A * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)));
  return { r: Math.round(f(0) * 255), g: Math.round(f(8) * 255), b: Math.round(f(4) * 255) };
}

const num = (v, pctScale = 1) => (String(v).endsWith('%') ? (parseFloat(v) / 100) * pctScale : parseFloat(v));
function angle(v) {
  const s = String(v);
  if (s.endsWith('turn')) return parseFloat(s) * 360;
  if (s.endsWith('rad')) return (parseFloat(s) * 180) / Math.PI;
  if (s.endsWith('grad')) return parseFloat(s) * 0.9;
  return parseFloat(s);
}
const alphaOf = (v) => (v === undefined || v === null || v === '' ? 1 : clamp01(num(v)));

// CSS 색 문자열 → {r,g,b,a}. 모르면 null.
export function parseCss(str) {
  if (!str) return null;
  const s = String(str).trim().toLowerCase();
  let m = s.match(/^#([0-9a-f]{3,8})$/);
  if (m) {
    let h = m[1];
    if (h.length === 3 || h.length === 4) h = [...h].map((c) => c + c).join('');
    if (h.length !== 6 && h.length !== 8) return null;
    return {
      r: parseInt(h.slice(0, 2), 16), g: parseInt(h.slice(2, 4), 16), b: parseInt(h.slice(4, 6), 16),
      a: h.length === 8 ? Math.round((parseInt(h.slice(6, 8), 16) / 255) * 1000) / 1000 : 1,
    };
  }
  if (s === 'transparent') return { r: 0, g: 0, b: 0, a: 0 };
  if (s === 'white') return { r: 255, g: 255, b: 255, a: 1 };
  if (s === 'black') return { r: 0, g: 0, b: 0, a: 1 };
  m = s.match(/^(rgba?|hsla?|oklch|oklab)\((.*)\)$/);
  if (!m) return null;
  const parts = m[2].replace(/,/g, ' ').replace(/\//g, ' / ').split(/\s+/).filter(Boolean);
  const slash = parts.indexOf('/');
  const vals = slash >= 0 ? parts.slice(0, slash) : parts.slice(0, 3);
  const alphaRaw = slash >= 0 ? parts[slash + 1] : parts[3];
  if (vals.length < 3 || vals.some((v) => v === 'none' || Number.isNaN(parseFloat(v)))) return null;
  const a = alphaOf(alphaRaw);
  if (m[1].startsWith('rgb')) {
    const c = (v) => Math.round(Math.min(255, Math.max(0, num(v, 255))));
    return { r: c(vals[0]), g: c(vals[1]), b: c(vals[2]), a };
  }
  if (m[1].startsWith('hsl')) {
    const rgb = hslToRgb(angle(vals[0]), clamp01(num(vals[1], 1) / (String(vals[1]).endsWith('%') ? 1 : 100)), clamp01(num(vals[2], 1) / (String(vals[2]).endsWith('%') ? 1 : 100)));
    return { ...rgb, a };
  }
  if (m[1] === 'oklch') {
    const L = num(vals[0], 1);
    const C = num(vals[1], 0.4);
    return oklabToRgb(oklchToOklab({ L, C, H: angle(vals[2]) }), a);
  }
  return oklabToRgb({ L: num(vals[0], 1), a: num(vals[1], 0.4), b: num(vals[2], 0.4) }, a);
}

const h2 = (n) => n.toString(16).padStart(2, '0');
export function toHex(c, keepAlpha = true) {
  if (!c) return null;
  const base = `#${h2(c.r)}${h2(c.g)}${h2(c.b)}`.toUpperCase();
  return keepAlpha && c.a < 0.995 ? base + h2(Math.round(c.a * 255)).toUpperCase() : base;
}

export function blend(top, bottom) {
  const a = top.a + bottom.a * (1 - top.a);
  if (a <= 0) return { r: 0, g: 0, b: 0, a: 0 };
  const f = (k) => Math.round((top[k] * top.a + bottom[k] * bottom.a * (1 - top.a)) / a);
  return { r: f('r'), g: f('g'), b: f('b'), a };
}

export function luminance(c) {
  return 0.2126 * toLin(c.r / 255) + 0.7152 * toLin(c.g / 255) + 0.0722 * toLin(c.b / 255);
}

// WCAG 2.x 대비. 알파가 있으면 배경 위에 합성한다.
export function contrastRatio(fg, bg, canvas = { r: 255, g: 255, b: 255, a: 1 }) {
  const B = bg.a < 1 ? blend(bg, canvas) : bg;
  const F = fg.a < 1 ? blend(fg, B) : fg;
  const x = luminance(F);
  const y = luminance(B);
  return (Math.max(x, y) + 0.05) / (Math.min(x, y) + 0.05);
}

export function oklchString(c) {
  const { L, C, H } = oklabToOklch(rgbToOklab(c));
  const l = Math.round(L * 100) / 100;
  const ch = Math.round(C * 1000) / 1000;
  const h = ch < 0.002 ? 0 : Math.round(H);
  return `oklch(${l} ${ch} ${h})`;
}

export function chroma(c) {
  return oklabToOklch(rgbToOklab(c)).C;
}
