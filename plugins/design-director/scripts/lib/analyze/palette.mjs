// 팔레트: 군집 → 역할 배정 → var 연결 → 중립 온도 → 대비. 순수 함수.
import { blend, chroma, contrastRatio, deltaE, oklchString, parseCss, rgbToOklab, toHex } from './color.mjs';
import { clusterColors, totalWeight } from './cluster.mjs';

const NEUTRAL_C = 0.03;
const round = (v, d = 3) => Math.round(v * 10 ** d) / 10 ** d;
const pairs = (list) => (list || []).map(([hex, w]) => ({ hex, w }));

// 루트 변수 중 색: [{name, rgb, lab}]
export function colorVars(items) {
  const out = [];
  for (const v of items || []) {
    let val = v.v;
    if (v.t === 'hsl-triplet') val = `hsl(${val})`;
    else if (v.t !== 'color') continue;
    const rgb = parseCss(val);
    if (!rgb || rgb.a < 0.02) continue;
    out.push({ name: v.n, rgb, lab: rgbToOklab(rgb.a < 1 ? blend(rgb, { r: 255, g: 255, b: 255, a: 1 }) : rgb), alpha: rgb.a });
  }
  return out;
}

const ROLE_HINT = {
  bg: /(^|-)(bg|background|canvas|base|page)(-|$)/, surface: /(surface|card|panel|elevated|level-?1|muted|secondary)/,
  text: /(text|foreground|fg|content|ink)/, border: /(border|line|divider|stroke|outline|separator)/,
  accent: /(accent|primary|brand|link|cta|highlight)/, link: /(link|accent|primary)/,
};

function linkVar(role, c, vars) {
  if (!c) return null;
  const lab = rgbToOklab(c.solid || c.rgb);
  const hits = vars.filter((v) => Math.abs(v.alpha - (c.rgb.a ?? 1)) < 0.05 && deltaE(v.lab, lab) <= 0.02);
  if (!hits.length) return null;
  const hint = ROLE_HINT[role];
  hits.sort((a, b) => (hint && hint.test(b.name) ? 1 : 0) - (hint && hint.test(a.name) ? 1 : 0) || deltaE(a.lab, lab) - deltaE(b.lab, lab) || (a.name < b.name ? -1 : 1));
  return hits[0].name;
}

export function analyzePalette(raw, components = {}) {
  const C = (raw && raw.color) || {};
  const rootRgb = parseCss(C.root || '#ffffff') || { r: 255, g: 255, b: 255, a: 1 };
  const canvas = { ...rootRgb, a: 1 };
  // 면(surface) 단계는 미세해서 배경은 ΔE < 0.015 로 묶는다(글자·테두리·강조는 0.025)
  const bgC = clusterColors(pairs(C.bg), { canvas, threshold: 0.015 });
  const textC = clusterColors(pairs(C.text), { canvas });
  const borderC = clusterColors(pairs(C.border), { canvas });
  const vars = colorVars(raw && raw.vars && raw.vars.items);
  const bgTotal = totalWeight(bgC) || 1;
  const textTotal = totalWeight(textC) || 1;
  const L = (c) => rgbToOklab(c.solid || c.rgb).L;
  const isNeutral = (c) => chroma(c.solid || c.rgb) < NEUTRAL_C;
  const roles = {};
  const put = (name, c, share, extra = {}) => {
    if (!c) return;
    roles[name] = { hex: c.hex, oklch: oklchString(c.solid || c.rgb), share: round(share, 3), var: linkVar(name.replace(/-.*/, ''), c, vars), src: 'measured', ...extra };
    if (c.rgb.a < 0.995) roles[name].solid = c.solidHex;
    roles[name]._c = c;
  };

  // 배경·면
  const bg = bgC[0];
  put('bg', bg, bg ? bg.w / bgTotal : 0);
  const bgL = bg ? L(bg) : 1;
  const near = bgC.slice(1).filter((c) => c.w / bgTotal >= 0.004 && Math.abs(L(c) - bgL) <= 0.18 && chroma(c.solid) < 0.06);
  if (near[0]) put('surface', near[0], near[0].w / bgTotal);
  if (near[1]) put('surface-2', near[1], near[1].w / bgTotal);
  const inv = bgC.slice(1).find((c) => c.w / bgTotal >= 0.004 && Math.abs(L(c) - bgL) >= 0.5 && isNeutral(c));
  if (inv) put('bg-inverse', inv, inv.w / bgTotal);

  // 글자
  const bgRgb = bg ? bg.solid : canvas;
  const readable = textC.filter((c) => contrastRatio(c.solid, bgRgb) >= 3);
  const text = readable[0] || textC[0];
  put('text', text, text ? text.w / textTotal : 0);
  if (text) {
    const tCon = contrastRatio(text.solid, bgRgb);
    const muted = textC.find((c) => c !== text && isNeutral(c) && c.w / textTotal >= 0.04 && Math.sign(L(c) - bgL) === Math.sign(L(text) - bgL) && contrastRatio(c.solid, bgRgb) < tCon && contrastRatio(c.solid, bgRgb) >= 1.8);
    if (muted) put('text-muted', muted, muted.w / textTotal);
    const tinv = textC.find((c) => c !== text && Math.abs(L(c) - L(text)) >= 0.5 && c.w / textTotal >= 0.01 && isNeutral(c));
    if (tinv && roles['bg-inverse']) put('text-inverse', tinv, tinv.w / textTotal);
  }
  if (borderC[0]) put('border', borderC[0], borderC[0].w / (totalWeight(borderC) || 1));

  // 강조색 점수 = 3·버튼 배경 + 2·링크 글자/100 + 아이콘 칠/2 + 유채색 테두리/1000 (+ 이름이 accent 류인 변수와 일치하면 2)
  const chromaticItems = [];
  const add = (list, kind, scale) => {
    for (const [hex, w] of list || []) chromaticItems.push({ hex, w: w * scale, kind, raw: w });
  };
  add(C.button, 'button', 3);
  add(C.link, 'link', 0.02);
  add(C.icon, 'icon', 1);
  add(C.border, 'border', 0.001);
  const chromaticClusters = clusterColors(chromaticItems, { canvas }).filter((c) => !isNeutral(c));
  for (const c of chromaticClusters) {
    const named = vars.some((v) => ROLE_HINT.accent.test(v.name) && deltaE(v.lab, rgbToOklab(c.solid)) <= 0.02);
    c.score = c.w + (named ? 2 : 0);
    c.kinds = [...new Set(c.members.map((m) => m.kind))];
  }
  chromaticClusters.sort((a, b) => b.score - a.score || (a.hex < b.hex ? -1 : 1));
  const accent = chromaticClusters.find((c) => c.score >= 2) || null;
  let monochrome = false;
  if (accent) {
    put('accent', accent, accent.score / (chromaticClusters.reduce((a, c) => a + c.score, 0) || 1), { from: accent.kinds });
  } else {
    // 무채색 사이트: 가장 진한(배경과 대비가 큰) 중립 버튼 배경을 accent 로
    monochrome = true;
    const bgLab = rgbToOklab(bgRgb);
    const btn = clusterColors(pairs(C.button), { canvas })
      .filter((c) => c.rgb.a >= 0.5 && deltaE(rgbToOklab(c.solid), bgLab) >= 0.05)
      .sort((a, b) => contrastRatio(b.solid, bgRgb) - contrastRatio(a.solid, bgRgb) || b.w - a.w)[0];
    if (btn) put('accent', btn, 1, { from: ['button'], monochrome: true });
  }
  if (roles.accent) {
    const acc = roles.accent._c;
    const btn = (components.button || []).filter((b) => b.bg && deltaE(rgbToOklab(parseCss(b.bg) || canvas), rgbToOklab(acc.rgb)) < 0.03 && b.fg);
    const fgHex = btn.length ? btn[0].fg : contrastRatio({ r: 255, g: 255, b: 255, a: 1 }, acc.solid) >= contrastRatio({ r: 0, g: 0, b: 0, a: 1 }, acc.solid) ? '#ffffff' : '#000000';
    const fgRgb = parseCss(fgHex);
    if (fgRgb) put('accent-fg', { hex: toHex(fgRgb), rgb: fgRgb, solid: fgRgb.a < 1 ? blend(fgRgb, acc.solid) : fgRgb, solidHex: toHex(fgRgb, false) }, 0, { src: btn.length ? 'measured' : 'derived' });
  }
  // 링크: 본문과 다른 색일 때만
  const linkC = clusterColors(pairs(C.link), { canvas });
  const link = linkC.find((c) => !text || deltaE(rgbToOklab(c.solid), rgbToOklab(text.solid)) >= 0.02);
  if (link && (!isNeutral(link) || linkC.length === 1)) put('link', link, link.w / (totalWeight(linkC) || 1));

  // 나머지 유채색
  const usedHex = new Set(Object.values(roles).map((r) => r.hex));
  const allChromatic = clusterColors([...pairs(C.bg).map((p) => ({ ...p, w: p.w / 100 })), ...pairs(C.text).map((p) => ({ ...p, w: p.w / 10 })), ...pairs(C.svg).map((p) => ({ ...p, w: p.w / 10 })), ...chromaticItems], { canvas })
    .filter((c) => !isNeutral(c) && !usedHex.has(c.hex) && !(roles.accent && deltaE(c.lab, rgbToOklab(roles.accent._c.solid)) < 0.025));
  const chromTotal = totalWeight(allChromatic) || 1;
  const accents = allChromatic.slice(0, 6).map((c) => ({ hex: c.hex, oklch: oklchString(c.solid), share: round(c.w / chromTotal), var: linkVar('accent', c, vars), src: 'measured' }));

  // 중립 온도
  const neutrals = [...bgC, ...textC, ...borderC].filter((c) => isNeutral(c));
  let wa = 0, wb = 0, ww = 0;
  for (const c of neutrals) {
    const lab = rgbToOklab(c.solid);
    if (Math.hypot(lab.a, lab.b) < 0.003) continue;
    wa += lab.a * c.w;
    wb += lab.b * c.w;
    ww += c.w;
  }
  const mb = ww ? wb / ww : 0;
  const ma = ww ? wa / ww : 0;
  const temperature = mb < -0.004 ? 'cool' : mb > 0.004 || ma > 0.006 ? 'warm' : 'neutral';
  const ramp = [...new Map(neutrals.map((c) => [c.solidHex, c])).values()].sort((a, b) => L(a) - L(b)).map((c) => c.solidHex).slice(0, 10);

  // 대비
  const contrast = [];
  const pair = (fg, bgName) => {
    const f = roles[fg];
    const b = roles[bgName];
    if (!f || !b) return;
    const ratio = round(contrastRatio(f._c.rgb, b._c.rgb, canvas), 2);
    contrast.push({ fg, bg: bgName, ratio, aa: ratio >= 4.5, aaLarge: ratio >= 3, aaa: ratio >= 7 });
  };
  pair('text', 'bg');
  pair('text-muted', 'bg');
  pair('accent-fg', 'accent');
  pair('link', 'bg');
  pair('text', 'surface');
  // 측정된 accent 와 별개로 이름이 accent·primary·brand 인 유채색 변수가 있으면 '선언'으로 알려 준다
  const declared = vars
    .filter((v) => /^--(color-)?(accent|primary|brand)(-color|-500|-600)?$/.test(v.name) && chroma(v.rgb) >= NEUTRAL_C)
    .sort((a, b) => a.name.length - b.name.length || (a.name < b.name ? -1 : 1))[0];
  const declaredAccent = declared ? { hex: toHex(declared.rgb), oklch: oklchString(declared.rgb), var: declared.name, measured: !!(roles.accent && deltaE(declared.lab, rgbToOklab(roles.accent._c.solid)) <= 0.02), src: 'declared' } : null;
  for (const r of Object.values(roles)) delete r._c;
  const g = C.gradients || {};
  return {
    roles,
    accents,
    neutrals: { temperature, ramp, src: 'derived' },
    gradients: { count: g.count || 0, share: g.area || 0, text: g.text || 0, src: 'measured' },
    contrast,
    monochrome,
    declaredAccent,
  };
}
