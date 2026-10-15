// 컴포넌트 샘플 정리: 버튼 변형, 입력, 카드, 배지, 내비. 색은 팔레트 역할 이름으로 바꿀 수 있으면 바꾼다. 순수 함수.
import { deltaE, parseCss, rgbToOklab } from './color.mjs';
import { sanitizeText } from './sanitize.mjs';

const med = (arr) => {
  const v = arr.filter((x) => Number.isFinite(x)).sort((a, b) => a - b);
  return v.length ? v[Math.floor(v.length / 2)] : null;
};

// hex → 가까운 역할 이름(ΔE < 0.02) 또는 hex. 같은 색인 역할이 여럿이면 prefer 순서를 따른다.
export function roleName(hex, roles, prefer = []) {
  if (!hex) return null;
  const c = parseCss(hex);
  if (!c) return hex;
  const lab = rgbToOklab(c);
  const hits = [];
  for (const [name, r] of Object.entries(roles || {})) {
    const rc = parseCss(r.hex);
    if (!rc || Math.abs((rc.a ?? 1) - (c.a ?? 1)) > 0.05) continue;
    const d = deltaE(rgbToOklab(rc), lab);
    if (d < 0.02) hits.push({ name, d });
  }
  if (!hits.length) return hex.toUpperCase();
  const rank = (n) => (prefer.includes(n) ? prefer.indexOf(n) : prefer.length);
  hits.sort((a, b) => (Math.abs(a.d - b.d) <= 0.005 ? rank(a.name) - rank(b.name) : 0) || a.d - b.d);
  return hits[0].name;
}
const FG = ['accent-fg', 'text', 'text-inverse', 'text-muted'];
const BG = ['accent', 'surface', 'surface-2', 'bg', 'bg-inverse'];

export function analyzeComponents({ desktop, mobile }, roles) {
  const comps = (desktop && desktop.components) || {};
  const buttons = comps.button || [];
  // 변형: 배경·글자·테두리 조합으로 묶는다
  const groups = new Map();
  for (const b of buttons) {
    const key = [b.bg || '-', b.fg || '-', b.bc || '-'].join('|');
    const g = groups.get(key) || { items: [], n: 0 };
    g.items.push(b);
    g.n += b.n || 1;
    groups.set(key, g);
  }
  const accentHex = roles && roles.accent ? roles.accent.hex : null;
  const variants = [...groups.values()].map((g) => {
    const b = g.items[0];
    const isAccent = accentHex && b.bg && roleName(b.bg, { accent: roles.accent }) === 'accent';
    const variant = b.bg ? (isAccent ? 'primary' : 'filled') : b.bc ? 'outline' : 'ghost';
    const label = g.items.map((x) => x.lbl).find((l) => l) || '';
    return {
      variant,
      height: med(g.items.map((x) => x.h)),
      paddingX: med(g.items.map((x) => x.px)),
      radius: g.items[0].r,
      bg: roleName(b.bg, roles, BG),
      fg: roleName(b.fg, roles, FG),
      border: b.bc ? { color: roleName(b.bc, roles), width: b.bw } : null,
      font: { size: b.fs, weight: b.fw, transform: b.tt || 'none' },
      shadow: !!b.sh,
      context: b.ctx,
      count: g.n,
      label: sanitizeText(label, 24),
      src: 'measured',
    };
  });
  const order = { primary: 0, filled: 1, outline: 2, ghost: 3 };
  variants.sort((a, b) => order[a.variant] - order[b.variant] || b.count - a.count || a.height - b.height);
  if (!variants.some((v) => v.variant === 'primary')) {
    const f = variants.find((v) => v.variant === 'filled');
    if (f) f.variant = 'primary';
  }
  const input = (comps.input || []).slice(0, 4).map((i) => ({ height: i.h, paddingX: i.px, radius: i.r, bg: roleName(i.bg, roles), border: i.bc ? { color: roleName(i.bc, roles), width: i.bw } : null, fontSize: i.fs, type: i.t, src: 'measured' }));
  const card = (comps.card || []).slice(0, 6).map((c) => ({ width: c.w, padding: c.p, paddingX: c.px, radius: c.r, bg: roleName(c.bg, roles, ['surface', 'surface-2', 'bg']), border: c.bc ? { color: roleName(c.bc, roles), width: c.bw } : null, shadow: c.sh || null, src: 'measured' }));
  const badge = (comps.badge || []).slice(0, 4).map((b) => ({ height: b.h, paddingX: b.px, radius: b.r, bg: roleName(b.bg, roles, BG), fg: roleName(b.fg, roles, FG), font: { size: b.fs, weight: b.fw, transform: b.tt || 'none' }, src: 'measured' }));
  const dn = comps.nav;
  const mn = mobile && mobile.components ? mobile.components.nav : null;
  const nav = dn
    ? {
      height: mn && mn.h !== dn.h ? { desktop: dn.h, mobile: mn.h } : dn.h,
      position: dn.pos, blur: !!dn.blur, bg: roleName(dn.bg, roles), links: dn.links, cta: dn.cta > 0, border: !!dn.border,
      mobile: mn ? (mn.burger ? 'hamburger' : mn.links >= 3 ? 'links' : 'minimal') : null,
      src: 'measured',
    }
    : null;
  return { button: variants.slice(0, 6), input, card, badge, nav };
}
