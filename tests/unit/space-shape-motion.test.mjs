// 간격 기준 단위, radius·그림자, 모션.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { adherence, detectBase, median } from '../../plugins/design-director/scripts/lib/analyze/space.mjs';
import { analyzeRadius, analyzeShadows, elevation, isRing, parseShadow, radiusCharacter } from '../../plugins/design-director/scripts/lib/analyze/shape.mjs';
import { analyzeMotion, percentile } from '../../plugins/design-director/scripts/lib/analyze/motion.mjs';

test('기준 단위 8: 8의 배수가 대부분', () => {
  const h = [[8, 40], [16, 60], [24, 30], [32, 20], [48, 10], [96, 8], [12, 4]];
  assert.ok(adherence(h, 8) >= 0.9);
  assert.deepEqual(detectBase(h), { base: 8, adherence: 0.98 }); // 12(4건)만 벗어난다: 168/172
});

test('기준 단위 4: 4·12·20 이 섞이면 8 이 아니라 4', () => {
  const h = [[4, 30], [12, 40], [20, 25], [8, 20], [16, 20], [28, 10]];
  const r = detectBase(h);
  assert.equal(r.base, 4);
});

test('불규칙: 어떤 단위도 0.7 미만이면 null', () => {
  const h = [[7, 20], [13, 20], [19, 20], [23, 20], [37, 20], [3, 10]];
  const r = detectBase(h);
  assert.equal(r.base, null);
  assert.ok(r.adherence < 0.7);
});

test('허용 오차는 max(0.5, 0.06v): 47 은 48(8의 배수)로 본다', () => {
  assert.equal(adherence([[47, 1]], 8), 1);
  assert.equal(adherence([[44, 1]], 8), 0);
  assert.equal(median([3, 1, 2]), 2);
  assert.equal(median([]), null);
});

test('radius 성격과 컴포넌트별 값', () => {
  assert.equal(radiusCharacter(0), 'sharp');
  assert.equal(radiusCharacter(6), 'soft');
  assert.equal(radiusCharacter(12), 'rounded');
  assert.equal(radiusCharacter(24), 'very-rounded');
  assert.equal(radiusCharacter('pill'), 'very-rounded');
  const r = analyzeRadius([['card', 12, 10], ['button', 8, 6], ['button', 'pill', 2], ['badge', 'pill', 4], ['input', 6, 3], ['avatar', 'pill', 5]]);
  assert.equal(r.character, 'rounded');
  assert.deepEqual(r.components, { button: 8, input: 6, card: 12, badge: 'pill' });
  assert.deepEqual(r.steps, [6, 8, 12]);
  assert.equal(r.pillShare, 0.37);
});

test('그림자: 레이어 분해, elevation, ring, 단계', () => {
  const v = 'rgba(17, 24, 39, 0.06) 0px 1px 2px 0px, rgba(17, 24, 39, 0.08) 0px 4px 12px 0px';
  const layers = parseShadow(v);
  assert.equal(layers.length, 2);
  assert.deepEqual(layers[1], { x: 0, y: 4, blur: 12, spread: 0, alpha: 0.08, inset: false });
  assert.equal(elevation(layers), 0.8); // (4 + 6) × 0.08
  assert.ok(isRing(parseShadow('rgba(0, 0, 0, 0.2) 0px 0px 0px 1px')));
  assert.ok(!isRing(layers));
  assert.equal(elevation(parseShadow('rgba(0, 0, 0, 0.2) 0px 0px 12px 0px inset')), 0);
  const res = analyzeShadows([
    { v: 'rgba(0, 0, 0, 0.1) 0px 1px 2px 0px', n: 20 },
    { v: 'rgba(0, 0, 0, 0.12) 0px 8px 24px 0px', n: 6 },
    { v: 'rgba(0, 0, 0, 0.3) 0px 24px 64px 0px', n: 2 },
    { v: 'rgba(0, 0, 0, 0.2) 0px 0px 0px 1px', n: 5 },
  ]);
  assert.equal(res.tiers.length, 3);
  assert.deepEqual(res.tiers.map((t) => t.name), ['sm', 'md', 'lg']);
  assert.equal(res.ringShadow, true);
  assert.equal(res.style, 'dramatic'); // 최대 elevation (24 + 32) × 0.3 = 16.8
  assert.equal(analyzeShadows([]).style, 'flat');
  assert.equal(analyzeShadows([{ v: v, n: 4 }]).style, 'layered');
  assert.equal(analyzeShadows([{ v: 'rgba(0, 0, 0, 0.05) 0px 1px 3px 0px', n: 9 }]).style, 'subtle');
});

test('모션: 가중 백분위와 easing 이름', () => {
  const hist = [[150, 10], [200, 5], [300, 3], [600, 2]];
  assert.equal(percentile(hist, 0.25), 150);
  assert.equal(percentile(hist, 0.5), 150);
  assert.equal(percentile(hist, 0.9), 300);
  const m = analyzeMotion({ desktop: { motion: { transitions: hist, easings: [['cubic-bezier(0.25, 0.1, 0.25, 1)', 9]], animations: 2, libs: ['gsap'], reducedMotion: true } }, mobile: { motion: { libs: ['aos'] } } });
  assert.deepEqual(m.durations, { fast: 150, base: 150, slow: 300 });
  assert.equal(m.easing, 'ease');
  assert.deepEqual(m.libs, ['aos', 'gsap']);
  assert.equal(m.reducedMotion, true);
  assert.equal(analyzeMotion({ desktop: { motion: {} } }).durations, null);
});
