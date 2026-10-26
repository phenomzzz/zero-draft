# Motion and media craft

## Motion specification

For each significant sequence name its purpose, trigger, spatial origin, animated layers, timing relationship, interruption/reversal, exit/re-entry, reduced-motion alternative and performance budget. Frequent controls favor immediate response; an occasional photographic story may use slower pacing. Do not infer frequency solely from input method or impose one duration across every interaction.

Derive motion from the concept, not a default reveal; see the tells list in [motion-recipes.md](motion-recipes.md#motion-physics-is-a-concept-decision). Use existing motion tokens and one clear owner per property. Simple hover/focus/press feedback usually needs CSS. Complex timelines, gestures and route coordination may justify the existing JS engine. Do not add another engine for one effect without a concrete reason. Keep essential information available without animation.

For concrete production mechanisms (single frame loop for smooth scroll and timelines, split-text reveals, image sequences, video textures, quality tiers, route choreography, frame-rate independent smoothing), use [motion-recipes.md](motion-recipes.md). Treat its values as tuning starting points.

## Coordination and lifecycle

When line, marker, icon and content represent one event, share progress or intentionally overlap their timing. Sequential animations can feel disconnected even when each works alone. Layout transforms and animated transforms need separate ownership/layers.

For navigation, define page exit, loading, entry, focus, scroll restoration and content reveal as a coordinated lifecycle. Test direct visits, internal links, back/forward, hard reload, anchor links and cancellation. Avoid artificially delaying a ready page merely to play a loader. Gate only the necessary visible entrance on fonts/media; include a failure/timeout fallback so missing assets do not leave the page blank.

One clock drives scroll-linked motion, scroll locks have an owner, and scroll measurements are rebuilt on explicit lifecycle events; mechanisms in [motion-recipes.md](motion-recipes.md#one-frame-loop) and [lifecycle](motion-recipes.md#lifecycle-and-re-measurement).

Header state should depend on explicit factors: hero intersection/theme, scroll direction with a tunable accumulated threshold, menu/modal state and recent intentional navigation. Avoid multiple conflicting scroll handlers, transparent intermediate styles and width changes from CTA text. Up-scroll hysteresis reduces accidental reveals; its value is a project parameter, not a standard.

## Interruptibility and coverage

Retarget from current state for rapidly reversible interactions. Per-frame smoothing should be frame-rate independent (scale the interpolation factor by elapsed time) so 120 Hz screens do not run faster. Hover-driven motion also responds to keyboard focus; read reduced-motion and hover capability as live media queries rather than once at load. Springs, CSS transitions and timeline controls can help; choose according to the actual engine and verify behavior. A paused element, stale inline style or duplicated event listener can make a correct easing irrelevant.

Keep images covering their frame at all progress values, including reverse scroll. Move/scale an inner overscanned image inside a stable clipped frame when appropriate. Check source crop and transform extent; do not add a huge scale to conceal a wrong geometry model. Full-height columns must preserve readable headings and predictable hit areas during expansion.

Scroll-linked chapters need finite boundaries, visible progression and a direct route past the story. Small-screen/reduced-motion versions retain the content in a useful reading order. Do not trap a visitor or require waiting through an animation to use a control.

## Diagnose actual stutter

Inventory driver and properties, then inspect likely causes: repeated layout reads/writes, layout/paint-heavy properties, too many animated nodes, inherited variables causing broad style recalculation, per-frame framework state, large blur/filter regions, media decoding and main-thread work during navigation. `transform` and `opacity` are useful defaults, not proof of compositing or smoothness. A targeted height/clip animation may be justified; profile the actual case.

Use a performance recording when claiming a measured improvement. Inspect long tasks, frame timing and paint/composite behavior. Slow playback reveals visual sequencing errors but is not a performance benchmark. Desktop CPU throttling does not model a phone GPU, thermal conditions or memory. Use `will-change` only for a demonstrated benefit, on a limited element, with lifecycle cleanup where needed.

For map route drawing, avoid rebuilding/uploading growing geometry every frame when reveal progress can be driven through a suitable renderer capability. Keep endpoints consistent with marker coordinates. A smooth reveal of a wrong route is still wrong.

## Media pipeline

Inventory originals and inspect contact sheets before selection. Preserve source paths/provenance, licenses and originals. Derive appropriate variants without upscaling beyond available detail. Match crop/focal point to actual layout; use responsive sources and explicit aspect/dimensions to reserve space. Check the selected image at its largest rendered size and high pixel density.

Prioritize likely above-fold media without eagerly loading every gallery image. Lazy loading needs dimensions and a useful placeholder. Gallery consumers need correct original dimensions, not only thumbnails. CMS crop changes must survive every rendering path.

Video: inspect codec/container, resolution, audio, duration and looping seam. Provide poster and useful fallback; respect autoplay policy, reduced motion, data/battery implications and an accessible pause control. Pause/decode work when appropriate outside view. Browser picture-in-picture controls vary; verify actual browser behavior before promising they can be suppressed. A canvas workaround has decoding, power, accessibility and performance costs and is not a default recipe.

Tier video loading by role, compress WebGL assets and pick a quality tier before heavy allocation (tiers change fidelity, never content); see [video](motion-recipes.md#video), [image sequences](motion-recipes.md#scroll-scrubbed-image-sequences) and [quality tiers](motion-recipes.md#gpu-assets-and-quality-tiers).

## Reusing demos and component libraries

Demo collections and component libraries (a local library the user points to, a vendor catalog, code sandboxes) usually share one placeholder look: often a dark ground, one saturated accent, a mono tracked-uppercase eyebrow and oversized headings. A demo's appearance is placeholder, not a suggestion. This skill's own [motion kit](../assets/motion/README.md) follows the same rule: its pages use plain fixture styling, and its tuned values are starting points from two shipped sites, not standards.

- Import the mechanism: timeline structure, state machine, lifecycle, input handling. Do not import the demo's base stylesheet, its tokens, its eyebrow/heading/button shells, placeholder copy or stock images.
- Restyle with project tokens before judging fit. If an effect only works in the demo palette, redesign or reject it.
- After integration, search the project's CSS/JS for the demo's signature values (accent hexes, shell class names, tracking values). Any hit fails unless the project chose that value independently and recorded why.
- Load only the plugins the mechanism uses. Verify licenses separately; local possession is not a right to redistribute. Never copy a library into a client repository, and never fetch restricted member code on the strength of a public preview.
- A smoke harness that only checks pages load is not integration evidence. Verify geometry, cleanup, keyboard/focus, touch, responsive and short screens, reduced motion and reversal in the target page.

When a library was used, the final report includes a usage table: component, where used, role (structural, component, microinteraction), what was adapted and which styling was removed, and whether the effect is perceptible in the shipped page; plus candidates considered and why they were rejected.

## Review result

Separate code-based risks from observed artifacts and measured performance. Report root cause, affected consumers, targeted repair and checks. If feel cannot be judged from source, say so and inspect the rendered sequence. Removing unnecessary movement can be better than polishing it.
