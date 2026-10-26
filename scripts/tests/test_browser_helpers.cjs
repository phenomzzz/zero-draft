/* Node fixtures exercise the exact shipped browser functions without installing a DOM dependency. */
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const root = path.resolve(__dirname, '..');

function element(tag, left, width, options = {}) {
  const top = options.y ?? 10;
  const r = {left, right: left + width, top, bottom: top + 44, width, height: 44};
  return {tagName: tag.toUpperCase(), parentElement: null, children: [], childNodes: [], hidden: false,
    textContent: options.text || '', clientWidth: width, clientHeight: 44, scrollWidth: width, scrollHeight: 44,
    getBoundingClientRect: () => r, getClientRects: () => [r],
    getAttribute: key => options.attrs?.[key] || null,
    querySelector: () => null,
    matches: selector => selector.startsWith('button,') ? tag === 'button' : false, ...options};
}

async function testAudit() {
  const wide = element('div', 0, 520);
  const hidden = element('div', 0, 900, {hidden: true});
  const anonymous = element('button', 10, 44);
  const named = element('button', 60, 44, {attrs: {'aria-label': 'Open'}});
  const broken = element('img', 10, 100, {complete: true, naturalWidth: 0, src: 'https://example.test/photo.jpg?token=secret'});
  const rootEl = {clientWidth: 390, scrollWidth: 520, lang: 'pt-BR'};
  const context = {document: {documentElement: rootEl, title: 'Fixture', fonts: {ready: Promise.resolve(), status: 'loaded'},
    querySelectorAll: () => [wide, hidden, anonymous, named, broken], images: [broken], getElementById: () => null, getAnimations: () => []},
    window: {innerHeight: 844, devicePixelRatio: 1}, location: {href: 'https://example.test/page?token=secret'},
    URL, Date, setTimeout, clearTimeout, requestAnimationFrame: cb => setTimeout(cb, 0),
    getComputedStyle: (el, pseudo) => pseudo ? {content: 'none'}
      : ({display: 'block', visibility: 'visible', opacity: '1', overflowX: 'visible', overflowY: 'visible', ...(el?.css || {})})};
  const source = fs.readFileSync(path.join(root, 'audit_page.js'), 'utf8');
  const result = await vm.runInNewContext(`(${source})()`, context);
  assert.equal(result.document.horizontalOverflow, true);
  assert.equal(result.leads.missingAlt.length, 1);
  assert.equal(result.leads.unsizedImages.length, 1);
  const text = (color, extra = {}) => element('p', 10, 200, {childNodes: [{nodeType: 3, textContent: 'Copy'}],
    css: {color, backgroundColor: 'rgb(255, 255, 255)', backgroundImage: 'none', fontSize: '16px', fontWeight: '400', ...extra}});
  const small = element('button', 100, 30, {attrs: {'aria-label': 'Small'}});
  const far = element('img', 10, 100, {y: 3000, complete: true, naturalWidth: 10, attrs: {alt: 'Photo', width: '10', height: '10'}});
  context.document.querySelectorAll = () => [text('rgb(150, 150, 150)'), text('rgb(0, 0, 0)'), text('rgb(0, 0, 0)', {textShadow: '0 0 2px black'}), small, far];
  context.document.images = [far];
  context.document.styleSheets = [{cssRules: [{selectorText: 'a:focus', style: {outlineStyle: 'none'}},
    {conditionText: '(prefers-reduced-motion: reduce)', cssRules: []}]}, {get cssRules() { throw new Error('cross-origin'); }}];
  context.matchMedia = q => ({matches: q.includes('dark')});
  const signals = await vm.runInNewContext(`(${source})()`, context);
  assert.equal(signals.leads.lowContrastText.length, 1);
  assert.equal(signals.leads.lowContrastText[0].ratio < 3, true);
  assert.equal(signals.contrast.checked, 2);
  assert.equal(signals.contrast.unresolved, 1);
  assert.equal(signals.leads.belowComfortTargets.length, 1);
  assert.equal(signals.leads.eagerFarBelowFold.length, 1);
  assert.equal(signals.leads.missingAlt.length, 0);
  assert.equal(signals.css.focusOutlineRemovedWithoutReplacement, 1);
  assert.equal(signals.css.reducedMotionBlocks, 1);
  assert.equal(signals.css.unreadableSheets, 1);
  assert.equal(signals.environment.colorScheme, 'dark');
  delete context.document.styleSheets; delete context.matchMedia;
  context.document.querySelectorAll = () => [wide, hidden, anonymous, named, broken];
  context.document.images = [broken];
  assert.equal(result.leads.horizontalEscape.length, 1);
  assert.equal(result.leads.possibleUnlabeledControls.length, 1);
  assert.equal(result.leads.brokenImages.length, 1);
  assert.equal(JSON.stringify(result).includes('secret'), false);
  assert.equal(result.url, 'https://example.test/page');
  rootEl.scrollWidth = 390;
  context.document.querySelectorAll = () => [named];
  context.document.images = [];
  const clean = await vm.runInNewContext(`(${source})()`, context);
  assert.equal(clean.document.horizontalOverflow, false);
  assert.equal(clean.leads.possibleUnlabeledControls.length, 0);
  delete context.requestAnimationFrame;
  const limited = await vm.runInNewContext(`(${source})()`, context);
  assert.equal(limited.warnings.some(w => w.includes('Animation-frame')), true);
}

async function testReferenceProbe() {
  const source = fs.readFileSync(path.join(root, 'reference_probe.js'), 'utf8');
  const classes = new Set(['lenis', 'lenis-stopped']);
  const video = {currentSrc: 'https://cdn.example.test/reel.mp4?signature=secret', autoplay: false, muted: true, loop: true,
    playsInline: true, preload: 'none', poster: 'p.jpg', crossOrigin: 'anonymous', paused: true, videoWidth: 0, videoHeight: 0,
    getAttribute: k => ({role: 'button', 'aria-label': 'Unmute reel'})[k] || null,
    querySelectorAll: () => [{type: 'video/webm', src: 'https://cdn.example.test/reel.webm?token=secret', getAttribute: () => 'x', hasAttribute: () => false}]};
  const reduced = {cssText: '.a { transition: none; }'};
  const sheet = {cssRules: [
    {cssText: '@keyframes spin { }'},
    {cssText: '@media (prefers-reduced-motion: reduce) { }', conditionText: '(prefers-reduced-motion: reduce)', cssRules: [reduced]},
    {cssText: '.b { transition: transform .4s cubic-bezier(.22, 1, .36, 1); position: sticky; }'}]};
  const blocked = {get cssRules() { throw new Error('cross-origin'); }};
  const html = {classList: {contains: c => classes.has(c)}, clientWidth: 1280, scrollHeight: 4000};
  const context = {
    window: {innerHeight: 800, devicePixelRatio: 2, lenisVersion: '1.3.26', gsapVersions: ['3.15.0'],
      lenis: {options: {lerp: 0.125, smoothWheel: true, wrapper: {}}}},
    document: {documentElement: html, body: {}, scripts: [{src: 'https://example.test/app.js?v=secret'}],
      styleSheets: [sheet, blocked], fonts: [{status: 'loaded', family: '"Mori"', weight: '400', style: 'normal'}],
      querySelectorAll: s => s === 'video' ? [video] : [], querySelector: () => null, getElementsByTagName: () => [1, 2, 3]},
    location: {href: 'https://example.test/?utm=secret'},
    performance: {getEntriesByType: () => [{initiatorType: 'video', name: 'https://player.vimeo.com/x/file.mp4?signature=secret'},
      {initiatorType: 'link', name: 'https://example.test/seq/sequence.ktx2'}]},
    getComputedStyle: () => ({overflow: 'hidden', scrollBehavior: 'auto', position: 'static'}),
    matchMedia: q => ({matches: q.includes('hover')}), URL, Date, Object, Promise};
  const result = await vm.runInNewContext(`(${source})()`, context);
  assert.equal(JSON.stringify(result).includes('secret'), false);
  assert.equal(result.lenis.stopped, true);
  assert.equal(result.lenis.options.lerp, 0.125);
  assert.equal('wrapper' in result.lenis.options, false);
  assert.equal(result.gsap.global, false);
  assert.equal(result.videos[0].label, 'Unmute reel');
  assert.equal(result.media.video.length, 1);
  assert.equal(result.media.sequencesAndTextures.length, 1);
  assert.equal(result.css.keyframes, 1);
  assert.equal(result.css.reducedMotionRules, 1);
  assert.equal(result.css.crossOriginSheets, 1);
  assert.equal(result.css.sticky, 1);
  assert.equal(result.css.easings[0][0], 'cubic-bezier(.22,1,.36,1)');
}

function testWorkbench() {
  const workbench = fs.readFileSync(path.join(root, '../assets/workbench/workbench.js'), 'utf8');
  function run(url) {
    const nodes = {};
    for (const id of ['controls', 'preview', 'width', 'height', 'frame', 'status', 'direct', 'project-title', 'description', 'note']) {
      nodes[id] = {value: '', textContent: '', style: {}, elements: [], children: [], attributes: {},
        append(el) { this.children.push(el); }, addEventListener() {},
        getAttribute(k) { return this.attributes[k]; }, removeAttribute(k) { delete this.attributes[k]; }};
    }
    const context = {window: {ZERO_DRAFT_WORKBENCH: {entries: [{id: 'one', label: 'Local', url}]}, addEventListener() {}},
      document: {getElementById: id => nodes[id], createElement: () => ({append() {}})},
      location: {href: 'http://127.0.0.1:8141/workbench/'}, URL, history: {replaceState() {}}};
    vm.runInNewContext(workbench, context);
    return nodes;
  }
  assert.equal(run('./demo.html').frame.src, 'http://127.0.0.1:8141/workbench/demo.html');
  for (const url of ['https://example.com/', 'javascript:alert(1)', 'http://user:password@localhost/', 'data:text/html,test']) {
    const nodes = run(url);
    assert.equal(nodes.frame.hidden, true);
    assert.match(nodes.status.textContent, /loopback/);
  }
}

(async () => { await testAudit(); await testReferenceProbe(); testWorkbench(); console.log('Browser-helper fixtures passed: overflow, hidden content, names, image failure, alt/sizing, contrast, targets, focus/reduced-motion CSS, URL redaction, trusted URLs, reference probe.'); })()
  .catch(error => { console.error(error); process.exitCode = 1; });
