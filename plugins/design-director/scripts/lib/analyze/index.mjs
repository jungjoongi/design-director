// raw → tokens (dd.tokens/1). 순수 함수: node:*·process·Buffer 를 쓰지 않는다. 결정적이다(시간·난수 없음).
import { analyzeComponents } from './components.mjs';
import { analyzeMotion } from './motion.mjs';
import { analyzePalette } from './palette.mjs';
import { sanitizeText } from './sanitize.mjs';
import { analyzeBorder, analyzeRadius, analyzeShadows } from './shape.mjs';
import { analyzeSpace } from './space.mjs';
import { analyzeStructure } from './structure.mjs';
import { analyzeTypography } from './typography.mjs';

const round = (v, d = 2) => Math.round(v * 10 ** d) / 10 ** d;
const level = (v) => (v >= 0.75 ? 'high' : v >= 0.5 ? 'medium' : 'low');

export function analyze({ desktop, mobile = null, capture = null }, { fontData = null, generator = 'design-director' } = {}) {
  if (!desktop || desktop.schema !== 'dd.raw/1') throw new Error('desktop raw(dd.raw/1)가 없다');
  const warnings = [];
  const warn = (code, message) => {
    if (!warnings.some((w) => w.code === code && w.message === message)) warnings.push({ code, message });
  };
  for (const w of (desktop.meta && desktop.meta.warnings) || []) warn(w.code, `desktop: ${sanitizeText(w.message, 160)}`);
  for (const w of (mobile && mobile.meta && mobile.meta.warnings) || []) warn(w.code, `mobile: ${sanitizeText(w.message, 160)}`);
  if (!mobile) warn('MOBILE_MISSING', 'mobile raw 가 없어 반응형 값은 데스크톱 값만 있다');
  if (desktop.meta && desktop.meta.sampled) warn('SAMPLED', `요소 ${desktop.meta.elements}개 중 ${desktop.meta.measured}개만 샘플링해 쟀다`);
  if (desktop.meta && desktop.meta.trimmed && desktop.meta.trimmed.length) warn('RAW_TRIMMED', `raw 크기 제한으로 잘린 항목: ${desktop.meta.trimmed.join(', ')}`);

  const ty = analyzeTypography({ desktop, mobile }, fontData);
  const comps0 = (desktop.components) || {};
  const palette = analyzePalette(desktop, comps0);
  const roleSizes = Object.fromEntries(Object.entries(ty.desktopRoles).filter(([, s]) => s).map(([k, s]) => [k, s.s]));
  const structure = analyzeStructure({ desktop, mobile }, { body: ty.bodySize, roleSizes });
  const space = analyzeSpace({ desktop, mobile });
  const radius = analyzeRadius(desktop.radius);
  const shadow = analyzeShadows(desktop.shadows);
  const border = analyzeBorder(desktop.color && desktop.color.border, desktop.meta && desktop.meta.docH, comps0);
  const motion = analyzeMotion({ desktop, mobile });
  const components = analyzeComponents({ desktop, mobile }, palette.roles);

  for (const f of ty.typography.families) {
    if (f.source === 'fallback-likely') warn('FALLBACK_FONT_LIKELY', `${sanitizeText(f.primary, 40)} 웹폰트가 로드되지 않아 대체 폰트로 보였을 가능성이 높다`);
  }
  if (palette.monochrome) warn('NO_ACCENT', '유채색 강조가 없다. accent 는 가장 진한 중립 버튼 배경이다');
  const media = desktop.media || {};
  if ((media.bgImgShare || 0) + (media.imgShare || 0) > 0.6) warn('IMAGE_HEAVY', '이미지 면적이 커서 색 비중은 참고만 한다');
  if (structure.typed < 0.7) warn('STRUCTURE_LOW', `섹션 ${Math.round(structure.typed * 100)}%만 타입을 정했다. 나머지는 스크린샷으로 판단한다`);
  if (structure.empty) warn('SECTIONS_EMPTY', `섹션 ${structure.empty}개가 맨 위에서는 비어 있다(스크롤할 때만 그린다). 슬라이스로 판단한다`);

  // 영역별 신뢰도
  const chars = ((desktop.text && desktop.text.styles) || []).reduce((a, s) => a + s.c, 0);
  const tyConf = round(Math.min(1, chars / 800) * (ty.typography.roles.body ? 0.95 : 0.6) * (ty.typography.families.some((f) => f.source === 'fallback-likely') ? 0.85 : 1));
  const colorConf = round((palette.roles.bg && palette.roles.text ? 0.9 : 0.5) * ((media.bgImgShare || 0) > 0.4 ? 0.8 : 1));
  const spaceConf = round(Math.max(0.3, Math.min(0.95, 0.4 + space.adherence * 0.5 + (space.section.paddingY !== null ? 0.05 : 0))));
  const structConf = round(Math.min(0.95, structure.confidence * (0.5 + structure.typed / 2)));
  const mean = (tyConf + colorConf + spaceConf + structConf) / 4 - (mobile ? 0 : 0.1) - ((desktop.meta && desktop.meta.budgetHit) ? 0.1 : 0);

  const viewports = [desktop, mobile].filter(Boolean).map((r) => `${r.meta.viewport || (r.meta.w < 600 ? 'mobile' : 'desktop')}-${r.meta.w}x${r.meta.h}`);
  const vars = (desktop.vars && desktop.vars.items) || [];
  const hints = desktop.hints || {};
  const systems = [];
  if (hints.tailwind) systems.push(`tailwind-${hints.tailwind}`);
  if (hints.shadcn) systems.push('shadcn');
  for (const k of ['bootstrap', 'radix', 'mui', 'chakra', 'next', 'nuxt', 'framer', 'webflow', 'gatsby', 'astro', 'svelte', 'wordpress', 'shopify']) if (hints[k]) systems.push(k);
  if (hints.generator) systems.push(`generator:${sanitizeText(hints.generator, 24).toLowerCase()}`);
  const mMeta = mobile ? mobile.meta : null;
  const overflow = (r) => (r && r.overflow ? r.overflow.x : null);

  const tokens = {
    schema: 'dd.tokens/1',
    kind: 'reference',
    generator,
    source: {
      type: 'url',
      url: capture ? capture.url : null,
      finalUrl: capture ? capture.finalUrl : desktop.capture ? desktop.capture.finalUrl : null,
      method: 'cdp',
      capturedAt: capture ? capture.capturedAt : null,
      viewports,
      title: sanitizeText(desktop.meta && desktop.meta.title, 80),
      lang: desktop.meta ? desktop.meta.lang || null : null,
    },
    confidence: { overall: level(mean), typography: tyConf, color: colorConf, space: spaceConf, structure: structConf },
    theme: { mode: desktop.theme ? desktop.theme.mode : 'light', colorScheme: desktop.theme ? desktop.theme.colorScheme : 'normal', darkMedia: !!(desktop.theme && desktop.theme.darkMedia), src: 'measured' },
    typography: ty.typography,
    color: palette,
    space,
    shape: { radius, border, shadow },
    motion,
    components,
    vars: { systems, count: (desktop.vars && desktop.vars.count) || 0, items: vars.slice(0, 60).map((v) => ({ name: v.n, value: v.v, type: v.t })), src: 'declared' },
    media: {
      imageShare: media.imgShare || 0, bgImageShare: media.bgImgShare || 0, svgShare: media.svgShare || 0,
      video: media.video || 0, canvas: media.canvas || 0, iframe: media.iframe || 0, iconCount: media.icons || 0, backdropBlur: media.blur || 0, src: 'measured',
    },
    structure: {
      sequence: structure.sequence,
      mobileSequence: structure.mobileSequence,
      pageHeight: structure.pageHeight,
      typed: structure.typed,
      empty: structure.empty,
      sections: structure.sections,
      mobileChanges: structure.mobileChanges,
    },
    health: { overflowX: mobile ? { desktop: overflow(desktop), mobile: overflow(mobile) } : { desktop: overflow(desktop) }, src: 'measured' },
    untrusted: ['source.title', 'source.finalUrl', 'source.lang', 'structure.sections[].heading.text', 'components.button[].label', 'typography.families[].primary', 'typography.families[].stack', 'color.roles.*.var', 'vars.items[].name', 'vars.items[].value'],
    warnings,
  };
  if (desktop.overflow && desktop.overflow.offenders) tokens.health.offenders = { desktop: desktop.overflow.offenders, mobile: mobile && mobile.overflow ? mobile.overflow.offenders || [] : [] };
  if (mMeta && desktop.capture && mobile.capture) tokens.health.consoleErrors = (desktop.capture.consoleErrors || []).concat(mobile.capture.consoleErrors || []).slice(0, 5);
  if (tokens.health.consoleErrors && !tokens.health.consoleErrors.length) delete tokens.health.consoleErrors;
  if (tokens.health.offenders || tokens.health.consoleErrors) tokens.untrusted.push('health.offenders', 'health.consoleErrors', 'structure.sections[].cls');
  return { tokens, warnings, confidence: tokens.confidence };
}
