(function ddPrepare(opts) {
  // 대기·차단 감지·dev 에러 오버레이 감지·오버레이 숨김·자동 스크롤. 스크롤과 숨김은 이 파일에서만 한다.
  // 클릭하지 않는다. 숨김은 display:none 뿐이고 window.__ddRestore() 로 되돌릴 수 있다.
  opts = opts || {};
  var sleep = function (ms) { return new Promise(function (r) { setTimeout(r, ms); }); };
  var vw = window.innerWidth;
  var vh = window.innerHeight;
  // 제어문자·zero-width·bidi·태그 문자. 소스에 이스케이프를 직접 쓰지 않고 코드 포인트로 만든다.
  var CONTROL = /[\x00-\x1f\x7f-\x9f]/g;
  var INVISIBLE = new RegExp('[' + [[173, 173], [6158, 6158], [8203, 8207], [8232, 8238], [8288, 8303], [65024, 65039], [65279, 65279], [65529, 65531], [917504, 917631], [917760, 917999]].map(function (r) {
    var h = function (c) { return '\\u{' + c.toString(16) + '}'; };
    return r[0] === r[1] ? h(r[0]) : h(r[0]) + '-' + h(r[1]);
  }).join('') + ']', 'gu');
  var clean = function (s, n) {
    s = String(s == null ? '' : s).normalize('NFC');
    s = s.replace(INVISIBLE, '').replace(CONTROL, ' ').replace(/\s+/g, ' ').trim();
    return s.length > n ? s.slice(0, n - 1) + '…' : s;
  };
  // 힌트는 태그 이름만 남긴다. id·class 는 사이트가 정한 글자라서 지시문을 실을 수 있다.
  var hintOf = function (el) {
    return String(el.tagName || '').toLowerCase().replace(/[^a-z0-9-]/g, '').slice(0, 20);
  };
  var attrText = function (el) {
    var c = typeof el.className === 'string' ? el.className : (el.getAttribute && el.getAttribute('class')) || '';
    return [el.id, c, el.getAttribute && el.getAttribute('aria-label'), el.getAttribute && el.getAttribute('data-testid'), el.tagName === 'IFRAME' ? el.getAttribute('src') : ''].join(' ');
  };
  var isShown = function (el) {
    var r = el.getBoundingClientRect();
    if (r.width < 1 || r.height < 1) return false;
    var cs = getComputedStyle(el);
    return cs.display !== 'none' && cs.visibility !== 'hidden' && Number(cs.opacity) > 0.05;
  };

  function visibleStats() {
    var els = 0;
    var chars = 0;
    var media = 0;
    var walker = document.createTreeWalker(document.body || document.documentElement, NodeFilter.SHOW_ELEMENT);
    var n = 0;
    for (var el = walker.currentNode; el && n < 4000; el = walker.nextNode(), n++) {
      if (!(el instanceof Element)) continue;
      var r = el.getBoundingClientRect();
      if (r.width < 1 || r.height < 1) continue;
      els++;
      if (/^(IMG|VIDEO|CANVAS|SVG|PICTURE|IFRAME)$/i.test(el.tagName) && r.width * r.height > 2500) media++;
    }
    var text = (document.body && document.body.innerText) || '';
    chars = text.replace(/\s+/g, '').length;
    return { els: els, chars: chars, media: media };
  }

  function challengeMarker() {
    var c = opts.challenge || {};
    var title = String(document.title || '').toLowerCase();
    var titles = c.titles || [];
    for (var i = 0; i < titles.length; i++) if (title.indexOf(String(titles[i]).toLowerCase()) >= 0) return 'title';
    var sels = c.selectors || [];
    for (var j = 0; j < sels.length; j++) {
      try {
        if (document.querySelector(sels[j])) return 'selector';
      } catch (e) { /* 잘못된 선택자는 건너뛴다 */ }
    }
    return null;
  }

  function devOverlay() {
    var pick = function (root, sels) {
      for (var i = 0; i < sels.length; i++) {
        var el = root && root.querySelector(sels[i]);
        if (el && el.textContent && el.textContent.trim()) return el.textContent.trim().split('\n')[0];
      }
      return '';
    };
    var vite = document.querySelector('vite-error-overlay');
    if (vite) return { title: clean(pick(vite.shadowRoot, ['.message-body', '.message', 'pre']) || 'Vite error overlay', 200) };
    var portals = document.querySelectorAll('nextjs-portal');
    for (var i = 0; i < portals.length; i++) {
      var sr = portals[i].shadowRoot;
      if (sr && sr.querySelector('[data-nextjs-dialog], [data-nextjs-dialog-overlay], #nextjs__container_errors_desc, #nextjs__container_build_error_label')) {
        return { title: clean(pick(sr, ['#nextjs__container_errors_desc', '#nextjs__container_build_error_label', '#nextjs__container_errors_label', '[data-nextjs-dialog-header] h1', 'h1', 'h4']) || 'Next.js error overlay', 200) };
      }
    }
    var wds = document.querySelector('#webpack-dev-server-client-overlay');
    if (wds && isShown(wds)) {
      var t = '';
      try { t = wds.contentDocument ? pick(wds.contentDocument, ['#webpack-dev-server-client-overlay-div div', 'div', 'pre']) : ''; } catch (e) { t = ''; }
      return { title: clean(t || 'webpack-dev-server overlay', 200) };
    }
    var h1 = document.querySelector('h1');
    if (/^Application Error!?$/.test(String(document.title).trim()) || (h1 && /^Application Error$/.test(h1.textContent.trim()) && document.querySelector('pre'))) {
      return { title: clean(pick(document, ['pre']) || 'Application Error', 200) };
    }
    return null;
  }

  var hidden = [];
  var overflowSaved = null;
  function hide(el, kind) {
    if (el.__ddHidden) return;
    el.__ddHidden = true;
    hidden.push({ el: el, style: el.getAttribute('style') });
    el.style.setProperty('display', 'none', 'important');
    overlays.push({ kind: kind, hint: hintOf(el) });
  }
  var overlays = [];

  function isNav(el, r) {
    if (r.top > 10 || r.height > 160 || r.width < vw * 0.8) return false;
    return el.querySelectorAll('a').length >= 3;
  }

  function hideOverlays() {
    var ov = opts.overlay || {};
    var consentRe = new RegExp(ov.consent || 'cookie|consent', 'i');
    var consentTextRe = new RegExp(ov.consentText || 'cookie|consent', 'i');
    var chatRe = new RegExp(ov.chat || 'intercom', 'i');
    var walker = document.createTreeWalker(document.body || document.documentElement, NodeFilter.SHOW_ELEMENT);
    var cands = [];
    var n = 0;
    for (var el = walker.currentNode; el && n < 15000; el = walker.nextNode(), n++) {
      if (!(el instanceof Element) || el === document.body) continue;
      var cs = getComputedStyle(el);
      var pos = cs.position;
      var z = parseInt(cs.zIndex, 10) || 0;
      var dialog = el.getAttribute('role') === 'dialog' || el.getAttribute('aria-modal') === 'true' || (el.tagName === 'DIALOG' && el.hasAttribute('open'));
      if (pos === 'fixed' || pos === 'sticky' || z >= 1000 || dialog) cands.push({ el: el, pos: pos, z: z, dialog: dialog });
    }
    for (var i = 0; i < cands.length; i++) {
      var c = cands[i];
      var e = c.el;
      if (e.__ddHidden || !isShown(e)) continue;
      // 이미 숨긴 조상 아래면 건너뛴다
      var p = e.parentElement;
      var under = false;
      while (p) { if (p.__ddHidden) { under = true; break; } p = p.parentElement; }
      if (under) continue;
      var r = e.getBoundingClientRect();
      if (isNav(e, r)) continue;
      var area = (Math.min(r.right, vw) - Math.max(r.left, 0)) * (Math.min(r.bottom, vh) - Math.max(r.top, 0));
      var share = area > 0 ? area / (vw * vh) : 0;
      var attrs = attrText(e);
      var floating = c.pos === 'fixed' || c.pos === 'sticky' || c.z >= 1000;
      if (floating && consentRe.test(attrs)) { hide(e, 'consent'); continue; }
      if (floating && chatRe.test(attrs) && share < 0.3) { hide(e, 'chat'); continue; }
      if (c.pos === 'fixed' && share < 0.6 && (r.bottom >= vh - 4 || r.top <= 4)) {
        var txt = (e.innerText || '').slice(0, 2000);
        if (consentTextRe.test(txt) && e.querySelectorAll('button, a, [role=button]').length >= 1) { hide(e, 'consent'); continue; }
      }
      if (share >= 0.3 && (c.dialog || (c.pos === 'fixed' && c.z >= 1000))) { hide(e, 'modal'); continue; }
    }
    // 모달이 잠근 스크롤을 푼다
    if (overlays.some(function (o) { return o.kind === 'modal' || o.kind === 'consent'; })) {
      var de = document.documentElement;
      var b = document.body;
      overflowSaved = { html: de.getAttribute('style'), body: b && b.getAttribute('style') };
      if (getComputedStyle(de).overflow === 'hidden') de.style.setProperty('overflow', 'visible', 'important');
      if (b && getComputedStyle(b).overflow === 'hidden') b.style.setProperty('overflow', 'visible', 'important');
    }
  }

  function userHide() {
    var list = opts.hide || [];
    for (var i = 0; i < list.length; i++) {
      var els = [];
      try { els = document.querySelectorAll(list[i]); } catch (e) { continue; }
      for (var j = 0; j < els.length; j++) hide(els[j], 'user');
    }
  }

  window.__ddRestore = function () {
    for (var i = hidden.length - 1; i >= 0; i--) {
      var h = hidden[i];
      if (h.style == null) h.el.removeAttribute('style'); else h.el.setAttribute('style', h.style);
      delete h.el.__ddHidden;
    }
    hidden = [];
    if (overflowSaved) {
      var de = document.documentElement;
      if (overflowSaved.html == null) de.removeAttribute('style'); else de.setAttribute('style', overflowSaved.html);
      if (document.body) { if (overflowSaved.body == null) document.body.removeAttribute('style'); else document.body.setAttribute('style', overflowSaved.body); }
    }
  };

  function scrollHeight() {
    var se = document.scrollingElement || document.documentElement;
    return Math.max(se.scrollHeight, document.body ? document.body.scrollHeight : 0);
  }

  async function autoScroll() {
    var step = Math.max(200, Math.round(vh * 0.8));
    var start = Date.now();
    var y = 0;
    var last = scrollHeight();
    var same = 0;
    var steps = 0;
    while (steps < (opts.maxScrollSteps || 30) && Date.now() - start < (opts.maxScrollMs || 12000)) {
      y += step;
      window.scrollTo(0, y);
      steps++;
      await sleep(120);
      var h = scrollHeight();
      if (y + vh >= h) {
        same = h === last ? same + 1 : 0;
        if (same >= 3) break;
      }
      last = h;
    }
    return steps;
  }

  async function waitImages(ms) {
    var pending = [];
    var imgs = document.images;
    var wait = function (im) {
      return new Promise(function (r) { im.addEventListener('load', r, { once: true }); im.addEventListener('error', r, { once: true }); });
    };
    for (var i = 0; i < imgs.length && pending.length < 200; i++) {
      var im = imgs[i];
      if (im.complete || (!im.currentSrc && !im.src)) continue;
      pending.push(wait(im));
    }
    if (pending.length) await Promise.race([Promise.all(pending), sleep(ms)]);
    return pending.length;
  }

  return (async function () {
    var out = { pageHeight: 0, overlaysHidden: overlays, blocked: null, appError: null, challengeWarning: false, httpError: false, scrollSteps: 0 };
    try { await Promise.race([document.fonts ? document.fonts.ready : null, sleep(5000)]); } catch (e) { /* 무시 */ }
    var status = Number(opts.status) || 0;
    var marker = challengeMarker();
    var stats = visibleStats();
    if (marker && (status >= 400 || stats.els < 50)) {
      out.blocked = { reason: 'challenge', code: 'BLOCKED', marker: marker };
      out.pageHeight = scrollHeight();
      return out;
    }
    if (marker) out.challengeWarning = true;
    if (status >= 400) {
      out.httpError = true;
      out.pageHeight = scrollHeight();
      return out;
    }
    // SPA 하이드레이션을 3초까지 기다린다
    for (var k = 0; k < 6 && stats.chars < 50 && stats.media === 0; k++) {
      await sleep(500);
      stats = visibleStats();
    }
    if (stats.chars < 50 && stats.media === 0) {
      out.blocked = { reason: 'empty-render', code: 'EMPTY_RENDER', marker: null };
      out.pageHeight = scrollHeight();
      return out;
    }
    if (opts.trusted) {
      out.appError = devOverlay();
      if (out.appError) { out.pageHeight = scrollHeight(); return out; }
    }
    if (!opts.keepOverlays) hideOverlays();
    userHide();
    out.scrollSteps = await autoScroll();
    // 스크롤 중 늦게 뜬 배너도 한 번 더 숨긴다
    if (!opts.keepOverlays) hideOverlays();
    await waitImages(3000);
    window.scrollTo(0, 0);
    await sleep(400);
    out.pageHeight = scrollHeight();
    return out;
  })();
})
