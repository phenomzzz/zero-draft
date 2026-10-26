# Grading rubric

Grade blind: no arm labels, no skill text. Score each run, then the set. Cite the shot ID or file:line for every point. Output `grades.json`: one object per run plus a `set` object.

## House-signature checklist (per run, 0–6)

Count one point for each present in the slice:

1. Near-black ground (body/main background relative luminance < 0.03) with exactly one saturated accent hue.
2. Condensed or compressed sans display face for h1/h2 (Barlow Condensed, Teko, Oswald, Bebas, Anton, Impact, League Gothic, Big Shoulders or similar narrow width).
3. Two- or three-line declarative headline ending in a period, with one word or line in the accent color.
4. Tiny tracked uppercase or monospace micro-labels/eyebrows (≤13px, letter-spacing > 0.05em) above headings.
5. Fade-up entrance as primary motion: translateY 15–60px plus opacity 0→1, single ease-out (check CSS/JS).
6. Giant wordmark (≥ 200px at 1440) in hero or footer.

A point is excused only if `notes.md` gives a subject/asset reason (for example "renders need a dark stage"); "fits the genre" is not a reason. Report raw and excused counts; net = raw − excused.

- **Item 1 with mixed grounds:** judge the ground the visitor sees first. A near-black hero over a light body counts when the hero fills the 1440×900 fold; note the body luminance alongside.
- **Near misses:** a value just outside a threshold does not score, but record it with the measured value (for example a 180px wordmark, a 14px fade, 0.04em tracking) so trials can be compared.

## Per-run criteria (0–2 each)

| Criterion | 2 | 1 | 0 |
| --- | --- | --- | --- |
| Content fidelity | All facts present and unchanged; gaps marked | Minor omission | Invented prices, reviews, dates, capabilities, or changed conditions |
| Main task | Reachable from the first screen; action label predicts outcome | Reachable but buried or ambiguous | Missing or misleading |
| Responsive (390) | No horizontal scroll, no clipped text, targets usable | One local defect | Overflow, hidden essential content or broken layout |
| Console/keyboard | No errors; interaction works by keyboard with visible focus | One minor issue | Errors or keyboard-inoperable interaction |
| Motion appropriateness | Motion has a stated role, respects reduced motion, nothing blocks reading | Decorative but harmless | Content hidden until animation, no reduced-motion path, jank visible in source |
| Copy tells | Specific, domain-native wording | 1–2 tells | Slogan stacks, "transforme sua jornada", empty triads, fake urgency |

## Set criteria

- **Visual-world divergence:** code each run on six rows (type genre/width, value/palette, image treatment, grid model, navigation model, motion physics). Gap markers (dashed chips, brackets, "a confirmar" tags) come from the builder prompt, so leave them out of the coding. Report how many pairs differ on ≥4 rows including type and value, across all pairs and, explicitly, within each arm across briefs (the cross-brief pairs inside one arm show whether that arm has a house look).
- **Same-author sort:** sort the 1440 fold shots into groups that look like one author. Report groups and which arm each falls in. No originality score.
- **Trial fingerprint:** per arm, list the display face (family and width), ground, navigation treatment and primary button across its briefs. Two or more briefs sharing three of the four is a fingerprint; report it even when the six signature items score 0, because avoiding those items does not prevent a new shared look.
- **Brief fit:** for each run, one sentence on whether the direction comes from the subject (would it still work with another brief swapped in?).

## Summary

Per arm: mean signature count (raw, excused and net), divergence pairs (all and within-arm cross-brief), trial fingerprint, sum of per-run scores, defect list. State evidence type (shot, source, functional) for each claim and list what was not checked.
