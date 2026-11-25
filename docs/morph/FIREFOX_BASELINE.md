# Firefox baseline

What Firefox already provides for the systems Morph touches, where it lives, and how Morph extends it. Recorded against the upstream sync of 2026-11-25 (`mozilla-firefox/firefox` `main` at `4f6c8bb9a8`).

Source locations change upstream. Re-check this page after each sync.

## Vertical tabs and sidebar

Firefox ships a complete vertical-tabs implementation. Morph reuses it rather than building a parallel one.

| Concern | Location | Notes |
|---|---|---|
| Orientation switch | `sidebar.verticalTabs` pref; `SidebarController.toggleTabstrip()` in `browser/components/sidebar/browser-sidebar.js` | Moves the existing `#tabbrowser-tabs` element into `#vertical-tabs` and sets `orient="vertical"` on it and its scrollbox. The same tab elements serve both orientations. |
| Launcher (the rail) | `browser/components/sidebar/sidebar-main.mjs`, `sidebar-main.css` | Lit-based `<sidebar-main>`; tools, extensions and the tab strip slot. |
| Collapsed / expanded state | `SidebarState.sys.mjs` (`VISIBILITY_MODES`), `sidebar.visibility`, `sidebar.expandOnHover` | `always-show` and `expand-on-hover` are the vertical modes. Expanded state is reflected as `[expanded]` on `#tabbrowser-tabs`, and `[sidebar-expand-on-hover]` on the root. |
| Launcher sizing | `browser/themes/shared/sidebar.css` | `--sidebar-expanded-launcher-width`, `--sidebar-launcher-button-*`. The width is user-resizable and stored in `SidebarState`. |
| Markup | `browser/base/content/browser-box.inc.xhtml` (`#vertical-tabs`, `#sidebar-box`), `navigator-toolbox.inc.xhtml` (`#tabbrowser-tabs`, `#vertical-tabs-newtab-button`) | |
| Tests | `browser/components/sidebar/tests/browser/`, `tests/marionette/test_initialize_vertical_tabs.py` | |

## Tabs

| Concern | Location |
|---|---|
| Tab model and lifecycle | `browser/components/tabbrowser/Tabbrowser.sys.mjs`: `addTab`, `removeTab`, `_endRemoveTab`, `pinTab`, `unpinTab`, `addTabGroup`, `moveTabTo`, the `selectedTab` accessor |
| Tab strip element | `content/tabs.mjs` (`<tabbrowser-tabs>`, `MozTabbrowserTabs`) |
| Tab element | `content/tab.mjs` (`<tabbrowser-tab>`); `.tab-stack > .tab-background` and `.tab-content` |
| Groups | `content/tabgroup.mjs` (`<tab-group>`), `tabgroups/`, `tabgroup-menu.js` |
| Split view | `content/tabsplitview.mjs`, `splitview/` |
| Drag and drop | `content/drag-and-drop.mjs`, with hooks in `tabs.mjs` |
| Open and close animation | `[fadein]` attribute toggled in `tabs.mjs`; `addTab` takes an option to skip the animation; CSS transitions in `tabs.css` |
| Tests | `browser/components/tabbrowser/test/browser/` (`tabs/`, `dragdrop/`, `tabgroups/`) |

## Styling and tokens

- Chrome stylesheets are pulled in through `browser/themes/shared/browser-shared.css` and packaged by `browser/themes/shared/jar.inc.mn`.
- Tab styling is in `browser/themes/shared/tabbrowser/tabs.css` (about 3,500 lines; actively changed upstream).
- Design tokens come from `toolkit/themes/shared/design-system`. Component tokens such as `tab.tokens.css` are **generated** from `*.tokens.json` by `./mach buildtokens`, which also re-derives Nova values from a Figma export. Never edit generated sheets by hand.
- Token layers cascade from `tokens-foundation` up to `tokens-forced-colors-nova`. An unlayered declaration outranks all of them, including the accessibility layers.
- **Nova** (`browser.nova.enabled`, on by default) is upstream's own visual refresh. It is gated with `@media -moz-pref("browser.nova.enabled")` and is the area most likely to conflict with Morph.
- Existing motion tokens: `--motion-easing-emphasized`, `--motion-easing-standard`. Reduced motion is available as `prefers-reduced-motion` in CSS and `gReduceMotion` in `browser/base/content/browser.js`.

## Toolbar, address bar, menus and panels

| Surface | Location |
|---|---|
| Toolbars and customisation | `browser/components/customizableui/` |
| Address bar | `browser/components/urlbar/` (input, view, providers); styles in `browser/themes/shared/urlbar*.css` and `urlbar/` |
| Panel and popup primitive | `toolkit/content/widgets/panel.js` (`animate="open"` / `"cancel"`) |
| Multi-view panels (app menu, extensions) | `browser/components/customizableui/PanelMultiView.sys.mjs`; styles in `customizableui/panelUI-shared.css` (`panelview[drill-role]` slide transitions) |
| Downloads indicator and panel | `browser/components/downloads/`, `browser/themes/shared/downloads/` |
| Permission and doorhanger prompts | `PopupNotifications` (`toolkit/modules/PopupNotifications.sys.mjs`) |

## Morph's assessment

| Category | Systems |
|---|---|
| Retain unchanged | Tab model and lifecycle, session restore, groups data model, split view, drag-and-drop logic, sidebar state persistence, address-bar providers, `PopupNotifications` logic |
| Visual modification | Tab geometry and surfaces, launcher sizing, selection styling, group containers, panels and menu chrome |
| Behavioural modification | Default orientation (vertical); later, opening and closing choreography and the selection-indicator movement |
| New Morph primitives | Shape, state-layer and motion tokens; a shared selection indicator; a shared-element transition helper (control to surface) |

### Safe places for shared-element transitions

- **Selection indicator.** A single indicator element positioned with `transform` over `#tabbrowser-tabs` avoids changing tab layout. It must follow scroll, reorder, pinning and groups.
- **New tab.** `addTab` already distinguishes animated from non-animated opens through `[fadein]`. A Morph transition can start from the rect of `#vertical-tabs-newtab-button`, without delaying tab creation.
- **Panels.** `panel.js` already exposes `animate` states, so emergence from the anchor can be styled there without new logic.
- **Unsafe without more work:** tab drag and detach (platform drag sessions) and the address-bar dropdown (performance-critical, heavily tested).
