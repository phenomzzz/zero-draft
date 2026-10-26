# Evals

Lean, reproducible checks for skill revisions, run by a Claude Code agent. Store run output outside the package, for example `../zero-draft-evals/<YYYY-MM-DD>-<label>/`. Record skill snapshot (copy or hash of SKILL.md), model, effort, date and turn budget. Running these requires the user's request; this file grants no authorization.

## A. Trigger evals

[trigger-evals.json](trigger-evals.json): 21 should-trigger, 16 should-not-trigger prompts (EN/pt-BR, near-misses noted). Format matches skill-creator (`query`, `should_trigger`; `note` is ignored).

- Runner: `python -I run_trigger_evals.py trigger-evals.json <out-dir> --workers 4` ([run_trigger_evals.py](run_trigger_evals.py); Windows-safe, no `select()`). Per prompt, from a fresh temp folder, it runs `claude -p "<query>" --output-format stream-json --verbose --no-session-persistence --strict-mcp-config --disallowedTools Bash PowerShell Write Edit Agent`, and stops at the first `Skill` call, after 3 tool calls or at the result event. ToolSearch calls (loading deferred tool schemas) do not count toward the 3. Triggered = a `Skill` call whose `skill` field is `zero-draft` (not another skill whose args mention it), or a `Read` of its SKILL.md.
- Log in fresh first (`claude`, then `/login`): a desktop or nested session's auth is not inherited, and an expired login fails every prompt. The runner strips desktop-app variables (`CLAUDECODE`, `CLAUDE_CODE_*`, `CLAUDE_EFFORT`, `MCP_*` and similar). Record the CLI default model (each result has `model`); it may differ from the model that builds sites. Pass `--model` to pin one.
- Prompts about an existing site find nothing in an empty folder, which can suppress loading. `--stub-for i,j` seeds those prompts' folders with a minimal static site; report stubbed and unstubbed results separately rather than mixing them.
- Run 1x for a check, 3x per prompt when tuning the description.
- skill-creator's `run_loop.py` uses `select()` on pipes and fails on native Windows; run it under WSL or use this runner. Its temp command competes with the installed `~/.claude/skills/zero-draft` symlink, so count either name as a trigger.
- Pass: ≥90% should-trigger fire, ≤10% near-misses fire. Report misses by `note`, not just totals. Tune the frontmatter `description` only; do not overfit to these exact strings: fix a stratified 40% holdout before drafting a change, tune on the rest, report the holdout once. A description drafted from all the misses has no clean holdout among them.

## B. Output evals: divergence trial (lite)

Goal: do independent builds share the house signature? Six Agent subagents in parallel, one per brief, then one blind grader.

1. **Setup.** Run root as above; one folder per run (`b1-skill`, `b1-base`, …). Optional: `git init` the run root and use `isolation: "worktree"`. Serve once: `python -m http.server 8790 --directory <run-root>`.
2. **Builder prompt** (identical except brief and folder): "Build one representative slice of this website as static HTML/CSS/JS in `<folder>` (no npm install; pinned CDN libraries allowed). Slice = first screen, the section carrying the main task, one working interaction, footer. Use only the facts given; mark gaps. Do not read other folders in the workspace. Finish with `notes.md`: direction in 5 lines, fonts, palette, motion." With-skill arm adds "Use the zero-draft skill." Baseline arm adds "Do not invoke any skill."
   - Add an identical environment block to every builder: server URL, do not edit launch.json or start servers, own browser-pane tab only, files only in its folder, site files and `notes.md` never mention tools or process (working files in `_work/`). Any headless browser a builder starts uses `--remote-debugging-port=0` and its own `--user-data-dir`: a fixed port lets one builder attach to another's browser.
   - Run at most about six builders at once, or tell them to verify headless-only: the browser pane has a tab limit.
   - "Mark gaps" makes dashed gap chips appear in nearly every build regardless of arm (11 of 12 in the 2026-10-16 trial); the rubric excludes gap markers from divergence coding.
3. **Capture** (orchestrator, not builders): `node capture.mjs <run-root> <run> …` ([capture.mjs](capture.mjs), env `TRIAL_BASE` for the server URL). It drives headless Edge over CDP with a device-metrics override at 1440×900 and 390×844 (mobile emulation), scrolls through, takes a fold plus full-page captures (capped at 7000px), and writes [signature_probe.js](signature_probe.js) measurements to `probe/<run>.json`. Do not use `msedge --window-size`: on Windows it clamps to about 492 CSS px, so a "390" shot is a cropped 492 layout, and a 2600px-tall window inflates `100vh` heroes. Browser pane check at 390 for overflow and console errors. Rename shots to random IDs before grading.
4. **Grade.** A fresh subagent receives only shots, source, facts sheets and probe output (as leads, not verdicts), no arm labels, and scores with [rubric.md](rubric.md). Save `grades.json`. The user then does a blind paired preference on 2–3 pairs.

Briefs (facts are the full content; no photos supplied; image slots are labeled placeholders or original SVG/CSS):

| # | Brief | Lang | Main task | Facts |
| --- | --- | --- | --- | --- |
| b1 | Barro, two-person ceramics studio, Curitiba | pt-BR | Book a Saturday wheel class | Classes Sat 9h/14h, 6 seats, R$ 180, clay+firing included, pickup 3 weeks later, 12 product lines, Instagram @barro.estudio |
| b2 | Municipal water-quality report, Rio Claro do Sul (fictional) | pt-BR | Find my neighborhood's status | 8 neighborhoods, 12 monthly readings (chlorine 0.2–2.0 mg/L, turbidity ≤5 NTU), 1 neighborhood out of range in March, hotline 0800 |
| b3 | Ferrite, indie synth plugin launch | EN | Download the free trial | VST3/AU/CLAP, 14-day trial, USD 79, 3 oscillators, 240 presets, one developer, Win/macOS |
| b4 | Vanguarda (fictional), WoW raiding guild recruiting | pt-BR | Apply to a raid team | Mythic progression, Wed/Sun 20h–23h BRT, needs 2 healers + 1 tank, Discord link, 20-member roster grid with class filter |
| b5 | Lima & Sato, 3-partner accounting office, Joinville | pt-BR | Request a consultation | Founded 2009, MEI/Simples/Lucro Presumido, 140 clients, office hours 8h–18h, WhatsApp |
| b6 | Lantern Street Theatre (fictional), 120-seat community theatre | EN | Find a performance and buy tickets | 4 productions this season, Thu–Sun 20h, tickets USD 18–32, wheelchair seating in row A, latecomers seated at the interval, box office opens 1 h before curtain |

Minimum run: b1–b4, one build per arm (8 builds). Full: all six, two per arm (24).

## C. With-skill vs baseline

Same model, effort, tools, prompt and turn budget; only the skill line differs. Report per arm: house-signature count, divergence, fidelity and defect scores, corrective turns, tokens/time when available. Eight to 24 runs show direction, not statistical superiority. Model graders share builder bias: the user's blind preference decides ties. A skill version that adds tokens without lowering signature count or defects is not an improvement.
