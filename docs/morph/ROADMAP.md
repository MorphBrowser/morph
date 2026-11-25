# Roadmap

Status labels: **Done**, **In progress**, **Next**, **Planned** (direction is confirmed but not scheduled), and **Proposal** (still open).

## M0: Synchronised foundation (Done)

- Added the `upstream` remote (`mozilla-firefox/firefox`, default branch `main`) and merged it into Morph through a dedicated sync branch, without rewriting history.
- Recorded the Firefox architecture in `FIREFOX_BASELINE.md`.

## M1: Sidebar visual foundation (Done)

- `browser.morph.enabled` pref (default on) gates all Morph styling. It doubles as a kill switch when diagnosing upstream merges.
- `sidebar.verticalTabs` now defaults to `true`.
- `browser/themes/shared/morph/morph.css` adds the first Morph tokens: shape, state layer, a short motion duration, and a secondary-container surface.
- Selected tabs use a fully rounded, flat secondary-container surface. Resting tabs use the medium corner, and hover and pressed use M3 state layers. The selected surface has a short colour and shape transition that reduced motion removes.
- Normal density raises the vertical tab row to 36 px.
- Under forced colours, high contrast and lightweight themes, Morph changes only geometry and keeps the upstream colours.
- Tests: `browser/components/sidebar/tests/browser/browser_morph_sidebar.js`.

Deferred from M1:

- **A third ("expanded") sidebar state.** Firefox has only collapsed and expanded, plus user-resizable width. In M1, Morph's compact state maps to Firefox's collapsed launcher and Morph's standard state to its expanded launcher. A third state needs behavioural changes in `SidebarState.sys.mjs` and should wait until there is content to show in it, such as group metadata or Spaces.
- **Dynamic and user-selected palettes.** The surface derives from the existing accent colour for now.

## M2: Selection continuity (Next)

1. A selection indicator that moves between tabs (`INTERACTIONS.md` §1).
2. Shared Morph motion tokens for medium and long durations, and a reduced-motion contract in `morph.css`.
3. Tests that assert indicator geometry after `TabSelect` with motion reduced.

## M3: Tab lifecycle interactions (Planned)

The new-tab morph (§2), close and reflow (§3), and directional titles (§4).

## M4: Shared primitives (Planned)

Extract a shape, state-layer and transition helper once M2 and M3 provide two real consumers. Decide whether Morph tokens move into the `*.tokens.json` pipeline. Moving them would be cleaner, but `buildtokens` re-derives Nova from Figma, which raises merge cost.

## M5: Surfaces (Planned)

Panels and menus emerging from their anchors (§5), then downloads and permission prompts, then the address-bar expansion (§6).

## M6: Groups, pinned tabs and drag (Planned)

The group container surface (§7), denser pinned presentation, and drag lift (§8).

## M7: Accessibility, performance and polish (Planned)

Contrast audit across palettes, profile checks of tab switching and opening, RTL review, and Windows and macOS review.

## M8: Branding and release (Planned)

Morph branding under `browser/branding/`, update and telemetry endpoints, the release process and the website.

## Proposals

- Spaces / workspaces.
- Material Symbols icon adoption.
- An optional horizontal-tabs presentation.
