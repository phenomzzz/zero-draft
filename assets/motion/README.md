# Motion kit

Nine motion components, each a single self-contained HTML file. These are the behaviours used most often across two production websites (a booking site and a community site), and every timing, easing and distance is the value those sites shipped with after several rounds of tuning. Open [index.html](index.html) to browse them.

They are mechanisms to adapt, not a look. The pages use deliberately plain fixture styling and placeholder photos; restyle with the project's own tokens before judging fit, as [motion-and-media.md](../../references/motion-and-media.md#reusing-demos-and-component-libraries) describes.

## Components

| File | What it does | Base component | Tuned in |
| --- | --- | --- | --- |
| [magnetic.html](magnetic.html) | The button and its label lean toward the pointer and spring back when it leaves. Fine pointer only. | magnetic-button | both sites |
| [filter-grid.html](filter-grid.html) | Cards that stay glide to new places (Flip), cards that join scale in a beat later, a highlight slides between filters, the total counts to its new value. | flip-filter | community site |
| [side-sheet.html](side-sheet.html) | Detail panel: dim, slide, photo settle, content in groups; previous and next; scroll lock with owners; focus return; a guard so closing always finishes. | detail-drawer | community site |
| [pinned-steps.html](pinned-steps.html) | A pinned section whose steps follow scroll, with snap, 3% hysteresis, an indicator that follows scroll continuously, and a direct choice that wins over scroll. Photos wipe in from the direction of travel. | step-wipe (the wipe only) | both sites |
| [split-reveal.html](split-reveal.html) | A: characters gather from the centre of a word as you scroll. B: lines rise in their own masks once. | character-appear, text-reveal | A community, B booking |
| [opening-frame.html](opening-frame.html) | A rounded window in the headline opens to full screen on scroll while the words part; a caption rises. Then three photos drift at different rates and uncover once. | capsule-hero | booking site |
| [scroll-header.html](scroll-header.html) | The header leaves on scroll down and returns on scroll up (14 px and 40 px), stays while focused or while the pointer is near the top, and follows the colour of the band beneath it. | hide-header | booking site |
| [fullscreen-menu.html](fullscreen-menu.html) | A curtain menu built as one reversible timeline: the page dims and drifts, rows rise, rules draw, an arched preview opens. Rows fill from the edge the pointer entered. Closing replays it backwards at 1.55×. | fullscreen-slide-menu, hoverable-list | booking site |
| [panel-strip.html](panel-strip.html) | Panels widen by distance from the one in view (3.7 for the open one, then −0.15 per step); closed panels zoom, shift and dim. Viewing never chooses. | expanding-strip | booking site |

Each file opens with a `CFG` object holding its tuned values, with a comment on each one.

## Where these come from

Every base component in the table is the name of a component in the [annnimate](https://annnimate.com) catalog. Each of ours started as a recreation of one of them, written from scratch using only the catalog's public component names, categories and attribute names. No annnimate code was viewed or copied, and none of its markup, styles, images or video were used. The recreations were then adapted to two of our own websites and tuned there, so they now differ from any original in structure and detail. Parts with no base component listed (the pinning, snap, hysteresis and indicator in Pinned steps, the scroll lock in Side sheet) are our own.

annnimate is not affiliated with this repository and has not reviewed or endorsed it. The base names are here to credit where the ideas came from, not to present these as annnimate's components. For annnimate's own versions, go to annnimate.

## Use

- Open any file in a browser. No build step. A server is not required, but some browsers limit `file://` pages; any static server works.
- Add `?motion=reduce` to the URL to see the reduced-motion behaviour without changing system settings. Every component also follows `prefers-reduced-motion`.
- An internet connection is needed for GSAP (pinned on jsDelivr) and the placeholder photos (picsum.photos). Replace the photos with real assets before judging composition.

## Dependencies

- **GSAP 3.13.0**, loaded from `https://cdn.jsdelivr.net/npm/gsap@3.13.0/dist/` with `integrity` hashes. Plugins per file: Flip (filter grid), ScrollTrigger (pinned steps, split reveal, opening frame), SplitText (split reveal). The scroll header uses no library.
  - Offline: download the same files and point the `<script>` tags at them.
  - npm: `npm i gsap@3.13.0`, then import `gsap` and the plugins you need.
  - License: GSAP's standard license, free for commercial use, including the plugins: https://gsap.com/standard-license
- No fonts: the pages use system font stacks.
- No other libraries.

The files are covered by this repository's [MIT license](../../LICENSE). It does not cover GSAP or the placeholder photos.
