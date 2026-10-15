// 섹션 분류: 규칙 표로 타입마다 0–1 점수 → id·alt·confidence. sections.md 의 감지 ✓ id 만 쓴다. 순수 함수.
import { sanitizeText } from './sanitize.mjs';

export const DETECTABLE = [
  'nav', 'hero-centered', 'hero-split', 'hero-product', 'hero-media', 'hero-type', 'logo-cloud', 'stats', 'feature-grid',
  'bento-grid', 'feature-alternating', 'media-text', 'tabs-showcase', 'carousel', 'testimonials', 'pricing', 'faq',
  'cta-band', 'form', 'gallery', 'content-list', 'text-block', 'footer', 'data-table', 'product-grid', 'board-list', 'unknown',
];
// 개수를 붙여 쓰는 타입: feature-grid(3)
const COUNTED = new Set(['logo-cloud', 'stats', 'feature-grid', 'bento-grid', 'feature-alternating', 'testimonials', 'pricing', 'faq', 'content-list', 'product-grid', 'gallery', 'board-list']);

const alternates = (sides) => {
  const s = String(sides || '').replace(/[^LR]/g, '');
  if (s.length < 2) return false;
  for (let i = 1; i < s.length; i++) if (s[i] === s[i - 1]) return false;
  return true;
};

export function scoreSection(s, ctx) {
  const c = s.counts || {};
  const rep = s.repeat || null;
  const it = (rep && rep.item) || {};
  const n = rep ? rep.n : 0;
  const media = s.media || { side: 'none', share: 0 };
  const vh = ctx.vh || 900;
  const body = ctx.body || 16;
  const head = s.heading || null;
  const sc = {};
  const set = (id, v) => { if (v > (sc[id] || 0)) sc[id] = Math.min(1, v); };

  if (s.nav && s.h <= 220) set('nav', 0.95);
  else if (ctx.i === 0 && s.y < 40 && s.h <= 160 && c.links + c.buttons >= 3 && c.paragraphs === 0) set('nav', 0.8);
  if (s.footer) set('footer', 0.95);
  else if (ctx.i === ctx.last && c.links >= 6 && (s.fs || 0) <= body * 1.3) set('footer', 0.7);
  if (sc.nav || sc.footer) return sc;

  const heroPos = ctx.i === ctx.heroIndex && s.y < vh * 1.3;
  if (heroPos) {
    const big = head && (head.tag === 'h1' || head.size >= body * 2.2);
    const b = big ? 0.05 : 0;
    if (media.side === 'bg' || ((s.bgKind === 'image' || s.bgKind === 'video') && media.share >= 0.4)) set('hero-media', 0.88 + b);
    else if ((media.side === 'left' || media.side === 'right') && media.share >= 0.1) set('hero-split', 0.85 + b);
    else if (['below', 'center', 'above'].includes(media.side) && media.share >= 0.18) set('hero-product', 0.8 + b);
    else if (s.align === 'center') {
      set('hero-centered', 0.75 + b);
      if (head && head.size >= body * 4) set('hero-type', 0.6);
    } else if (head && head.size >= body * 3.5) set('hero-type', 0.7 + b);
    else set('hero-centered', 0.5);
    if (media.share >= 0.1 && media.side !== 'bg') set('hero-centered', Math.min(sc['hero-centered'] || 0, 0.4) || 0.4);
  }

  // 반복 항목
  if (rep) {
    const cols = rep.cols || 1;
    if (n >= 4 && (it.hasLogo || (it.hasImg && !it.hasHeading && !it.hasButton && s.h <= vh * 0.4)) && c.paragraphs <= 2 && s.h <= vh * 0.7) set('logo-cloud', 0.9);
    if (n >= 2 && n <= 6 && it.hasBigNumber) set('stats', 0.85);
    if (n >= 2 && (it.hasQuote || (it.hasAvatar && c.paragraphs >= n))) set('testimonials', it.hasQuote ? 0.85 : 0.7);
    if (n >= 2 && n <= 5 && it.hasPrice) set('pricing', it.hasButton ? 0.92 : 0.82);
    // 상품 카드는 글이 짧다(브랜드·이름·가격). 설명 문단이 붙은 기능 카드 속 가격 목업과 구분한다
    if (n >= 4 && cols >= 2 && it.hasImg && it.hasPrice && (it.avgChars ?? 0) <= 100) set('product-grid', 0.93);
    if (n >= 8 && cols === 1 && it.hasLink && !it.hasImg) set('board-list', 0.75);
    if (n >= 4 && it.hasImg && !it.hasHeading && !it.hasPrice && c.paragraphs < n / 2 && !it.hasLogo) set('gallery', 0.75);
    if (n >= 3 && it.hasLink && (it.hasImg || it.hasHeading) && !it.hasPrice) set('content-list', 0.7);
    // 글이 있는 카드(제목·아이콘, 또는 이미지 + 항목마다 문단)만 feature-grid. 항목마다 링크가 있으면 content-list 쪽
    const textItems = it.hasHeading || it.hasIcon || (it.hasImg && c.paragraphs >= n);
    if (n >= 2 && cols >= 2 && rep.sameSig >= 0.6 && textItems && (rep.cv ?? 0) <= 0.25) set('feature-grid', (n >= 3 && cols >= 3 ? 0.8 : 0.7) - (it.hasLink ? 0.2 : 0));
    if (n >= 3 && (rep.cv ?? 0) > 0.25 && (rep.rows || 1) >= 2 && (it.hasImg || it.hasHeading)) set('bento-grid', 0.72);
    if (n >= 2 && cols === 1 && alternates(rep.sides)) set('feature-alternating', 0.86);
    // 모바일은 열이 하나로 쌓인다
    if (ctx.mobile && n >= 2 && cols === 1 && (it.hasHeading || it.hasIcon) && !it.hasPrice && !it.hasQuote && !it.hasBigNumber) set(it.hasImg && it.hasHeading && !it.hasIcon ? 'media-text' : 'feature-grid', 0.6);
  } else if (c.logos >= 4 && c.paragraphs <= 1 && c.headings <= 1 && s.h <= vh * 0.6) set('logo-cloud', 0.8);
  if (s.marquee && (c.logos >= 3 || (it && it.hasLogo))) set('logo-cloud', 0.92);

  if (c.details >= 3 || c.expanders >= 3) set('faq', 0.9);
  if (c.tables >= 1 && c.rows >= 5) set('data-table', 0.9);
  // 제품 화면 목업 속 입력과 구분: <form> 이 있어야 확신한다
  if (c.inputs >= 2 && c.forms >= 1 && media.share < 0.4) set('form', 0.8);
  else if (c.inputs >= 3 && media.share < 0.25) set('form', 0.5);
  else if (c.inputs === 1 && c.forms >= 1) set('form', 0.5);
  if (c.tabs >= 2) set('tabs-showcase', 0.85);
  if (s.carousel) set('carousel', 0.62);
  if ((media.side === 'left' || media.side === 'right') && media.share >= 0.1 && c.headings >= 1) set('media-text', 0.75);
  if (!heroPos && (media.side === 'below' || media.side === 'above' || media.side === 'center') && media.share >= 0.3 && c.headings >= 1) set('media-text', 0.55);
  const smallRepeat = !rep || n < 3;
  if (c.headings >= 1 && c.buttons >= 1 && c.buttons <= 3 && c.paragraphs <= 2 && smallRepeat && s.h <= vh * 0.95 && c.inputs <= 1 && media.share < 0.3) {
    set('cta-band', 0.62 + (s.align === 'center' ? 0.1 : 0) + (s.fullBleed ? 0.05 : 0) + (ctx.i >= ctx.last * 0.6 ? 0.05 : 0));
  }
  if ((c.paragraphs >= 2 || (s.chars || 0) >= 250) && media.share < 0.1 && smallRepeat) set('text-block', 0.6);
  else if ((s.chars || 0) >= 15 && c.buttons === 0 && media.share < 0.1 && smallRepeat && c.inputs === 0) set('text-block', 0.5);
  return sc;
}

export function classifySection(s, ctx) {
  if (s.empty) return { id: 'unknown', alt: null, confidence: 0.1, empty: true };
  const sc = scoreSection(s, ctx);
  const ranked = Object.entries(sc).filter(([id]) => DETECTABLE.includes(id)).sort((a, b) => b[1] - a[1] || DETECTABLE.indexOf(a[0]) - DETECTABLE.indexOf(b[0]));
  if (!ranked.length || ranked[0][1] < 0.35) return { id: 'unknown', alt: ranked[0] ? ranked[0][0] : null, confidence: ranked[0] ? Math.round(ranked[0][1] * 100) / 100 : 0.2 };
  const [best, second] = ranked;
  const margin = second ? best[1] - second[1] : best[1];
  const confidence = Math.round(Math.max(0.2, Math.min(0.98, best[1] - (margin < 0.08 ? 0.12 : 0))) * 100) / 100;
  return { id: best[0], alt: second ? second[0] : null, confidence };
}

const normHead = (h) => (h && h.text ? sanitizeText(h.text, 60).toLowerCase() : '');
const colsOf = (s) => (s.repeat && s.repeat.cols >= 2 && (s.repeat.n >= 3 || (s.repeat.share ?? 1) >= 0.3) ? s.repeat.cols : s.columns || 1);

function classifyAll(raw, body) {
  const secs = (raw && raw.sections) || [];
  const vh = raw && raw.meta ? raw.meta.h : 900;
  const heroIndex = secs.findIndex((s) => !s.nav && s.h >= 120);
  const mobile = raw && raw.meta ? raw.meta.w < 600 : false;
  const list = secs.map((s, i) => ({ s, ...classifySection(s, { i, last: secs.length - 1, heroIndex, vh, body, mobile }) }));
  // 연속된 media-text 가 좌우 교대면 feature-alternating 으로 합친다
  const out = [];
  for (let i = 0; i < list.length; i++) {
    const cur = list[i];
    if (cur.id === 'media-text' && ['left', 'right'].includes(cur.s.media.side)) {
      let j = i;
      while (j + 1 < list.length && list[j + 1].id === 'media-text' && ['left', 'right'].includes(list[j + 1].s.media.side) && list[j + 1].s.media.side !== list[j].s.media.side) j++;
      if (j > i) {
        const group = list.slice(i, j + 1);
        out.push({ ...cur, id: 'feature-alternating', alt: 'media-text', confidence: 0.8, merged: group.length, h: group.reduce((a, g) => a + g.s.h, 0), members: group });
        i = j;
        continue;
      }
    }
    out.push(cur);
  }
  return out;
}

const countOf = (e) => {
  if (e.merged) return e.merged;
  const s = e.s;
  if (e.id === 'faq') return Math.max(s.counts.details || 0, s.counts.expanders || 0) || (s.repeat ? s.repeat.n : null);
  if (e.id === 'feature-alternating') return s.repeat ? s.repeat.n : null;
  if (e.id === 'logo-cloud') return s.repeat ? s.repeat.n : s.counts.logos || null;
  return s.repeat ? s.repeat.n : null;
};

export function label(e) {
  const n = COUNTED.has(e.id) ? countOf(e) : null;
  return n ? `${e.id}(${n})` : e.id;
}

export function analyzeStructure({ desktop, mobile }, { body = 16, roleSizes = {} } = {}) {
  const D = classifyAll(desktop, body);
  const M = mobile ? classifyAll(mobile, body) : [];
  const roleOf = (size) => {
    let best = null;
    for (const [role, v] of Object.entries(roleSizes)) if (v && Math.abs(v - size) / v <= 0.04 && (!best || Math.abs(roleSizes[best] - size) > Math.abs(v - size))) best = role;
    return best;
  };
  // 모바일 매칭: 제목 → 순서·상대 위치
  const usedM = new Set();
  const docD = (desktop && desktop.meta && desktop.meta.docH) || 1;
  const docM = (mobile && mobile.meta && mobile.meta.docH) || 1;
  const match = (d) => {
    const key = normHead(d.s.heading);
    if (key) {
      const hit = M.findIndex((m, k) => !usedM.has(k) && normHead(m.s.heading) === key);
      if (hit >= 0) { usedM.add(hit); return M[hit]; }
    }
    let best = -1;
    let bd = Infinity;
    M.forEach((m, k) => {
      if (usedM.has(k)) return;
      const dist = Math.abs(m.s.y / docM - d.s.y / docD) + (m.id === d.id ? 0 : 0.05);
      if (dist < bd) { bd = dist; best = k; }
    });
    if (best >= 0 && bd < 0.12) { usedM.add(best); return M[best]; }
    return null;
  };
  const changes = [];
  const sections = D.map((d, i) => {
    const m = match(d);
    const s = d.s;
    const headingRole = s.heading ? roleOf(s.heading.size) : null;
    const item = {
      i: i + 1, id: d.id, alt: d.alt, confidence: d.confidence, y: s.y, h: d.h || s.h,
      columns: m ? { desktop: colsOf(s), mobile: colsOf(m.s) } : { desktop: colsOf(s) },
      heading: s.heading ? { tag: s.heading.tag, text: sanitizeText(s.heading.text, 60), size: s.heading.size, role: headingRole } : null,
      media: s.media ? s.media.side : 'none', mediaShare: s.media ? s.media.share : 0,
      bg: s.bg, bgKind: s.bgKind, fullBleed: !!s.fullBleed, align: s.align,
      counts: { headings: s.counts.headings, buttons: s.counts.buttons, images: s.counts.images, inputs: s.counts.inputs, links: s.counts.links },
      repeat: s.repeat ? { n: s.repeat.n, cols: s.repeat.cols } : null,
      count: COUNTED.has(d.id) ? countOf(d) : null,
      mobile: m ? { id: m.id, media: m.s.media ? m.s.media.side : 'none', h: m.s.h } : null,
      src: 'derived',
    };
    if (d.empty) item.empty = true;
    if (s.cls) item.cls = s.cls;
    if (m) {
      const dc = colsOf(s);
      const mc = colsOf(m.s);
      if (dc !== mc) changes.push(`${label(d)}: ${dc}열 → ${mc}열`);
      if (s.media && m.s.media && s.media.side !== m.s.media.side && s.media.side !== 'none') changes.push(`${label(d)}: 미디어 ${s.media.side} → ${m.s.media.side}`);
    } else if (mobile) changes.push(`${label(d)}: 모바일에서 대응 섹션을 찾지 못함`);
    return item;
  });
  const scored = sections.filter((s) => !s.empty);
  const conf = scored.length ? scored.reduce((a, s) => a + s.confidence, 0) / scored.length : 0;
  return {
    sequence: D.map(label).join(' → '),
    mobileSequence: M.length ? M.map(label).join(' → ') : null,
    sections,
    mobileChanges: changes.slice(0, 12),
    pageHeight: mobile ? { desktop: docD, mobile: docM } : docD,
    confidence: Math.round(conf * 100) / 100,
    // 비어 있는 자리(스크롤할 때만 그리는 섹션)는 분모에서 뺀다
    typed: (() => {
      const real = sections.filter((s) => !s.empty);
      return real.length ? Math.round((real.filter((s) => s.id !== 'unknown').length / real.length) * 100) / 100 : 0;
    })(),
    empty: sections.filter((s) => s.empty).length,
  };
}
