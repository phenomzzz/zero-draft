# Evidence-led typography selection and pairing

## Scope and authority

Use for selecting or replacing type systems, including contextual de-slop. Preserve an approved brand and fix execution before replacing families. Follow [contextual-deslop.md](contextual-deslop.md) for sector research and the full license-fit procedure. A narrow clipping fix does not require a type-selection exercise.

Distinguish four forms of evidence:

| Basis | Supports | Does not establish |
| --- | --- | --- |
| Applicable standards, exact license and official technical documentation | Specific requirements, rights and supported capabilities | Universal aesthetic superiority |
| Actual font files, metadata and rendered tests | Available styles/axes/glyphs and behavior in the tested environment | User preference, comprehension or conversion improvement |
| Observed sector examples and practitioner guidance | Candidate strategies and context-sensitive hypotheses | An industry standard or controlled research finding |
| Catalog tags, stars and pairing lists | Discovery and adoption signals | A proven pairing, license clearance or reputation of each contributor |

Identify a claim's source and date. Do not call an attractive pair scientifically proven or accessibility certified. A name containing Hyperlegible, Text, Display or a sector tag does not replace testing the relevant use.

## 1. Define jobs and the anchor

Inventory current families/styles, actual loaded files, roles, real text, locale, numeric/control demands and brand constraints. Identify whether the anchor is an existing brand face, readable body/UI text, or an expressive headline. Choose the workhorse first when reading dominates; anchor around the brand/display face when that is the established identity. Keep an unchanged/refined control candidate when evaluating replacement.

Specify display, section heading, body, navigation/control, caption and data roles as needed. Roles need not each have a family. One well-equipped family may serve all of them. Additional faces earn their place through a useful role rather than a universal requirement to use two; language coverage and code can justify more. Do not equate one neutral sans with a template or three families with automatic failure.

## 2. Choose a pairing strategy

Adapted from Wondelai's pairing guide, interpreted as heuristics:

| Strategy | When useful | What to verify |
| --- | --- | --- |
| One family, varied weights/styles/optical cuts | Consistency, efficiency, strong existing identity | Required styles exist and hierarchy remains legible without competing faces |
| Coordinated superfamily | Related serif/sans/text/display roles | Exact families are actually designed together; names alone do not establish matching coverage |
| Structural contrast | Expressive serif with quieter sans, or sans display with reading serif | Distinct responsibilities, compatible proportions and no simultaneous competition |
| Contrast of width/weight/texture | Two sans or two serif faces with meaningful differentiation | Optical balance at intended sizes; no assumption that category contrast guarantees success |
| Shared design characteristics | Related skeletons, proportions, terminals or a designer's coordinated work | Inspect actual faces; common designer/date is a discovery clue, not proof |

Contrast one or more relevant attributes while finding compatible relationships elsewhere. Consider x-height, cap height, width, stroke contrast, counters/apertures, terminals, rhythm and text color. Equal CSS size or numeric weight does not imply equal optical size or darkness. A large light heading can coexist with regular body text; do not require headings to have a greater weight number.

Historical origin can inform a brand story but is not a compatibility test. Serif does not automatically mean formal, sans casual; display/text are usage roles, not genre labels.

**Check the house signature.** Before shortlisting, compare the leading pairing with the type row of the [model house tells](contextual-deslop.md) and with the last few projects in the workspace (in one audit, four builds of one brief all used a condensed sans display). If it matches (condensed uppercase display, Inter/Geist everywhere, Instrument Serif/Fraunces italic accent, Space Grotesk or mono as "technical"), write the content-derived reason, and add at least one finalist from a different genre or width (wide grotesk, slab, humanist or didone serif, script, rounded, mono as text) for the contextual comparison. Choose on rendered fit, not on being different.

Width variants of one variable family count as one candidate. If the leading display face is the model's most frequent pick (currently Archivo, also Inter, Geist or Space Grotesk), name the glyph or width property the subject needs that two named alternatives lack, before the tile is chosen.

## 3. Discover, then verify candidates

Use a small shortlist from contextual peers, official foundry specimens and optional catalogs (source map below); none is a required dependency. Do not refetch catalogs for a settled decision.

For each finalist record exact family, release/source, files, required weights/styles, axes and intended roles. Check official metadata/files instead of trusting a table's variable/static flag. Distinguish family names and versions (for example, a newer numbered release may differ from an older Pro family); do not silently substitute them.

Verify target script and actual characters, including names, punctuation, currency and diacritics. For pt-BR use real text with á, à, â, ã, é, ê, í, ó, ô, õ, ú and ç. Inspect Il1, O0, rn/m where ambiguous identifiers matter, and dates/prices/capacities for numeric UI. Tabular numerals support alignment only where the chosen font implements them; body prose need not use tabular figures.

Confirm true italic and required weights or document a deliberate fallback. Inspect optical-size support and appropriate text/display cut. A variable font is not automatically smaller or faster: measure required subsets/styles and actual delivered bytes. Never remove needed glyphs to reach an arbitrary payload score.

Check the exact license and project entitlement using contextual-deslop before embedding, converting, subsetting or handing files to a client. The skill repository's MIT license does not license any fonts it mentions. Retain required font notices. Unknown terms remain unverified, not assumed free. A paid candidate without entitlement is conditional and must not be embedded merely to compare it; use an authorized specimen or an independently licensed alternative.

## 4. Build a fair contextual comparison

Use real content and components in the actual visual context. Compare the existing/refined system and a few justified alternatives with explicit role assignments. Preserve layout initially to expose substitution effects, then tune each candidate optically; identical numeric sizes are not a fair final comparison. Record tuning rather than silently giving one option better treatment.

Include the actual longest heading, ordinary/long prose, navigation, CTA, form labels/errors, calendar dates and relevant numeric information. Test intended sizes, narrow/short screens, zoom/enlargement, loaded and fallback states. Mark inaccessible or untested sources clearly. Do not judge solely from a specimen's alphabet, a screenshot of a different business, or Lorem ipsum.

Inspect hierarchy and texture, read real paragraphs, and compare useful role contrast. A squint/swap test is a craft heuristic, not empirical proof; forcing a display face into body text is not a meaningful universal test. An explanation of the pairing is desirable, not a red flag by itself.

Check clipping, wrapping/widows, contrast, actual loaded faces, synthetic styling and layout changes. The browser's computed font-family list alone does not prove every glyph used that font; inspect network/font tooling or file coverage when needed. Use available approved browser tools and avoid bypassing their restrictions with a skill's bundled browser runner.

## 5. Implement and verify responsibly

Use existing semantic typography tokens. Set required weights/styles correctly; prefer high-level CSS font properties when they express the intended axis. Choose font-display per role for visibility, stability, brand and performance together; "always swap" is not universal. Preload only critical files.

Sources and delivery: Google Fonts families are mostly OFL (some Apache/UFL); read each family's license, and self-host from the official repository or a package that ships the license when privacy, stability or performance favor it. Fontshare uses ITF's own Free Font License, not OFL; check its current self-hosting, modification and redistribution terms. Serve WOFF2, subset with unicode-range (Latin-1 covers pt-BR accents and ç; verify names and symbols), and compare variable versus static bytes for the styles actually used. Reduce swap shift with a metric-matched fallback `@font-face` using `size-adjust` and `ascent-override`/`descent-override`/`line-gap-override` (computed by tools such as Fontaine, Capsize or framework font loaders); check browser support on MDN.

Check 200% text enlargement without lost content/functionality under the applicable WCAG criterion, and relevant reflow/text-spacing/contrast requirements. WCAG does not prescribe a universal body font, 16px floor, two-family maximum, or 45–75-character line length. Those can be useful starting heuristics, not conformance verdicts. Dense controls, scripts, reading tasks and individual faces require contextual decisions. A font change alone cannot establish accessibility.

Preserve functional state and user navigation during typography changes. Recheck overlays, sticky headers, galleries and CMS-long content whose dimensions may change. Verification of pairing appearance is separate from verifying loading and licensing.

## Deliverable and decision record

| Candidate | Exact display/body/UI styles | Strategy and contextual rationale | Official source/license and date | Rights status | Observed tradeoffs/tests |
| --- | --- | --- | --- | --- | --- |

State keep/refine/replace, recommended candidate, reasons, known limitations and actual tests. Separate potential alternatives from ready-to-ship choices. Keep a small dated record of font sources, files/version, required rights, notices and chosen roles. Refresh on meaningful brand/content/deployment/license changes, not on every edit.

## Source map and deliberately rejected claims

- [Wondelai pairing strategies](https://github.com/wondelai/skills/blob/main/web-typography/references/pairing-strategies.md): contrast, role assignment, superfamilies, single-family choices and real-content testing. Do not import its contradictory era examples, automatic headline-weight rule or treat its "proven" heading as validation.
- [Jakub choosing fonts](https://github.com/jakubkrehel/skills/blob/main/skills/better-typography/choosing-fonts.md): anatomy, optical cuts, file formats and fallbacks; its category summaries are generalizations, not guarantees of reading performance.
- [UI UX Pro Max typography data](https://github.com/nextlevelbuilder/ui-ux-pro-max-skill/blob/main/src/ui-ux-pro-max/data/typography.csv): discovery metadata only. No pair records or CSS imports are vendored here; verify current font endpoints and licenses independently.
- [W3C Resize Text](https://www.w3.org/WAI/WCAG22/Understanding/resize-text.html), [Reflow](https://www.w3.org/WAI/WCAG22/Understanding/reflow.html), [Text Spacing](https://www.w3.org/WAI/WCAG22/Understanding/text-spacing.html), [Contrast Minimum](https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html): criterion-specific guidance. Understanding documents explain normative criteria; identify the applicable level/scope rather than inventing requirements.
- [MDN font-display](https://developer.mozilla.org/en-US/docs/Web/CSS/@font-face/font-display) and [font-optical-sizing](https://developer.mozilla.org/en-US/docs/Web/CSS/font-optical-sizing): implementation semantics to verify against browser targets.
- [OFL FAQ](https://openfontlicense.org/ofl-faq/): primary licensing guidance; inspect the exact font license and relevant modification/redistribution clauses.

Excluded as authorities: no automatic recipe folding from a low-adoption unlicensed font-pairing repo; no universal one-neutral-family failure from taste-typography; no fixed spacing/weight/payload or serif/sans blacklist from any source. Popularity and confidently written rules are insufficient evidence.
