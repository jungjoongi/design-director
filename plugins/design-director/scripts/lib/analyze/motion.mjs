// 모션: duration p25/p50/p90 → fast/base/slow, 지배 easing, 라이브러리, reduced-motion. 순수 함수.

// hist: [[ms, n]] 의 가중 백분위
export function percentile(hist, p) {
  const list = (hist || []).filter(([v, n]) => v > 0 && n > 0).sort((a, b) => a[0] - b[0]);
  const total = list.reduce((a, [, n]) => a + n, 0);
  if (!total) return null;
  let acc = 0;
  for (const [v, n] of list) {
    acc += n;
    if (acc >= total * p) return v;
  }
  return list[list.length - 1][0];
}

const EASE_NAMES = {
  'cubic-bezier(0.25, 0.1, 0.25, 1)': 'ease',
  'cubic-bezier(0.42, 0, 1, 1)': 'ease-in',
  'cubic-bezier(0, 0, 0.58, 1)': 'ease-out',
  'cubic-bezier(0.42, 0, 0.58, 1)': 'ease-in-out',
};

export function analyzeMotion({ desktop, mobile }) {
  const m = (desktop && desktop.motion) || {};
  const hist = m.transitions || [];
  const total = hist.reduce((a, [, n]) => a + n, 0);
  const easing = (m.easings || [])[0];
  const libs = [...new Set([...(m.libs || []), ...(((mobile && mobile.motion) || {}).libs || [])])].sort();
  return {
    durations: total ? { fast: percentile(hist, 0.25), base: percentile(hist, 0.5), slow: percentile(hist, 0.9) } : null,
    easing: easing ? EASE_NAMES[easing[0]] || easing[0] : null,
    transitions: total,
    animations: m.animations || 0,
    libs,
    reducedMotion: m.reducedMotion === undefined ? null : m.reducedMotion,
    src: 'measured',
  };
}
