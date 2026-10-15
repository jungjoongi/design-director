// 간격·레이아웃: 기준 단위, 단계, 섹션 여백, 컨테이너, 거터, 그리드, 밀도. 순수 함수.

const round = (v, d = 2) => Math.round(v * 10 ** d) / 10 ** d;

export function median(values) {
  const v = values.filter((x) => Number.isFinite(x)).sort((a, b) => a - b);
  if (!v.length) return null;
  const m = Math.floor(v.length / 2);
  return v.length % 2 ? v[m] : (v[m - 1] + v[m]) / 2;
}

// adherence(B) = Σw·[dist(v, B 의 가장 가까운 배수) ≤ max(0.5, 0.06v)] / Σw
export function adherence(hist, B) {
  let ok = 0;
  let all = 0;
  for (const [v, w] of hist) {
    if (!(v >= 2) || !(w > 0)) continue;
    const dist = Math.abs(v - Math.round(v / B) * B);
    all += w;
    if (dist <= Math.max(0.5, 0.06 * v)) ok += w;
  }
  return all ? ok / all : 0;
}

export function detectBase(hist) {
  const a8 = adherence(hist, 8);
  if (a8 >= 0.7) return { base: 8, adherence: round(a8) };
  const a4 = adherence(hist, 4);
  if (a4 >= 0.7) return { base: 4, adherence: round(a4) };
  const alt = [6, 5, 10].map((B) => ({ base: B, adherence: adherence(hist, B) })).sort((x, y) => y.adherence - x.adherence)[0];
  if (alt.adherence >= 0.7) return { base: alt.base, adherence: round(alt.adherence) };
  return { base: null, adherence: round(Math.max(a8, a4, alt.adherence)) };
}

function mergeHist(...lists) {
  const m = new Map();
  for (const list of lists) for (const [v, w] of list || []) m.set(v, (m.get(v) || 0) + w);
  return [...m.entries()];
}

const top = (hist, pred = () => true) => {
  const h = (hist || []).filter(([v]) => pred(v)).sort((a, b) => b[1] - a[1] || a[0] - b[0]);
  return h.length ? h[0][0] : null;
};

function sectionPad(raw) {
  const vals = [];
  for (const s of (raw && raw.sections) || []) {
    if (s.nav || s.footer || s.h < 120) continue;
    // 위쪽 내용 오프셋만 쓴다(아래쪽은 카드 패딩·마지막 요소 margin 이 섞인다)
    if (Number.isFinite(s.pt) && s.pt >= 0) vals.push(s.pt);
  }
  const m = median(vals);
  return m === null ? null : Math.round(m);
}

function vp(desktop, mobile, fn) {
  const d = desktop ? fn(desktop) : null;
  const m = mobile ? fn(mobile) : null;
  if (d === null && m === null) return null;
  if (m === null || d === m) return d ?? m;
  if (d === null) return { mobile: m };
  return { desktop: d, mobile: m };
}

export function analyzeSpace({ desktop, mobile }, structure = null) {
  const S = (r) => (r && r.space) || {};
  const hist = mergeHist(S(desktop).padding, S(desktop).margin, S(desktop).gap);
  const { base, adherence: adh } = detectBase(hist);
  const total = hist.reduce((a, [, w]) => a + w, 0) || 1;
  const steps = hist.filter(([v, w]) => v >= 2 && w / total >= 0.02).map(([v]) => v).sort((a, b) => a - b).slice(0, 14);

  const docW = desktop && desktop.meta ? desktop.meta.docW : 1440;
  const maxWidth = top(S(desktop).containers, (v) => v >= 600 && v <= docW - 16);
  const gutterOf = (raw) => {
    const sp = S(raw);
    const isMobile = raw.meta && raw.meta.w < 600;
    if (!isMobile) {
      const cp = top(sp.containerPad, (v) => v >= 8 && v <= 120);
      if (cp !== null) return cp;
    }
    const g = top(sp.gutters, (v) => v >= 8 && v <= 120);
    if (g !== null) return g;
    if (isMobile) return top(sp.textLeft, (v) => v >= 8 && v <= 48);
    return null;
  };
  const gapOf = (raw) => {
    const byGap = new Map();
    for (const [, gap, n] of S(raw).grids || []) if (gap > 0) byGap.set(gap, (byGap.get(gap) || 0) + n);
    const g = [...byGap.entries()].sort((a, b) => b[1] - a[1] || a[0] - b[0])[0];
    return g ? g[0] : top(S(raw).gap, (v) => v >= 8);
  };
  const colsCount = new Map();
  for (const s of (desktop && desktop.sections) || []) {
    const c = s.repeat && s.repeat.cols >= 2 && (s.repeat.n >= 3 || (s.repeat.share ?? 1) >= 0.3) ? s.repeat.cols : s.columns >= 2 ? s.columns : null;
    if (c) colsCount.set(c, (colsCount.get(c) || 0) + 1);
  }
  const columns = [...colsCount.entries()].sort((a, b) => b[1] - a[1] || b[0] - a[0]).map(([c]) => c).slice(0, 4);
  const fs = S(desktop).firstScreen;
  const ws = fs ? fs.whitespace : null;
  const density = ws === null ? null : ws >= 0.6 ? 'airy' : ws < 0.4 ? 'dense' : 'balanced';
  return {
    base,
    adherence: adh,
    steps,
    src: 'derived',
    section: { paddingY: vp(desktop, mobile, sectionPad), src: 'measured' },
    container: { maxWidth, gutter: vp(desktop, mobile, gutterOf), src: 'measured' },
    grid: { columns, gap: vp(desktop, mobile, gapOf), src: 'measured' },
    density: { value: density, whitespace: ws, src: 'derived' },
  };
}
