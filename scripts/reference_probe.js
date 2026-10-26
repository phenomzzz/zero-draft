/* Read-only motion/media probe for reference sites.
   Shape: one async arrow-function expression. Evaluating the file alone returns the function, not a result.
   Claude Code javascript_tool (Claude_Browser or claude-in-chrome): text = "await (" + file contents + ")()".
   Chrome DevTools console: paste the file, then run `await $_()` (or `copy(await $_())` for JSON).
   Node fixture: scripts/tests/test_browser_helpers.cjs evaluates `(${source})()` the same way. */
async () => {
  const warnings = [];
  const strip = value => {
    // Origin + path only: media URLs often carry signed tokens in the query.
    try { const u = new URL(value, location.href); return `${u.origin}${u.pathname}`; }
    catch { return '(unavailable)'; }
  };
  const uniq = list => [...new Set(list)];
  const safe = (label, fn, fallback = null) => {
    try { return fn(); } catch (error) { warnings.push(`${label}: ${error?.message || error}`); return fallback; }
  };
  const w = window;
  const d = document;

  const globals = safe('globals', () => Object.keys(w).filter(k =>
    /^(gsap|ScrollTrigger|SplitText|Flip|Lenis|lenis|THREE|__THREE__|barba|Swup|Taxi|Webflow|__NUXT__|__NEXT_DATA__|__next_f|Alpine|lottie|bodymovin|PIXI|Rive|Spline|Howl|Howler|gsapVersions|lenisVersion|MotionIsMounted)$/.test(k)), []);

  const gsap = safe('gsap', () => {
    const g = w.gsap;
    const out = {global: !!g, versions: w.gsapVersions || null};
    if (!g) return out;
    out.version = g.version;
    out.activeTweens = g.globalTimeline.getChildren(true, true, false).length;
    const ST = w.ScrollTrigger;
    if (ST?.getAll) {
      const all = ST.getAll();
      out.scrollTriggers = all.length;
      out.sample = all.slice(0, 15).map(s => ({
        trigger: s.trigger ? s.trigger.tagName.toLowerCase() + (s.trigger.className ? '.' + String(s.trigger.className).trim().split(/\s+/).slice(0, 2).join('.') : '') : null,
        start: typeof s.vars.start === 'function' ? 'fn' : s.vars.start ?? null,
        end: typeof s.vars.end === 'function' ? 'fn' : s.vars.end ?? null,
        scrub: s.vars.scrub ?? null, pin: !!s.vars.pin, once: !!s.vars.once, toggleActions: s.vars.toggleActions ?? null}));
    }
    return out;
  }, {global: false});

  const lenis = safe('lenis', () => {
    const l = w.lenis;
    const out = {version: w.lenisVersion || null, htmlClass: d.documentElement.classList.contains('lenis'),
      stopped: d.documentElement.classList.contains('lenis-stopped'), instance: !!(l && l.options)};
    if (l?.options) {
      out.options = Object.fromEntries(Object.entries(l.options)
        .filter(([, v]) => ['number', 'boolean', 'string'].includes(typeof v)));
    }
    return out;
  }, {});

  const resources = safe('resources', () => performance.getEntriesByType('resource').map(r => ({type: r.initiatorType, url: strip(r.name)})), []);
  const byPattern = re => uniq(resources.filter(r => re.test(r.url)).map(r => r.url)).slice(0, 40);

  const videos = safe('videos', () => [...d.querySelectorAll('video')].slice(0, 20).map(v => ({
    current: v.currentSrc ? strip(v.currentSrc) : null,
    sources: [...v.querySelectorAll('source')].map(s => ({type: s.type || null, src: s.getAttribute('src') ? strip(s.src) : null, deferred: s.hasAttribute('data-src')})),
    autoplay: v.autoplay, muted: v.muted, loop: v.loop, playsInline: v.playsInline, preload: v.preload,
    poster: !!v.poster, crossOrigin: v.crossOrigin, paused: v.paused, size: [v.videoWidth, v.videoHeight],
    role: v.getAttribute('role'), label: v.getAttribute('aria-label')})), []);

  const canvases = safe('canvases', () => [...d.querySelectorAll('canvas')].slice(0, 10).map(c => ({
    size: [c.width, c.height], css: [Math.round(c.clientWidth), Math.round(c.clientHeight)],
    position: getComputedStyle(c).position, ariaHidden: c.getAttribute('aria-hidden')})), []);

  const css = {keyframes: 0, crossOriginSheets: 0, reducedMotionRules: 0, noPreferenceRules: 0, scrollDriven: 0,
    viewTransitions: 0, crossDocumentViewTransitions: 0, startingStyle: 0, linearEasing: 0, sticky: 0, easings: {}};
  const walk = rules => {
    for (const r of rules) {
      const text = r.cssText || '';
      const condition = r.conditionText || r.media?.mediaText || '';
      if (/prefers-reduced-motion:\s*reduce/.test(condition)) css.reducedMotionRules++;
      if (/prefers-reduced-motion:\s*no-preference/.test(condition)) css.noPreferenceRules++;
      if (text.startsWith('@keyframes')) { css.keyframes++; continue; }
      if (text.startsWith('@starting-style')) css.startingStyle++;
      if (r.cssRules) { walk(r.cssRules); continue; }
      if (/animation-timeline|view-timeline|scroll-timeline/.test(text)) css.scrollDriven++;
      if (/view-transition-name|::view-transition/.test(text)) css.viewTransitions++;
      if (text.startsWith('@view-transition')) css.crossDocumentViewTransitions++;
      if (/linear\(/.test(text)) css.linearEasing++;
      if (/position:\s*sticky/.test(text)) css.sticky++;
      for (const e of text.match(/cubic-bezier\([^)]*\)/g) || []) css.easings[e.replace(/\s+/g, '')] = (css.easings[e.replace(/\s+/g, '')] || 0) + 1;
    }
  };
  for (const sheet of d.styleSheets) {
    try { walk(sheet.cssRules); } catch { css.crossOriginSheets++; }
  }
  css.easings = Object.entries(css.easings).sort((a, b) => b[1] - a[1]).slice(0, 10);

  const fonts = safe('fonts', () => uniq([...d.fonts].filter(f => f.status === 'loaded').map(f => `${f.family.replace(/["']/g, '')} ${f.weight} ${f.style}`)).slice(0, 15), []);
  const hints = safe('hints', () => [...d.querySelectorAll('link[rel="preload"],link[rel="modulepreload"],link[rel="prefetch"]')].slice(0, 30)
    .map(l => ({rel: l.rel, as: l.getAttribute('as'), priority: l.getAttribute('fetchpriority'), url: strip(l.href)})), []);
  const dataAttributes = safe('data attributes', () => uniq([...d.querySelectorAll('*')]
    .flatMap(el => [...el.attributes].map(a => a.name).filter(n => n.startsWith('data-')))).slice(0, 80), []);
  const preferences = safe('preferences', () => ({
    reducedMotion: matchMedia('(prefers-reduced-motion: reduce)').matches,
    hover: matchMedia('(hover: hover)').matches,
    pointerFine: matchMedia('(pointer: fine)').matches}), {});

  return {
    url: strip(location.href), timestamp: new Date().toISOString(),
    viewport: {width: d.documentElement.clientWidth, height: w.innerHeight, devicePixelRatio: w.devicePixelRatio},
    document: {scrollHeight: d.documentElement.scrollHeight, bodyOverflow: getComputedStyle(d.body).overflow,
      htmlScrollBehavior: getComputedStyle(d.documentElement).scrollBehavior, elementCount: d.getElementsByTagName('*').length,
      generator: d.querySelector('meta[name="generator"]')?.content || null},
    preferences, globals, gsap, lenis,
    scripts: uniq([...d.scripts].filter(s => s.src).map(s => strip(s.src))).slice(0, 40),
    media: {
      video: byPattern(/\.(mp4|webm|m3u8|mov)$|vimeo|mux|cloudflarestream/i),
      sequencesAndTextures: byPattern(/\.(ktx2|basis|webp|avif)$/i).filter(u => /frame|sequence|ktx2|basis/i.test(u)).slice(0, 20),
      models: byPattern(/\.(glb|gltf|drc|bin|hdr|exr)$/i),
      animationData: byPattern(/\.(json|riv|lottie)$/i),
      wasm: byPattern(/\.wasm$/i),
      fonts: byPattern(/\.(woff2?|ttf|otf)$/i)},
    videos, canvases, css, fonts, hints, dataAttributes, warnings,
    limits: ['Bundled libraries are often not on window; an empty GSAP inventory does not prove absence',
      'Resource timing shows what loaded so far; interact and re-run for lazy media',
      'Cross-origin stylesheets are counted but not inspected', 'Observation, not performance or accessibility certification',
      'URLs are reduced to origin and path; signed query tokens are omitted']
  };
}
