# Live exploration, states and stress workbench

## Distinct uses

**Variants** compare solutions to one brief. Name the main axis: composition, density, emphasis, interaction, motion or visual world (direction tiles). Keep the set small, use real content, explain tradeoffs and recommend from context.

**States** expose reachable branches of the real component: unselected, partial, complete, loading, empty, unavailable, failure and recovery where applicable. Import the actual component and inject fixtures at its data boundary. Do not rebuild a lookalike or invent unreachable branches to make a demo pass.

**Stress scenarios** use plausible hostile content and environments: long names, missing optional images, many items, text enlargement, narrow containers and short screens. Select axes the component actually accepts.

Static previews do not verify transitions. Exercise live sequences, reset, re-entry and persistence.

## Choose a light harness

An existing app can use an isolated dev route with real providers, fonts, tokens and page context. Vanilla sites can use local pages or guarded query parameters. Do not ship debug wiring by default or expose private data through it.

The supplied `assets/workbench/` is an original dependency-free selector around trusted local routes. It does not build variants, inject fixtures or emulate hardware. Copy it with `start_project.py --workbench`, replace the demo routes in `config.js` with actual ones and serve the packet through an approved local server on an unused port, for example `python -m http.server 8141 --bind 127.0.0.1 --directory <packet-folder>` (in Claude Code, a launch configuration; see `claude-code-runtime.md`). Do not kill someone else's server. The selector groups routes, sets dimensions and links directly, rendering one full-size preview at a time; it never scales a frame to fake fit.

## Trust and limitations

Only relative and loopback HTTP(S) URLs are accepted; credentials and unsafe protocols are rejected; labels use text nodes. The frame allows scripts and same-origin capability so apps work, so it is not a security boundary against hostile same-origin pages: use trusted project pages only. Sandbox defaults block form submissions, popups, downloads and top navigation, but apps can still make network requests; isolate external effects with fixtures and test real submission and navigation directly under appropriate authorization.

CSP, authentication and origin/storage restrictions can prevent framing; use the direct link rather than weaken production headers. A frame load event does not prove the expected fixture rendered; inspect it. Device keyboards, browser chrome, touch, performance and some viewport behaviors need direct tests; container screenshots do not certify responsiveness.

## Efficient comparison

1. State the uncertainty, scope and retained decisions. Build only alternatives that answer it.
2. Use equal-quality real copy/assets and full-size context.
3. Observe relevant sizes, controls and neighboring content. Explain tradeoffs.
4. Reverse or change selection mid-animation; test close/reopen and keyboard use.
5. Promote the winner and log the reason. Remove obsolete prototype wiring when appropriate, preserving requested artifacts. Cleanup does not authorize unrelated deletion, commits or deployment.

The bundled demo tests selector mechanics; it is neither a website starter nor an approved visual direction. For explicit ambitious library experiments see [experimental-library.md](experimental-library.md): the selected concept belongs in the main output, not the workbench.
