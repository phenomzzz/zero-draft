# Composition and affordance checks

Rendered pass/fail checks for the [composition method](composition-and-affordance.md). Capture original and candidate at wide (about 1440×900), intermediate (about 1024) and narrow (about 390×844), plus one short height, with loaded fonts and real copy. Answer each check pass / fail / unknown with the viewport, state and measured value or screenshot. A screenshot cannot establish comprehension, scroll behavior or accessibility; say so.

| # | Check | Fail when |
| --- | --- | --- |
| 1 | Name the page subject and offering from visible first-screen text alone, in one sentence | Only a slogan, poetic line or image carries the subject |
| 2 | Thumbnail at ~20% scale or blurred: name the two heaviest masses | They are not the intended first and second focus, or decoration wins |
| 3 | Each section has one entry point | Two elements tie in size, weight and contrast with no reason |
| 4 | Measure gaps: label/caption/price to its own item vs. to the neighbor item | Inner gap is not clearly smaller than outer gap (flag ratio above ~0.75) |
| 5 | Narrow: every heading, fact and action stays adjacent to what it describes | Heading separated from content, actions pooled at the end, orphaned captions |
| 6 | Diff original/candidate where a device was removed | Empty column, reserved icon slot, orphan gap or unchanged spacing |
| 7 | Compare section skeletons down the page | Three or more consecutive sections share one heading + grid skeleton while their content differs |
| 8 | Static screenshot, no hover: mark every actionable element | Any action indistinguishable from body text or decoration |
| 9 | Centered-label buttons: measure label box vs. button box (Range rect vs. element rect) | Left and right inner space differ by more than ~2 px, or variants disagree |
| 10 | Longest EN/PT-BR label at narrow width and 200% text | Clipping, ellipsis on action meaning, overflow or fixed-height cut-off |
| 11 | Tab through; screenshot focus | Focus not visible, or hidden under a sticky header (WCAG 2.4.11) |
| 12 | Measure interactive targets | Under 24×24 CSS px without spacing exception (WCAG 2.5.8) |
| 13 | Demo or library styling leakage ([reuse rules](motion-and-media.md#reusing-demos-and-component-libraries)) | Library tokens or shells present without a recorded reason |
| 14 | Count primary-styled actions per viewport; mark each arrow's behavior ([action-density.md](action-density.md)) | More than one primary without recorded exception; any decorative arrow |
| 15 | At 1920×1080 measure computed size of labels, captions, nav, meta ([hierarchy-without-scaffolding.md](hierarchy-without-scaffolding.md)) | Below 14 CSS px, or anything meaningful below 12 px at any viewport |

Accept a candidate only when the targeted checks improve and none regress; facts and behavior come first.

## Acceptance probes

Unevaluated scenarios for future skill revisions, not proof a model passed. Give an independent evaluator the raw task and fixtures without expected answers; keep artifacts isolated.

| Fixture | Regression to catch |
| --- | --- |
| Redundant eyebrow above a descriptive heading | Deletes headings or leaves an orphan gap (check 6) |
| Eyebrow supplies the only subject context | Poetic title becomes unidentifiable (check 1) |
| Real multi-step process | Bans all numbering |
| Trailing arrow removed from a wide icon-layout button | Empty icon track or stranded label (checks 6, 9) |
| Coherent Carbon-style start-aligned buttons | Mechanically centers every button |
| Left-aligned group with centered labels | Changes labels from group-placement guidance |
| Long Portuguese label, fallback font, narrow width | Clipping or cut-off (check 10) |
| Spinner replaces an optional icon | Deletes intentional transient space |
| Redundant CTA removed from a two-column region | Empty right column survives |
| Alternatives differ only in color or arrow | Called distinct structural directions |
| Fewer detector flags, weaker grouping | Accepts cleanliness as the criterion (checks 4, 5) |
| Catalog, narrative and metrics regions | One repeated skeleton or random variety (check 7) |
| Arrow removed, hover is the only signal | Action undiscoverable at rest (check 8) |

For real evaluation record the skill snapshot, inputs, original and candidate artifacts, viewports, observed results and limits. Use valid original designs as negative controls; include more than one domain and both EN/PT-BR. Package checks, author walkthroughs, fresh model trials and reader tests are different evidence. No fabricated design scores or conversion claims.
