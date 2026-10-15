// 섹션 분류: 감지 ✓ id 마다 합성 특징 하나, 교대 media-text 병합, 모바일 매칭.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { analyzeStructure, classifySection, DETECTABLE } from '../../plugins/design-director/scripts/lib/analyze/structure.mjs';

const C = (o = {}) => ({ headings: 0, paragraphs: 0, images: 0, logos: 0, buttons: 0, inputs: 0, links: 0, listItems: 0, icons: 0, details: 0, tabs: 0, tables: 0, rows: 0, expanders: 0, forms: 0, ...o });
const ITEM = (o = {}) => ({ hasImg: false, hasHeading: false, hasButton: false, hasIcon: false, hasPrice: false, hasBigNumber: false, hasQuote: false, hasAvatar: false, hasLogo: false, hasLink: false, ...o });
const REP = (n, cols, item, extra = {}) => ({ n, sameSig: 1, cols, rows: Math.ceil(n / cols), cv: 0, share: 0.5, item: ITEM(item), sides: '', ...extra });
const SEC = (o = {}) => ({
  y: 1200, h: 600, w: 1440, tag: 'section', bg: '#ffffff', bgKind: 'inherit', fullBleed: false,
  heading: { tag: 'h2', text: 'Heading', size: 40 }, align: 'left', counts: C(), columns: 1, repeat: null,
  media: { side: 'none', share: 0 }, carousel: false, marquee: false, fs: 40, chars: 120, pt: 96, pb: 96, nav: false, footer: false, sticky: false, ...o,
});
const CTX = { i: 3, last: 9, heroIndex: 1, vh: 900, body: 16 };
const HERO = { ...CTX, i: 1 };

const cases = {
  nav: [SEC({ y: 0, h: 64, tag: 'header', nav: true, heading: null, counts: C({ links: 5, buttons: 1 }) }), { ...CTX, i: 0 }],
  'hero-centered': [SEC({ y: 64, h: 700, align: 'center', heading: { tag: 'h1', text: 'H', size: 64 }, counts: C({ headings: 1, buttons: 2 }) }), HERO],
  'hero-split': [SEC({ y: 64, h: 700, heading: { tag: 'h1', text: 'H', size: 56 }, columns: 2, media: { side: 'right', share: 0.3 }, counts: C({ headings: 1, buttons: 2, images: 1 }) }), HERO],
  'hero-product': [SEC({ y: 64, h: 1100, align: 'center', heading: { tag: 'h1', text: 'H', size: 64 }, media: { side: 'below', share: 0.5 }, counts: C({ headings: 1, buttons: 2, images: 1 }) }), HERO],
  'hero-media': [SEC({ y: 0, h: 900, bgKind: 'image', fullBleed: true, heading: { tag: 'h1', text: 'H', size: 72 }, media: { side: 'bg', share: 0.95 }, counts: C({ headings: 1, buttons: 1 }) }), HERO],
  'hero-type': [SEC({ y: 64, h: 700, heading: { tag: 'h1', text: 'H', size: 120 }, counts: C({ headings: 1 }) }), HERO],
  'logo-cloud': [SEC({ h: 160, heading: null, counts: C({ paragraphs: 1, images: 6, logos: 6 }), repeat: REP(6, 6, { hasLogo: true, hasImg: true }) }), CTX],
  stats: [SEC({ counts: C({ headings: 1 }), repeat: REP(4, 4, { hasBigNumber: true }) }), CTX],
  'feature-grid': [SEC({ counts: C({ headings: 4, paragraphs: 3, icons: 3 }), repeat: REP(3, 3, { hasHeading: true, hasIcon: true }) }), CTX],
  'bento-grid': [SEC({ counts: C({ headings: 6, images: 5 }), repeat: REP(5, 3, { hasHeading: true, hasImg: true }, { cv: 0.4, rows: 2 }) }), CTX],
  'feature-alternating': [SEC({ h: 1100, counts: C({ headings: 3, paragraphs: 2, images: 2 }), media: { side: 'right', share: 0.15 }, repeat: REP(2, 1, { hasHeading: true, hasImg: true }, { sides: 'RL' }) }), CTX],
  'media-text': [SEC({ columns: 2, media: { side: 'left', share: 0.35 }, counts: C({ headings: 1, paragraphs: 2, images: 1 }) }), CTX],
  'tabs-showcase': [SEC({ counts: C({ headings: 1, tabs: 4, images: 1 }), media: { side: 'below', share: 0.25 } }), CTX],
  carousel: [SEC({ carousel: true, counts: C({ headings: 1, images: 8 }), media: { side: 'center', share: 0.2 } }), CTX],
  testimonials: [SEC({ counts: C({ headings: 1, paragraphs: 3, images: 3 }), repeat: REP(3, 3, { hasQuote: true, hasAvatar: true }) }), CTX],
  pricing: [SEC({ counts: C({ headings: 4, buttons: 3 }), repeat: REP(3, 3, { hasPrice: true, hasButton: true, hasHeading: true }) }), CTX],
  faq: [SEC({ counts: C({ headings: 1, details: 6 }) }), CTX],
  'cta-band': [SEC({ h: 320, align: 'center', fullBleed: true, bg: '#111827', bgKind: 'solid', counts: C({ headings: 1, paragraphs: 1, buttons: 1 }) }), { ...CTX, i: 8 }],
  form: [SEC({ counts: C({ headings: 1, inputs: 4, buttons: 1, forms: 1 }) }), CTX],
  gallery: [SEC({ counts: C({ headings: 1, images: 8 }), repeat: REP(8, 4, { hasImg: true }) }), CTX],
  'content-list': [SEC({ counts: C({ headings: 7, images: 6, links: 6 }), repeat: REP(6, 3, { hasImg: true, hasHeading: true, hasLink: true }) }), CTX],
  'text-block': [SEC({ chars: 900, counts: C({ headings: 1, paragraphs: 5 }) }), CTX],
  footer: [SEC({ tag: 'footer', footer: true, counts: C({ links: 20 }) }), { ...CTX, i: 9 }],
  'data-table': [SEC({ counts: C({ headings: 1, tables: 1, rows: 12 }) }), CTX],
  'product-grid': [SEC({ counts: C({ images: 8, links: 8 }), repeat: REP(8, 4, { hasImg: true, hasPrice: true, hasLink: true, avgChars: 40 }) }), CTX],
  'board-list': [SEC({ counts: C({ links: 20, listItems: 20 }), repeat: REP(20, 1, { hasLink: true }) }), CTX],
  unknown: [SEC({ heading: null, chars: 0, counts: C({ buttons: 5 }), h: 1400 }), CTX],
};

test('감지 ✓ id 가 sections.md 와 같은 집합이다', () => {
  const md = readFileSync(new URL('../../plugins/design-director/references/sections.md', import.meta.url), 'utf8');
  const ids = [...md.matchAll(/^\| `([a-z0-9-]+)` \|[^\n]*\| ✓ \|/gm)].map((m) => m[1]);
  assert.deepEqual([...ids].sort(), [...DETECTABLE].sort());
});

for (const id of DETECTABLE) {
  test(`분류: ${id}`, () => {
    assert.ok(cases[id], `${id} 케이스가 없다`);
    const [s, ctx] = cases[id];
    const r = classifySection(s, ctx);
    assert.equal(r.id, id, `got ${r.id} (alt ${r.alt}, ${r.confidence})`);
    assert.ok(r.confidence > 0 && r.confidence <= 1);
  });
}

test('연속된 media-text 가 좌우 교대면 feature-alternating(n) 으로 합친다', () => {
  const mt = (side, y) => SEC({ y, columns: 2, media: { side, share: 0.3 }, counts: C({ headings: 1, paragraphs: 2, images: 1 }) });
  const hero = SEC({ y: 64, h: 700, align: 'center', heading: { tag: 'h1', text: 'H', size: 64 }, counts: C({ headings: 1, buttons: 2 }) });
  const raw = { meta: { w: 1440, h: 900, docH: 5000 }, sections: [SEC({ y: 0, h: 64, nav: true, heading: null }), hero, mt('right', 800), mt('left', 1400), mt('right', 2000), SEC({ y: 4600, footer: true })] };
  const st = analyzeStructure({ desktop: raw, mobile: null });
  assert.equal(st.sequence, 'nav → hero-centered → feature-alternating(3) → footer');
  // 같은 쪽이 이어지면 합치지 않는다
  const same = { ...raw, sections: [raw.sections[0], hero, mt('right', 800), mt('right', 1400), raw.sections[5]] };
  assert.equal(analyzeStructure({ desktop: same }).sequence, 'nav → hero-centered → media-text → media-text → footer');
});

test('모바일 매칭: 같은 제목을 찾아 열 변화를 적는다', () => {
  const d = { meta: { w: 1440, h: 900, docH: 3000 }, sections: [SEC({ y: 0, h: 64, nav: true, heading: null }), SEC({ y: 900, heading: { tag: 'h2', text: 'Features', size: 40 }, counts: C({ headings: 4 }), repeat: REP(3, 3, { hasHeading: true, hasIcon: true }) })] };
  const m = { meta: { w: 390, h: 844, docH: 5000 }, sections: [SEC({ y: 0, h: 56, nav: true, heading: null }), SEC({ y: 1500, heading: { tag: 'h2', text: 'Features', size: 32 }, counts: C({ headings: 4 }), repeat: REP(3, 1, { hasHeading: true, hasIcon: true }) })] };
  const st = analyzeStructure({ desktop: d, mobile: m });
  assert.deepEqual(st.sections[1].columns, { desktop: 3, mobile: 1 });
  assert.ok(st.mobileChanges.some((c) => c.includes('3열 → 1열')));
  assert.equal(st.mobileSequence, 'nav → feature-grid(3)');
});
