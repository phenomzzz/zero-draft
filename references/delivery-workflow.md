# Website delivery workflow

Flow for a new site or substantial redesign; scale down for smaller work (a broken hover needs diagnosis, not discovery). Contextual quality is built in at creation, so the user need not ask for cleanup afterward. Gates are self-checks, not approval pauses: routine authorized iteration continues. Claude Code tool mapping (preview server, screenshots, viewports, subagents): `claude-code-runtime.md`.

## 1. Scope and continuity

Locate the actual checkout, canonical source, preview server and release destination. Read repository instructions and current changes. Distinguish legacy site, repaired copy, new implementation and hosted preview; do not operate on similarly named folders by assumption. Inspect build commands, tokens, components, state owners, content rendering and generators that overwrite hand-edited files. Preserve meaningful work before structural changes with existing backup/version-control practice; do not reset, clean or broadly stage unrelated files. Keep accepted work unless it causes the problem; a new direction should be deliberate, not a side effect of a fix.

## 2. Content and architecture

Inventory source pages, unique facts, assets, repeated copy and gaps. Track uncertainty outside the rendered layout. Resolve conflicting facts rather than fabricate a combined policy. Visitor conditions (eligibility, attendance, required fields) and aggregates derived from partial data ("95 of 96 in range", "January to December") are facts: mark them as inferences or leave them out.

Identify the main visitor journey and direct alternatives; each business gets its own. For each page/section name its visitor question, required information, useful next action, source/owner and relation to neighbours. Consolidate thin pages and preserve redirects. Breadcrumbs, anchors, section rails and related links need distinct jobs.

Check content weight before layout: shorten an oversized column, group facts and disclose secondary guidance before abandoning an arrangement. Match emphasis to importance. Use the project packet only when equivalent decisions are not already documented.

## 3. Direction (gate before slice code)

Derive the direction from the subject with [research-and-direction.md](research-and-direction.md), researching only unfamiliar decisions. Do not start from a generic eyebrow/headline/cards/CTA skeleton intending to strip it later: a section may have no CTA, and headings, labels, numbers and arrows must carry meaning or intentional identity. Choose a structure suited to the content rather than universal minimalism.

When no identity is established, specify two or three directions that differ at least in type genre and value before rendering any, so the first does not anchor the rest. Render each as a quick tile (real name, one real headline, one real fact, one real asset, one control) and compare at thumbnail size. With subagents authorized, render tiles in parallel isolation; the lead assigns the directions. Width variants of one variable family count as one direction's face, not as different genres; if the leading display face is the model's most frequent pick (currently Archivo, also Inter, Geist or Space Grotesk), name the glyph or width property the subject needs that two named alternatives lack before the tile is chosen ([typography-pairing.md](typography-pairing.md)). Choose the tile on subject fit and task clarity; the house-signature check then audits the chosen tile's reasons. Record the chosen tile's face, ground, nav and button in the decision log, so later projects can be compared against it. Skip tiles when an approved identity exists.

Pass when each axis decision traces to the subject, the house-signature check in [design-profile.md](design-profile.md) passes (including comparison with recent builds where they exist) and the content inventory can fill the slice truthfully.

## 4. Representative slice loop (gate before propagation)

Define a few semantic tokens (surfaces, text, accent, spacing, type roles, borders, elevation, motion) and the layout frame (content widths, alignment edges, section rhythm, media ratios, overlay bounds, sticky offsets). Extend a sound existing system; avoid unused ramps. Choose the stack for delivery, interactivity, hosting and editing; a framework or each extra animation engine needs a benefit.

Build one complete slice through a visitor task: real copy and media, navigation, the distinctive section, a functional control or overlay, responsive behavior and CMS where relevant. An inert hero is not a slice. Plan complete text-only and icon control anatomy from the start ([composition-and-affordance.md](composition-and-affordance.md)).

1. Render it on a local preview.
2. Screenshot at the declared widths plus a short height; record motion where it matters.
3. Critique against the brief and direction, then with [contextual-deslop.md](contextual-deslop.md), [action-density.md](action-density.md) and [copy-deslop.md](copy-deslop.md): topic clarity, reading order, grouping, facts, type hierarchy, control geometry, action priority, narrow/short layouts, keyboard operation, motion interruption, fonts and crops. Rerun the signature check on the rendered result.
4. Fix shared causes in tokens and components, not page overrides; re-render.

Stop when a round finds no structural issue. If two rounds fail on the same structural question, compare working alternatives in context ([exploration-workbench.md](exploration-workbench.md)) instead of polishing. Read locale, typography or motion detail only when the slice raises it.

## 5. Expand coherently

Propagate through shared components with explicit behavior ownership. If positioning and animation need different transforms, separate the layers. Do not let several modules rewrite one component on load. Use intrinsic layouts and sensible minimums; overlays may scroll on short screens; design small-screen alternatives to pinned stories and side-by-side comparisons rather than shrinking them. Integrate CMS once structure is stable and verify an editorial round-trip. Publishing content, deploying schema/Studio and deploying the site are separate actions.

## 6. Whole-page synthesis (gate before delivery)

Review the assembled journey for repeated section skeletons, unnecessary scaffolding, CTA competition, arrow inconsistency, monotony, lost affordances and drift back toward the house signature. Sections can work alone and compete together. Fix demonstrated regressions with the same contextual method, keeping settled decisions; this is not a second research campaign. A reviewer with fresh context (brief, direction and screenshots only) catches what the builder normalized; use a subagent for it when authorized. Keep separate de-slop mode for inherited sites or later targeted critique.

## 7. Completion

Run checks proportionate to the change; inspect rendered states and affected shared consumers, broadening only for new changes or unresolved concerns. Verify the deployed site itself for releases. Handoff: what changed, where it runs, how editing works, checks, gaps and reproduction commands; no credentials. Local build authorization does not authorize publication; earlier deployment authorization persists for its scope.

## Cost control

- Read the current project packet instead of replaying the chat; update it as project work, not implicit global memory.
- Reuse settled rationale and approved baselines; reopen for a changed brief, environment or evidence. Do not rerun a full audit for a minor edit.
- Group root-cause repairs: one shared lifecycle bug is one fix with several consumers to recheck.
- Reuse proven primitives (galleries, calendars, focus management).
- Handing work to another session or model: give files/revision, target behavior, tokens, boundaries, acceptance checks and drift handling. Keep direction decisions with the lead, not a lighter model.
- Use subagents only when the user asked for or authorized them, and where isolation or fresh eyes repay coordination: direction tiles, independent synthesis review, bounded surveys.
- Test meaningful state transitions and fragile integration, not styling that mirrors implementation.
