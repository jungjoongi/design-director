(function ddExtract(opts) {
  // 읽기 전용 추출기. 동기·DOM 만. 네트워크·DOM 쓰기·스타일 쓰기·스크롤·클릭을 하지 않는다.
  // 결과는 dd.raw/1 (maxBytes 이하). 측정 블록마다 try/catch 로 감싸 실패는 warnings 에 남긴다.
  opts = opts || {};
  var T0 = performance.now();
  var BUDGET = opts.budgetMs || 4000;
  var MAX_EL = opts.maxElements || 6000;
  var VW = window.innerWidth;
  var VH = window.innerHeight;
  var warnings = [];
  var budgetHit = false;
  var over = function () {
    if (performance.now() - T0 > BUDGET) { budgetHit = true; return true; }
    return false;
  };
  var warn = function (code, e) { warnings.push({ code: code, message: String((e && e.message) || e || '').slice(0, 160) }); };
  var r1 = function (v) { return Math.round(v * 10) / 10; };
  var r2 = function (v) { return Math.round(v * 100) / 100; };

  // ── 글자 정화: NFC, 제어문자·zero-width·bidi·태그 문자 제거(코드 포인트 표로 만든다), 공백 정리, 길이 제한
  var CONTROL = /[\x00-\x1f\x7f-\x9f]/g;
  var INVISIBLE = new RegExp('[' + [[173, 173], [6158, 6158], [8203, 8207], [8232, 8238], [8288, 8303], [65024, 65039], [65279, 65279], [65529, 65531], [917504, 917631], [917760, 917999]].map(function (r) {
    var h = function (c) { return '\\u{' + c.toString(16) + '}'; };
    return r[0] === r[1] ? h(r[0]) : h(r[0]) + '-' + h(r[1]);
  }).join('') + ']', 'gu');
  function clean(s, n) {
    s = String(s == null ? '' : s);
    try { s = s.normalize('NFC'); } catch (e) { /* 그대로 */ }
    s = s.replace(INVISIBLE, '').replace(CONTROL, ' ').replace(/\s+/g, ' ').trim();
    var cps = Array.from(s);
    if (cps.length > n) s = cps.slice(0, Math.max(0, n - 1)).join('').trim() + '…';
    return s;
  }
  // 폰트 이름은 사이트가 아무 문자열이나 넣을 수 있다(font-family: "아무 문장"). 이름에 쓰는 글자만 남기고,
  // 이름 하나는 32자, 스택은 앞 4개까지만 내보낸다.
  function safeFamily(stack) {
    return String(stack == null ? '' : stack).split(',').slice(0, 4).map(function (x) {
      return clean(x.replace(/["']/g, '').replace(/[^\p{L}\p{N}\s.-]/gu, ''), 32);
    }).filter(Boolean).join(', ');
  }

  // ── 색: 계산값 문자열 → {r,g,b,a}. rgb() 는 바로, oklch·lab·color() 는 1×1 캔버스로 sRGB 변환
  var colorCache = {};
  var ctx2d = null;
  function canvasCtx() {
    if (ctx2d) return ctx2d;
    try {
      var oc = new OffscreenCanvas(1, 1);
      ctx2d = oc.getContext('2d', { willReadFrequently: true });
    } catch (e) {
      var cv = document.createElement('canvas');
      cv.width = 1; cv.height = 1;
      ctx2d = cv.getContext('2d', { willReadFrequently: true });
    }
    return ctx2d;
  }
  function parseColor(str) {
    if (!str) return null;
    if (colorCache[str] !== undefined) return colorCache[str];
    var out = null;
    var m = /^rgba?\(\s*([\d.]+)[\s,]+([\d.]+)[\s,]+([\d.]+)(?:\s*[,/]\s*([\d.]+%?))?\s*\)$/.exec(str);
    if (m) {
      var a = m[4] === undefined ? 1 : (m[4].slice(-1) === '%' ? parseFloat(m[4]) / 100 : parseFloat(m[4]));
      out = { r: Math.round(+m[1]), g: Math.round(+m[2]), b: Math.round(+m[3]), a: a };
    } else if (str === 'transparent') {
      out = { r: 0, g: 0, b: 0, a: 0 };
    } else {
      try {
        var am = /\/\s*([\d.]+%?)\s*\)\s*$/.exec(str);
        var alpha = am ? (am[1].slice(-1) === '%' ? parseFloat(am[1]) / 100 : parseFloat(am[1])) : 1;
        var c = canvasCtx();
        c.clearRect(0, 0, 1, 1);
        c.globalAlpha = 1;
        c.fillStyle = '#000';
        c.fillStyle = str;
        c.fillRect(0, 0, 1, 1);
        var d = c.getImageData(0, 0, 1, 1).data;
        out = alpha > 0 ? { r: d[0], g: d[1], b: d[2], a: alpha } : { r: 0, g: 0, b: 0, a: 0 };
      } catch (e) { out = null; }
    }
    colorCache[str] = out;
    return out;
  }
  var h2 = function (n) { return (n < 16 ? '0' : '') + n.toString(16); };
  function hex(c) {
    if (!c) return null;
    var s = '#' + h2(c.r) + h2(c.g) + h2(c.b);
    if (c.a < 0.995) s += h2(Math.max(0, Math.min(255, Math.round(c.a * 255))));
    return s;
  }
  function blend(top, bottom) {
    var a = top.a + bottom.a * (1 - top.a);
    if (a <= 0) return { r: 0, g: 0, b: 0, a: 0 };
    var f = function (k) { return Math.round((top[k] * top.a + bottom[k] * bottom.a * (1 - top.a)) / a); };
    return { r: f('r'), g: f('g'), b: f('b'), a: a };
  }
  function lum(c) {
    var f = function (v) { v /= 255; return v <= 0.04045 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4); };
    return 0.2126 * f(c.r) + 0.7152 * f(c.g) + 0.0722 * f(c.b);
  }
  function contrast(a, b) {
    var x = lum(a), y = lum(b);
    return (Math.max(x, y) + 0.05) / (Math.min(x, y) + 0.05);
  }

  // ── 계산 스타일·사각형 캐시
  var csCache = new Map();
  var cs = function (el) {
    var v = csCache.get(el);
    if (!v) { v = getComputedStyle(el); csCache.set(el, v); }
    return v;
  };
  var rectCache = new Map();
  var SY = window.scrollY;
  var rect = function (el) {
    var v = rectCache.get(el);
    if (!v) {
      var b = el.getBoundingClientRect();
      v = { x: b.left, y: b.top + SY, w: b.width, h: b.height, r: b.right, b: b.bottom + SY };
      rectCache.set(el, v);
    }
    return v;
  };
  var parentEl = function (el) {
    if (el.parentElement) return el.parentElement;
    var root = el.parentNode;
    return root && root.host ? root.host : null;
  };

  // 숨김 판정(조상 포함). opacity 는 조상 곱.
  var visCache = new Map();
  function visible(el) {
    if (visCache.has(el)) return visCache.get(el);
    var ok = true;
    var s = cs(el);
    if (s.display === 'none' || s.visibility === 'hidden' || s.visibility === 'collapse' || s.contentVisibility === 'hidden') ok = false;
    var op = parseFloat(s.opacity);
    if (ok) {
      var p = parentEl(el);
      if (p && p !== document.documentElement) {
        var pv = visible(p);
        if (!pv) ok = false;
        else op *= opacityOf(p);
      }
    }
    opacityMemo.set(el, op);
    if (ok && op <= 0.05) ok = false;
    visCache.set(el, ok);
    return ok;
  }
  var opacityMemo = new Map();
  function opacityOf(el) {
    if (!opacityMemo.has(el)) visible(el);
    return opacityMemo.has(el) ? opacityMemo.get(el) : 1;
  }
  var hasBox = function (el) { var r = rect(el); return r.w > 0 && r.h > 0; };

  // sr-only 클립 패턴: 1px 박스 + overflow hidden, clip rect(0…), clip-path inset(50%)
  function srOnly(el) {
    for (var e = el, i = 0; e && i < 4; e = parentEl(e), i++) {
      var s = cs(e);
      var r = rect(e);
      if ((r.w <= 2 || r.h <= 2) && (s.overflow === 'hidden' || s.overflowX === 'hidden' || s.overflowY === 'hidden')) return true;
      if (s.clip && /rect\(\s*0(px)?[\s,]+0(px)?[\s,]+0(px)?[\s,]+0(px)?\s*\)/.test(s.clip)) return true;
      if (/inset\(\s*(50%|100%)/.test(s.clipPath)) return true;
    }
    return false;
  }

  // 요소 뒤 실제 배경색(불투명해질 때까지 조상 합성). 그라데이션·이미지 배경이면 null(판정 보류)
  var bgCache = new Map();
  function backdrop(el) {
    if (bgCache.has(el)) return bgCache.get(el);
    var layers = [];
    var unknown = false;
    for (var e = el; e; e = parentEl(e)) {
      var s = cs(e);
      if (s.backgroundImage && s.backgroundImage !== 'none') { unknown = true; break; }
      var c = parseColor(s.backgroundColor);
      if (c && c.a > 0) { layers.push(c); if (c.a >= 0.995) break; }
    }
    var out = null;
    if (!unknown) {
      out = { r: 255, g: 255, b: 255, a: 1 };
      for (var i = layers.length - 1; i >= 0; i--) out = blend(layers[i], out);
    }
    bgCache.set(el, out);
    return out;
  }

  var WHITE = { r: 255, g: 255, b: 255, a: 1 };
  function rootColor() {
    var hc = parseColor(cs(document.documentElement).backgroundColor);
    var bc = document.body ? parseColor(cs(document.body).backgroundColor) : null;
    return blend(hc && hc.a > 0.02 ? hc : bc && bc.a > 0.02 ? bc : WHITE, WHITE);
  }
  // 그라데이션·이미지를 건너뛰고 뒤에 깔린 단색을 합성한다(섹션 배경용)
  function solidBehind(el) {
    var layers = [];
    for (var e = parentEl(el); e; e = parentEl(e)) {
      var c = parseColor(cs(e).backgroundColor);
      if (c && c.a > 0.05) { layers.push(c); if (c.a >= 0.995) break; }
    }
    var out = layers.length && layers[layers.length - 1].a >= 0.995 ? WHITE : rootColor();
    for (var i = layers.length - 1; i >= 0; i--) out = blend(layers[i], out);
    return hex(out);
  }

  // 글자 뒤에 이미지·영상·캔버스가 겹쳐 있나(형제로 깔린 히어로 영상 위 흰 글씨 등).
  // 조상 배경색만으로는 배경을 알 수 없으니 대비로 걸러내면 안 된다.
  var MEDIA_SEL = 'img,video,canvas,picture,svg';
  var mediaCache = new Map();
  function mediaBehind(el) {
    if (mediaCache.has(el)) return mediaCache.get(el);
    var r = rect(el);
    var found = false;
    for (var e = parentEl(el), i = 0; e && i < 6 && !found; e = parentEl(e), i++) {
      var s = cs(e);
      if (s.backgroundImage && s.backgroundImage !== 'none') { found = true; break; }
      var ms = e.querySelectorAll(MEDIA_SEL);
      for (var j = 0; j < ms.length && j < 24; j++) {
        var m = ms[j];
        if (m === el || el.contains(m) || !visible(m)) continue;
        var mr = rect(m);
        if (mr.w < 48 || mr.h < 48) continue; // 1px 투명 이미지로 대비 판정을 피하는 걸 막는다
        var ow = Math.min(mr.r, r.r) - Math.max(mr.x, r.x);
        var oh = Math.min(mr.b, r.b) - Math.max(mr.y, r.y);
        if (ow > 0 && oh > 0 && ow * oh >= 0.5 * r.w * r.h) { found = true; break; }
      }
    }
    mediaCache.set(el, found);
    return found;
  }

  // 보이는 텍스트 규칙: 숨은 조상, opacity < 0.1, sr-only, 8px 미만, 화면 밖, 배경 대비 1.2 미만은 제외
  // (대비 판정은 뒤에 미디어가 겹치지 않을 때만. 미디어 위 글자는 배경을 알 수 없다)
  var textOkCache = new Map();
  function textVisible(el) {
    if (textOkCache.has(el)) return textOkCache.get(el);
    var ok = visible(el) && hasBox(el);
    if (ok) {
      var s = cs(el);
      var r = rect(el);
      if (opacityOf(el) < 0.1 || parseFloat(s.fontSize) < 8) ok = false;
      else if (r.r <= 0 || r.x >= Math.max(VW, document.documentElement.scrollWidth) || r.b <= 0 || parseFloat(s.textIndent) < -500) ok = false;
      else if (srOnly(el)) ok = false;
      else {
        var fg = parseColor(s.color);
        var bg = backdrop(el);
        if (fg && fg.a < 0.1) ok = false;
        else if (fg && bg && contrast(blend(fg, bg), bg) < 1.2 && !mediaBehind(el)) ok = false;
      }
    }
    textOkCache.set(el, ok);
    return ok;
  }

  // 열린 shadow root 까지 내려가는 요소 순회
  function walkElements(root, cb, cap) {
    var count = 0;
    var stack = [root];
    while (stack.length) {
      var node = stack.pop();
      var tw = document.createTreeWalker(node, NodeFilter.SHOW_ELEMENT);
      for (var el = tw.nextNode(); el; el = tw.nextNode()) {
        if (++count > cap) return count;
        cb(el);
        if (el.shadowRoot && el.shadowRoot.mode === 'open') stack.push(el.shadowRoot);
      }
    }
    return count;
  }
  // ── 맥락 판별
  var HEAD_SEL = 'h1,h2,h3,h4,h5,h6,[role=heading]';
  function headingLevel(el) {
    var h = el.closest && el.closest(HEAD_SEL);
    if (!h) return 0;
    if (/^H[1-6]$/.test(h.tagName)) return +h.tagName[1];
    return +(h.getAttribute('aria-level') || 2);
  }
  var btnCache = new Map();
  // 버튼처럼 보이는가: button·role=button, 또는 배경·테두리가 있고 패딩이 있는 링크
  function buttonish(el) {
    if (btnCache.has(el)) return btnCache.get(el);
    var res = false;
    var t = el.tagName;
    if (t === 'BUTTON' || el.getAttribute('role') === 'button' || (t === 'INPUT' && /^(submit|button|reset)$/i.test(el.type))) res = true;
    else if (t === 'A') {
      var s = cs(el);
      var r = rect(el);
      var bg = parseColor(s.backgroundColor);
      var bw = parseFloat(s.borderTopWidth) || 0;
      var px = parseFloat(s.paddingLeft) || 0;
      res = (bg && bg.a > 0.1 || (bw >= 1 && s.borderTopStyle !== 'none')) && px >= 8 && r.h >= 24 && r.h <= 80 && r.w <= 480;
    }
    btnCache.set(el, res);
    return res;
  }
  function closestButton(el) {
    for (var e = el, i = 0; e && i < 4; e = parentEl(e), i++) {
      if (/^(A|BUTTON|INPUT)$/.test(e.tagName) || (e.getAttribute && e.getAttribute('role') === 'button')) return buttonish(e) ? e : null;
    }
    return null;
  }
  var inNav = function (el) { return !!(el.closest && el.closest('nav,[role=navigation],header,[role=banner]')); };
  var inFooter = function (el) { return !!(el.closest && el.closest('footer,[role=contentinfo]')); };
  function nextIsHeading(el) {
    var n = el.nextElementSibling;
    if (!n && el.parentElement && el.parentElement.children.length === 1) n = el.parentElement.nextElementSibling;
    if (!n) return false;
    if (n.matches(HEAD_SEL)) return true;
    var f = n.firstElementChild;
    return !!(f && f.matches(HEAD_SEL));
  }

  // ── 타이포: 텍스트 노드 → 부모 요소별 글자 수 → 스타일 시그니처
  var HANGUL = /[가-힣ㄱ-ㅎㅏ-ㅣ]/g;
  var LATIN = /[A-Za-z]/g;
  var textEls = new Map();
  var script = { hangul: 0, latin: 0, keepAll: 0, keepAllHangul: 0, balance: 0, headingsSeen: 0 };
  var styles = {};
  try {
    var collectText = function (root) {
      var tw = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
      var n = 0;
      for (var node = tw.nextNode(); node && n < 30000; node = tw.nextNode(), n++) {
        var v = node.nodeValue;
        if (!v || !/\S/.test(v)) continue;
        var el = node.parentElement || (node.parentNode && node.parentNode.host);
        if (!el || /^(SCRIPT|STYLE|NOSCRIPT|TEMPLATE|TEXTAREA|OPTION)$/.test(el.tagName)) continue;
        var rec = textEls.get(el);
        if (!rec) { rec = { c: 0, t: '' }; textEls.set(el, rec); }
        rec.c += v.replace(/\s+/g, '').length;
        if (rec.t.length < 200) rec.t += v;
      }
    };
    collectText(document.body || document.documentElement);
    walkElements(document.body || document.documentElement, function (el) { if (el.shadowRoot && el.shadowRoot.mode === 'open') collectText(el.shadowRoot); }, 40000);
    var seenHeadings = new Set();
    textEls.forEach(function (rec, el) {
      if (over() || !textVisible(el)) return;
      var s = cs(el);
      var size = r1(parseFloat(s.fontSize));
      var lhRaw = s.lineHeight;
      var lh = lhRaw === 'normal' ? 'normal' : r2(parseFloat(lhRaw) / size);
      var ls = s.letterSpacing === 'normal' ? 0 : Math.round((parseFloat(s.letterSpacing) / size) * 1000) / 1000;
      var fam = safeFamily(s.fontFamily);
      var w = parseInt(s.fontWeight, 10) || 400;
      var tt = s.textTransform === 'none' ? '' : s.textTransform;
      var it = s.fontStyle === 'italic' || s.fontStyle.indexOf('oblique') === 0 ? 1 : 0;
      var key = [fam, size, w, lh, ls, tt, it].join('|');
      var sig = styles[key];
      if (!sig) sig = styles[key] = { f: fam, s: size, w: w, lh: lh, ls: ls, tt: tt, it: it, c: 0, n: 0, a: 0, y: Infinity, x: {}, col: {} };
      sig.n++;
      var hc = (rec.t.match(HANGUL) || []).length;
      var lc = (rec.t.match(LATIN) || []).length;
      script.hangul += hc;
      script.latin += lc;
      if (s.wordBreak === 'keep-all') { script.keepAll += rec.c; script.keepAllHangul += hc; }
      sig.c += rec.c;
      sig.a += Math.round(rec.c * size * size / 100);
      var r = rect(el);
      if (r.y < sig.y) sig.y = Math.round(r.y);
      var ctx = sig.x;
      var add = function (k) { ctx[k] = (ctx[k] || 0) + rec.c; };
      var lvl = headingLevel(el);
      var btn = closestButton(el);
      if (lvl) {
        add('h' + lvl);
        var hEl = el.closest(HEAD_SEL);
        if (hEl && !seenHeadings.has(hEl)) {
          seenHeadings.add(hEl);
          script.headingsSeen++;
          var hs = cs(hEl);
          if (hs.textWrap === 'balance' || hs.textWrapStyle === 'balance') script.balance++;
        }
      }
      if (btn) add('btn');
      if (inNav(el)) add('nav');
      if (inFooter(el)) add('ftr');
      if (!btn && el.closest('a')) add('link');
      if (el.closest('p')) add('p');
      if (el.closest('li')) add('li');
      if (el.closest('label,small,figcaption,time')) add('meta');
      var txt = rec.t.trim();
      if (tt === 'uppercase' || (lc >= 3 && !/[a-z]/.test(txt) && /[A-Z]/.test(txt))) add('up');
      if (!lvl && rec.c <= 40 && nextIsHeading(el)) add('eb');
      if (r.y < VH && !inNav(el)) add('hero');
      var col = hex(parseColor(s.color));
      if (col) sig.col[col] = (sig.col[col] || 0) + rec.c;
    });
  } catch (e) { warn('EXTRACT_TYPO', e); }
  var styleList = Object.keys(styles).map(function (k) {
    var s = styles[k];
    var cols = Object.keys(s.col).sort(function (a, b) { return s.col[b] - s.col[a]; }).slice(0, 3);
    s.col = cols.map(function (c) { return [c, s.col[c]]; });
    if (s.y === Infinity) s.y = null;
    return s;
  }).sort(function (a, b) { return b.c - a.c || b.s - a.s; });

  // ── 폰트: FontFaceSet 과 웹폰트 리소스(호스트+파일명만)
  var fonts = { families: [], resources: [], googleFamilies: [], services: [] };
  try {
    var fam = {};
    if (document.fonts && document.fonts.forEach) {
      document.fonts.forEach(function (ff) {
        var name = safeFamily(ff.family);
        if (!name) return;
        var f = fam[name] || (fam[name] = { f: name, n: 0, loaded: 0, w: [] });
        f.n++;
        if (ff.status === 'loaded') {
          f.loaded++;
          var w = String(ff.weight);
          if (f.w.indexOf(w) < 0 && f.w.length < 8) f.w.push(w);
        }
      });
    }
    fonts.families = Object.keys(fam).map(function (k) { return fam[k]; }).slice(0, 30);
    var seenRes = {};
    (performance.getEntriesByType('resource') || []).forEach(function (e) {
      if (!/\.(woff2?|ttf|otf|eot)(\?|#|$)/i.test(e.name) && !/fonts\.gstatic\.com|use\.typekit\.net\/af/.test(e.name)) return;
      try {
        var u = new URL(e.name);
        var file = clean(u.pathname.split('/').pop().replace(/[^\w.-]/g, ''), 60);
        var key = u.hostname + '/' + file;
        if (seenRes[key] || fonts.resources.length >= 24) return;
        seenRes[key] = 1;
        fonts.resources.push({ h: u.hostname.slice(0, 60), f: file });
      } catch (x) { /* 무시 */ }
    });
    document.querySelectorAll('link[href]').forEach(function (l) {
      var href = l.getAttribute('href') || '';
      var m = /fonts\.googleapis\.com|use\.typekit\.net|fonts\.cdnfonts\.com|cdn\.jsdelivr\.net|fastly\.jsdelivr\.net|spoqa\.github\.io|unpkg\.com/.exec(href);
      if (!m) return;
      if (fonts.services.indexOf(m[0]) < 0) fonts.services.push(m[0]);
      if (m[0] === 'fonts.googleapis.com') {
        var re = /family=([^&:;]+)/g;
        var g;
        while ((g = re.exec(href)) && fonts.googleFamilies.length < 10) {
          var nm = clean(decodeURIComponent(g[1].replace(/\+/g, ' ')).replace(/[^\w\s-]/g, ''), 32);
          if (nm && fonts.googleFamilies.indexOf(nm) < 0) fonts.googleFamilies.push(nm);
        }
      }
    });
  } catch (e) { warn('EXTRACT_FONTS', e); }
  // ── CSS 변수(:root·body). 값 타입 분류, 색·길이 우선 200개
  var vars = { count: 0, items: [], names: [] };
  try {
    var NAMED = /^(white|black|transparent|currentcolor|red|blue|green|gray|grey|orange|yellow|purple|pink)$/i;
    var typeOf = function (v) {
      if (/^(#[0-9a-f]{3,8}|rgba?\(|hsla?\(|oklch\(|oklab\(|lab\(|lch\(|color\(|hwb\()/i.test(v) || NAMED.test(v)) return 'color';
      if (/^-?[\d.]+(deg)?\s+[\d.]+%\s+[\d.]+%(\s*\/\s*[\d.]+%?)?$/.test(v)) return 'hsl-triplet';
      if (/^-?[\d.]+(px|rem|em|vh|vw|%|ch|dvh|svh)$/.test(v)) return 'length';
      if (/^-?[\d.]+$/.test(v)) return 'number';
      if (/^[\d.]+m?s$/.test(v)) return 'duration';
      if (/^(cubic-bezier|ease|linear|steps)/.test(v)) return 'easing';
      if (/^(clamp|calc|min|max)\(/.test(v)) return 'length';
      if (/px/.test(v) && /(rgba?\(|#[0-9a-f]{3,8}|oklch|hsla?\()/.test(v) && v.split(' ').length >= 3) return 'shadow';
      if (/(sans-serif|serif|monospace|system-ui|-apple-system|"[^"]+"\s*,)/.test(v)) return 'font';
      return 'other';
    };
    // 앞부분만 보고 타입을 정하면 `rgb( 아무 문장 )` 같은 값이 색으로 통과한다. 값 전체가 숫자·단위·색 함수·
    // 허용 낱말로만 이뤄졌을 때만 원문을 내보내고, 색은 원문 대신 hex 로 바꿔 내보낸다.
    var SAFE_WORDS = /^(px|rem|em|vh|vw|ch|dvh|svh|lvh|vmin|vmax|ex|deg|turn|rad|ms|s|calc|clamp|min|max|var|rgb|rgba|hsl|hsla|oklch|oklab|lab|lch|color|hwb|srgb|display-p3|from|none|inset|transparent|currentcolor|cubic-bezier|ease|ease-in|ease-out|ease-in-out|linear|steps|start|end|jump-start|jump-end|jump-none|jump-both)$/i;
    // var(--이름) 참조는 이름도 사이트가 정한 글자라서 var(--ref) 로 바꾼 뒤 검사·출력한다. 그 밖의 -- 는 받지 않는다.
    var maskRefs = function (v) { return v.replace(/var\(\s*--[\w-]+\s*\)/g, 'var(--ref)'); };
    var onlySafeWords = function (v) {
      v = maskRefs(v);
      if (!/^[\w\s#().,%+*\/-]+$/.test(v)) return false;
      if (/--(?!ref\))/.test(v)) return false;
      var words = v.replace(/--ref/g, ' ').match(/[a-z][a-z0-9-]*/gi) || [];
      return words.every(function (w) { return SAFE_WORDS.test(w) || NAMED.test(w); });
    };
    var collected = {};
    var addVar = function (name, value) {
      if (collected[name] !== undefined) return;
      collected[name] = String(value).trim();
    };
    [document.documentElement, document.body].forEach(function (el) {
      if (!el) return;
      var st = getComputedStyle(el);
      for (var i = 0; i < st.length; i++) {
        var nm = st[i];
        if (nm.charCodeAt(0) === 45 && nm.charCodeAt(1) === 45) addVar(nm, st.getPropertyValue(nm));
      }
    });
    var names = Object.keys(collected);
    vars.count = names.length;
    var ORDER = { color: 0, 'hsl-triplet': 0, length: 1, font: 2, shadow: 3, duration: 4, easing: 4, number: 5, other: 6 };
    var items = names.map(function (nm) {
      var v = collected[nm];
      var t = typeOf(v);
      var keep = '';
      if (t === 'font') keep = safeFamily(v);
      else if (t === 'color' && onlySafeWords(v)) { var pc = parseColor(v); keep = pc ? hex(pc) : ''; if (!keep) t = 'other'; }
      else if (t !== 'other' && onlySafeWords(v)) keep = clean(maskRefs(v), 80);
      else t = 'other';
      return { n: clean(nm.replace(/[^\w-]/g, ''), 48), v: keep, t: t };
    }).filter(function (x) { return x.n; });
    items.sort(function (a, b) { return ORDER[a.t] - ORDER[b.t] || (a.n < b.n ? -1 : 1); });
    vars.items = items.slice(0, 200);
    vars.names = names.slice(0, 400).map(function (n) { return n.slice(0, 32); });
  } catch (e) { warn('EXTRACT_VARS', e); }

  // ── 프레임워크 힌트(DOM·변수 이름만 본다. 격리 월드라 페이지 전역 변수는 보지 않는다)
  var hints = {};
  try {
    var hasVar = function (re) { return vars.names.some(function (n) { return re.test(n); }); };
    var q = function (sel) { try { return !!document.querySelector(sel); } catch (e) { return false; } };
    var shadcn = ['--background', '--foreground', '--primary', '--primary-foreground', '--muted', '--card', '--border', '--ring', '--radius', '--accent'].filter(function (n) { return vars.names.indexOf(n) >= 0; }).length;
    var tw = hasVar(/^--tw-/);
    var tw4 = hasVar(/^--(spacing|default-font-family|color-[a-z]+-\d{2,3})$/);
    hints = {
      tailwind: tw || tw4 ? (tw4 ? 'v4' : 'v3') : null,
      bootstrap: hasVar(/^--bs-/),
      shadcn: shadcn >= 5,
      radix: hasVar(/^--radix-/) || q('[data-radix-popper-content-wrapper],[data-radix-collection-item]'),
      mui: hasVar(/^--mui-/) || q('.MuiButtonBase-root'),
      chakra: hasVar(/^--chakra-/),
      next: q('#__next,script#__NEXT_DATA__,script[src*="/_next/"],next-route-announcer'),
      nuxt: q('#__nuxt,#__NUXT_DATA__,script[src*="/_nuxt/"]'),
      framer: q('[data-framer-name],#__framer-badge-container,[data-framer-component-type]'),
      webflow: q('html[data-wf-site],[data-wf-page]'),
      gatsby: q('#___gatsby'),
      astro: q('astro-island,[data-astro-cid]') || hasVar(/^--astro/),
      svelte: q('[data-sveltekit-preload-data],[class*="svelte-"]'),
      wordpress: q('link[href*="wp-content"],link[href*="wp-includes"]'),
      shopify: q('link[href*="cdn.shopify.com"],script[src*="cdn.shopify.com"]'),
    };
    var gen = document.querySelector('meta[name=generator]');
    var gv = gen ? String(gen.getAttribute('content') || '') : '';
    var known = /(WordPress|Webflow|Framer|Wix|Squarespace|Hugo|Jekyll|Gatsby|Astro|Docusaurus|Ghost|Shopify|Next\.js|Nuxt|Hexo|VitePress|Notion|Imweb|Cafe24|Sixshop)/i.exec(gv);
    hints.generator = known ? known[1] : null;
  } catch (e) { warn('EXTRACT_HINTS', e); }

  // ── 요소 수집: 첫 2 뷰포트는 전수, 그 아래는 y 기준 층화 샘플
  var all = [];
  try {
    walkElements(document.body || document.documentElement, function (el) { all.push(el); }, 40000);
  } catch (e) { warn('EXTRACT_WALK', e); }
  var DOC_H = Math.max(document.documentElement.scrollHeight, document.body ? document.body.scrollHeight : 0);
  var DOC_W = Math.max(document.documentElement.scrollWidth, VW);
  var sample = all;
  var sampled = false;
  if (all.length > MAX_EL) {
    sampled = true;
    var top = [];
    var rest = [];
    for (var i = 0; i < all.length; i++) {
      var y = rect(all[i]).y;
      (y < VH * 2 ? top : rest).push(all[i]);
    }
    var room = Math.max(0, MAX_EL - Math.min(top.length, MAX_EL * 0.6));
    var keepTop = top.slice(0, Math.round(MAX_EL * 0.6) + Math.max(0, MAX_EL - Math.round(MAX_EL * 0.6) - rest.length));
    var stride = rest.length / Math.max(1, room);
    var restPick = [];
    for (var k = 0; k < rest.length && restPick.length < room; k += Math.max(1, stride)) restPick.push(rest[Math.floor(k)]);
    sample = keepTop.concat(restPick);
  }
  // ── 요소 측정: 색·radius·shadow·간격·레이아웃·모션·미디어·컴포넌트
  var tally = function (map, k, w) { if (k === null || k === undefined) return; map[k] = (map[k] || 0) + (w === undefined ? 1 : w); };
  var C = { bg: {}, border: {}, svg: {}, icon: {}, btn: {} };
  var gradients = [];
  var gradientText = 0;
  var radius = {};
  var shadows = {};
  var pad = {}, mar = {}, gaps = {};
  var containers = {}, gutters = {}, grids = {};
  var tDur = {}, tEase = {}, aDur = {};
  var animCount = 0;
  var media = { img: 0, bgImg: 0, video: 0, canvas: 0, iframe: 0, icons: 0, svg: 0, blur: 0 };
  var comps = { button: [], input: [], card: [], badge: [] };
  var btnKeys = {}, cardKeys = {};
  var btnCands = [];
  var offenders = [];
  var firstMedia = [];
  var contPads = {};
  var shadowIndex = function (v) { return v === 'none' ? null : v.slice(0, 200); };
  var clipArea = function (r) {
    var w = Math.max(0, Math.min(r.r, DOC_W) - Math.max(r.x, 0));
    return w * Math.max(0, r.h);
  };
  var isMediaTag = function (t) { return t === 'IMG' || t === 'VIDEO' || t === 'CANVAS' || t === 'PICTURE'; };
  var ctxOf = function (el, r) { return inNav(el) ? 'nav' : inFooter(el) ? 'footer' : r.y < VH ? 'hero' : 'body'; };

  // 보이는 텍스트만 모은다(sr-only·숨김·저대비 제외).
  function visibleText(el, max) {
    var out = '';
    var tw = document.createTreeWalker(el, NodeFilter.SHOW_TEXT);
    for (var n = tw.nextNode(); n && out.length < max * 3; n = tw.nextNode()) {
      var p = n.parentElement;
      if (p && textVisible(p)) out += ' ' + n.nodeValue;
    }
    return clean(out, max);
  }

  try {
    for (var ei = 0; ei < sample.length; ei++) {
      if (ei % 50 === 0 && over()) break;
      var el = sample[ei];
      if (!visible(el) || !hasBox(el)) continue;
      var s = cs(el);
      var r = rect(el);
      var tag = el.tagName;
      var area = clipArea(r);
      var isSvgPart = el instanceof SVGElement && tag !== 'svg';
      // 배경: 요소 면적 − 불투명 직계 자식 면적
      var bgc = parseColor(s.backgroundColor);
      if (bgc && bgc.a > 0.02 && !isSvgPart) {
        var a = area;
        for (var ci = 0; ci < el.children.length; ci++) {
          var ch = el.children[ci];
          var chc = parseColor(cs(ch).backgroundColor);
          if (chc && chc.a >= 0.95 && visible(ch)) a -= clipArea(rect(ch));
        }
        tally(C.bg, hex(bgc), Math.max(0, Math.round(a / 100)));
      }
      var bi = s.backgroundImage;
      if (bi && bi !== 'none') {
        if (bi.indexOf('gradient(') >= 0) {
          var stops = (bi.match(/(rgba?\([^)]*\)|#[0-9a-fA-F]{3,8}\b|oklch\([^)]*\)|oklab\([^)]*\)|lab\([^)]*\)|lch\([^)]*\)|color\([^)]*\)|hsla?\([^)]*\))/g) || []).slice(0, 4).map(function (x) { return hex(parseColor(x)); }).filter(Boolean);
          gradients.push({ a: Math.round(area / 100), k: /radial/.test(bi) ? 'radial' : /conic/.test(bi) ? 'conic' : 'linear', st: stops });
          if (s.webkitBackgroundClip === 'text' || s.backgroundClip === 'text') gradientText++;
        }
        if (bi.indexOf('url(') >= 0) media.bgImg += area;
      }
      // 테두리: 둘레 길이 가중
      ['Top', 'Right', 'Bottom', 'Left'].forEach(function (side) {
        var bw = parseFloat(s['border' + side + 'Width']);
        if (bw >= 0.5 && s['border' + side + 'Style'] !== 'none' && s['border' + side + 'Style'] !== 'hidden') {
          var bc = parseColor(s['border' + side + 'Color']);
          var behind = backdrop(el) || rootColor();
          if (bc && bc.a > 0.05 && contrast(blend(bc, behind), behind) >= 1.05) tally(C.border, hex(bc), Math.round(side === 'Top' || side === 'Bottom' ? r.w : r.h));
        }
      });
      // SVG
      if (tag === 'svg') {
        if (r.w <= 48 && r.h <= 48) media.icons++;
        else media.svg += area;
      }
      if (isSvgPart) {
        var owner = el.ownerSVGElement;
        var small = owner && rect(owner).w <= 48;
        ['fill', 'stroke'].forEach(function (p) {
          var v = s[p];
          if (!v || v === 'none' || v.indexOf('url(') === 0) return;
          var pc = parseColor(v);
          if (pc && pc.a > 0.05) tally(small ? C.icon : C.svg, hex(pc), 1);
        });
        continue;
      }
      if ((isMediaTag(tag) || (tag === 'svg' && r.w > 48) || (bi && bi.indexOf('url(') >= 0)) && r.y < VH) firstMedia.push(r);
      if (isMediaTag(tag)) {
        media.img += tag === 'VIDEO' || tag === 'CANVAS' ? 0 : area;
        if (tag === 'VIDEO') media.video++;
        if (tag === 'CANVAS') media.canvas++;
        if (tag === 'IMG' && r.w <= 48 && r.h <= 48) media.icons++;
      }
      if (tag === 'IFRAME') media.iframe++;
      if (/blur\(/.test(s.backdropFilter || s.webkitBackdropFilter || '')) media.blur++;
      // radius
      var rad = Math.max(parseFloat(s.borderTopLeftRadius) || 0, parseFloat(s.borderTopRightRadius) || 0, parseFloat(s.borderBottomRightRadius) || 0, parseFloat(s.borderBottomLeftRadius) || 0);
      if (/%/.test(s.borderTopLeftRadius)) rad = (parseFloat(s.borderTopLeftRadius) / 100) * Math.min(r.w, r.h);
      var btn = buttonish(el);
      var isInput = (tag === 'INPUT' && !/^(submit|button|reset|checkbox|radio|hidden|range|color|file|image)$/i.test(el.type)) || tag === 'SELECT' || tag === 'TEXTAREA';
      var hasBg = bgc && bgc.a > 0.05;
      var bwTop = parseFloat(s.borderTopWidth) || 0;
      var bcTop = parseColor(s.borderTopColor);
      var hasBorder = bwTop >= 0.5 && s.borderTopStyle !== 'none' && !!bcTop && bcTop.a > 0.05;
      var hasShadow = s.boxShadow && s.boxShadow !== 'none';
      var kind = btn ? 'button' : isInput ? 'input' : isMediaTag(tag) || (bi && bi.indexOf('url(') >= 0) ? (r.w <= 64 && rad >= Math.min(r.w, r.h) / 2 - 1 ? 'avatar' : 'image')
        : (r.h <= 30 && r.w <= 200 && (hasBg || hasBorder) && (textEls.get(el) || { c: 99 }).c <= 20) ? 'badge'
          : (r.w >= 120 && r.h >= 80 && (hasBg || hasBorder || hasShadow) && el.children.length >= 1) ? 'card' : 'other';
      if (rad > 0.4) {
        var pill = rad >= Math.min(r.w, r.h) / 2 - 1;
        tally(radius, kind + '|' + (pill ? 'pill' : Math.round(rad)), 1);
      }
      if (hasShadow) {
        var sk = shadowIndex(s.boxShadow);
        var sh = shadows[sk] || (shadows[sk] = { v: sk, n: 0, a: 0, k: {} });
        sh.n++;
        sh.a += Math.round(area / 100);
        tally(sh.k, kind, 1);
      }
      // 간격
      ['Top', 'Right', 'Bottom', 'Left'].forEach(function (side) {
        var pv = Math.round(parseFloat(s['padding' + side]) || 0);
        if (pv > 0 && pv <= 400) tally(pad, pv, 1);
      });
      var ml = parseFloat(s.marginLeft) || 0;
      var mr = parseFloat(s.marginRight) || 0;
      ['Top', 'Bottom'].forEach(function (side) {
        var mv = Math.round(parseFloat(s['margin' + side]) || 0);
        if (mv > 0 && mv <= 400) tally(mar, mv, 1);
      });
      if (!(ml > 0 && Math.abs(ml - mr) < 1)) {
        if (ml > 0 && ml <= 200) tally(mar, Math.round(ml), 1);
        if (mr > 0 && mr <= 200) tally(mar, Math.round(mr), 1);
      }
      var disp = s.display;
      if (/flex|grid/.test(disp)) {
        [s.rowGap, s.columnGap].forEach(function (g) {
          var gv = Math.round(parseFloat(g) || 0);
          if (gv > 0 && gv <= 400) tally(gaps, gv, 1);
        });
      }
      if (/grid/.test(disp)) {
        var tracks = String(s.gridTemplateColumns || '').split(/\s+/).filter(function (t) { return /px$/.test(t); }).length;
        if (tracks >= 2) tally(grids, tracks + '|' + Math.round(parseFloat(s.columnGap) || 0), 1);
      }
      // 컨테이너: 가운데 정렬된 넓은 블록
      if (r.w >= Math.min(480, VW * 0.6) && r.w < DOC_W - 16 && Math.abs(r.x - (DOC_W - r.r)) <= 2 && (s.maxWidth !== 'none' || ml > 0)) {
        tally(containers, Math.round(s.maxWidth !== 'none' && /px$/.test(s.maxWidth) ? parseFloat(s.maxWidth) : r.w), 1);
        tally(contPads, Math.round(parseFloat(s.paddingLeft) || 0), 1);
      }
      if (r.w >= VW - 2) {
        var pl = Math.round(parseFloat(s.paddingLeft) || 0);
        if (pl >= 8 && pl <= 120 && Math.abs(pl - (parseFloat(s.paddingRight) || 0)) < 1) tally(gutters, pl, 1);
      }
      // 모션
      var tds = String(s.transitionDuration).split(',');
      var tes = String(s.transitionTimingFunction).split(/,(?![^(]*\))/);
      for (var ti = 0; ti < tds.length; ti++) {
        var ms = Math.round(parseFloat(tds[ti]) * (/ms/.test(tds[ti]) ? 1 : 1000));
        if (ms > 0 && ms <= 5000) {
          tally(tDur, ms, 1);
          tally(tEase, (tes[ti] || tes[0] || 'ease').trim().slice(0, 60), 1);
        }
      }
      if (s.animationName && s.animationName !== 'none') {
        animCount++;
        var ad = Math.round(parseFloat(s.animationDuration) * (/ms/.test(s.animationDuration) ? 1 : 1000));
        if (ad > 0 && ad <= 20000) tally(aDur, ad, 1);
      }
      // 컴포넌트 샘플
      if (btn) {
        var fgc = parseColor(s.color);
        if (hasBg) tally(C.btn, hex(bgc), 1);
        var bk = [hex(bgc), hex(fgc), Math.round(r.h), Math.round(rad)].join('|');
        btnKeys[bk] = (btnKeys[bk] || 0) + 1;
        if (btnKeys[bk] <= 2 && btnCands.length < 80) {
          btnCands.push({
            pri: hasBg ? 0 : hasBorder ? 1 : 2, i: btnCands.length,
            v: {
              h: Math.round(r.h), w: Math.round(r.w), px: Math.round(parseFloat(s.paddingLeft) || 0), py: Math.round(parseFloat(s.paddingTop) || 0),
              r: rad >= Math.min(r.w, r.h) / 2 - 1 ? 'pill' : Math.round(rad), bg: hasBg ? hex(bgc) : null, fg: hex(fgc),
              bc: hasBorder ? hex(parseColor(s.borderTopColor)) : null, bw: hasBorder ? r1(bwTop) : 0,
              fs: r1(parseFloat(s.fontSize)), fw: parseInt(s.fontWeight, 10) || 400, tt: s.textTransform === 'none' ? '' : s.textTransform,
              sh: hasShadow ? 1 : 0, ctx: ctxOf(el, r), y: Math.round(r.y), n: 1, lbl: visibleText(el, opts.labelChars || 24),
            },
            key: bk,
          });
        }
      }
      if (isInput && comps.input.length < 8) {
        comps.input.push({ h: Math.round(r.h), w: Math.round(r.w), px: Math.round(parseFloat(s.paddingLeft) || 0), r: Math.round(rad), bg: hex(bgc), bc: hasBorder ? hex(parseColor(s.borderTopColor)) : null, bw: hasBorder ? r1(bwTop) : 0, fs: r1(parseFloat(s.fontSize)), t: tag === 'INPUT' ? String(el.type || 'text').slice(0, 12) : tag.toLowerCase() });
      }
      if (kind === 'card' && comps.card.length < 12 && r.w <= DOC_W * 0.9) {
        var ck = [Math.round(r.w / 20), Math.round(rad), hex(bgc), hasShadow ? 1 : 0].join('|');
        if (!cardKeys[ck]) {
          cardKeys[ck] = 1;
          comps.card.push({ w: Math.round(r.w), h: Math.round(r.h), p: Math.round(parseFloat(s.paddingTop) || 0), px: Math.round(parseFloat(s.paddingLeft) || 0), r: Math.round(rad), bg: hasBg ? hex(bgc) : null, bc: hasBorder ? hex(parseColor(s.borderTopColor)) : null, bw: hasBorder ? r1(bwTop) : 0, sh: hasShadow ? shadowIndex(s.boxShadow) : null });
        }
      }
      if (kind === 'badge' && comps.badge.length < 8) {
        comps.badge.push({ h: Math.round(r.h), px: Math.round(parseFloat(s.paddingLeft) || 0), r: rad >= r.h / 2 - 1 ? 'pill' : Math.round(rad), bg: hasBg ? hex(bgc) : null, fg: hex(parseColor(s.color)), fs: r1(parseFloat(s.fontSize)), fw: parseInt(s.fontWeight, 10) || 400, tt: s.textTransform === 'none' ? '' : s.textTransform });
      }
      // 가로 넘침 범인(신뢰 호스트만)
      if (opts.trusted && r.r > VW + 1 && offenders.length < 40) offenders.push(el);
    }
  } catch (e) { warn('EXTRACT_ELEMENTS', e); }
  // 버튼 샘플: 채운 버튼 → 테두리 버튼 → 나머지, 같은 모양은 2개까지
  btnCands.sort(function (a, b) { return a.pri - b.pri || a.i - b.i; });
  comps.button = btnCands.slice(0, 16).map(function (c) { c.v.n = btnKeys[c.key]; return c.v; });
  // ── 링크 색·본문 왼쪽 가장자리
  var linkCol = {}, textLeft = {}, textCol = {};
  try {
    textEls.forEach(function (rec, el) {
      if (!textOkCache.get(el)) return;
      var r = rect(el);
      var c = hex(parseColor(cs(el).color));
      tally(textCol, c, rec.c);
      if (el.closest('a') && !closestButton(el) && !inNav(el) && !inFooter(el)) tally(linkCol, c, rec.c);
      if (r.y < VH * 3 && !inNav(el) && rec.c >= 10) tally(textLeft, Math.round(r.x), rec.c);
    });
  } catch (e) { warn('EXTRACT_LINKS', e); }

  // ── 페이지 구조: main(없으면 body)에서 단일 자식 래퍼를 내려가며 섹션 후보를 찾는다
  var SKIP_TAGS = /^(SCRIPT|STYLE|LINK|TEMPLATE|NOSCRIPT|META|BR|svg)$/;
  function kidsOf(el) {
    var list = [];
    var src = el.shadowRoot && el.shadowRoot.mode === 'open' && el.children.length === 0 ? el.shadowRoot.children : el.children;
    for (var i = 0; i < src.length; i++) {
      var k = src[i];
      if (SKIP_TAGS.test(k.tagName) || !visible(k) || !hasBox(k)) continue;
      list.push(k);
    }
    return list;
  }
  var qualifies = function (k) { var r = rect(k); return r.h >= 40 && r.w >= VW * 0.6; };
  var sectionEls = [];
  try {
    var mains = Array.prototype.filter.call(document.querySelectorAll('main,[role=main]'), function (m) { return visible(m) && hasBox(m); });
    mains.sort(function (a, b) { return rect(b).w * rect(b).h - rect(a).w * rect(a).h; });
    var main = mains[0] || null;
    var root = main || document.body;
    for (var d = 0; d < 10; d++) {
      var ks = kidsOf(root).filter(function (k) { return rect(k).h > 0; });
      if (ks.length === 1 && rect(ks[0]).h >= rect(root).h * 0.8) root = ks[0]; else break;
    }
    var tallLimit = VW < 600 ? VH * 4 : VH * 2.5;
    var inFlow = function (k) { var p = cs(k).position; return p !== 'absolute' && p !== 'fixed'; };
    var expand = function (el, depth) {
      if (rect(el).h > tallLimit && depth < 3) {
        var ks2 = kidsOf(el).filter(qualifies).filter(inFlow);
        var sum = ks2.reduce(function (a, k) { return a + rect(k).h; }, 0);
        // 스크롤 트랙처럼 겹치는 자식(합이 부모보다 큼)은 쪼개지 않는다
        if (ks2.length >= 2 && sum >= rect(el).h * 0.7 && sum <= rect(el).h * 1.1) return ks2.reduce(function (acc, k) { return acc.concat(expand(k, depth + 1)); }, []);
      }
      return [el];
    };
    kidsOf(root).filter(qualifies).filter(function (k) { return cs(k).position !== 'fixed'; }).forEach(function (k) { sectionEls = sectionEls.concat(expand(k, 0)); });
    if (main) {
      var hdr = Array.prototype.find.call(document.querySelectorAll('header,[role=banner],nav'), function (h) { return !main.contains(h) && visible(h) && hasBox(h) && rect(h).y < 200 && rect(h).w >= VW * 0.6; });
      if (hdr && sectionEls.indexOf(hdr) < 0 && !sectionEls.some(function (s) { return s.contains(hdr); })) sectionEls.unshift(hdr);
      var ftr = Array.prototype.find.call(document.querySelectorAll('footer,[role=contentinfo]'), function (f) { return !main.contains(f) && visible(f) && hasBox(f); });
      if (ftr && sectionEls.indexOf(ftr) < 0 && !sectionEls.some(function (s) { return s.contains(ftr); })) sectionEls.push(ftr);
    }
    sectionEls = sectionEls.filter(function (s, i) { return !sectionEls.some(function (o, j) { return j !== i && o.contains(s) && o !== s; }); });
    sectionEls.sort(function (a, b) { return rect(a).y - rect(b).y || rect(b).h - rect(a).h; });
    var kept = [];
    sectionEls.forEach(function (s2) {
      var r2 = rect(s2);
      var clash = kept.some(function (k) { var rk = rect(k); var ov = Math.min(rk.b, r2.b) - Math.max(rk.y, r2.y); return ov > Math.min(rk.h, r2.h) * 0.5; });
      if (!clash) kept.push(s2);
    });
    sectionEls = kept;
    if (sectionEls.length > 30) sectionEls = sectionEls.slice(0, 29).concat(sectionEls.slice(-1));
  } catch (e) { warn('EXTRACT_SECTIONS', e); }

  // 가격: 통화 기호 + 숫자(뒤에 규모 접미사 T·B·M·K·조·억·만 이 없을 때), 원 표기, 기간 표기. 큰 숫자 통계($1.4T)와 구분한다.
  var PRICE = /[$€£¥₩]\s?\d[\d,]*(\.\d+)?(?![\d.,]*\s?(t|b|m|k|bn|mn|billion|million|trillion|조|억|만)\b)|\d[\d,]*\s?원(?!\s?(이상|어치))|\/\s?(mo|month|월|년|yr|year|user|seat)\b|per (month|year|user|seat)|월\s?[\d,]+\s?원/i;
  var BIGNUM = /^[+\-~]?[$€£¥₩]?[\d.,]+\s?(%|\+|x|k|m|b|t|bn|만|억|조|천|배|명|개|건|원|시간|분|초|일)?\+?$/i;
  var QUOTE = /^[“"«「『‘]|[”"»」』’]$/;
  var CAROUSEL = '.swiper,.swiper-container,.slick-slider,.splide,.glide,.flickity-enabled,.embla,.keen-slider,[aria-roledescription=carousel],[data-carousel],.carousel,.owl-carousel';

  function itemFlags(k) {
    var f = { img: 0, head: 0, btn: 0, icon: 0, price: 0, big: 0, quote: 0, avatar: 0, logo: 0, link: 0, side: '-', chars: 0 };
    var kr = rect(k);
    var bigM = 0;
    if (k.tagName === 'A' || k.querySelector('a')) f.link = 1;
    var els = [k].concat(Array.prototype.slice.call(k.querySelectorAll('*'), 0, 400));
    var txt = '';
    for (var i = 0; i < els.length && i < 400; i++) {
      var e = els[i];
      if (!visible(e) || !hasBox(e)) continue;
      var r = rect(e);
      var t = e.tagName;
      if ((isMediaTag(t) || (t === 'svg' && r.w > 120)) && r.w * r.h > bigM && r.w > 64) {
        bigM = r.w * r.h;
        var mcx = (r.x + r.r) / 2 - kr.x;
        f.side = r.w >= kr.w * 0.8 ? 'C' : mcx < kr.w * 0.45 ? 'L' : mcx > kr.w * 0.55 ? 'R' : 'C';
      }
      var isAv = t === 'IMG' && r.w <= 64 && r.h <= 64 && /%|px/.test(cs(e).borderTopLeftRadius) && (parseFloat(cs(e).borderTopLeftRadius) >= r.w / 2 - 1 || /50%/.test(cs(e).borderTopLeftRadius));
      if (isMediaTag(t) || (t === 'svg' && r.w > 48)) {
        if (isAv) f.avatar = 1;
        else if (r.w > 48 && r.h > 48) f.img = 1;
      }
      if (!isAv && (t === 'svg' || t === 'IMG' || t === 'I') && r.w <= 48 && r.h <= 48) f.icon = 1;
      if ((t === 'svg' || t === 'IMG') && r.h >= 12 && r.h <= 72 && r.w >= 40 && r.w <= 280 && r.w / r.h >= 1.3) f.logo = 1;
      if (e.matches(HEAD_SEL)) f.head = 1;
      if (buttonish(e)) f.btn = 1;
      if (t === 'BLOCKQUOTE' || t === 'Q') f.quote = 1;
      var rec = textEls.get(e);
      if (rec && textVisible(e)) {
        var tt = rec.t.trim();
        f.chars += rec.c;
        if (txt.length < 400) txt += ' ' + tt;
        if (parseFloat(cs(e).fontSize) >= 26 && BIGNUM.test(tt) && /\d/.test(tt)) f.big = 1;
        if (QUOTE.test(tt) && tt.length > 20) f.quote = 1;
        if (!f.quote && rec.c >= 30) {
          // 따옴표를 ::before 로 그리는 경우
          var pc = getComputedStyle(e, '::before').content || '';
          if (/open-quote|[“"«「]/.test(pc)) f.quote = 1;
        }
      }
    }
    if (PRICE.test(txt)) f.price = 1;
    return f;
  }

  function repeatOf(sec) {
    var best = null;
    var sr = rect(sec);
    var conts = [sec].concat(Array.prototype.slice.call(sec.querySelectorAll('*'), 0, 1500));
    for (var i = 0; i < conts.length; i++) {
      var c = conts[i];
      if (c.children.length < 2 || !visible(c)) continue;
      var cr = rect(c);
      if (cr.w < sr.w * 0.4 || cr.h < 30) continue;
      var ks = kidsOf(c).filter(function (k) { var r = rect(k); return r.w >= 32 && r.h >= 16; });
      if (ks.length < 2) continue;
      var groups = {};
      ks.forEach(function (k) {
        var hasImg = !!k.querySelector('img,svg,video,picture,canvas') || isMediaTag(k.tagName) || k.tagName === 'svg';
        var fc = typeof k.className === 'string' ? k.className.trim().split(/\s+/)[0] || '' : '';
        var sig = k.tagName + ':' + fc + ':' + (hasImg ? 1 : 0);
        (groups[sig] || (groups[sig] = [])).push(k);
      });
      var g = Object.keys(groups).map(function (x) { return groups[x]; }).sort(function (a, b) { return b.length - a.length; })[0];
      if (g.length < 2) continue;
      var ws = g.map(function (k) { return rect(k).w; });
      var mean = ws.reduce(function (a, b) { return a + b; }, 0) / ws.length;
      var cv = Math.sqrt(ws.reduce(function (a, b) { return a + (b - mean) * (b - mean); }, 0) / ws.length) / (mean || 1);
      var cols = g.filter(function (k) { return sameRow(g[0], k); }).length;
      var share = (cr.w * cr.h) / (sr.w * sr.h + 1);
      if (share < 0.15) continue;
      var score = g.length * (g.length / ks.length) * (cv <= 0.2 ? 1 : 0.4) * share;
      if (!best || score > best.score) best = { score: score, g: g, n: g.length, same: r2(g.length / ks.length), cols: cols, rows: Math.ceil(g.length / Math.max(1, cols)), cv: r2(cv), share: r2(Math.min(1, share)) };
    }
    if (!best) return null;
    var fl = { img: 0, head: 0, btn: 0, icon: 0, price: 0, big: 0, quote: 0, avatar: 0, logo: 0, link: 0 };
    var items = best.g.slice(0, 12);
    var sides = '';
    var itemChars = 0;
    items.forEach(function (k) { var f = itemFlags(k); sides += f.side; itemChars += f.chars; for (var key in fl) fl[key] += f[key]; });
    var half = function (v) { return v >= Math.max(1, items.length / 2); };
    return {
      n: best.n, sameSig: best.same, cols: best.cols, rows: best.rows, cv: best.cv, share: best.share,
      item: { hasImg: half(fl.img), hasHeading: half(fl.head), hasButton: half(fl.btn), hasIcon: half(fl.icon), hasPrice: half(fl.price), hasBigNumber: half(fl.big), hasQuote: half(fl.quote), hasAvatar: half(fl.avatar), hasLogo: half(fl.logo), hasLink: half(fl.link), avgChars: Math.round(itemChars / Math.max(1, items.length)) }, sides: sides,
    };
  }

  function sameRow(a, b) {
    var x = rect(a), y = rect(b);
    var ov = Math.min(x.b, y.b) - Math.max(x.y, y.y);
    return ov >= Math.min(x.h, y.h) * 0.5;
  }

  function columnsOf(sec) {
    var cur = sec;
    for (var d = 0; d < 5; d++) {
      var ks = kidsOf(cur).filter(function (k) { return rect(k).w >= rect(sec).w * 0.18 && rect(k).h >= 40; });
      if (ks.length >= 2) {
        var row = ks.filter(function (k) { return sameRow(ks[0], k); });
        if (row.length >= 2) return row.length;
      }
      var all1 = kidsOf(cur);
      if (all1.length !== 1 && ks.length !== 1) return 1;
      cur = ks.length === 1 ? ks[0] : all1[0];
    }
    return 1;
  }

  var sections = [];
  try {
    sectionEls.forEach(function (sec, idx) {
      if (over()) return;
      var sr = rect(sec);
      var ss = cs(sec);
      var counts = { headings: 0, paragraphs: 0, images: 0, logos: 0, buttons: 0, inputs: 0, links: 0, listItems: 0, icons: 0, details: 0, tabs: 0, tables: 0, rows: 0, expanders: 0, forms: 0 };
      var heading = null, headRank = 9, maxFs = 0, chars = 0, bigMedia = null, bigArea = 0;
      var minTop = Infinity, maxBottom = -Infinity;
      var els = [sec].concat(Array.prototype.slice.call(sec.querySelectorAll('*'), 0, 4000));
      for (var i = 0; i < els.length && i < 4000; i++) {
        var e = els[i];
        if (!visible(e) || !hasBox(e)) continue;
        var r = rect(e);
        var t = e.tagName;
        var rec = textEls.get(e);
        var tv = rec && textVisible(e);
        if (tv) {
          chars += rec.c;
          var fs = parseFloat(cs(e).fontSize);
          if (fs > maxFs) maxFs = fs;
        }
        if (tv || isMediaTag(t)) { if (r.y < minTop) minTop = r.y; if (r.b > maxBottom) maxBottom = r.b; }
        if (e.matches(HEAD_SEL)) {
          var ht = visibleText(e, opts.headingChars || 60);
          if (ht) {
            counts.headings++;
            var rank = /^H[1-6]$/.test(t) ? +t[1] : 3;
            if (rank < headRank) { headRank = rank; heading = { el: e, tag: t.toLowerCase(), text: ht, size: r1(parseFloat(cs(e).fontSize)) }; }
          }
        }
        if (t === 'P' && tv) counts.paragraphs++;
        if (isMediaTag(t) || (t === 'svg' && r.w > 64) || (cs(e).backgroundImage.indexOf('url(') >= 0 && r.w > 64 && r.h > 64)) {
          if (t !== 'PICTURE' && r.w >= 48 && r.h >= 48) counts.images++;
          var ma = clipArea(r);
          if (ma > bigArea) { bigArea = ma; bigMedia = e; }
        }
        if ((t === 'svg' || t === 'IMG') && r.w <= 48 && r.h <= 48) counts.icons++;
        if ((t === 'svg' || t === 'IMG') && r.h >= 12 && r.h <= 72 && r.w >= 40 && r.w <= 280 && r.w / r.h >= 1.3) counts.logos++;
        if (buttonish(e)) counts.buttons++;
        else if (t === 'A') counts.links++;
        if ((t === 'INPUT' && !/^(hidden|submit|button|reset)$/i.test(e.type)) || t === 'SELECT' || t === 'TEXTAREA') counts.inputs++;
        if (t === 'LI') counts.listItems++;
        if (t === 'DETAILS') counts.details++;
        if (e.getAttribute('role') === 'tab') counts.tabs++;
        if (t === 'TABLE') counts.tables++;
        if (t === 'TR') counts.rows++;
        if (t === 'FORM') counts.forms++;
        if ((t === 'BUTTON' || e.getAttribute('role') === 'button') && e.hasAttribute('aria-expanded')) counts.expanders++;
      }
      if (!heading) {
        // 헤딩 태그가 없으면 가장 큰 글자를 제목으로 본다
        var bigEl = null, bigFs = 0;
        for (var j = 0; j < els.length && j < 4000; j++) {
          var e2 = els[j];
          var rec2 = textEls.get(e2);
          if (!rec2 || !textOkCache.get(e2)) continue;
          var f2 = parseFloat(cs(e2).fontSize);
          if (f2 > bigFs && rec2.c <= 120) { bigFs = f2; bigEl = e2; }
        }
        if (bigEl && bigFs >= 20) heading = { el: bigEl, tag: 'text', text: visibleText(bigEl, opts.headingChars || 60), size: r1(bigFs) };
      }
      var own = parseColor(ss.backgroundColor);
      var bgKind = 'inherit';
      var bgHex = null;
      var bimg = ss.backgroundImage || '';
      if (bimg.indexOf('url(') >= 0) bgKind = 'image';
      else if (bimg.indexOf('gradient(') >= 0) bgKind = 'gradient';
      if (own && own.a > 0.05) { bgKind = bgKind === 'inherit' ? 'solid' : bgKind; bgHex = hex(own); }
      if (!bgHex) {
        var kid = kidsOf(sec)[0];
        if (kid && rect(kid).w * rect(kid).h >= sr.w * sr.h * 0.9) {
          var kc = parseColor(cs(kid).backgroundColor);
          if (kc && kc.a > 0.05) { bgHex = hex(kc); bgKind = 'solid'; }
          var kb = cs(kid).backgroundImage || '';
          if (kb.indexOf('url(') >= 0) bgKind = 'image'; else if (kb.indexOf('gradient(') >= 0 && bgKind === 'inherit') bgKind = 'gradient';
        }
      }
      if (!bgHex) bgHex = solidBehind(sec);
      var share = bigMedia ? r2(bigArea / Math.max(1, clipArea(sr))) : 0;
      var side = 'none';
      if (bigMedia) {
        var mr = rect(bigMedia);
        if (bigMedia.tagName === 'VIDEO' && share >= 0.6) bgKind = 'video';
        var cx = (mr.x + mr.r) / 2 - sr.x;
        var hr = heading ? rect(heading.el) : null;
        var hcx = hr ? (hr.x + hr.r) / 2 : 0;
        var hcy = hr ? (hr.y + hr.b) / 2 : 0;
        var behind = hr ? hcx >= mr.x && hcx <= mr.r && hcy >= mr.y && hcy <= mr.b : share >= 0.75;
        if (behind && share >= 0.4) side = 'bg';
        else if (cx < sr.w * 0.42 && mr.w < sr.w * 0.7) side = 'left';
        else if (cx > sr.w * 0.58 && mr.w < sr.w * 0.7) side = 'right';
        else if (hr && mr.y >= hr.b - 4) side = 'below';
        else if (hr && mr.b <= hr.y + 4) side = 'above';
        else side = 'center';
      }
      var align = 'left';
      if (heading) {
        var hs = cs(heading.el);
        var hrr = rect(heading.el);
        if (hs.textAlign === 'center' || (Math.abs((hrr.x + hrr.r) / 2 - (sr.x + sr.r) / 2) < sr.w * 0.04 && hrr.w < sr.w * 0.9)) align = 'center';
      }
      var carousel = false, marquee = false;
      try { carousel = !!sec.querySelector(CAROUSEL); } catch (e) { carousel = false; }
      var tracks = sec.querySelectorAll('*');
      for (var m = 0; m < tracks.length && m < 1500 && !carousel; m++) {
        var tr = tracks[m];
        if (tr.children.length < 3) continue;
        var ts = cs(tr);
        if ((ts.overflowX === 'auto' || ts.overflowX === 'scroll') && tr.scrollWidth > tr.clientWidth + 20) carousel = true;
        if (ts.animationName !== 'none' && tr.scrollWidth > rect(sec).w * 1.2) marquee = true;
      }
      var isNavSec = /^(HEADER|NAV)$/.test(sec.tagName) || sec.getAttribute('role') === 'banner' || (!!sec.querySelector('nav') && sr.h <= 200 && idx === 0);
      var item = {
        y: Math.round(sr.y), h: Math.round(sr.h), w: Math.round(sr.w), tag: sec.tagName.toLowerCase(), bg: bgHex, bgKind: bgKind,
        fullBleed: sr.w >= VW - 2 && (bgKind !== 'inherit' || share >= 0.75),
        heading: heading ? { tag: heading.tag, text: heading.text, size: heading.size } : null,
        align: align, counts: counts, columns: columnsOf(sec), repeat: repeatOf(sec),
        media: { side: side, share: share }, carousel: carousel, marquee: marquee,
        fs: r1(maxFs), chars: chars, pt: minTop === Infinity ? null : Math.round(minTop - sr.y), pb: maxBottom === -Infinity ? null : Math.round(sr.b - maxBottom),
        nav: isNavSec, footer: /^FOOTER$/.test(sec.tagName) || sec.getAttribute('role') === 'contentinfo' || !!(sec.querySelector('footer') && idx === sectionEls.length - 1),
        sticky: /fixed|sticky/.test(ss.position),
        // 스크롤해서 보일 때만 내용을 그리는 자리(지금은 비어 있다)
        empty: chars === 0 && !bigMedia && els.length <= 3,
      };
      if (opts.trusted) {
        var cl = typeof sec.className === 'string' ? sec.className.trim().split(/\s+/).slice(0, 3).join(' ') : '';
        item.cls = clean(cl.replace(/[^\w\s:/[\].-]/g, ''), 60);
        if (sec.id) item.id = clean(String(sec.id).replace(/[^\w-]/g, ''), 40);
      }
      sections.push(item);
    });
  } catch (e) { warn('EXTRACT_STRUCTURE', e); }
  // ── 내비
  var nav = null;
  try {
    var navEl = Array.prototype.find.call(document.querySelectorAll('header,[role=banner],nav'), function (h) { return visible(h) && hasBox(h) && rect(h).y < 160 && rect(h).w >= VW * 0.8; });
    if (navEl) {
      var nr = rect(navEl);
      var pos = 'static';
      for (var pe = navEl, pi = 0; pe && pi < 4; pe = parentEl(pe), pi++) { var pp = cs(pe).position; if (pp === 'fixed' || pp === 'sticky') { pos = pp; break; } }
      var links = 0, ctas = 0, burger = false;
      navEl.querySelectorAll('a,button,[role=button]').forEach(function (a) {
        if (!visible(a) || !hasBox(a)) return;
        if (buttonish(a)) {
          var lab = (a.getAttribute('aria-label') || '') + ' ' + (a.className && typeof a.className === 'string' ? a.className : '');
          if (!visibleText(a, 24) && (/menu|메뉴|nav|burger|toggle/i.test(lab) || a.querySelector('svg'))) burger = true;
          else ctas++;
        } else if (a.tagName === 'A' && visibleText(a, 24)) links++;
      });
      var nbg = parseColor(cs(navEl).backgroundColor);
      nav = {
        h: Math.round(nr.h), pos: pos, blur: /blur\(/.test(cs(navEl).backdropFilter || ''), bg: nbg && nbg.a > 0.02 ? hex(nbg) : null,
        links: links, cta: ctas, burger: burger, border: (parseFloat(cs(navEl).borderBottomWidth) || 0) >= 0.5,
      };
    }
  } catch (e) { warn('EXTRACT_NAV', e); }

  // ── 모션 라이브러리·reduced-motion
  var libs = [];
  var reduced = null, darkMedia = false;
  try {
    var q2 = function (sel) { try { return !!document.querySelector(sel); } catch (e) { return false; } };
    if (q2('[data-aos]')) libs.push('aos');
    if (q2('script[src*="gsap"],[data-gsap]')) libs.push('gsap');
    if (q2('html.lenis,.lenis-smooth,[data-lenis-prevent]')) libs.push('lenis');
    if (q2('[data-scroll-container],.has-scroll-smooth')) libs.push('locomotive-scroll');
    if (q2('lottie-player,dotlottie-player,script[src*="lottie"]')) libs.push('lottie');
    if (q2('[data-framer-appear-id],[data-projection-id]') || hints.framer) libs.push('framer-motion');
    if (q2('.swiper')) libs.push('swiper');
    if (q2('[data-animate],[class*="animate__"]')) libs.push('animate.css');
    var scanned = 0, accessible = 0;
    var scan = function (rules, depth) {
      for (var i = 0; i < rules.length && scanned < 30000; i++) {
        scanned++;
        var rule = rules[i];
        var cond = rule.conditionText || (rule.media && rule.media.mediaText) || '';
        if (cond) {
          if (/prefers-reduced-motion/.test(cond)) reduced = true;
          if (/prefers-color-scheme:\s*dark/.test(cond)) darkMedia = true;
        }
        if (rule.cssRules && depth < 4) scan(rule.cssRules, depth + 1);
      }
    };
    for (var si = 0; si < document.styleSheets.length; si++) {
      var rules = null;
      try { rules = document.styleSheets[si].cssRules; } catch (e) { rules = null; }
      if (!rules) continue;
      accessible++;
      scan(rules, 0);
    }
    if (reduced === null && accessible > 0) reduced = false;
  } catch (e) { warn('EXTRACT_MOTION', e); }

  // ── 테마·루트 배경·가로 넘침
  var rootBg = null;
  try {
    var hc = parseColor(cs(document.documentElement).backgroundColor);
    var bc2 = document.body ? parseColor(cs(document.body).backgroundColor) : null;
    var rc = hc && hc.a > 0.02 ? hc : bc2 && bc2.a > 0.02 ? bc2 : { r: 255, g: 255, b: 255, a: 1 };
    rootBg = hex(blend(rc, { r: 255, g: 255, b: 255, a: 1 }));
    // 캔버스 면적 = 문서 − 불투명 자식 면적
    var canvasArea = DOC_W * DOC_H;
    kidsOf(document.body).forEach(function (k) { var kc = parseColor(cs(k).backgroundColor); if (kc && kc.a >= 0.95) canvasArea -= clipArea(rect(k)); });
    tally(C.bg, rootBg, Math.max(0, Math.round(canvasArea / 100)));
  } catch (e) { warn('EXTRACT_THEME', e); }
  var overflowX = Math.max(0, (document.scrollingElement || document.documentElement).scrollWidth - document.documentElement.clientWidth);
  var offList = [];
  if (opts.trusted && overflowX > 0) {
    offenders.forEach(function (el) {
      for (var p = parentEl(el); p && p !== document.body; p = parentEl(p)) {
        if (/hidden|clip|auto|scroll/.test(cs(p).overflowX)) return;
      }
      var cl = typeof el.className === 'string' ? el.className.trim().split(/\s+/)[0] || '' : '';
      offList.push({ sel: clean((el.tagName.toLowerCase() + (el.id ? '#' + el.id : '') + (cl ? '.' + cl : '')).replace(/[^\w#.:-]/g, ''), 60), over: Math.round(rect(el).r - VW) });
    });
    offList.sort(function (a, b) { return b.over - a.over; });
    offList = offList.slice(0, 3);
  }

  // ── 첫 화면 빈 칸 비율: 48×30 격자에 글자(실제 글자 범위)·미디어 상자를 칠한다
  var firstScreen = null;
  try {
    var GX = 48, GY = 30;
    var cells = new Uint8Array(GX * GY);
    var mark = function (r) {
      if (r.y >= VH || r.b <= 0 || r.r <= 0 || r.x >= VW) return;
      var x0 = Math.max(0, Math.floor((r.x / VW) * GX)), x1 = Math.min(GX - 1, Math.floor(((Math.min(r.r, VW) - 1) / VW) * GX));
      var y0 = Math.max(0, Math.floor((r.y / VH) * GY)), y1 = Math.min(GY - 1, Math.floor(((Math.min(r.b, VH) - 1) / VH) * GY));
      for (var yy = y0; yy <= y1; yy++) for (var xx = x0; xx <= x1; xx++) cells[yy * GX + xx] = 1;
    };
    var range = document.createRange();
    textEls.forEach(function (rec, el) {
      if (!textOkCache.get(el) || rect(el).y >= VH) return;
      range.selectNodeContents(el);
      var b = range.getBoundingClientRect();
      mark({ x: b.left, y: b.top + SY, r: b.right, b: b.bottom + SY });
    });
    firstMedia.forEach(function (r) { if (r.w * Math.min(r.h, VH) < VW * VH * 0.5) mark(r); });
    var inked = 0;
    for (var ci2 = 0; ci2 < cells.length; ci2++) inked += cells[ci2];
    firstScreen = { ink: r2(inked / cells.length), whitespace: r2(1 - inked / cells.length) };
  } catch (e) { warn('EXTRACT_DENSITY', e); }

  // ── 조립
  var top = function (map, n, num) {
    return Object.keys(map).map(function (k) { return [num ? +k : k, map[k]]; }).filter(function (x) { return x[1] > 0; }).sort(function (a, b) { return b[1] - a[1]; }).slice(0, n);
  };
  var docArea = Math.max(1, DOC_W * DOC_H);
  var bodyMs = Math.round(performance.now() - T0);
  var out = {
    schema: 'dd.raw/1',
    meta: {
      viewport: opts.viewport || null, w: VW, h: VH, dpr: window.devicePixelRatio || 1, docW: DOC_W, docH: DOC_H,
      title: clean(document.title, 80), lang: /^[a-z]{2,3}(-[a-z0-9]{2,8}){0,3}$/i.test(String(document.documentElement.lang || '')) ? String(document.documentElement.lang) : '',
      ms: bodyMs, elements: all.length, measured: sample.length, sampled: sampled, budgetHit: budgetHit, trimmed: [], warnings: warnings,
    },
    text: {
      styles: styleList.slice(0, 60),
      script: script,
    },
    fonts: fonts,
    vars: { count: vars.count, items: vars.items },
    hints: hints,
    color: {
      root: rootBg, bg: top(C.bg, 40), text: top(textCol, 40), border: top(C.border, 30), svg: top(C.svg, 20), icon: top(C.icon, 20),
      button: top(C.btn, 20), link: top(linkCol, 20),
      gradients: { count: gradients.length, area: Math.round(gradients.reduce(function (a, g) { return a + g.a * 100; }, 0) / docArea * 1000) / 1000, text: gradientText, top: gradients.sort(function (a, b) { return b.a - a.a; }).slice(0, 8) },
    },
    radius: top(radius, 40).map(function (x) { var p = String(x[0]).split('|'); return [p[0], p[1] === 'pill' ? 'pill' : +p[1], x[1]]; }),
    shadows: Object.keys(shadows).map(function (k) { return shadows[k]; }).sort(function (a, b) { return b.n - a.n; }).slice(0, 12),
    space: {
      padding: top(pad, 40, true), margin: top(mar, 40, true), gap: top(gaps, 30, true),
      containers: top(containers, 12, true), containerPad: top(contPads, 8, true), gutters: top(gutters, 12, true), textLeft: top(textLeft, 12, true),
      firstScreen: firstScreen,
      grids: top(grids, 12).map(function (x) { var p = String(x[0]).split('|'); return [+p[0], +p[1], x[1]]; }),
    },
    motion: { transitions: top(tDur, 20, true), easings: top(tEase, 10), animations: animCount, animDurations: top(aDur, 10, true), libs: libs, reducedMotion: reduced },
    media: {
      imgShare: r2(media.img / docArea), bgImgShare: r2(media.bgImg / docArea), svgShare: r2(media.svg / docArea),
      video: media.video, canvas: media.canvas, iframe: media.iframe, icons: media.icons, blur: media.blur,
    },
    components: { button: comps.button, input: comps.input, card: comps.card, badge: comps.badge, nav: nav },
    theme: { mode: rootBg && lum(parseColor(rootBg)) < 0.2 ? 'dark' : 'light', colorScheme: clean(String(cs(document.documentElement).colorScheme || 'normal'), 20), darkMedia: darkMedia },
    overflow: { x: overflowX },
    sections: sections,
  };
  if (opts.trusted) out.overflow.offenders = offList;
  if (budgetHit) warn('EXTRACT_BUDGET', '시간 예산 ' + BUDGET + 'ms 를 넘겨 일부만 쟀다');

  // ── 크기 예산: 히스토그램 꼬리 → 변수 → 컴포넌트 샘플 → 섹션 순으로 자른다
  var size = function () { return new TextEncoder().encode(JSON.stringify(out)).length; };
  var MAX_BYTES = opts.maxBytes || 30000;
  var steps = [
    ['histograms', function () {
      ['bg', 'text', 'border', 'svg', 'icon', 'button', 'link'].forEach(function (k) { out.color[k] = out.color[k].slice(0, 12); });
      ['padding', 'margin', 'gap'].forEach(function (k) { out.space[k] = out.space[k].slice(0, 16); });
      out.radius = out.radius.slice(0, 16);
      out.text.styles = out.text.styles.slice(0, 30);
      out.shadows = out.shadows.slice(0, 6);
      out.color.gradients.top = out.color.gradients.top.slice(0, 3);
    }],
    ['vars', function () { out.vars.items = out.vars.items.filter(function (v) { return v.t === 'color'; }).slice(0, 40); }],
    ['vars-all', function () { out.vars.items = []; }],
    ['components', function () { out.components.button = out.components.button.slice(0, 6); out.components.card = out.components.card.slice(0, 4); out.components.input = out.components.input.slice(0, 3); out.components.badge = out.components.badge.slice(0, 3); }],
    ['text-styles', function () { out.text.styles = out.text.styles.slice(0, 18); }],
    ['sections', function () { out.sections = out.sections.slice(0, 20); }],
    ['sections-12', function () { out.sections = out.sections.slice(0, 12); }],
  ];
  for (var st = 0; st < steps.length && size() > MAX_BYTES; st++) {
    steps[st][1]();
    out.meta.trimmed.push(steps[st][0]);
  }
  out.meta.bytes = size();
  return out;
})
