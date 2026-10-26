# Evaluation scenarios

Acceptance probes for skill revisions. Runnable trigger and output evals, rubric and baseline comparison live in [evals/](../evals/README.md). A written walkthrough is not a model trial; run in an isolated fixture, keep evidence, and report which probes were executed.

| Request | Expected behavior | Failure signal |
| --- | --- | --- |
| Modernize a small legacy bike-rental site using my portfolio for UX quality; keep the live site unchanged | Inspect facts/assets, establish visitor path and a distinct direction, work in separate local source, build a complete slice | Clones portfolio identity, edits live WordPress, produces only an inert hero |
| These three planning columns feel unbalanced; the first has much more text | Diagnose real copy/grouping and try proportionate disclosure or composition | Replaces layout wholesale without examining content, invents missing facts |
| I like the current site; only this link hover jumps | Inspect transform ownership and fix the affected component/consumers | Full discovery packet, palette replacement or mandatory three variants |
| Can't edit the pick-up date until I clear everything | Define state ownership, stale-date policy and equivalent reset paths; test initial and reopened ranges | Cosmetic label changes or testing only after reset |
| Compare the selected bike with two alternatives | Distinguish selected/viewed state and action hierarchy, preserve context and native access | Browsing silently changes selection; replacement looks like confirmation |
| Research how this cinematic transition works and implement a fitting version | Inspect actual source/reference state, label inference, adapt mechanism, verify reverse/interruption and reduced motion | Copies unknown code/branding, calls a screenshot a timing measurement |
| Audit responsiveness, read-only | Inspect relevant routes/states, distinguish viewport evidence and gaps, no edits | Modifies CSS, reports 100% coverage from geometry alone |
| Wire the free CMS and MCP into local preview | Inspect current schema/plan/identity, model ownership, verify authorized editorial round-trip | Publishes/deploys unasked, embeds write token, claims gallery integration after only one fetch |
| Publish the authorized preview | Verify source/artifact boundary, exclude debug tools and secrets, check deployed environment and required protection | Only checks local build, exposes source backup or changes auth incidentally |
| Build a different business site with a technical, compact character | Respect its task and identity while retaining hierarchy, clarity and craft | Forces a previous project's palette, type pairing, page transitions or scroll behavior |

## Motion recipe probes

| Request | Expected behavior | Failure signal |
| --- | --- | --- |
| Add Lenis smooth scroll to a GSAP ScrollTrigger page | One ticker drives both, triggers update from scroll events, teardown path, no smooth scroll under reduced motion, locks during modal/loader | Two rAF loops, scrub drift, Lenis forced on reduced-motion users, scroll still moving behind a modal |
| Scrub this hero footage with scroll, frame accurate | Considers an image-sequence manifest with portrait mobile set, decode window, poster and timeout fallback; profiles memory | Seeks `currentTime` on every scroll event with a long-GOP MP4, loads all frames eagerly, blank hero on slow network |
| Make the project grid open into the case study like the reference | Inspects the reference state, keeps the clicked tile, staggers others by distance, pauses media, tests back/forward and reduced motion | Copies the reference bundle, animates off-screen tiles, breaks history or focus |
| How does this award site do its text reveal? | Runtime probe, then REA export if code is needed; labels code/runtime/inference; proposes an original implementation | Pastes minified third-party code into the project, presents minified constants as design intent, claims the stack from class names |
| Our split-text headline reveal is fine; one word clips on mobile | Targets re-split after font load / breakpoint and line wrapping | Rebuilds the motion system or adds smooth scrolling |

## Contextual de-slop probes

| Request | Expected behavior | Failure signal |
| --- | --- | --- |
| A detector flags the winery's serif/italic and warm background; de-slop it | Research the relevant wine segment, classify conventions, retain/refine suitable identity, investigate real execution | Applies font/color blacklist or calls peer prevalence a UX standard |
| Suggest a replacement font pairing for a commercial self-hosted pt-BR site, no budget stated | Research actual paired families/styles, official licenses, Portuguese glyphs and relevant handoff rights; distinguish verified free fit and conditional paid options | Unverified foundry shopping list, desktop/trial license treated as web permission, fake browser test |
| Review a guild site with class colors and Cutting Edge achievement, read-only | Research genre/task, distinguish domain language and useful color semantics from generic decoration; preserve source | Deletes meaningful terminology/colors or edits during review |
| Our approved font works; fix a clipped field | Target the rendering defect and verify it; reuse current context | Repeats industry research or replaces the type system unnecessarily |
| The foundry terms are inaccessible and the license isn't supplied | Mark rights unverified, propose an independently verified alternative or obtain necessary information | Claims commercial embedding/redistribution is allowed |

## Typography evidence probes


- A pairing guide contradicts itself about Futura/Bodoni: treat era as a heuristic, inspect the actual role/context; do not turn either claim into a rule.
- A catalog labels DM Sans non-variable: verify the intended release's official metadata/files before specifying axes or downloads.
- An approved single family works across roles: retain it; no mandatory second face or neutral-font penalty.
- A luxury display heading is lighter than body text: inspect optical hierarchy; numeric weight ordering is not a failure.
- A commercial family is installed locally but only desktop entitlement is known: mark web use conditional/unverified and do not embed trial/extracted files.
- A shortlist only has English specimen screenshots: verify pt-BR glyphs and real names before calling it suitable.
- An agent claims WCAG requires 16px body and two families maximum: correct the claim, use applicable actual criteria and rendered checks.
- Variable fonts or swap are proposed as automatic performance wins: measure intended files/loading and layout behavior; do not assert universal savings.

## Bilingual copy probes

Use [copy-evaluation.md](copy-evaluation.md) for semantic preservation, valid-copy negative controls, locale handling and action clarity. Written fixtures are not completed model or reader trials.

## Action-density probes

- A long marketing page repeats one goal: assess new decision context and sticky access; no arbitrary button quota.
- An informational section has no CTA: retain it unless a real unmet need exists.
- A comparison has many filters and item controls: distinguish task controls from competing conversion prompts.
- Different labels lead to the same outcome: analyze consolidation rather than only restyling.
- A clean screenshot hides the only essential action: reject the loss of access.
- Sticky/mobile duplication competes in one viewport: inspect actual states rather than DOM counts.
- A diagonal arrow opens a local utility while identical arrows mark external links: clarify project semantics without a universal arrow rule.
- A third-party skill asks for primary and secondary CTAs in every section: treat as questions, not required additions.
- Fewer CTAs are proposed as proven conversion uplift: require measurement and label design hypotheses.

## Constructive composition trials

[Composition acceptance probes](composition-evaluation.md) cover deletion-only failures, iconless control geometry, valid start-aligned exceptions, cross-domain structures and cleaner-but-worse regressions. Written probes are not completed behavioral trials.

## Creation and component-library probes

- Create a site from a basic brief without saying de-slop: apply contextual composition/copy/action reasoning before implementation; inspect a slice before propagation and assess the whole journey before delivery.
- Fix a minor hover: do not demand full industry research or reload every creation module.
- "Use the component library during creation": browse relevant demos freely, inspect source behavior and implement a compatible appropriate mechanism; no per-component approval ritual.
- A catalog entry has attributes but no dependencies or assets: distinguish metadata from usable code; do not invent versions or claim implementation was tested.
- Library is missing: report optional resource unavailable and continue useful work with other references.
- A public preview excludes paid code redistribution: use public behavior for original implementation or verify actual entitlement; do not copy restricted source or stop all design work.
- A component looks impressive but conflicts with task or touch/reduced-motion behavior: adapt or reject it rather than force library usage.

## Experimental-library probes

- Maximal exploration reports ten reveals plus a drawer: classify actual micro/component/structural use and identify whether requested experiential breadth was met.
- Candidate needs touch/semantic adaptation: investigate or try a strong candidate rather than treating remediable work as an automatic veto.
- Required grid stays fixed: surrounding concepts must still differ materially in spatial model/journey, not just palette or hero.
- Main output is conservative while ambitious studies live only in workbench: reassess against explicit experiment goals.
- Fresh build excludes two named versions: all workers inherit exclusions, no broad workspace/history inspection, no access-based novelty guarantee.
- Ordinary client creation: do not activate experimental mode or relax normal delivery priorities implicitly.
- Three concepts share a condensed sans display, dark ground and period-slogan headlines but differ in navigation: fails the divergence matrix (typography and value must differ); render replacement tiles.
- A concept uses four house defaults with "fits the genre" as the reason: require a subject/asset reason or replace defaults.
- A shipped transition keeps a source's name but loses its pin/scrub/scale: reclassify by what shipped.
- A desktop-only brief rejects a mechanism for lacking a touch default: invalid rejection; test it on desktop.
- Concepts are delegated to a lighter worker and the lead only picks among them: the lead must generate and select the direction.
- An agent copies a demo library's base stylesheet tokens into the project: treat as placeholder leakage and choose project tokens.

## Component-library probes

- Missing catalog files are reported and skipped; library files stay unchanged.
- A timeout-based smoke pass does not replace behavior and integration checks.

The divergence trial from the 2026-10-16 audit is now [evals/README.md](../evals/README.md#b-output-evals-divergence-trial-lite).
