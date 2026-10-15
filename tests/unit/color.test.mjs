// 색 변환·거리·대비·군집.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { blend, chroma, contrastRatio, deltaE, oklabToRgb, oklchString, parseCss, rgbToOklab, toHex } from '../../plugins/design-director/scripts/lib/analyze/color.mjs';
import { clusterColors } from '../../plugins/design-director/scripts/lib/analyze/cluster.mjs';

const near = (a, b, eps, msg) => assert.ok(Math.abs(a - b) <= eps, `${msg ?? ''} ${a} ≉ ${b} (±${eps})`);

test('parseCss: hex 3·4·6·8자리, rgb(), hsl(), oklch()', () => {
  assert.deepEqual(parseCss('#fff'), { r: 255, g: 255, b: 255, a: 1 });
  assert.deepEqual(parseCss('#11182780'), { r: 17, g: 24, b: 39, a: 0.502 });
  assert.deepEqual(parseCss('#0f08'), { r: 0, g: 255, b: 0, a: 0.533 });
  assert.deepEqual(parseCss('rgb(17, 24, 39)'), { r: 17, g: 24, b: 39, a: 1 });
  assert.deepEqual(parseCss('rgba(0, 0, 0, 0.5)'), { r: 0, g: 0, b: 0, a: 0.5 });
  assert.deepEqual(parseCss('rgb(0 0 0 / 25%)'), { r: 0, g: 0, b: 0, a: 0.25 });
  assert.deepEqual(parseCss('hsl(0 100% 50%)'), { r: 255, g: 0, b: 0, a: 1 });
  assert.deepEqual(parseCss('hsl(222.2 47.4% 11.2%)'), { r: 15, g: 23, b: 42, a: 1 });
  const o = parseCss('oklch(0.628 0.2577 29.23)'); // sRGB 빨강
  assert.ok(o.r >= 250 && o.g <= 6 && o.b <= 6, JSON.stringify(o));
  assert.equal(parseCss('nonsense'), null);
  assert.equal(parseCss('var(--x)'), null);
});

test('OKLab 왕복과 알려진 값', () => {
  const white = rgbToOklab({ r: 255, g: 255, b: 255 });
  near(white.L, 1, 1e-3, 'white L');
  near(white.a, 0, 1e-3);
  const red = rgbToOklab({ r: 255, g: 0, b: 0 });
  near(red.L, 0.628, 2e-3, 'red L');
  near(red.a, 0.2249, 2e-3, 'red a');
  near(red.b, 0.1258, 2e-3, 'red b');
  for (const hex of ['#111827', '#5e6ad2', '#f6f7f9', '#e4f222']) {
    const c = parseCss(hex);
    assert.equal(toHex(oklabToRgb(rgbToOklab(c))), hex.toUpperCase(), hex);
  }
});

test('ΔE_ok: 같은 색 0, 흰색↔검정 1', () => {
  const w = rgbToOklab({ r: 255, g: 255, b: 255 });
  const k = rgbToOklab({ r: 0, g: 0, b: 0 });
  near(deltaE(w, w), 0, 1e-9);
  near(deltaE(w, k), 1, 1e-3);
  assert.ok(deltaE(rgbToOklab(parseCss('#ffffff')), rgbToOklab(parseCss('#f6f7f9'))) > 0.015);
});

test('WCAG 대비: #777 on #fff ≈ 4.48, 검정/흰색 21, 알파 합성', () => {
  near(contrastRatio(parseCss('#777'), parseCss('#fff')), 4.48, 0.01, '#777/#fff');
  near(contrastRatio(parseCss('#000'), parseCss('#fff')), 21, 1e-6);
  // 반투명 검정 50% 를 흰 배경에 합성하면 #808080 근처
  const semi = contrastRatio({ r: 0, g: 0, b: 0, a: 0.5 }, parseCss('#fff'));
  near(semi, contrastRatio(parseCss('#808080'), parseCss('#fff')), 0.05);
  assert.deepEqual(blend({ r: 0, g: 0, b: 0, a: 0.5 }, { r: 255, g: 255, b: 255, a: 1 }), { r: 128, g: 128, b: 128, a: 1 });
});

test('oklchString·chroma·toHex', () => {
  assert.equal(oklchString(parseCss('#ffffff')), 'oklch(1 0 0)');
  assert.ok(chroma(parseCss('#6b7280')) < 0.03);
  assert.ok(chroma(parseCss('#1c69e3')) > 0.1);
  assert.equal(toHex({ r: 255, g: 255, b: 255, a: 0.08 }), '#FFFFFF14');
  assert.equal(toHex({ r: 255, g: 255, b: 255, a: 0.08 }, false), '#FFFFFF');
});

test('군집: 대표는 가중치 최대 실측색이고 평균을 만들지 않는다', () => {
  const cl = clusterColors([
    { hex: '#111827', w: 10 },
    { hex: '#121828', w: 30 }, // ΔE < 0.025 → 같은 군집, 대표
    { hex: '#6b7280', w: 5 },
  ]);
  assert.equal(cl.length, 2);
  assert.equal(cl[0].hex, '#121828');
  assert.equal(cl[0].w, 40);
  assert.equal(cl[1].hex, '#6B7280');
  // threshold 가 작으면 나뉜다
  assert.equal(clusterColors([{ hex: '#ffffff', w: 5 }, { hex: '#f6f7f9', w: 1 }], { threshold: 0.015 }).length, 2);
  // 알파색은 canvas 위에 합성해서 거리를 잰다
  const dark = { r: 8, g: 9, b: 10, a: 1 };
  const a = clusterColors([{ hex: '#ffffff14', w: 3 }, { hex: '#1b1c1d', w: 1 }], { canvas: dark });
  assert.equal(a.length, 1);
  assert.equal(a[0].hex, '#FFFFFF14');
});
