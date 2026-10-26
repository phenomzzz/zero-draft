# Motion recipes from production sites

Mechanisms observed in shipped code of five Awwwards Sites of the Day (October 2026; study record in [sources-and-reuse.md](sources-and-reuse.md#reference-motion-study)). Use them when a project's motion role calls for them, inside the existing engine and ownership model from [motion-and-media.md](motion-and-media.md). Numbers are the observed sites' choices: starting points to tune against real content, not standards. The sketches are original illustrations of mechanisms, not copied code. Check current primary docs for each API before implementation.

## Choose the smallest engine that fits

| Need | Typical owner |
| --- | --- |
| Hover, focus, press, simple entrance, marquee | CSS transitions/keyframes |
| Simple scroll-linked progress (bars, parallax, reading reveals) | CSS `animation-timeline: scroll()/view()` inside `@supports`, final state as default (Oct 2026: Chrome 115+, Safari 26+; Firefox not in stable) |
| Scroll-linked timelines, pinning, split text, sequenced route choreography | GSAP + ScrollTrigger (`gsap` 3.15, Apr 2026; every plugin incl. SplitText, ScrollSmoother, MorphSVG free for commercial use since 3.13 under Webflow's standard license, which bars no-code animation builders competing with Webflow). Scope with `gsap.context()`/`gsap.matchMedia()` and `revert()` on teardown; in React use `useGSAP` from `@gsap/react` |
| React component presence, layout/shared-element animation | Motion (`motion` package; `AnimatePresence`, `layoutId`) |
| Smooth wheel scrolling | Lenis (`lenis` 1.3.x; `@studio-freight/lenis` is the dead name), only when the scroll story benefits and native scrolling is otherwise preserved |
| Scenes, shaders, video compositing | WebGL (Three.js or OGL) with a quality tier |

Combining Motion and GSAP is coherent when they own different jobs (component state vs. timelines). Two engines animating the same property is not.

## Motion physics is a concept decision

Recipes are mechanisms, not a vocabulary. Each concept states its motion physics, derived from the content or brand idea: what has mass, what is instant, how far things travel, and whether time is scrubbed, cut or eased (a print archive might cut and register like paper; a river guide might drift with lag). Motion that would fit any site is not a concept.

Tells to avoid by default, and what to do instead:

- Every section fades up 20–50px on enter → most content is simply present; animate the one or two moments the concept is about.
- Uniform stagger on every grid → order by meaning (reading order, chronology, the clicked item outward) or set all at once.
- One ease and duration everywhere → a small named easing set mapped to roles (response, travel, emphasis).
- Parallax and scale-on-scroll on every image → one image whose movement carries information (depth, sequence, before/after).
- Smooth scrolling, custom cursor or loader added by habit → only when the story needs them; native scroll is the default.
- Reveals that replay on reverse scroll → one-shot for display moves; scrub only what maps to progress.

## One frame loop

When Lenis and GSAP coexist, let one clock drive both so scroll position and scrubbed tweens are computed in the same frame:

```js
const lenis = new Lenis({ autoRaf: false /* lerp or duration+easing: tune */ });
lenis.on('scroll', ScrollTrigger.update);
const tick = (time) => lenis.raf(time * 1000);
gsap.ticker.add(tick);
gsap.ticker.lagSmoothing(0);
// teardown: gsap.ticker.remove(tick); lenis.destroy();
```

With a wrapper element instead of the window, set `ScrollTrigger.scrollerProxy` once and `ScrollTrigger.defaults({ scroller })` rather than passing different scrollers per module. Observed tuning: `lerp: 0.125`; or `duration: 1.2` with an expo-out easing.

Import `lenis/dist/lenis.css`. Do not create smooth scrolling under `prefers-reduced-motion: reduce`; native scroll is the reduced alternative (Lenis's `respectReducedMotion`, default true, only forces `lerp: 1`). Use `data-lenis-prevent` on nested scrollers and `anchors: true` if in-page links must work. Stop scrolling with `lenis.stop()` while a loader, consent banner, modal menu or view transition owns the screen, and use a lock count or owner flag so one closer cannot restart scrolling another owner still holds.

## Lifecycle and re-measurement

Scroll positions are layout measurements; anything that changes layout invalidates them.

- Expose explicit lifecycle events (`loader:done`, `page:transition:after`, `menu:close-end`) and let modules re-init or refresh on them. Late subscribers check a ready flag instead of waiting forever.
- Refresh after layout settles: two animation frames, a short delayed retry, and `document.fonts.ready`. Late fonts change line breaks and split-text geometry.
- Guard against double binding (`data-*-bound`, `WeakMap` of handlers) so re-init after a route change does not stack listeners.
- A different breakpoint behavior is a different build: revert splits, kill tweens and triggers, `clearProps`, then construct the other variant. Debounce resize/orientation. `gsap.matchMedia()` provides the same revert-on-change contract declaratively.
- Mobile viewport height: prefer `svh`/`dvh` units; when JS needs the value, measuring a hidden `position: fixed; height: 100svh` element is more reliable than `innerHeight` during browser UI changes.

## Text reveals

- **Reading reveal (scrubbed):** split into lines, words and chars; keep words `inline-block; white-space: nowrap` so wrapping matches the original; chars start dimmed (observed `opacity: .2`, not hidden, so text stays legible and selectable). One scrubbed tween per line, `stagger.each` ≈ 0.02, from `top 85%` to `top 50%`. Per-line triggers keep progress tied to what the reader is looking at.
- **Display reveal (one-shot):** a paused timeline played on enter; kill the trigger on completion so reverse scroll does not replay a hero-scale move. Observed: words from `yPercent: 100, rotation: 70` around the left-bottom origin, 1.2 s, stagger 0.02, with a strong ease-in-out custom curve.
- Re-split after font load and on breakpoint change. Keep the unsplit sentence available to assistive technology (SplitText's `aria` handling, or a visually hidden full-text copy with the split copy `aria-hidden`) and test the accessible name.

## Reveals, pins and lists

- Card reveal: `fromTo` with `immediateRender: false`, `once: true`, `invalidateOnRefresh: true`; hide pending cards with a class (not inline style) so a script failure leaves content visible; set `will-change` in `onStart` and clear it on completion rather than tweening it as a from-value (an invalidating refresh mid-tween re-applies from-values). Observed: `autoAlpha 0→1, y 2em→0, 0.8 s, power2.out, start "top 85%"`.
- Pin with function-based start/end that read the element's declared offset, `pinSpacing: false` when the layout already reserves space, `invalidateOnRefresh: true`. Keep that offset in a custom property, not `top` on the pinned element: the pin sets its own `top`, so a CSS `top` is applied twice.
- Active-item lists: one trigger per row from `top center` to `bottom center` with `onToggle`, and a single active owner so two rows are never active.
- Set elements that are already off-screen directly instead of tweening them.

## Scroll-scrubbed image sequences

Prefer an image sequence over setting `video.currentTime` from scroll when frame accuracy matters: seeking depends on keyframe spacing and decode latency.

- Describe the sequence in a manifest (frame count, batches, scroll range, file pattern, desktop and portrait mobile variants, poster) so assets can change without code changes.
- Encode WebP/AVIF frames per variant at the rendered size; portrait mobile sets avoid cropping a landscape master. Observed: 150 frames at 1920×1080 desktop, 132 at 440×960 mobile, batches of 30, scrubbed over 100 vh.
- Loader: `new Image()` with `decoding = "async"`, await `img.decode()` bounded by a short timeout (it can stay pending in a hidden tab; a loaded image is drawable anyway), cache decoded images and de-duplicate in-flight requests; a failed frame resolves to `null` and draws the nearest loaded frame.
- After a fast jump, repaint whenever a frame closer to the target finishes loading; otherwise the canvas stays on the stale nearest frame once scrolling stops.
- Keep a sliding window around the current frame (observed 12 behind, 48 ahead) instead of holding every frame; await only the first batches before enabling the sequence.
- Draw with cover-fit math (`scale = max(cw / iw, ch / ih)`, centered) and resize the canvas backing store only when dimensions change; cap device pixel ratio.
- Preload the poster and first frames with `fetchpriority="high"`; show the poster until the first frame draws; provide a timeout fallback so a stalled network never leaves a blank hero.
- Reduced motion or low tier: show the poster or a short static set of frames in reading order.

## Video

| Role | Pattern |
| --- | --- |
| Hero loop | `muted playsinline loop`, poster, started from script; handle the rejected `play()` promise (iOS Low Power Mode, data saver) by keeping the poster; `preload="auto"` only for this one |
| Secondary/gallery video | `preload="none"` + poster; attach or play on intent or proximity; pause outside view |
| Reel with sound | real control semantics (a button or `role="button"` + `tabindex`, accessible name such as "Unmute reel"), muted by default |
| Mobile data saving | defer `<source src>` (store in `data-src`) until needed; respect Save-Data |

- Order `<source>` from most efficient to most compatible (AV1/VP9 WebM, then H.264 MP4) and verify each actually plays; generate posters from the master.
- Video into WebGL: `crossorigin="anonymous"` on a CORS-enabled source; upload the texture from `requestVideoFrameCallback` (only when a new frame exists) instead of every rAF; fall back to per-frame upload when unsupported. Justified when a shader adds real value: grading such as a duotone gradient map, crossfades between clips and thumbnails, distortion or masking. One shader plane can composite video, thumbnail crossfade, gradient map and overlays through uniforms.
- Pause videos and marquees inside an element that is leaving during a route transition.

## GPU assets and quality tiers

- Compress textures for the GPU (KTX2/Basis) and geometry (Draco/Meshopt) when shipping WebGL scenes; sprite animations can be KTX2 texture arrays instead of many PNGs. Decoders run as WASM, ideally in workers.
- Decide a quality tier before allocating heavy resources. Signals observed: `deviceMemory`, `hardwareConcurrency`, mobile UA, Save-Data and `effectiveType`, reduced motion, screen pixel count, `navigator.gpu`, `MAX_TEXTURE_SIZE`, and the unmasked GPU renderer string. Renderer sniffing is brittle and fingerprint-adjacent; combine coarse signals with a runtime frame-time fallback that steps down. Tiers control DPR cap, post-processing, particle counts and sequence resolution, never content.

## Route transitions

- Choreograph from the clicked element: keep it, fade the rest with delay proportional to distance from it (`|i − clicked| × stagger`), set off-screen elements instantly, pause media inside the leaving view, and keep separate timing presets for pointer desktop and touch.
- Mark elements that persist across the route (`data-*-survivor`, `layoutId`, or `view-transition-name`) so they are not torn down and rebuilt.
- Restore focus before an exit animation that sets `visibility: hidden` (GSAP `autoAlpha`); hidden elements cannot take focus.
- Same-document View Transitions are Baseline newly available (Oct 2025: Chrome 111, Safari 18, Firefox 144): stop smooth scrolling, `document.startViewTransition(() => applyUpdate())` with a direct-update fallback, restart scrolling when finished. In React wrap the state change in `flushSync`. Cross-document (`@view-transition { navigation: auto; }`) is Chrome 126+ and Safari 18.2+ only (Firefox unsupported, Oct 2026): progressive enhancement, never required for comprehension.
- Prefetch likely next routes. Under reduced motion, cut to the new state or crossfade.

## Feel

- Frame-rate independent smoothing: `dt = min(now − last, 48); value += (target − value) * (1 − Math.exp(−dt / tau))`. Plain `lerp(value, target, 0.1)` per frame runs faster on 120 Hz screens.
- Name a small easing set as tokens (for example one expo-like out curve, one in-out custom curve, one overshoot for playful accents) and reuse it across CSS and JS.
- Constant-speed marquees: derive duration from content width; translate duplicated content by `−50%`; pause on hover/focus and when off-screen.
- Declare choreography order in markup (`data-order`, `data-order-mobile`) when the stagger sequence depends on responsive layout.
- Sound is opt-in: muted by default, a visible toggle, and an opt-out attribute for controls that must stay silent.

## Preferences as live state

Read `(prefers-reduced-motion: reduce)` and `(hover: hover)` as `MediaQueryList`s and subscribe to `change`; rebuild affected motion when they flip. Wrap decorative CSS loops in `@media (prefers-reduced-motion: no-preference) and (hover: hover)` so motion is opt-in rather than removed afterwards.
