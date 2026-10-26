# Interaction contracts and state verification

## Define behavior before decorating it

For a consequential interactive component, record: visitor goal, current value, editing/draft value, viewed item, state owner, entry/exit conditions, actions, resulting states, recovery, persistence and accessibility. Use the interaction template when this is not already clear in code/specs. Do not document every trivial button.

Avoid two independent owners for the same state. Scroll position may suggest a step; explicit user tab selection should not immediately be overwritten by a scroll observer. Define which wins and when automatic following resumes. Render derived labels from the canonical state, not stale DOM text.

## Viewing, selecting and continuing

In a comparison flow, distinguish `selectedId` from `viewedId`. Browsing a tab changes the viewed item; it does not silently replace the selection. A replace action names its destination. Continuing uses the actual selected item and advances/closes predictably.

Place actions near the information they affect. Give primary emphasis to the principal next step in that context; replacement is often secondary when continuing an existing choice is the main goal. Do not turn that example into a universal left/right or filled/outlined rule. Before selection, choosing may itself be the main action.

Selection cards can wrap native radios with a strong selected border/fill, using `:checked` and a visible keyboard focus treatment. Radio groups retain arrow-key behavior, programmatic labels and a single selected value. Do not nest a details button inside another button/label in a way that toggles selection accidentally. Give details its own hit area and name. Without a checkmark label, verify that border/shape, placement and semantics carry selection without relying only on hue.

## Date-range contract

Calendar policy is project-specific. Record the local date zone, earliest selectable start date, minimum duration, unavailable dates (only when backed by data), and behavior when editing a completed range.

Recommended explicit model for a date-range request (a rental, a multi-day pass): `draftStart`, `draftEnd`, `activeEndpoint`, `visibleMonth`, `appliedRange`. Local calendar dates are not UTC instants: `new Date('2026-10-16')` parses as UTC midnight and shifts west of Greenwich. Use `Temporal.PlainDate` where available or construct dates from year/month/day parts. A native `<input type="date">` suits a single known date; memorable dates (birth) work better as separate text fields. A custom range grid follows the APG date-picker dialog pattern and still accepts typed dates.

Forms: keep native constraints (`required`, `type`, `autocomplete`, `inputmode`). Style errors with `:user-invalid`, not `:invalid`, so untouched fields are not red. Validate on blur or submit, not per keystroke; clear an error once fixed. Set `aria-invalid` and link the message with `aria-describedby`; on a failed submit, move focus to an error summary that links to fields. Do not use a disabled submit as the only feedback. Announce async results with `role="status"`.

Example transition table, to adapt rather than blindly impose:

| Event | State effect | Feedback |
| --- | --- | --- |
| Open with a valid saved range | Copy applied range to draft; choose documented initial edit mode | Both endpoint fields readable; range and today distinct |
| Open with saved dates now in the past | Apply documented stale-data recovery; do not disable the only reset path | Explain the invalid dates and expose an editable start date |
| Activate the start field | Set active endpoint; retain value unless the agreed design explicitly clears it | Persistent editing indicator and useful instruction |
| Choose start | Update start; retain end only if valid; otherwise clear it; move to end if that is the chosen model | Updated date and clear next action |
| Choose end after start | Update end | Day count and apply action |
| Choose end on/before start | Either restart range or explain constraint according to contract | Recoverable state; start remains editable |
| Click a selected day again | Clear/re-edit only if chosen in this product's contract | Same state update path as the equivalent clear action |
| Clear start | Clear dependent end as needed; set start mode | Calendar and summary update together |
| Clear end | Keep start, set end mode | No stale end-date chip remains |
| Apply | Commit valid draft to shared state | Summary and all entry points agree |
| Cancel/Escape | Discard draft unless explicitly designed otherwise | Return focus; applied range unchanged |

Clicking a field commonly activates editing; clicking a selected day to clear is a product choice, not a universal standard. Make the chosen behavior visible and consistent. Fix all entry paths: a bug that disappears only after a reset is still a bug.

Calendar labels and day targets must fit the actual cell width. Do not solve legibility by adding labels that clip inside seven columns. A single-month small-screen layout may be better than squeezing two. Today, range interior, active endpoint, start and end need distinguishable meaning. Hover preview must not look like committed selection. Announce useful changes without reading the whole grid on each arrow key.

## Overlay behavior

Pick the primitive by behavior:

- Modal (dialog, modal drawer, lightbox): `<dialog>` opened with `showModal()`. It provides top layer, background inertness, Escape via the `cancel` event and focus return to the opener on close. Still yours: initial focus (`autofocus` on the right element, or the heading for long content), scroll lock (`overflow: hidden` on the root with `scrollbar-gutter: stable`; `overscroll-behavior: contain` inside), stopping smooth scrolling (`lenis.stop()`), and manual focus return when the opener was re-rendered or removed. `closedby` and `requestClose()` may help where supported.
- Non-modal (menu, toggletip, picker, listbox): the `popover` attribute with `popovertarget`, or `command`/`commandfor` invokers where supported. Popovers give light dismiss and top layer but no focus trap or inertness; never use one for content that must block the page. Position with CSS anchor positioning only with a fallback.
- Custom overlay over a canvas/WebGL stage: set `inert` on the background subtree instead of hand-set `aria-hidden`/`tabindex`, and restore on every exit route.

Check current support on MDN/Baseline before relying on newer features. Nested gallery over drawer needs a defined stack: closing the gallery restores the drawer, closing the drawer restores its trigger.

Reserve viewport-safe dimensions and allow internal scrolling when content needs it. Keep close and primary action reachable with short height, browser UI, text enlargement and on-screen keyboard. Do not interpret a desktop request for a fitted panel as permission to crop mobile content. Preserve the underlying page position; release locks/listeners on every exit route.

## Minimum transition exercises

Exercise relevant sequences rather than every theoretical combination:

- Initial entry, empty/partial/complete values, cancel, apply and reopen.
- Rapid changes, reverse action, interrupted animation and Escape.
- Reload and stale persisted state, especially crossing the local date boundary.
- Pointer and keyboard paths; touch has no dependency on hover.
- Two entry points modifying the same shared choice.
- Loading/failure/retry when external data is involved, without accidental repeated submission.

Use deterministic clocks and fixture data for meaningful automated tests when the component warrants them. A state workbench accelerates inspection; it does not replace the sequence tests.

## Action hierarchy across the journey

For competing prompts or directional icons, use [action-density.md](action-density.md). Separate conversion, navigation, utilities and essential controls, and preserve semantics/access when consolidating.
