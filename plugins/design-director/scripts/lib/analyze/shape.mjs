// 형태·깊이: radius 단계·성격·컴포넌트별 값, 테두리, 그림자 레이어 분해 → elevation → 단계·스타일. 순수 함수.
import { parseCss } from './color.mjs';

const round = (v, d = 2) => Math.round(v * 10 ** d) / 10 ** d;

export function radiusCharacter(r) {
  if (r === null || r === undefined) return null;
  if (r === 'pill') return 'very-rounded';
  if (r <= 2) return 'sharp';
  if (r <= 8) return 'soft';
  if (r <= 16) return 'rounded';
  return 'very-rounded';
}

function weightedMedian(pairs) {
  const list = pairs.filter(([v, w]) => Number.isFinite(v) && w > 0).sort((a, b) => a[0] - b[0]);
  const total = list.reduce((a, [, w]) => a + w, 0);
  let acc = 0;
  for (const [v, w] of list) {
    acc += w;
    if (acc >= total / 2) return v;
  }
  return null;
}

// raw.radius: [[kind, value|'pill', n]]
export function analyzeRadius(rawRadius) {
  const list = rawRadius || [];
  const total = list.reduce((a, [, , n]) => a + n, 0);
  const pill = list.filter(([, v]) => v === 'pill').reduce((a, [, , n]) => a + n, 0);
  const numeric = new Map();
  for (const [kind, v, n] of list) {
    if (v === 'pill' || kind === 'avatar') continue;
    numeric.set(v, (numeric.get(v) || 0) + n);
  }
  const numTotal = [...numeric.values()].reduce((a, b) => a + b, 0) || 1;
  const steps = [...numeric.entries()].filter(([v, n]) => v > 0 && n / numTotal >= 0.03).map(([v]) => v).sort((a, b) => a - b).slice(0, 8);
  const byKind = (kind) => {
    const rows = list.filter(([k]) => k === kind);
    const p = rows.filter(([, v]) => v === 'pill').reduce((a, [, , n]) => a + n, 0);
    const nums = rows.filter(([, v]) => v !== 'pill').map(([, v, n]) => [v, n]);
    const sum = nums.reduce((a, [, n]) => a + n, 0);
    if (!p && !sum) return null;
    if (p > sum) return 'pill';
    return weightedMedian(nums);
  };
  const components = { button: byKind('button'), input: byKind('input'), card: byKind('card'), badge: byKind('badge'), image: byKind('image') };
  const basis = components.card ?? components.button ?? weightedMedian([...numeric.entries()]);
  return {
    steps,
    pillShare: total ? round(pill / total) : 0,
    character: radiusCharacter(basis),
    components: Object.fromEntries(Object.entries(components).filter(([, v]) => v !== null)),
    src: 'measured',
  };
}

// "rgba(0, 0, 0, 0.1) 0px 1px 3px 0px, rgba(...) 0px 1px 2px -1px inset" → 레이어
export function parseShadow(value) {
  const layers = [];
  for (const part of String(value || '').split(/,(?![^(]*\))/)) {
    const p = part.trim();
    if (!p || p === 'none') continue;
    const colorMatch = p.match(/(rgba?\([^)]*\)|hsla?\([^)]*\)|oklch\([^)]*\)|oklab\([^)]*\)|lab\([^)]*\)|#[0-9a-fA-F]{3,8})/);
    const color = colorMatch ? parseCss(colorMatch[1]) : { r: 0, g: 0, b: 0, a: 1 };
    const nums = p.replace(colorMatch ? colorMatch[1] : '', '').match(/-?[\d.]+px|\b0\b/g) || [];
    const v = nums.map((n) => parseFloat(n));
    layers.push({ x: v[0] || 0, y: v[1] || 0, blur: v[2] || 0, spread: v[3] || 0, alpha: color ? color.a : 1, inset: /\binset\b/.test(p) });
  }
  return layers;
}

export const isRing = (layers) => layers.length > 0 && layers.every((l) => !l.inset && l.blur === 0 && l.x === 0 && l.y === 0 && l.spread > 0 && l.spread <= 3);

// elevation = 레이어별 (|y| + blur/2 + max(spread,0)) × alpha 의 최댓값 (inset 제외)
export function elevation(layers) {
  let e = 0;
  for (const l of layers) {
    if (l.inset) continue;
    e = Math.max(e, (Math.abs(l.y) + l.blur / 2 + Math.max(l.spread, 0)) * l.alpha);
  }
  return round(e, 3);
}

// raw.shadows: [{v, n, a, k}]
export function analyzeShadows(rawShadows) {
  const list = (rawShadows || []).map((s) => ({ ...s, layers: parseShadow(s.v) }));
  const total = list.reduce((a, s) => a + s.n, 0);
  const ring = list.filter((s) => isRing(s.layers));
  const cast = list.filter((s) => !isRing(s.layers) && s.layers.some((l) => !l.inset) && elevation(s.layers) > 0.05);
  const castN = cast.reduce((a, s) => a + s.n, 0);
  cast.forEach((s) => { s.e = elevation(s.layers); });
  cast.sort((a, b) => a.e - b.e || b.n - a.n);
  // 40% 넘게 벌어지면 새 단계, 최대 4
  let groups = [];
  for (const s of cast) {
    const g = groups[groups.length - 1];
    if (g && s.e <= g.max * 1.4) {
      g.items.push(s);
      g.max = s.e;
    } else groups.push({ items: [s], min: s.e, max: s.e });
  }
  while (groups.length > 4) {
    let bi = 0;
    let best = Infinity;
    for (let i = 0; i < groups.length - 1; i++) {
      const gap = groups[i + 1].min / (groups[i].max || 0.001);
      if (gap < best) { best = gap; bi = i; }
    }
    groups[bi] = { items: groups[bi].items.concat(groups[bi + 1].items), min: groups[bi].min, max: groups[bi + 1].max };
    groups.splice(bi + 1, 1);
  }
  const names = ['sm', 'md', 'lg', 'xl'];
  const tiers = groups.map((g, i) => {
    const rep = [...g.items].sort((a, b) => b.n - a.n || (a.v < b.v ? -1 : 1))[0];
    return { name: names[i], value: rep.v, elevation: rep.e, layers: rep.layers.length, share: total ? round(g.items.reduce((a, s) => a + s.n, 0) / total) : 0 };
  });
  const maxE = cast.length ? cast[cast.length - 1].e : 0;
  const layered = cast.filter((s) => s.layers.filter((l) => !l.inset).length >= 2).reduce((a, s) => a + s.n, 0);
  let style = 'flat';
  if (castN >= 2) {
    if (maxE >= 8) style = 'dramatic';
    else if (layered >= castN * 0.5) style = 'layered';
    else style = 'subtle';
  }
  return { style, tiers, ringShadow: ring.reduce((a, s) => a + s.n, 0) >= 2, count: total, src: 'measured' };
}

// 테두리: 문서 높이 1px 당 테두리 길이
export function analyzeBorder(rawBorder, docH, components) {
  const length = (rawBorder || []).reduce((a, [, w]) => a + w, 0);
  const perPx = docH ? length / docH : 0;
  const widths = [];
  for (const list of [components.button, components.card, components.input]) for (const c of list || []) if (c.bw) widths.push(c.bw);
  widths.sort((a, b) => a - b);
  return { width: widths.length ? widths[Math.floor(widths.length / 2)] : length ? 1 : 0, usage: perPx >= 4 ? 'high' : perPx >= 1.5 ? 'medium' : perPx > 0 ? 'low' : 'none', src: 'measured' };
}
