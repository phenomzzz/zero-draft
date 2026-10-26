/* Read-only light-DOM diagnostic: this file is one async function expression returning a JSON-safe object.
   Run it by wrapping the whole file: (<file contents>)()
   - Claude Code javascript_tool or DevTools console: paste that wrapped text; the result is the report.
   - Playwright: await page.evaluate(`(${fs.readFileSync(path, 'utf8')})()`).
   It never clicks, scrolls, injects styles, fetches, stores or logs. Every finding is a lead, not a verdict. */
async () => {
  const warnings = [];
  if (document.fonts?.ready) {
    let timer;
    const settled = await Promise.race([
      document.fonts.ready.then(() => true),
      new Promise(resolve => { timer = setTimeout(() => resolve(false), 2500); })
    ]);
    clearTimeout(timer);
    if (!settled) warnings.push('Font readiness timed out; geometry may still change');
  }
  if (typeof requestAnimationFrame === 'function') {
    await Promise.race([
      new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve))),
      new Promise(resolve => setTimeout(resolve, 150))
    ]);
  } else {
    warnings.push('Animation-frame API unavailable in this evaluator; no settling frames observed');
  }
  const viewport = document.documentElement.clientWidth;
  const height = window.innerHeight;
  const scrollTop = window.scrollY || 0;
  const media = query => { try { return typeof matchMedia === 'function' ? matchMedia(query).matches : null; } catch { return null; } };
  const attr = (el, key) => el.getAttribute?.(key) ?? null;
  const safeUrl = value => {
    try { const u = new URL(value, location.href); return `${u.origin}${u.pathname}`; }
    catch { return '(unavailable)'; }
  };
  const describe = el => {
    const tag = el.tagName.toLowerCase();
    // Do not include field values, inner text, arbitrary attributes or URLs.
    const siblings = el.parentElement ? [...el.parentElement.children].filter(x => x.tagName === el.tagName) : [];
    return `${tag}${siblings.length > 1 ? `:nth-of-type(${siblings.indexOf(el) + 1})` : ''}`;
  };
  const locationOf = el => {
    const parts = [];
    for (let p = el; p && parts.length < 5; p = p.parentElement) parts.unshift(describe(p));
    return parts.join(' > ');
  };
  const rendered = el => {
    const rect = el.getBoundingClientRect();
    if (!rect.width || !rect.height || !el.getClientRects().length) return false;
    for (let p = el; p; p = p.parentElement) {
      const s = getComputedStyle(p);
      if (s.display === 'none' || s.visibility === 'hidden' || Number(s.opacity) === 0 || p.hidden) return false;
    }
    return true;
  };
  const inView = rect => rect.bottom > 0 && rect.top < height && rect.right > 0 && rect.left < viewport;
  const intersects = (a, b) => a.left < b.right && b.left < a.right && a.top < b.bottom && b.top < a.bottom;
  const rectOf = el => {
    const r = el.getBoundingClientRect();
    return Object.fromEntries(['left', 'top', 'right', 'bottom', 'width', 'height'].map(k => [k, Math.round(r[k] * 10) / 10]));
  };
  const directText = el => [...el.childNodes].some(n => n.nodeType === 3 && n.textContent.trim());
  const all = [...document.querySelectorAll('body *')];
  const visible = [];
  const painted = [];
  const horizontalEscape = [];
  const textClippingLeads = [];
  for (const el of all) {
    if (!rendered(el)) continue;
    visible.push(el);
    const r = el.getBoundingClientRect();
    if (r.left < -1 || r.right > viewport + 1) {
      horizontalEscape.push({element: locationOf(el), rect: rectOf(el), currentlyInVerticalView: r.bottom > 0 && r.top < height});
    }
    const s = getComputedStyle(el);
    if (el.matches?.('img, video, canvas, iframe, picture, svg') || (s.backgroundImage && s.backgroundImage !== 'none')) painted.push(el);
    if (directText(el) && inView(r) && (el.scrollWidth > el.clientWidth + 1 || el.scrollHeight > el.clientHeight + 1)
        && [s.overflowX, s.overflowY].some(x => x === 'hidden' || x === 'clip')) {
      textClippingLeads.push({element: locationOf(el), rect: rectOf(el)});
    }
  }

  // Controls: names, WCAG 2.2 minimum target (24px) and the 44px comfort target used on touch layouts.
  const controls = visible.filter(el => el.matches('button, a[href], input:not([type="hidden"]), select, textarea, [role="button"], [role="radio"], [role="tab"]'));
  const possibleUnlabeled = [];
  const smallControls = [];
  const belowComfort = [];
  const hasSimpleName = el => {
    if (el.getAttribute('aria-label')?.trim()) return true;
    const labelled = el.getAttribute('aria-labelledby')?.split(/\s+/).some(id => document.getElementById(id)?.textContent.trim());
    if (labelled || el.labels?.length) return true;
    if (el.matches('input[type="submit"], input[type="reset"], input[type="button"]')) return !!el.value?.trim();
    return !!(el.textContent?.trim() || el.getAttribute('title')?.trim() || el.querySelector('img[alt]:not([alt=""])'));
  };
  for (const el of controls) {
    if (!hasSimpleName(el)) possibleUnlabeled.push({element: locationOf(el), role: el.getAttribute('role') || el.tagName.toLowerCase()});
    const r = el.getBoundingClientRect();
    if (!inView(r)) continue;
    if (r.width < 24 || r.height < 24) smallControls.push({element: locationOf(el), rect: rectOf(el)});
    else if ((r.width < 44 || r.height < 44) && !(el.tagName === 'A' && getComputedStyle(el).display === 'inline')) {
      belowComfort.push({element: locationOf(el), rect: rectOf(el)});
    }
  }

  // Images: failures, missing alt, layout-shift and loading-priority leads.
  const images = [...document.images].filter(rendered);
  const imageLead = el => ({element: locationOf(el), source: safeUrl(el.currentSrc || el.src)});
  const docTop = el => el.getBoundingClientRect().top + scrollTop;
  const missingAlt = images.filter(el => attr(el, 'alt') === null && !['presentation', 'none'].includes(attr(el, 'role')) && !el.closest?.('[aria-hidden="true"]'));
  const unsized = images.filter(el => {
    if (attr(el, 'width') !== null && attr(el, 'height') !== null) return false;
    const s = getComputedStyle(el);
    return !/\d/.test(s.aspectRatio || '') && !['cover', 'contain'].includes(s.objectFit) && s.position !== 'absolute' && s.position !== 'fixed';
  });
  const lazyAboveFold = images.filter(el => attr(el, 'loading') === 'lazy' && docTop(el) < height);
  const eagerFarBelow = images.filter(el => attr(el, 'loading') !== 'lazy' && docTop(el) > height * 2);

  // Readable stylesheets: focus styling and reduced-motion signals.
  const css = {readableSheets: 0, unreadableSheets: 0, rulesScanned: 0, truncated: false,
    focusVisibleRules: 0, focusRules: 0, focusOutlineRemovedWithoutReplacement: 0, reducedMotionBlocks: 0, keyframes: 0};
  const walk = rules => {
    for (const rule of rules) {
      if (css.truncated) return;
      if (++css.rulesScanned > 20000) { css.truncated = true; return; }
      const sel = rule.selectorText || '';
      if (sel.includes(':focus-visible')) css.focusVisibleRules++;
      if (/:focus(?![-\w])/.test(sel)) {
        css.focusRules++;
        const st = rule.style || {};
        const removed = st.outlineStyle === 'none' || /^0(px)?$/.test(st.outlineWidth || '') || /^(none|0(px)?)$/.test((st.outline || '').trim());
        const replaced = [st.boxShadow, st.borderColor, st.backgroundColor, st.textDecoration].some(v => v && v !== 'none');
        if (removed && !replaced) css.focusOutlineRemovedWithoutReplacement++;
      }
      if (/prefers-reduced-motion/.test(rule.conditionText || rule.media?.mediaText || '')) css.reducedMotionBlocks++;
      if (rule.type === 7) css.keyframes++;
      if (rule.cssRules) { try { walk(rule.cssRules); } catch { /* nested rules unavailable */ } }
    }
  };
  for (const sheet of [...(document.styleSheets || [])]) {
    let rules;
    try { rules = sheet.cssRules; } catch { rules = null; }
    if (!rules) { css.unreadableSheets++; continue; }
    css.readableSheets++;
    walk(rules);
  }

  // Contrast leads: only solid-colour stacks are measured; anything layered is counted as unresolved, never passed.
  const parseColor = value => {
    if (!value) return null;
    const alpha = a => a === undefined ? 1 : a.endsWith('%') ? parseFloat(a) / 100 : parseFloat(a);
    let m = value.match(/^rgba?\(\s*([\d.]+)[,\s]+([\d.]+)[,\s]+([\d.]+)(?:\s*[,/]\s*([\d.]+%?))?\s*\)$/);
    if (m) return [+m[1], +m[2], +m[3], alpha(m[4])];
    m = value.match(/^color\(srgb\s+([\d.]+)\s+([\d.]+)\s+([\d.]+)(?:\s*\/\s*([\d.]+%?))?\s*\)$/);
    if (m) return [m[1] * 255, m[2] * 255, m[3] * 255, alpha(m[4])];
    return null;
  };
  const blend = (top, under) => [0, 1, 2].map(i => top[i] * top[3] + under[i] * (1 - top[3])).concat(1);
  const luminance = c => {
    const [r, g, b] = c.slice(0, 3).map(v => { v /= 255; return v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4; });
    return 0.2126 * r + 0.7152 * g + 0.0722 * b;
  };
  const pseudoPaint = el => ['::before', '::after'].some(pseudo => {
    try {
      const ps = getComputedStyle(el, pseudo);
      return ps.content && ps.content !== 'none' && ps.content !== 'normal'
        && ((ps.backgroundImage && ps.backgroundImage !== 'none') || (parseColor(ps.backgroundColor)?.[3] ?? 0) > 0);
    } catch { return false; }
  });
  const backgroundOf = el => {
    const layers = [];
    for (let p = el; p; p = p.parentElement) {
      const s = getComputedStyle(p);
      if ((s.backgroundImage && s.backgroundImage !== 'none') || (s.filter && s.filter !== 'none')
          || (s.backdropFilter && s.backdropFilter !== 'none') || (s.mixBlendMode && s.mixBlendMode !== 'normal')
          || Number(s.opacity) < 1 || pseudoPaint(p)) return null;
      const c = parseColor(s.backgroundColor);
      if (!c) return null;
      if (c[3] > 0) layers.push(c);
      if (c[3] >= 1) return layers.reduceRight((under, layer) => blend(layer, under));
    }
    return null;
  };
  const textCandidates = visible.filter(el => directText(el) && inView(el.getBoundingClientRect()) && !el.closest?.('svg'));
  const contrast = {checked: 0, unresolved: 0, candidatesInView: textCandidates.length, capped: textCandidates.length > 400};
  const lowContrast = [];
  for (const el of textCandidates.slice(0, 400)) {
    if (el.closest?.(':disabled, [aria-disabled="true"]')) continue;
    const s = getComputedStyle(el);
    const fg = parseColor(s.webkitTextFillColor) || parseColor(s.color);
    const r = el.getBoundingClientRect();
    const overlapped = painted.some(p => p !== el && !el.contains?.(p) && !p.contains?.(el) && intersects(r, p.getBoundingClientRect()));
    const bg = fg && fg[3] > 0 && !overlapped && (!s.textShadow || s.textShadow === 'none') ? backgroundOf(el) : null;
    if (!bg) { contrast.unresolved++; continue; }
    const [hi, lo] = [luminance(fg[3] < 1 ? blend(fg, bg) : fg), luminance(bg)].sort((a, b) => b - a);
    const ratio = (hi + 0.05) / (lo + 0.05);
    const size = parseFloat(s.fontSize) || 0;
    const required = size >= 24 || (size >= 18.66 && (parseInt(s.fontWeight, 10) || 400) >= 700) ? 3 : 4.5;
    contrast.checked++;
    if (ratio < required) lowContrast.push({element: locationOf(el), ratio: Math.round(ratio * 100) / 100, required, fontSizePx: size});
  }

  const rootStyle = getComputedStyle(document.documentElement);
  const bodyStyle = document.body ? getComputedStyle(document.body) : {};
  const animations = document.getAnimations ? document.getAnimations().filter(a => a.playState === 'running').length : null;
  const lists = {horizontalEscape: [horizontalEscape, 100], textClipping: [textClippingLeads, 50],
    possibleUnlabeledControls: [possibleUnlabeled, 50], smallVisibleControls: [smallControls, 50], belowComfortTargets: [belowComfort, 50],
    lowContrastText: [lowContrast, 50], missingAlt: [missingAlt.map(imageLead), 30], unsizedImages: [unsized.map(imageLead), 30],
    lazyAboveFold: [lazyAboveFold.map(imageLead), 20], eagerFarBelowFold: [eagerFarBelow.map(imageLead), 20]};
  const leads = Object.fromEntries(Object.entries(lists).map(([k, [list, n]]) => [k, list.slice(0, n)]));
  leads.brokenImages = images.filter(el => el.complete && !el.naturalWidth).map(imageLead);
  leads.pendingImageCount = images.filter(el => !el.complete).length;
  const darkScheme = media('(prefers-color-scheme: dark)');
  return {
    url: safeUrl(location.href), timestamp: new Date().toISOString(),
    viewport: {width: viewport, height, devicePixelRatio: window.devicePixelRatio, scrollY: scrollTop},
    environment: {colorScheme: darkScheme === null ? null : darkScheme ? 'dark' : 'light',
      prefersReducedMotion: media('(prefers-reduced-motion: reduce)'), coarsePointer: media('(pointer: coarse)')},
    document: {lang: document.documentElement.lang || '', titlePresent: !!document.title.trim(),
      scrollWidth: document.documentElement.scrollWidth, horizontalOverflow: document.documentElement.scrollWidth > viewport + 1,
      overflowXMasked: [rootStyle.overflowX, bodyStyle.overflowX].some(x => x === 'hidden' || x === 'clip'),
      fontStatus: document.fonts?.status || 'unsupported', runningAnimations: animations},
    counts: Object.fromEntries(Object.entries(lists).map(([k, [list]]) => [k, list.length])),
    leads,
    omitted: Object.fromEntries(Object.entries(lists).map(([k, [list, n]]) => [k, Math.max(0, list.length - n)])),
    contrast, css,
    warnings,
    limits: ['Light DOM only; no shadow roots or frame documents', 'Naming heuristic is not the accessible-name algorithm',
      'Overflow may be intentional or ancestor-clipped', 'Contrast measured only over solid colours; images, gradients, pseudo-elements, shadows, blend modes and overlaps count as unresolved',
      'No keyboard, visual-rhythm or performance certification', 'Target leads ignore spacing exceptions and equivalent targets',
      'Fold and lazy-loading leads use current geometry; pinned or transformed scenes distort them',
      'Stylesheet signals skip cross-origin sheets and JavaScript-driven focus or reduced-motion handling']
  };
}
