// 폰트 패밀리 해석·라이선스 분류. 데이터(font-alternatives.json)는 호출하는 쪽이 넘긴다.

const GENERIC = /^(sans-serif|serif|monospace|cursive|fantasy|system-ui|ui-sans-serif|ui-serif|ui-monospace|ui-rounded|emoji|math|fangsong)$/i;
const SYSTEM = /^(system-ui|-apple-system|blinkmacsystemfont|segoe ui( variable)?|roboto|helvetica neue|helvetica|arial|apple sd gothic neo|applesdgothicneo|malgun gothic|맑은 고딕|ui-sans-serif|ui-serif|ui-monospace|sf pro( display| text| rounded)?|san francisco|ubuntu|cantarell|oxygen|oxygen-sans|fira sans|droid sans|tahoma|verdana|georgia|times new roman|times|courier new|courier|menlo|monaco|consolas|sf mono|noto sans|noto color emoji|apple color emoji|segoe ui emoji|segoe ui symbol|liberation sans|dejavu sans|nanumgothic|nanum gothic|dotum|돋움|gulim|굴림|batang|바탕)$/i;

export function parseStack(stack) {
  return String(stack || '')
    .split(',')
    .map((s) => s.trim().replace(/^["']|["']$/g, '').trim())
    .filter(Boolean);
}

export const normName = (n) => String(n).toLowerCase().replace(/["']/g, '').replace(/[\s_-]+/g, '');

function indexData(fontData) {
  if (!fontData) return new Map();
  if (fontData.__index) return fontData.__index;
  const map = new Map();
  for (const entry of fontData.fonts || []) {
    for (const n of entry.names || []) map.set(normName(n), entry);
  }
  Object.defineProperty(fontData, '__index', { value: map, enumerable: false });
  return map;
}

export function lookupFont(name, fontData) {
  const idx = indexData(fontData);
  let n = normName(name);
  for (let i = 0; i < 3; i++) {
    if (idx.has(n)) return idx.get(n);
    const m = n.replace(/(variable|var|vf|webfont|web|otf|ttf|woff2?|regular|subset)$/, '');
    if (m === n) break;
    n = m;
  }
  return null;
}

export function isGeneric(name) {
  return GENERIC.test(String(name).trim());
}
const TRUE_GENERIC = /^(sans-serif|serif|monospace|cursive|fantasy|emoji|math|fangsong)$/i;
export function isTrueGeneric(name) {
  return TRUE_GENERIC.test(String(name).trim());
}
export function isSystemFamily(name) {
  return SYSTEM.test(String(name).trim());
}

export function genericClass(stack) {
  const names = parseStack(stack);
  const first = (names[0] || '').toLowerCase();
  if (/mono|code|consol|menlo|courier/.test(first) || (names.includes('monospace') && !names.includes('sans-serif'))) return 'mono';
  if (/serif|garamond|times|georgia|myeongjo|batang|바탕|명조|playfair|fraunces|newsreader|tiempos|canela|sectra|maruburi|maru buri|lora|merriweather|libre baskerville|instrument serif/.test(first) && !/sans/.test(first)) return 'serif';
  if (names[names.length - 1] === 'serif' && !names.includes('sans-serif')) return 'serif';
  return 'sans';
}

// 패밀리 하나의 출처·라이선스·대체.
// raw.fonts: {families:[{f,n,loaded}], resources:[{h,f}], googleFamilies:[], services:[]}
export function describeFamily(stack, rawFonts, fontData) {
  const names = parseStack(stack);
  const primary = names.find((n) => !isTrueGeneric(n)) || names[0] || 'sans-serif';
  const faces = (rawFonts && rawFonts.families) || [];
  const face = faces.find((f) => normName(f.f) === normName(primary));
  let source;
  if (face && face.loaded > 0) source = 'webfont';
  else if (isSystemFamily(primary) || isGeneric(primary)) source = 'system';
  else source = 'fallback-likely';
  const entry = lookupFont(primary, fontData);
  let license = entry ? entry.license : 'unknown';
  if (!entry) {
    const google = ((rawFonts && rawFonts.googleFamilies) || []).some((g) => normName(g) === normName(primary));
    const hosts = ((rawFonts && rawFonts.resources) || []).map((r) => r.h);
    const hostMap = (fontData && fontData.hosts) || {};
    if (google) license = 'google';
    else if (source === 'webfont' && hosts.length && hosts.every((h) => hostMap[h] === 'google')) license = 'google';
    else if (source === 'webfont' && hosts.some((h) => hostMap[h] === 'adobe')) license = 'adobe';
    else if (source === 'system') license = 'system-platform';
  }
  const needAlt = ['commercial', 'proprietary', 'adobe', 'system-platform', 'unknown'].includes(license);
  const fallbacks = (fontData && fontData.hangulFallbacks) || [];
  return {
    primary,
    stack: names.slice(0, 6).join(', '),
    source,
    license,
    alternatives: needAlt && entry ? entry.latin || [] : [],
    hangul: entry ? entry.hangul || [] : needAlt ? fallbacks.slice(0, 2) : [],
    embed: entry && entry.embed === false ? false : undefined,
    note: entry && entry.note ? entry.note : undefined,
  };
}
