// OKLab 군집. 대표는 가중치가 가장 큰 실측색이다(평균 금지: 사이트에 없는 색을 만들지 않는다).
import { blend, deltaE, parseCss, rgbToOklab, toHex } from './color.mjs';

// items: [{hex, w, ...extra}] → [{hex, rgb, lab, w, members:[...]}] (w 내림차순)
// canvas 가 있으면 알파색을 그 위에 합성한 색으로 거리를 잰다.
export function clusterColors(items, { threshold = 0.025, canvas = null } = {}) {
  const parsed = [];
  for (const it of items) {
    const rgb = parseCss(it.hex);
    if (!rgb || rgb.a <= 0.02 || !(it.w > 0)) continue;
    const solid = rgb.a < 0.995 && canvas ? blend(rgb, canvas) : rgb;
    parsed.push({ ...it, rgb, solid, lab: rgbToOklab(solid) });
  }
  // 가중치 내림차순, 같으면 hex 사전순(결정적)
  parsed.sort((x, y) => y.w - x.w || (x.hex < y.hex ? -1 : x.hex > y.hex ? 1 : 0));
  const clusters = [];
  for (const p of parsed) {
    const hit = clusters.find((c) => deltaE(c.lab, p.lab) < threshold);
    if (hit) {
      hit.w += p.w;
      hit.members.push(p);
    } else {
      clusters.push({ hex: toHex(p.rgb), solidHex: toHex(p.solid, false), rgb: p.rgb, solid: p.solid, lab: p.lab, w: p.w, members: [p] });
    }
  }
  clusters.sort((x, y) => y.w - x.w || (x.hex < y.hex ? -1 : 1));
  return clusters;
}

export function totalWeight(clusters) {
  return clusters.reduce((a, c) => a + c.w, 0);
}
