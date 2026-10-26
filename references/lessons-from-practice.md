# Lessons from practice: portable checks

Historical examples from one past website build with booking requests (October 2026). This is a learning reference, not deployment or client-policy documentation; a project's own repository holds its current infrastructure.

| Observed iteration/failure | Portable lesson | Check in a new project |
| --- | --- | --- |
| Initial portfolio reference became a broad aesthetic discussion | Separate UX quality reference from visual identity | Explicitly state which attributes transfer |
| Large IA change disturbed completed sections and footer | Establish architecture early; treat restructuring as a shared regression risk | Route map, redirects, shared layout consumers |
| Three-column content imbalance triggered unsuitable layout replacements | Diagnose content weight before replacing structure | Real copy, scannable facts, secondary disclosure |
| Nav flicker/theme changes/width shifts recurred | One navigation state owner and stable geometry | Hero boundary, direction threshold, menu, route entry/back/reload |
| Window page transitions felt mechanical or flashed | Coordinate lifecycle, framing and entrance; test rendered timing | Direct visit vs internal transition, interruption, content readiness |
| Fonts swapped visibly and shifted content | Verify loaded faces and fallback metrics early | Cold/warm load, failure fallback, actual weight/style |
| Full-height cards hid photos or details and jumped on hover | Design stable reading anchors and coverage through expansion | Hover/focus/touch alternative, actual viewport height |
| Timeline stem and icon moved on separate schedules | Shared progress or deliberate overlap for one represented event | Forward/reverse scroll, rapid jumps, reduced motion |
| Image reveals exposed blank strips | Image/frame geometry must hold for the full animation range | Reverse scroll and mid-progress capture |
| POI markers/routes disagreed and route drawing stuttered | Correct data and renderer strategy independently | Coordinate consistency, provenance, measured frame behavior |
| Generic low-resolution or wrong-location photos hurt composition | Select and inspect relevant originals before judging layout | Crop, focal point, resolution and contextual truth |
| Calendar received repeated cosmetic fixes but still soft-locked | Define transitions, stale-date policy and recovery first | Partial/complete/edit/clear/cancel/apply/reopen; deterministic date boundary |
| Browsing another option was mistaken for confirming the current selection | Viewing, replacing and continuing require distinct state/action hierarchy | Label predicts result before click; summary uses selected value |
| Radio checkmark/selected copy felt visually wrong | A native semantic foundation permits a quieter visual selection treatment | Non-color indicator and keyboard semantics |
| CMS photos rendered in one surface but failed in the gallery | Integration is all consumers, not one successful fetch | Asset dimensions, crop and actual gallery opening |
| Final responsive sweep found overlay and short-screen defects | Verify throughout, especially height and nested overlays | Width/height pairs, keyboard, scroll lock, action reachability |
| Repeated preview notices cluttered the composition | Keep implementation/status detail out of customer UI unless useful | Appropriate place for operational uncertainty and QA notes |
| New design replaced a live CMS-backed site in one step | Wire existing CMS content read-only before proposing schema changes; redirect retired routes | Old-route redirect map, code-owned vs CMS-owned text list, backup and rollback recorded before cutover |
| Protected preview could not be checked by the agent | Gate verification belongs to the user; a local gate-free stand-in is a different environment | Label which checks ran locally and which the user confirmed behind the gate |

Do not mechanically port a past project's palette, type pairing, horizontal story, scroll behavior, custom calendar or video workaround. Evaluate their value for each new audience and technical context. Do not carry client identifiers, private media or old credentials into a reusable starter.
