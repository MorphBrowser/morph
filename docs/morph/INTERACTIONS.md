# Signature interactions

Concrete specifications for Morph's continuous interactions.

**Status: all items on this page are proposals.** None is implemented yet. M1 ships only a short CSS transition of the selected-tab surface colour and radius.

The same rules apply to every interaction:

- The browser action happens immediately. Animation follows state and never gates it.
- Animate only `transform` and `opacity` where possible. Never animate layout on hot paths.
- A newer request replaces an in-flight one: the animation retargets from its current position instead of queuing.
- Under `prefers-reduced-motion: reduce`, a transition becomes an instant state change, or a fade of at most 100 ms.
- The end state must be testable without timing. Tests assert attributes and geometry, not frames.

Durations use the motion tokens planned for `morph.css`: short is about 150 ms, medium about 250 ms, long about 400 ms. Easing is `--motion-easing-emphasized` for spatial movement and `--motion-easing-standard` for colour and opacity.

## 1. Selection indicator moves between tabs

- **Trigger:** a `TabSelect` event.
- **Behaviour:** one indicator surface, layered behind the tab content in `#tabbrowser-tabs`, translates and resizes from the old tab's rect to the new tab's rect. It takes the short duration, or medium when the travel is more than five rows.
- **Edge cases:**
  - If either tab is outside the scroll viewport, or in a collapsed group, the indicator snaps instead.
  - Pinned tabs are a grid in the expanded state, so the indicator travels in two dimensions there.
  - With multiselection, only the selected tab gets the indicator. Multiselected tabs keep their outline.
- **Fallback:** the static selected surface that M1 already has.
- **Hook:** the `TabSelect` event in `tabs.mjs`. The indicator is decoration (`aria-hidden`), and the selection semantics stay on the tab.

## 2. New-tab button becomes the tab

- **Trigger:** `#vertical-tabs-newtab-button`, or <kbd>Ctrl</kbd>+<kbd>T</kbd> when vertical tabs are on.
- **Behaviour:**
  - The tab is created immediately.
  - Its background starts at the button's rect, at the button's shape, and morphs to the tab row at medium duration.
  - The label fades in during the last 40%.
  - Rows below the insertion point slide down.
- **Constraint:** when the new tab opens outside the visible list, scroll first and skip the morph.
- **Hook:** the existing `[fadein]` open path in `tabs.mjs`.

## 3. Closing tabs

- **Behaviour:**
  - The tab is removed from the tab model at once, as `removeTab` already does.
  - The row collapses its height at short duration while it fades.
  - Neighbouring rows settle into the space.
  - Consecutive closes with the pointer keep the close button under the cursor. This reuses Firefox's existing close-in-place behaviour.

## 4. Directional title transition

- **Trigger:** a back, forward or new navigation in the selected tab.
- **Behaviour:** the outgoing title slides 8 px out and the incoming title slides in. Back moves toward the start edge and forward toward the end edge, mirrored in RTL. Short duration.
- **Constraint:** only for the selected tab, and only when the title actually changes. Never during loading flicker.

## 5. Panels emerge from their anchor

- **Applies to:** the app menu, downloads, extensions, site identity and permission prompts.
- **Behaviour:** the panel scales from about 0.92 to 1 with the transform origin at its anchor, and fades in at medium duration. Closing reverses it at short duration.
- **Hook:** `panel.js` `animate` states and `panelUI-shared.css`. Mostly CSS.

## 6. Address bar expands into its results

- **Behaviour:** the urlbar breakout grows from the field into the results surface, as one continuous shape. Result rows fade in, without staggered entrances.
- **Constraint:** must not regress urlbar performance tests. The work is deferred until after the panel work.

## 7. Groups expand from their container

- **Behaviour:** the group's container surface grows to contain its children. Children are revealed inside it rather than inserted below it.
- **Hook:** `tabgroup.mjs` collapse state.

## 8. Drag and detach

- **Behaviour:** the dragged tab lifts with elevation and a slightly larger shape. Its placeholder keeps the gap. Dropping outside the window keeps the existing detach behaviour.
- **Constraint:** correctness and platform drag behaviour come first, and the work is deferred.
