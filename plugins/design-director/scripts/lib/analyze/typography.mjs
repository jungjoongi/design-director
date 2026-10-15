// 타이포 역할·타입 스케일·clamp. 순수 함수.
import { describeFamily, genericClass, parseStack, isTrueGeneric, normName } from './fonts.mjs';

export const RATIOS = [
  [1.067, 'minor-second'], [1.125, 'major-second'], [1.2, 'minor-third'], [1.25, 'major-third'],
  [1.333, 'perfect-fourth'], [1.414, 'augmented-fourth'], [1.5, 'perfect-fifth'], [1.618, 'golden-ratio'],
];

const HEAD_KEYS = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'];
const ctxSum = (s, keys) => keys.reduce((a, k) => a + ((s.x && s.x[k]) || 0), 0);
const headChars = (s) => ctxSum(s, HEAD_KEYS);
const round = (v, d = 2) => Math.round(v * 10 ** d) / 10 ** d;

// 스케일 적합도: 비율마다 mean min_k |ln(s/body) − k ln R| / ln R, fit = 1 − 2×잔차
export function fitScale(sizes, body) {
  const xs = [...new Set(sizes.filter((s) => s > 0 && Math.abs(s - body) > 0.5))].map((s) => Math.log(s / body));
  if (!xs.length || !body) return { ratio: null, ratioName: 'custom', fit: 0, residual: 0.5 };
  let best = null;
  for (const [R, name] of RATIOS) {
    const lr = Math.log(R);
    const res = xs.reduce((a, x) => a + Math.abs(x / lr - Math.round(x / lr)), 0) / xs.length;
    // 같은 잔차면 큰 비율을 고른다(작은 비율은 우연히 맞기 쉽다)
    if (!best || res < best.residual - 1e-9 || (Math.abs(res - best.residual) <= 1e-9 && R > best.ratio)) best = { ratio: R, ratioName: name, residual: res };
  }
  const fit = round(Math.max(0, 1 - 2 * best.residual), 2);
  return { ratio: best.ratio, ratioName: fit < 0.6 ? 'custom' : best.ratioName, fit, residual: round(best.residual, 3) };
}

const fmt = (v) => {
  const s = (Math.round(v * 1000) / 1000).toFixed(3).replace(/\.?0+$/, '');
  return s === '-0' ? '0' : s;
};

// 390→1440 선형 clamp. m·d 는 px. clamp(m/16 rem, (m − 390·slope)/16 rem + 100·slope vw, d/16 rem)
export function fluidClamp(m, d, vMin = 390, vMax = 1440) {
  const slope = (d - m) / (vMax - vMin);
  const interRem = (m - vMin * slope) / 16;
  const vw = slope * 100;
  const lo = Math.min(m, d) / 16;
  const hi = Math.max(m, d) / 16;
  return `clamp(${fmt(lo)}rem, ${fmt(interRem)}rem ${vw < 0 ? '-' : '+'} ${fmt(Math.abs(vw))}vw, ${fmt(hi)}rem)`;
}

function groupBySize(list) {
  // 4% 이내 묶음 (큰 것부터)
  const groups = [];
  for (const s of [...list].sort((a, b) => b.s - a.s || b.c - a.c)) {
    const g = groups.find((x) => Math.abs(x.size - s.s) / x.size <= 0.04);
    if (g) g.items.push(s);
    else groups.push({ size: s.s, items: [s] });
  }
  for (const g of groups) {
    g.items.sort((a, b) => b.c - a.c || b.a - a.a);
    g.rep = g.items[0];
    g.n = g.items.reduce((a, s) => a + (s.n || 1), 0);
    g.c = g.items.reduce((a, s) => a + s.c, 0);
    g.head = g.items.reduce((a, s) => a + headChars(s), 0);
    g.h1 = g.items.reduce((a, s) => a + ((s.x && s.x.h1) || 0), 0);
  }
  return groups;
}

// 뷰포트 하나의 역할 배정
export function assignRoles(styles) {
  const list = (styles || []).filter((s) => s && s.c > 0 && s.s > 0);
  if (!list.length) return { roles: {}, body: null };
  const outside = (s) => s.c - headChars(s) - ((s.x && s.x.btn) || 0) - ((s.x && s.x.nav) || 0);
  const pick = (arr, score) => arr.reduce((best, s) => (best === null || score(s) > score(best) ? s : best), null);
  let body = pick(list.filter((s) => s.s >= 13 && s.s <= 20 && outside(s) > 0), outside);
  if (!body) body = pick(list, outside);
  const roles = { body };
  const bs = body.s;
  const btnNav = (s) => ((s.x && (s.x.btn || 0) + (s.x.nav || 0)) || 0) >= s.c * 0.5;
  const headish = list.filter((s) => s !== body && !btnNav(s) && (s.s >= bs * 1.2 || (HEAD_KEYS.slice(0, 4).some((k) => s.x && s.x[k]) && s.w >= 600 && s.s >= bs)));
  const groups = groupBySize(headish);
  for (const g of groups) for (const k of ['h1', 'h2', 'h3']) g[k] = g.items.reduce((a, s) => a + ((s.x && s.x[k]) || 0), 0);
  // 1) 태그가 지배하는 묶음을 h1·h2·h3 로
  const taken = new Set();
  const byTag = (k) => groups.filter((g) => !taken.has(g) && g[k] > 0 && g[k] >= g.c * 0.3).sort((a, b) => b[k] - a[k] || b.size - a.size)[0];
  const lv = {};
  for (const k of ['h1', 'h2', 'h3']) {
    const g = byTag(k);
    if (g) { lv[k] = g; taken.add(g); }
  }
  // 2) display: h1 보다 큰 가장 큰 묶음, body 2.6배 이상·3회 이하·다음 단계보다 15% 큼
  const sorted = [...groups].sort((a, b) => b.size - a.size);
  const top = sorted.find((g) => !taken.has(g));
  if (top && top.size >= bs * 2.6 && top.n <= 3 && (!lv.h1 || top.size > lv.h1.size)) {
    const next = sorted.find((g) => g !== top && g.size < top.size);
    if (!next || top.size >= next.size * 1.15) {
      roles.display = top.rep;
      taken.add(top);
    }
  }
  // 3) 빈 단계는 남은 묶음을 크기순으로 채운다(윗 단계보다 작은 것만)
  const rest = sorted.filter((g) => !taken.has(g));
  let ceiling = Infinity;
  for (const k of ['h1', 'h2', 'h3']) {
    if (lv[k]) { ceiling = Math.min(ceiling, lv[k].size); continue; }
    const g = rest.find((x) => !taken.has(x) && x.size < ceiling);
    if (g) { lv[k] = g; taken.add(g); ceiling = g.size; }
  }
  for (const k of ['h1', 'h2', 'h3']) if (lv[k]) roles[k] = lv[k].rep;

  const used = new Set(Object.values(roles));
  const smalls = list.filter((s) => s.s < bs && s.s >= 10 && !used.has(s));
  const small = pick(smalls, (s) => s.c - ((s.x && s.x.btn) || 0) - ((s.x && s.x.nav) || 0));
  if (small) roles.small = small;
  const button = pick(list.filter((s) => s.x && s.x.btn > s.c * 0.5), (s) => s.x.btn);
  if (button) roles.button = button;
  const nav = pick(list.filter((s) => s.x && s.x.nav > s.c * 0.5 && !(s.x.btn > s.c * 0.5)), (s) => s.x.nav);
  if (nav) roles.nav = nav;
  const eyebrow = pick(list.filter((s) => s.x && s.x.eb > 0 && s.s <= bs * 1.25 && (s.tt === 'uppercase' || (s.x.up || 0) >= s.x.eb * 0.5 || s.ls >= 0.05)), (s) => s.x.eb);
  if (eyebrow) roles.eyebrow = eyebrow;
  const lead = pick(list.filter((s) => !used.has(s) && s.s > bs * 1.08 && s.s < bs * 1.8 && headChars(s) < s.c * 0.3 && s.x && (s.x.hero || 0) > 0 && (s.x.p || 0) + (s.x.hero || 0) > 0 && !(s.x.btn > s.c * 0.5) && !(s.x.nav > s.c * 0.5)), (s) => s.x.hero);
  if (lead) roles['body-lg'] = lead;
  return { roles, body };
}

const ROLE_ORDER = ['display', 'h1', 'h2', 'h3', 'body-lg', 'body', 'small', 'button', 'nav', 'eyebrow'];
const FLUID_ROLES = new Set(['display', 'h1', 'h2', 'h3', 'body-lg', 'body']);

function famKey(stack) {
  const names = parseStack(stack);
  return normName(names.find((n) => !isTrueGeneric(n)) || names[0] || 'sans-serif');
}

export function analyzeTypography({ desktop, mobile }, fontData) {
  const dStyles = (desktop && desktop.text && desktop.text.styles) || [];
  const mStyles = (mobile && mobile.text && mobile.text.styles) || [];
  const D = assignRoles(dStyles);
  const M = assignRoles(mStyles);
  const totalC = dStyles.reduce((a, s) => a + s.c, 0) || 1;
  const totalA = dStyles.reduce((a, s) => a + (s.a || 0), 0) || 1;

  // 패밀리: 글자 수 기준으로 묶는다
  const fams = new Map();
  for (const s of dStyles) {
    const k = famKey(s.f);
    const f = fams.get(k) || { key: k, stack: s.f, chars: 0, area: 0, roles: [] };
    f.chars += s.c;
    f.area += s.a || 0;
    fams.set(k, f);
  }
  for (const [role, s] of Object.entries(D.roles)) if (s) fams.get(famKey(s.f))?.roles.push(role);
  const famList = [...fams.values()].filter((f) => f.chars / totalC >= 0.01 || f.roles.length).sort((a, b) => b.chars - a.chars || (a.key < b.key ? -1 : 1));
  const ids = new Map();
  const counts = {};
  const families = famList.slice(0, 6).map((f) => {
    let id = genericClass(f.stack);
    if (id === 'sans' && counts.sans && f.roles.some((r) => ['display', 'h1', 'h2'].includes(r)) && !f.roles.includes('body')) id = 'display';
    counts[id] = (counts[id] || 0) + 1;
    if (counts[id] > 1) id = `${id}-${counts[id]}`;
    ids.set(f.key, id);
    const desc = describeFamily(f.stack, desktop && desktop.fonts, fontData);
    const out = { id, primary: desc.primary, stack: desc.stack, source: desc.source, license: desc.license, usage: { chars: round(f.chars / totalC), area: round(f.area / totalA) }, alternatives: desc.alternatives, hangul: desc.hangul, roles: f.roles.sort((a, b) => ROLE_ORDER.indexOf(a) - ROLE_ORDER.indexOf(b)), src: 'measured' };
    if (desc.embed === false) out.embed = false;
    if (desc.note) out.note = desc.note;
    return out;
  });

  const roles = {};
  const fluid = [];
  for (const name of ROLE_ORDER) {
    const d = D.roles[name];
    const m = M.roles[name];
    if (!d && !m) continue;
    const s = d || m;
    const entry = {
      family: ids.get(famKey(s.f)) || 'sans',
      size: d && m && Math.abs(d.s - m.s) >= 0.5 ? { desktop: d.s, mobile: m.s } : s.s,
      weight: s.w,
      lineHeight: s.lh,
      tracking: `${fmt(s.ls || 0)}em`,
      transform: s.tt || 'none',
      src: 'measured',
      n: s.n || null,
    };
    if (s.it) entry.italic = true;
    if (!d) entry.mobileOnly = true;
    roles[name] = entry;
    if (d && m && Math.abs(d.s - m.s) >= 2 && FLUID_ROLES.has(name)) fluid.push({ role: name, clamp: fluidClamp(m.s, d.s), src: 'derived' });
  }

  // 스케일 단계: 역할 크기 + 글자 수 1% 이상 크기
  const bodyS = D.body ? D.body.s : M.body ? M.body.s : 16;
  const stepSet = new Set();
  for (const s of dStyles) if (s.c / totalC >= 0.01 || headChars(s) > 0) stepSet.add(Math.round(s.s));
  for (const r of Object.values(D.roles)) if (r) stepSet.add(Math.round(r.s));
  const steps = [...stepSet].filter((v) => v >= 9).sort((a, b) => a - b).slice(-12);
  const roleSizes = Object.entries(D.roles).filter(([n, s]) => s && ['display', 'h1', 'h2', 'h3', 'body-lg', 'small'].includes(n)).map(([, s]) => s.s);
  const sc = fitScale(roleSizes.length >= 2 ? roleSizes : steps, bodyS);
  const scale = { steps, ratio: sc.ratio, ratioName: sc.ratioName, fit: sc.fit, fluid, src: 'derived' };

  const script = (desktop && desktop.text && desktop.text.script) || { hangul: 0, latin: 0 };
  const letters = script.hangul + script.latin || 1;
  const typography = {
    families,
    roles,
    scale,
    script: { hangul: round(script.hangul / letters), latin: round(script.latin / letters), src: 'measured' },
    wrap: { keepAll: script.hangul ? round((script.keepAllHangul || 0) / script.hangul) : 0, balance: (script.balance || 0) > 0, src: 'measured' },
  };
  return { typography, bodySize: bodyS, desktopRoles: D.roles };
}
