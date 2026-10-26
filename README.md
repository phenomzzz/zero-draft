# zero-draft

A zero draft is the rough pass before a first draft. Coding models tend to hand in the most probable website; this skill treats that as the zero draft, not the result.

zero-draft is an agent skill for designing, building, fixing and auditing marketing and client websites: landing pages, homepages, portfolios and institutional sites. It pushes the agent to derive each site's direction from the business itself instead of falling back on the look that coding models produce by default.

It works with Claude Code and Codex. The method references are tool-neutral, so other agents that can read a skill folder can use them too.

## What it covers

- **Direction from the subject.** Type, palette, imagery, grid and motion physics are traced to the business's own material, audience and content. A "house signature" check catches the dark-ground, condensed-display, accent-word look that models converge on, and the light-greige look they switch to when it is banned.
- **Representative-slice workflow.** One complete visitor task is built and rendered before the design spreads across the site, with critique gates at the slice and at whole-page synthesis.
- **Contextual de-slop.** Visual, copy (English and Brazilian Portuguese) and CTA-density reviews that research the sector first and treat detector output as leads, not bans.
- **Interaction contracts.** State models for calendars, comparisons, drawers and forms, with the transition sequences to test.
- **Motion recipes.** GSAP/ScrollTrigger, Lenis, image sequences, video tiers, route transitions and reduced-motion handling, taken from mechanisms observed on production sites and written as original sketches.
- **Motion kit.** Nine standalone components (magnetic button, filter grid, side sheet, pinned steps, split reveal, opening frame, scroll header, fullscreen menu, panel strip) with the values they shipped with in two production sites.
- **Verification.** An evidence ladder, a responsive matrix and read-only browser helpers for audits and for probing reference sites.
- **Evals.** Trigger evals, a divergence trial and a grading rubric for testing revisions of the skill itself.

## Install

Clone the repository into your skills folder. The folder name must stay `zero-draft`.

Claude Code:

```bash
git clone https://github.com/phenomzzz/zero-draft ~/.claude/skills/zero-draft
```

Codex:

```bash
git clone https://github.com/phenomzzz/zero-draft ~/.codex/skills/zero-draft
```

Claude Code loads it from the description or from `/zero-draft`. Codex uses `$zero-draft`.

## Layout

| Path | Contents |
| --- | --- |
| `SKILL.md` | Entry point: modes, routing table and quality contract |
| `references/` | Method references, loaded only when a task needs them |
| `references/licenses/` | Notices for adapted upstream material |
| `assets/` | Project-packet templates, a local preview workbench, the [motion kit](assets/motion/README.md), a `launch.json` example |
| `scripts/` | Packet scaffolder, package checker, browser audit and reference probe helpers, tests |
| `evals/` | Trigger evals, divergence trial, rubric, capture and probe tools |

## Maintenance

From the skill folder:

```bash
python scripts/check_package.py .
```

```bash
python -B -m unittest discover -s scripts/tests
```

The browser-helper tests need Node. The eval runner and capture script were written on Windows. See `evals/README.md`.

## Status

The skill reflects one practitioner's working method. Its rules about divergence and house style are hypotheses backed by small trials, not validated results; `evals/` exists to test them. Model names and browser versions in the references are as of October 2026.

## Credits and license

The workflow, scripts and syntheses are original. Some concepts are adapted from MIT and Apache-2.0 skill collections; [references/sources-and-reuse.md](references/sources-and-reuse.md) lists each source with pinned commits, and the notices are in [references/licenses/](references/licenses/). Keep those notices when you redistribute substantial derived material. The motion kit's components began as from-scratch recreations of components in the annnimate catalog; [assets/motion/README.md](assets/motion/README.md) credits each one.

Released under the [MIT License](LICENSE). The license covers this repository only, not any font, website, asset or library that it mentions.
