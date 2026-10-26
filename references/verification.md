# Verification and evidence

## Scope checks to the change

Identify pages, components, data sources and shared consumers affected. For a whole-site build, sample every canonical route and key interaction. For a small fix, inspect the affected path and plausible regressions. Distinguish introduced/regressed issues from pre-existing ones. Prefer one shared-cause finding to many duplicate symptoms.

Use the project's normal commands, current browser tools and their documented APIs. Do not bypass tool restrictions using another automation library. This package has no required browser dependency.

## Evidence ladder

| Evidence | Supports | Does not prove |
| --- | --- | --- |
| Source inspection | Declared structure, state ownership, likely causes | Rendered geometry or how motion feels |
| Static/build checks | Resource references, syntax/types and build completion | Operable controls or live content |
| Rendered observation | A specific state at a named environment | Every browser/device/state |
| Browser audit helper | Geometry/media/control-name leads in light DOM | Accessibility conformance, complete naming algorithm or visual balance |
| Interaction sequence | The exercised path and recovery | All possible transitions |
| Performance recording | Measured workload in that environment | Smoothness on all devices |
| Physical-device/assistive-tech check | The device/tool and paths actually checked | Universal certification |

State unverified areas plainly; no "100% responsive" claim from a width matrix.

## Responsive matrix

Tool mechanics (preview servers, viewport emulation, evaluation, screenshots) live in [claude-code-runtime.md](claude-code-runtime.md). Start servers from a `.claude/launch.json` entry; [assets/launch.json.example](../assets/launch.json.example) has Windows-safe `cmd /c` entries for `npm run dev`, `python -m http.server` and `npx --no serve`. Never overwrite an existing launch file; merge an entry.

Core matrix for a whole-site pass (width×height): 1440×900, 1280×720, 768×1024, 390×844, 375×667 (short phone), 844×390 (landscape phone). Add 320×568 for reflow, 1920×1080 for wide max-width and just above/below each real component breakpoint. These are coverage samples, not breakpoints. Run light and dark when the site supports both, reduced motion when anything animates, and 200% text zoom on at least one narrow and one wide size.

Per environment record: actual `innerWidth`/`innerHeight` and colour scheme from the audit helper (proves emulation took effect), console errors after load and after each interaction, failed network requests, and the keyboard path through header, primary action and any overlay (focus visible, Escape, focus restore). Slow-network and reduced-motion states need real emulation; if the available tool cannot emulate them, mark `not checked` and say so. Never change OS settings to test.

Evidence standard: a viewport screenshot proves one state at one size at one moment; a full-page capture proves little for pinned or viewport-height scenes. Name saved captures `<route>-<w>x<h>-<scheme>-<state>.png` in a QA folder excluded from release. Pair each claim with its evidence type from the ladder above.

Wait for navigation, required fonts and relevant content before measuring. Separate intentional horizontal tracks and hidden off-canvas content from accidental page overflow. Test headers after scrolling and content after interaction. A full-page screenshot can distort pinned/viewport-height scenes; use viewport captures at meaningful progress.

Check: shared edges, content density, headings/line wraps, long email/URL, loaded and missing media, hover/focus/selected/disabled states, CTA access, horizontal overflow, overlay scroll/focus, keyboard and touch alternatives. Check narrow width and short height independently.

## Browser audit helper

`scripts/audit_page.js` is one async function expression. Evaluate the whole file wrapped as `(<file contents>)()` in the browser tool's JavaScript evaluator or the DevTools console; with Playwright use ``page.evaluate(`(${source})()`)``. It is read-only: no clicks, scrolling, style injection, storage, fetches or logs. It waits briefly for fonts and two animation frames, with bounded timeouts.

It returns `counts` first, then leads: horizontal escape and masked root overflow, text clipping, possible unlabeled controls, targets under 24px and under 44px (inline text links excluded), low-contrast text over solid colours, missing `alt`, images without intrinsic size, lazy images above the fold, eager images far below it, broken/pending images, readable-stylesheet signals (`:focus-visible` rules, focus outline removed without replacement, `prefers-reduced-motion` blocks, keyframes) and the environment (colour scheme, reduced motion, coarse pointer). URLs are reduced to origin/path; element descriptions omit text and values.

Every item is a lead. It inspects light DOM only, does not implement the accessible-name algorithm, counts layered text (images, gradients, pseudo-elements, shadows, overlaps) as contrast-unresolved rather than passed, ignores cross-origin sheets and JavaScript-driven focus or motion handling, and cannot judge intent. Review each lead in context; never repair with global overflow hiding.

## Interaction and accessibility

Exercise keyboard order, visible focus, labels/names, native radio behavior, Escape, nested overlays, focus restore, background inertness and error recovery. Check actual accessible names with the accessibility tree when available. Color/animation must not be the sole carrier of essential meaning. Text enlargement and reduced motion must retain usable controls/content.

For complex state, use the interaction-contract sequences. For CMS changes verify the actual configured project/dataset and all consumers: page, detail drawer, gallery, summary and metadata where relevant. Real content mutations require authorization; mock receipts are not live proof.

## Receipt and reporting

Record date/revision, environment/browser, route, viewport, state/action, check method, result, evidence path and limitations. The verification template distinguishes `pass`, `fail`, `not checked` and `not applicable`. A check that was unavailable is not an observed defect.

Prioritize blockers and systemic issues, then comprehension/consistency, then isolated polish. Explain the practical user impact and fix the narrow root cause. After fixes, rerun failed paths and affected shared consumers. Do not silently truncate blockers behind an arbitrary findings cap.

## Visual regression gate

For hierarchy or icon/CTA removal, apply [composition-and-affordance.md](composition-and-affordance.md). Compare original/candidate grouping, topic clarity, rhythm and rest-state action recognition; inspect button label geometry with actual fonts/variants. A lower detector count or successful build cannot substitute for rendered verification.
