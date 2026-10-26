# Constructive composition and control anatomy

Use while composing sections, for weak hierarchy, and whenever labels, dividers, numbers, icons or actions are removed. This file says how to build; [hierarchy-without-scaffolding.md](hierarchy-without-scaffolding.md) diagnoses scaffolding devices; [composition-evaluation.md](composition-evaluation.md) holds the rendered pass/fail checks. Scale down for an obvious repair. A cleaner detector result is not an improvement unless the replacement works.

## 1. Relationships before decoration

For the region, name: the visitor's question, the takeaway, first and second focus, content groups, evidence/assets, any needed action and the neighbors. Write a one-line spatial thesis: what leads, what supports, what belongs together, density, and what changes when stacked. Keep it in existing notes; no approval pause.

Hierarchy comes from type scale/weight/width, order, proximity, shared alignment, media proportion and meaningful surfaces working together. Larger gaps alone do not create hierarchy; related items must also be visibly associated. Repetition expresses equivalent content; difference expresses changed priority or meaning. Do not enlarge every headline, alternate backgrounds, stagger columns or add icons for variety.

## 2. Structural repertoire, not templates

| Relationship | Possible composition | Adaptation |
| --- | --- | --- |
| Explain one idea | Direct heading, associated introduction, supporting evidence | Evidence may be prose, media or data |
| Introduce an object/place | Subject-led image with identifying text and facts | Crop/scale follow the subject; context survives image failure |
| Present a collection | Collection heading, recognizable items, shared comparison attributes | Density follows the real count and attributes |
| Explain sequence | Ordered steps or timeline with progress | Numbers are valid here; never invent a process |
| Present status/results | Main result and context, then detail or source | Separate current status, measurement and history |
| Support a decision | Information grouped with its action | No remote CTA detached from what it affects |
| Tell a story | Deliberate reading sequence with shifts in emphasis/media | Coherent stacked and reduced-motion path |

These are relationships, not seven section blocks; real content combines them. Composition is also a creative variable: grid model (column, asymmetric, full-bleed, overlap, single object, spatial canvas), scale contrast, image-text relationship, density and navigation model. Choose them as decisions tied to subject and assets, not by rotation. In explicit experimental mode the page model itself can change; see [experimental-library.md](experimental-library.md). Preserve the approved visual world unless a broader redesign is requested.

## 3. Research and alternatives

For uncertain or substantial changes, inspect relevant live sections per [research-and-direction.md](research-and-direction.md): what identifies the subject, creates hierarchy, groups information and signals interaction. Translate it into a decision using this project's content; verify rendering rather than inferring from extracted text.

When uncertainty is material, compare a few arrangements that differ in reading order, grouping, density or interaction (not color or decoration) against the current version, with equal-quality real copy and assets. Show the region with its neighbors at relevant sizes. Obvious fixes need no alternatives.

## 4. Removal requires recomposition

When removing an eyebrow, rule, number, icon or action, review every relationship it supported, using the function table in [hierarchy-without-scaffolding.md](hierarchy-without-scaffolding.md). Reassess reserved space, margins, columns, alignment, widths, proportions and motion; do not keep empty slots by inertia. Removing a label may require pulling heading and content together or changing the media relationship, not a bigger headline. Removing an action may require regrouping, not a vacant column.

Fix shared causes (component variants, stale selectors, pseudo-elements, fixed widths, layout rules) before local overrides. Keep semantic structure, facts, focus order and established behavior.

## 5. Button and link anatomy

Alignment is three separate decisions: the control's placement in its region, the group's alignment, and the label's alignment inside each control. Group-placement guidance does not dictate internal label alignment.

Define one project contract for text-only, leading-icon, trailing-icon, loading and full-width variants, following a sound existing system. Centered labels with balanced padding suit ordinary standalone actions; start-aligned labels are legitimate in deliberate systems (Carbon uses them) and row-like controls. Neither is a UX/WCAG requirement.

After removing an icon, inspect:

- Width: content-sized, equal within a group, or full-width for a real layout reason.
- Padding, vertical alignment and optical balance in the loaded font.
- Leftover grid tracks, hidden icon wrappers, pseudo-elements, reserved padding and icon transforms; flex distribution or auto margins pushing the label to an edge (`text-align` does not control flex placement).
- Centered intent: the label centers in the whole hit area, not the remainder beside an invisible slot.
- Long EN/PT-BR labels, wrapping, fallback fonts, enlargement and narrow widths: no clipping, truncated meaning or nonbreaking-space hacks.
- Loading/disabled/pressed/focus: clear feedback and stable bounds. Space reserved for a real spinner is intentional, unlike an abandoned icon slot.

Remaining space is not automatically an error (equal-width groups, full-width forms, start-aligned systems), but a short label stranded at one edge of an oversized button needs a reason.

Clickability must read at rest through treatment, label and placement, with focus/pressed/hover feedback; hover alone cannot carry it, especially on touch. Underlines, surfaces and borders are valid; an icon is not required. Keep arrows that carry a consistent meaning ([action-density.md](action-density.md)). Do not add decorative effects to compensate for removed ones. Preserve native semantics and accessible names.

## 6. Accept or revert

Check facts and behavior first, then run the rendered checks in [composition-evaluation.md](composition-evaluation.md) on original and candidate. Accept when the target issue improves without a material regression; otherwise revise, explain the tradeoff or restore the useful structure. Fewer flags, more whitespace or a clean build cannot justify a weaker composition. Record observed versus inferred and untested.

## Sources and deliberate differences

Adapted concepts: [Impeccable layout](https://github.com/pbakaus/impeccable/blob/main/.agents/skills/impeccable/reference/layout.md) (spatial thesis, topology by task, rhythm) and [Anthropic frontend-design](https://github.com/anthropics/skills/blob/main/skills/frontend-design/SKILL.md) (subject-led direction, composition planning, rendered self-critique). Practitioner methods, not conversion proof. Not imported: hard style bans, mandatory interviews, detector scripts, fixed spacing bases, universal family/color counts.

Primary guidance: [NN/g hierarchy](https://www.nngroup.com/articles/visual-hierarchy-ux-definition/), [Atlassian button usage](https://atlassian.design/components/button/usage), [Carbon button guidelines](https://www.carbondesignsystem.com/building-blocks/core/components/button/guidelines), [W3C headings](https://www.w3.org/WAI/tutorials/page-structure/headings/). Alignment conventions are system-specific. Sources inspected 15 October 2026. See [provenance](sources-and-reuse.md) and [pinned source review](composition-upstream-review.json).
