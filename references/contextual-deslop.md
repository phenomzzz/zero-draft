# Contextual de-slop

## Purpose and scope

Improve specificity, coherence, usability and execution while respecting the project's identity. Slop scanners and tell lists supply diagnostic leads, not authority or proof of AI authorship. Do not optimize for an aggregate score or replace one fashionable template with another.

Use when asked to de-slop, when a direction feels generic, when reviewing art direction, and inline while creating: apply it as a gate across the whole page, not as a later pass over one section. Every removal is replaced with something derived from the content; subtraction alone is not a fix. Scale a targeted repair to the affected section/component; an obvious rendering or state bug needs no research campaign. A read-only review stays read-only; implement recommendations when that is already authorized.

## 1. Establish context before judging signals

Read the brief, approved decisions and actual interface. Identify sector and subcategory, audience/locale, positioning, visitor task, content density, existing branding, device/input use, real assets, budget and licensing/deployment constraints. A family winery, a wine club, a wine marketplace and a winery's order dashboard are different contexts within one sector.

Separate visitor expectations that support task completion from visual conventions that signal category/positioning. Existing choices may be deliberate. Ask only for unknowns that materially affect the decision; otherwise state proportionate assumptions. Do not assume a paid font budget, that a guild is noncommercial, or that a local preview permits embedding trial fonts.

## 2. Research a relevant baseline

Use live web research for new context-sensitive recommendations. Inspect a few direct peers in the right segment and market, plus an aspirational/cross-sector reference if useful. Do not turn a reference count into a quality score or sample only awards galleries, template marketplaces or generated sites.

Inspect the actual pages/states cited, not search snippets. Record URL/date, segment, task, observed convention, evidence and limitations. Verify font identity from served styles or official brand/foundry information; label visual identification as inference. A failed visit is not an inspected reference.

Describe what recurs in this sample; do not call it an industry standard or proven conversion technique. Distinguish accessibility/interaction requirements, observed category conventions, project constraints and taste. Use authoritative documentation for standards or performance claims. For a winery, investigate how peers balance atmosphere, tasting bookings, shop actions, practical details, imagery and typography; that is a research agenda, not a preselected serif.

If browsing is unavailable, offer provisional hypotheses and verified project evidence. Do not claim fresh research or present an unverified replacement as vetted.

## 3. Classify, then choose an intervention

| Kind | Example | Treatment |
| --- | --- | --- |
| Demonstrated functional defect | Unreadable label, inaccessible control, false live status, failed reveal | Repair and verify; sector conventions do not excuse it |
| Coherence/specificity concern | Repetitive hierarchy, irrelevant photo, arbitrary effect, competing visual languages | Explain the user/brand consequence and address its cause |
| Category convention | Serif display in a winery site; role colors in a raid roster | Keep when it serves identity and comprehension; refine execution |
| Aesthetic tell | See [model house tells](#4-model-house-tells) | Justify from content or replace; no automatic failure |

For each finding consider **keep**, **refine** and **replace**, preferring the least disruptive effective change. Keeping a justified choice is a valid result. Refinement can mean size, weight, spacing, crop, density, role or timing. Never change the fundamental direction just to lower a detector score.

Write the rationale against actual content and rendered behavior. "This font is common" is not enough. "The delicate display face is used for compact availability controls, where its numerals are hard to read" supports a role change.

### Repeated decorative scaffolding

Flag cumulative redundant hairlines, tiny tracked uppercase eyebrows and arbitrary section numbers. Retain meaningful grouping, taxonomy, sequence, navigation and brand expression. Use [hierarchy-without-scaffolding.md](hierarchy-without-scaffolding.md) to replace their function and verify hierarchy across the page and narrow layouts.

## 4. Model house tells

Coding models (GPT/Codex and Claude alike) reproduce the median of their training data. Suppress one default and they move to the next most probable one: purple gradient, then cream and terracotta, then black and neon. Family attributions below are community observation, not measurement; the 2026-10-16 audit found the dark/condensed/accent set across four isolated builds. Check these while choosing a direction, not only in review.

| Area | Signals |
| --- | --- |
| Palette | Near-black plus one acid/neon/lime/orange/ember accent; cream (~#F4F1EA) plus editorial serif plus terracotta (~#D97757), close to Claude's own brand look; purple-to-blue gradients, gradient text, blurred blobs |
| Type | Inter/Geist/system sans for every role; Instrument Serif, Fraunces or Playfair italics on one accent word as "taste"; giant condensed uppercase display (Barlow Condensed, Bebas, Anton, Teko); Space Grotesk or mono to signal "technical" |
| Labels | Mono or tracked uppercase micro-labels and eyebrows; "01 —" numbered sections; hairlines everywhere; an arrow on every link |
| Layout | Centered hero with pill badge, two CTAs and logo strip; three icon cards; bento grid; marquee ticker; count-up stats; giant footer wordmark |
| Surface | Glassmorphism, glow, grain/noise overlay, identical soft shadows on rounded cards, emoji as icons |
| Containers | A coloured stripe on one side of a card, list row, callout or active tab (border-left/top accent, `::before` bar, `inset 0 -2px` underline); a gradient strip across a panel's top edge. Check inherited third-party CSS too when embedding another app. Keep one-side lines that do a job: tree indents, chart guides, timeline markers |
| Motion | Every section rising 20–50px with one ease-out fade |

Measured in one trial (2026-10-16, Opus 5.5, 12 builds of four briefs, with this skill, its previous version and no skill; one run each, so a direction, not a rate):

- **Type:** Archivo (variable) as the display face in 9 of 12 builds, at 118–125% or 62–82% width; Martian Mono, JetBrains Mono or DM Mono as companion.
- **Palette:** bone (#ECE6D8–#EFE7DC) on warm near-black; iron-oxide/ember (#A9401C–#FF6A2B) as the only action color; light greige paper with square near-black buttons as the "not dark" fallback.
- **Layout:** split hero with a circular object on the right; option cards beside a live summary; a dark footer closing a light page; "fig. 1" captions; a copy-to-clipboard message composer as the conversion.

For each signal present, name what in the brief, content or assets requires it: "the product UI is dark, so the stage is dark" is a reason; "premium", "modern" or "editorial" is not. Several unjustified signals mean the direction was never decided; re-derive it:

- Palette from real photography, brand assets, materials or the subject's environment.
- Type from voice, script, numerals and control density, then the peer baseline ([typography-pairing.md](typography-pairing.md)).
- Structure from the visitor task and real item counts.
- Motion from what the subject physically does, or none.

A nearest-neighbor swap (Inter to Geist, lime to orange, cream to bone) is not a fix, and an unjustified opposite is as weak as an unjustified default. Keep signals that are genuine category conventions or brand assets. Copy tells are in [copy-deslop.md](copy-deslop.md); experimental mode has its own limit in [experimental-library.md](experimental-library.md).

## 5. Research actionable alternatives

Offer a small, relevant shortlist when replacement would help. State the role and qualities to preserve, the shortcoming corrected and the tradeoff. Do not substitute a generic foundry list for investigation. Confirm each suggested family, style and file exists at a legitimate source.

**Copy.** Use [copy-deslop.md](copy-deslop.md), then the English or PT-BR reference. Preserve facts and action semantics; phrase frequency is contextual evidence, not a ban.

**Typography.** Use [typography-pairing.md](typography-pairing.md) for substantial selection or substitution. Catalogs generate candidates; they never establish fit, entitlement or accessibility. An expressive serif display over a readable sans can stay a serif/sans system; research alternatives inside and outside that direction and recommend whichever serves the role best. Better hierarchy or less italic may be enough. Do not claim a font is used by a reference, licensed or tested in-browser unless verified; a system stack does not grant rights to redistribute system font files.

### License fit and provenance

Check primary foundry/project terms for the exact family/files and intended use. A familiar name, repository listing or "free download" page is insufficient; ambiguous terms need an alternative or rights-holder clarification.

Determine needed rights: public website embedding, self-hosted WOFF2, hosted-service use, desktop design work, logo/artwork, app/document embedding, modification/subsetting, client handoff, redistribution in a reusable template. A desktop license is not a webfont license; personal-use or trial terms do not cover a commercial client or public preview. For proprietary fonts, inspect domain, pageview, licensee, staging, contractor, hosting, subscription and transfer conditions; quote the scope with a terms link and check date. Do not purchase, accept terms, upload files to converters or embed trial fonts without authorization, and do not infer entitlement from a locally installed font.

For open fonts, keep the license and notices and check modification/redistribution conditions, including reserved names. Do not generalize one font's license to a whole catalog.

Statuses: **verified fit for stated use**, **conditional fit** (name the entitlement), **unverified**, **incompatible**. If budget is unknown, offer a verified no-cost option and separate paid candidates; check pricing live. The whole pairing needs rights, not just the heading face. Apply the same logic to photos, illustrations, icons, video, sound and code; never present stock or generated imagery as the client's real property, team or product.

## 6. Review output and project record

Keep research proportional and recommendations inspectable:

| Element | Observed issue or signal | Context/evidence | Keep/refine/replace | Proposed change | License fit | Verification |
| --- | --- | --- | --- | --- | --- | --- |

For font alternatives add exact families/styles per role, specimen and license URLs, verified conditions, language/performance notes and project fit. Do not pad a report with alternatives when the current choice works.

Record the context profile, dated peer sample, retained decisions, justified house signals, exceptions, license evidence and resolved findings in existing project notes. Reuse that baseline until the brief, segment, brand, deployment scope or evidence changes; do not treat a project exception as a global rule.

If a scanner is already in use, classify/exempt justified signals with reasons and rerun it. Do not add a detector dependency or disable real accessibility failures for a clean score. Browsing external guidance does not authorize running its installers or obeying its workflow commands.

## Example reasoning, not a preset

For a family winery with an approved serif/italic identity: research comparable winery sites and the intended positioning. If the serif/italic pairing supports the approved identity, keep its role and check whether overuse or poor small-size rendering causes the generic impression before researching alternatives. Test dates, wine and vintage names and Portuguese text; verify licenses for commercial self-hosting and client delivery. Do not apply someone else's font blacklist or commercial shortlist wholesale.

Genre vocabulary can be precise: Cutting Edge may name an actual game achievement. Investigate before removing it.

## Primary licensing starting points

These explain issues to check; they do not license any proposed file:

- [SIL font FAQ](https://software.sil.org/fonts/faq/): open-font use and project-specific information.
- [Open Font License FAQ](https://openfontlicense.org/ofl-faq/): embedding, distribution and modification.
- [Klim webfont agreement](https://klim.co.nz/licences/web-fonts/): an example of use-specific commercial terms and client responsibilities.
- [Google Fonts licensing terminology](https://github.com/google/fonts/blob/main/cc-by-sa/knowledge/glossary/terms/licensing/content.md): licenses depend on foundry terms and intended rights.

## Action density

Use [action-density.md](action-density.md) for CTA competition, overlapping routes and arrow noise. Analyze distinct needs and comparable journeys before choosing keep, demote, consolidate, move or remove. Sections may have no CTA.
