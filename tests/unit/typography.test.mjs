// 타이포: 스케일 적합도, clamp, 역할 배정, 패밀리 출처·라이선스.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { assignRoles, fitScale, fluidClamp } from '../../plugins/design-director/scripts/lib/analyze/typography.mjs';
import { describeFamily, genericClass, lookupFont, parseStack } from '../../plugins/design-director/scripts/lib/analyze/fonts.mjs';

const FONT_DATA = JSON.parse(readFileSync(new URL('../../plugins/design-director/scripts/data/font-alternatives.json', import.meta.url), 'utf8'));

test('스케일: 16/20/25/31.25/39 → 1.25 major-third', () => {
  const r = fitScale([20, 25, 31.25, 39], 16);
  assert.equal(r.ratio, 1.25);
  assert.equal(r.ratioName, 'major-third');
  assert.ok(r.fit >= 0.95, `fit ${r.fit}`);
});

test('스케일: 1.5 배수는 perfect-fifth, 들쭉날쭉하면 custom', () => {
  assert.equal(fitScale([24, 36, 54], 16).ratioName, 'perfect-fifth');
  const messy = fitScale([17.3, 21.9, 29.4, 41.7], 16);
  assert.ok(messy.fit < 0.6 ? messy.ratioName === 'custom' : true);
  assert.equal(fitScale([], 16).ratioName, 'custom');
});

test('clamp: 390→1440 선형, 모바일 40 / 데스크톱 64', () => {
  // slope = 24/1050, intercept = 40 − 390·slope = 31.086px = 1.943rem, 100·slope = 2.286vw
  assert.equal(fluidClamp(40, 64), 'clamp(2.5rem, 1.943rem + 2.286vw, 4rem)');
  assert.equal(fluidClamp(36, 56), 'clamp(2.25rem, 1.786rem + 1.905vw, 3.5rem)');
  // 모바일이 더 크면 음의 기울기
  assert.match(fluidClamp(18, 15), /^clamp\(0\.938rem, [\d.]+rem - [\d.]+vw, 1\.125rem\)$/);
});

const S = (s, c, x = {}, extra = {}) => ({ f: 'Inter, sans-serif', s, w: 400, lh: 1.5, ls: 0, tt: '', it: 0, c, n: 1, a: c * s, y: 0, x, col: [], ...extra });

test('역할: body 는 헤딩·버튼·내비 밖 13–20px 최다, 헤딩은 태그 우선, display 규칙', () => {
  const styles = [
    S(16, 3000, { p: 3000 }),
    S(14, 900, { ftr: 900, link: 900 }),
    S(15, 400, { nav: 400 }),
    S(16, 300, { btn: 300 }, { w: 600 }),
    S(96, 30, {}, { w: 700, n: 1 }),
    S(64, 60, { h1: 60 }, { w: 700, n: 1 }),
    S(40, 200, { h2: 200 }, { w: 600, n: 6 }),
    S(24, 300, { h3: 300 }, { w: 600, n: 9 }),
    S(20, 150, { hero: 150, p: 150 }),
    S(12, 80, { eb: 80, up: 80 }, { tt: 'uppercase', w: 600, ls: 0.08 }),
  ];
  const { roles } = assignRoles(styles);
  assert.equal(roles.body.s, 16);
  assert.equal(roles.display.s, 96);
  assert.equal(roles.h1.s, 64);
  assert.equal(roles.h2.s, 40);
  assert.equal(roles.h3.s, 24);
  assert.equal(roles['body-lg'].s, 20);
  assert.equal(roles.small.s, 14);
  assert.equal(roles.button.s, 16);
  assert.equal(roles.nav.s, 15);
  assert.equal(roles.eyebrow.s, 12);
});

test('역할: 태그가 없으면 크기순으로 h1·h2·h3, display 는 3회 이하·15% 큼일 때만', () => {
  const a = assignRoles([S(16, 2000, { p: 2000 }), S(48, 50, {}, { n: 5 }), S(32, 80), S(24, 120)]).roles;
  assert.deepEqual([a.h1.s, a.h2.s, a.h3.s], [48, 32, 24]);
  assert.equal(a.display, undefined);
  const b = assignRoles([S(16, 2000, { p: 2000 }), S(72, 20, {}, { n: 1 }), S(48, 50, {}, { n: 5 }), S(32, 80)]).roles;
  assert.equal(b.display.s, 72);
  assert.deepEqual([b.h1.s, b.h2.s], [48, 32]);
});

test('패밀리: 스택 해석·일반 분류', () => {
  assert.deepEqual(parseStack('"Inter Variable", "SF Pro Display", sans-serif'), ['Inter Variable', 'SF Pro Display', 'sans-serif']);
  assert.equal(genericClass('"Berkeley Mono", ui-monospace, monospace'), 'mono');
  assert.equal(genericClass('"Noto Serif KR", serif'), 'serif');
  assert.equal(genericClass('Pretendard, sans-serif'), 'sans');
});

test('라이선스: 데이터·호스트·로드 상태로 분류하고 대체를 단다', () => {
  assert.equal(lookupFont('Inter Variable', FONT_DATA).license, 'ofl');
  assert.equal(lookupFont('söhne', FONT_DATA).license, 'commercial');
  const webfont = describeFamily('"Söhne", sans-serif', { families: [{ f: 'Söhne', n: 2, loaded: 2 }], resources: [] }, FONT_DATA);
  assert.equal(webfont.source, 'webfont');
  assert.equal(webfont.license, 'commercial');
  assert.deepEqual(webfont.alternatives, ['Inter', 'Geist']);
  const fallback = describeFamily('"Fancy Grotesk", sans-serif', { families: [{ f: 'Fancy Grotesk', n: 1, loaded: 0 }], resources: [] }, FONT_DATA);
  assert.equal(fallback.source, 'fallback-likely');
  assert.equal(fallback.license, 'unknown');
  const google = describeFamily('"Some Google Face", sans-serif', { families: [{ f: 'Some Google Face', n: 1, loaded: 1 }], resources: [{ h: 'fonts.gstatic.com', f: 'x.woff2' }], googleFamilies: [] }, FONT_DATA);
  assert.equal(google.license, 'google');
  const sys = describeFamily('system-ui, -apple-system, sans-serif', { families: [] }, FONT_DATA);
  assert.equal(sys.primary, 'system-ui');
  assert.equal(sys.source, 'system');
  assert.equal(sys.license, 'system-platform');
  assert.equal(sys.embed, false);
  const toss = describeFamily('"Toss Product Sans", sans-serif', { families: [{ f: 'Toss Product Sans', n: 1, loaded: 1 }] }, FONT_DATA);
  assert.equal(toss.license, 'proprietary');
  assert.deepEqual(toss.hangul, ['Pretendard', 'Wanted Sans']);
});
