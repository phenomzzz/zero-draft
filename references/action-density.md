# Action density and directional affordances

Use for CTA overload, competing actions, arrow noise and page-journey design, at creation as well as review. Review stays read-only; authorized implementation includes consolidation and verification. A common complaint about agent-built pages is too many CTAs and an arrow on every button; the defaults below answer it.

## Defaults

- **One primary per viewport.** At most one primary-styled action (filled or highest-contrast) visible in any viewport, including sticky headers and overlays. Exception: genuinely equal choices shown side by side (plans, locales); record the reason.
- **A section may have zero CTAs.** Content can explain, establish identity or support a decision without a prompt. Never add a CTA per section or a compulsory secondary button.
- **No decorative arrows.** An arrow or chevron appears only when it predicts real behavior: carousel or step direction, back, disclosure, scroll-to, or a consistent project convention for leaving the site or downloading. Never as default button or link decoration, never for variety.
- **Iconless controls must still read as actions** (spec below).

Catalogs and workspaces can legitimately hold many controls; the primary rule limits emphasis, not count. A quiet page must still let ready visitors act.

## Inventory intent and behavior

Inspect rendered states and destinations, including header/sticky, overlay and mobile states (hidden responsive duplicates are not simultaneous competition). Separate conversion prompts, navigation, exploration, utilities, citations and essential task controls by visitor intent, not tag or styling. Record purpose, destination/effect, journey stage, prominence, recurrence and nearby competition. Group equivalent outcomes despite different wording; identical labels may hide different effects.

For each action ask: what distinct need does it serve here, what new information makes repetition useful, what becomes harder if it disappears? Do not invent an audience segment to justify a secondary CTA.

For a disputed direction or unfamiliar domain, inspect comparable live sites per [research-and-direction.md](research-and-direction.md): where actions are deliberately absent, how primary access persists, when contextual actions return, in neighboring sections, sticky states and narrow layouts. Peer prevalence is convention, not conversion proof. Reuse a project baseline for small fixes.

## Choose an intervention

- **Keep** essential access and actions serving a current decision; repeat only after substantial new evidence or at a real decision point.
- **Demote** competing supporting routes; lower contrast alone does not resolve redundant intent.
- **Consolidate** equivalent prompts into one descriptive route.
- **Move** optional tools to their context or a findable disclosure; never hide essentials for a cleaner screenshot.
- **Remove** prompts with no distinct decision or access purpose, then regroup the section ([composition-and-affordance.md](composition-and-affordance.md) §4) instead of leaving a vacant slot.

## Iconless button and link spec

When an arrow or icon is removed, or never added:

| Element | Spec |
| --- | --- |
| Primary/secondary button | Visible at rest: filled surface or 1px+ border with 3:1 contrast against its background; label is a verb + object ("Ver horários", "Book a call") |
| Label alignment | Centered: left and right inner space equal within ~2 px in the whole hit area; or start-aligned consistently across all variants. No leftover icon track, gap, pseudo-element or padding |
| Size | Width from content plus balanced inline padding, unless equal-width group or full-width form; label ≥ 16 CSS px; target ≥ 24×24 CSS px, 44 px preferred on touch |
| Text link | Underline or persistent distinct treatment at rest, not color alone; not hover-only |
| States | Visible focus ring, pressed and disabled states; stable bounds when loading |

Inspect the anatomy checklist in [composition-and-affordance.md](composition-and-affordance.md) §5 for flex distribution, long PT-BR labels and fallback fonts. Wording and accessible names communicate the action without the glyph; decorative glyphs stay out of accessible names. Motion must not move the hit target.

## Verify

Screenshot each viewport and count primary-styled actions (fail above one without a recorded exception). Mark every arrow and its actual behavior (fail any decorative one). Confirm key paths stay reachable, wording matches effect, keyboard/touch/focus work, disclosures stay discoverable and sticky states do not recreate competition. Run checks 8–12 in [composition-evaluation.md](composition-evaluation.md). Separate design judgment, reference observation, functional checks, reader findings and measured conversion; never promise uplift from fewer CTAs.

## Sources

[GOV.UK button guidance](https://design-system.service.gov.uk/components/button/) (competing primaries, excessive secondaries; transfer reasoning, not service-page quotas), [NN/g button states](https://www.nngroup.com/articles/button-states-communicate-interaction/), [Humblytics page-CRO skill](https://github.com/Humblytics/humblytics-marketing-skills/blob/main/skills/page-cro/SKILL.md) (questions only; per-section CTAs, funnels and numeric claims not adopted). Reviewed 15 October 2026; original synthesis, nothing vendored or executed. The one-primary and no-decorative-arrow defaults record the author's preference, not a universal standard.
