// House-signature probe (read-only). Evaluate in the page as `await (<file contents>)()`.
// Returns measurements for rubric.md items 1-6 plus overflow leads. Leads only: the grader decides.
async () => {
  await document.fonts.ready;
  const vw = innerWidth, vh = innerHeight;
  const parse = (c) => { const m = c && c.match(/rgba?\(([^)]+)\)/); if (!m) return null; const p = m[1].split(/[ ,/]+/).filter(Boolean).map(Number); return { r: p[0], g: p[1], b: p[2], a: p.length > 3 ? p[3] : 1 }; };
  const lum = ({ r, g, b }) => { const f = (v) => { v /= 255; return v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4; }; return 0.2126 * f(r) + 0.7152 * f(g) + 0.0722 * f(b); };
  const hsl = ({ r, g, b }) => { r /= 255; g /= 255; b /= 255; const mx = Math.max(r, g, b), mn = Math.min(r, g, b), l = (mx + mn) / 2; let h = 0, s = 0; if (mx !== mn) { const d = mx - mn; s = l > 0.5 ? d / (2 - mx - mn) : d / (mx + mn); h = mx === r ? (g - b) / d + (g < b ? 6 : 0) : mx === g ? (b - r) / d + 2 : (r - g) / d + 4; h *= 60; } return { h, s, l }; };
  const bgAt = (el) => { while (el) { const c = parse(getComputedStyle(el).backgroundColor); if (c && c.a > 0.5) return c; el = el.parentElement; } return { r: 255, g: 255, b: 255, a: 1 }; };
  const visible = (el) => { const r = el.getBoundingClientRect(); const s = getComputedStyle(el); return r.width > 0 && r.height > 0 && s.visibility !== 'hidden' && s.display !== 'none'; };
  const ownText = (el) => [...el.childNodes].filter((n) => n.nodeType === 3).map((n) => n.textContent).join('').trim();

  // 1. Ground: luminance sampled over the first two screens, area-weighted by sample count.
  const samples = [];
  for (let y = 0.1; y < 2; y += 0.2) for (let x = 0.1; x < 1; x += 0.2) {
    const yy = y * vh; window.scrollTo(0, 0);
    const el = yy < vh ? document.elementFromPoint(x * vw, yy) : null;
    if (el) samples.push(lum(bgAt(el)));
  }
  const bodyLum = lum(bgAt(document.body));
  const darkShare = samples.filter((l) => l < 0.03).length / Math.max(samples.length, 1);

  // 2. Saturated hue clusters by painted area (text colors weighted by font size * text length).
  const hues = {};
  const all = [...document.querySelectorAll('body *')].filter(visible).slice(0, 4000);
  for (const el of all) {
    const s = getComputedStyle(el), r = el.getBoundingClientRect();
    const add = (c, w) => { if (!c || c.a < 0.5) return; const k = hsl(c); if (k.s > 0.45 && k.l > 0.2 && k.l < 0.8) { const b = Math.round(k.h / 30) * 30 % 360; hues[b] = (hues[b] || 0) + w; } };
    add(parse(s.backgroundColor), Math.min(r.width * r.height, vw * vh) / 1000);
    const t = ownText(el); if (t) add(parse(s.color), t.length * parseFloat(s.fontSize) / 10);
  }
  const hueList = Object.entries(hues).sort((a, b) => b[1] - a[1]).map(([h, w]) => ({ hue: +h, weight: Math.round(w) }));

  // 3. Display face width: canvas advance of a test string vs Arial at the same size/weight.
  const measure = (s, family) => { const sp = document.createElement('span'); sp.textContent = 'Hamburgefonstiv'; Object.assign(sp.style, { position: 'absolute', visibility: 'hidden', whiteSpace: 'nowrap', fontSize: '100px', letterSpacing: '0', fontFamily: family || s.fontFamily, fontWeight: s.fontWeight, fontStyle: s.fontStyle, fontStretch: family ? 'normal' : s.fontStretch, fontVariationSettings: family ? 'normal' : s.fontVariationSettings, textTransform: 'none' }); document.body.appendChild(sp); const w = sp.getBoundingClientRect().width; sp.remove(); return w; };
  const widthRatio = (s) => +(measure(s) / measure(s, 'Arial')).toFixed(2);
  const heads = [...document.querySelectorAll('h1, h2')].filter(visible).slice(0, 8).map((h) => {
    const s = getComputedStyle(h);
    const range = document.createRange(); range.selectNodeContents(h);
    const lines = new Set([...range.getClientRects()].map((r) => Math.round(r.top))).size;
    const text = h.innerText.trim().replace(/\s+/g, ' ');
    const accentChild = [...h.querySelectorAll('*')].some((c) => c.innerText && getComputedStyle(c).color !== s.color);
    return { tag: h.tagName, text: text.slice(0, 90), family: s.fontFamily.split(',')[0], weight: s.fontWeight, size: s.fontSize, widthVsArial: widthRatio(s), lines, endsWithPeriod: /\.\s*$/.test(text), accentChild, transform: s.textTransform };
  });

  // 4. Micro-labels: small tracked uppercase or monospace text.
  const micro = all.filter((el) => { const t = ownText(el); if (!t || t.length > 60) return false; const s = getComputedStyle(el); const fs = parseFloat(s.fontSize); const ls = s.letterSpacing === 'normal' ? 0 : parseFloat(s.letterSpacing) / fs; return fs <= 13 && ls > 0.05 && (s.textTransform === 'uppercase' || /mono/i.test(s.fontFamily) || t === t.toUpperCase()); });
  const microEx = micro.slice(0, 6).map((el) => { const s = getComputedStyle(el); return `${ownText(el).slice(0, 30)} | ${s.fontSize} ${s.fontFamily.split(',')[0]} ls=${s.letterSpacing}`; });

  // 5. Fade-up: CSS rules or inline/same-origin scripts combining opacity 0 with translateY/y offsets.
  const fade = [], reduced = [];
  for (const sh of document.styleSheets) {
    let rules; try { rules = sh.cssRules; } catch { continue; }
    const walk = (rs) => { for (const r of rs) { if (r.cssRules) { if (/prefers-reduced-motion/.test(r.conditionText || r.media?.mediaText || '')) reduced.push('css'); walk(r.cssRules); } const t = r.cssText || ''; if (/opacity:\s*0[;\s]/.test(t) && /translate(Y|3d)?\(\s*[^)]*\d+px|translate:\s*0(px)?\s+\d+px/.test(t)) fade.push(t.slice(0, 140)); if (r.keyFrames || r.type === 7) { const k = r.cssText; if (/opacity:\s*0/.test(k) && /translate/.test(k)) fade.push(k.slice(0, 140)); } } };
    walk(rules);
  }
  const srcs = [...document.scripts].map((s) => s.src).filter((u) => u && u.startsWith(location.origin));
  let js = [...document.scripts].filter((s) => !s.src).map((s) => s.textContent).join('\n');
  for (const u of srcs) { try { js += '\n' + await (await fetch(u)).text(); } catch {} }
  const pxOf = (t) => [...t.matchAll(/translate(?:Y|3d)?\(\s*(?:0(?:px)?\s*,\s*)?(-?\d+(?:\.\d+)?)px/g)].map((m) => +m[1]);
  const jsFade = (js.match(/.{0,60}(opacity\s*:\s*0|autoAlpha\s*:\s*0).{0,80}/g) || []).filter((m) => /\by\s*:\s*-?\d+|translateY|yPercent/.test(m)).slice(0, 4);
  if (/prefers-reduced-motion/.test(js)) reduced.push('js');
  const usesIO = /IntersectionObserver/.test(js), usesGsap = !!window.gsap || /gsap/.test(js);

  // 6. Largest text.
  let big = { size: 0 };
  for (const el of all) { const t = ownText(el) || (el.tagName === 'svg' ? 'svg' : ''); if (!t) continue; const fs = parseFloat(getComputedStyle(el).fontSize); if (fs > big.size) big = { size: fs, text: (el.innerText || t).trim().slice(0, 40), tag: el.tagName }; }

  // Overflow leads.
  const doc = document.documentElement;
  const over = all.filter((el) => { const r = el.getBoundingClientRect(); return r.right > vw + 1 || r.left < -1; }).filter((el) => { let p = el.parentElement; while (p) { const o = getComputedStyle(p).overflowX; if (o === 'hidden' || o === 'auto' || o === 'scroll' || o === 'clip') return false; p = p.parentElement; } return true; }).slice(0, 5).map((el) => `${el.tagName}.${[...el.classList].join('.')} right=${Math.round(el.getBoundingClientRect().right)}`);

  return {
    viewport: `${vw}x${vh}`,
    ground: { bodyLuminance: +bodyLum.toFixed(3), darkShareFirstScreen: +darkShare.toFixed(2) },
    saturatedHues: hueList.slice(0, 5),
    headings: heads,
    microLabels: { count: micro.length, examples: microEx },
    motion: { cssFadeRules: fade.slice(0, 4), fadeTranslatePx: [...new Set(fade.flatMap(pxOf))], jsFade, usesIntersectionObserver: usesIO, usesGsap, reducedMotion: [...new Set(reduced)] },
    largestText: big,
    overflow: { scrollWidth: doc.scrollWidth, clientWidth: doc.clientWidth, horizontalScroll: doc.scrollWidth > doc.clientWidth + 1, leads: over },
  };
}
