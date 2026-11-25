# Morph architecture

Morph is maintained as a Firefox fork. The goal is deep browser-chrome integration while keeping divergence from Mozilla understandable and reviewable.

## Upstream first

Use existing Firefox systems where they meet Morph's needs.

Prefer extending or styling established browser components over replacing large subsystems solely to obtain a different appearance.

Deep divergence is justified when Morph's interaction model genuinely requires behaviour Firefox does not provide.

## Morph-specific code

As implementation begins, Morph-specific primitives should be clearly identifiable and kept in coherent locations.

Expected concepts include:

- Morph design tokens;
- shape tokens;
- motion/easing tokens;
- shared-element transition helpers;
- sidebar/tab presentation;
- Morph-specific preferences;
- product branding.

### Current locations (implemented)

| Concern | Location |
|---|---|
| Morph tokens and sidebar styling | `browser/themes/shared/morph/morph.css`, imported last from `browser-shared.css` and packaged in `browser/themes/shared/jar.inc.mn` |
| Morph preferences | `browser/app/profile/firefox.js` (`browser.morph.enabled`, and the `sidebar.verticalTabs` default), next to the sidebar prefs and marked `// Morph:` |
| Tests | `browser/components/sidebar/tests/browser/browser_morph_sidebar.js` |

### Rules for Morph styling

- Every Morph rule sits inside `@media -moz-pref("browser.morph.enabled")`, so turning the pref off restores upstream rendering.
- Restyle by overriding existing component tokens (`--tab-*`, `--sidebar-*`) on `:root` before adding selectors against Firefox DOM.
- Unlayered overrides outrank the generated token layers, including forced colours and prefers-contrast. Colour overrides must therefore stay inside `not ((forced-colors) or (prefers-contrast))` and `[theme-in-app]`.
- Morph-only custom properties use the `--morph-` prefix. A custom property that nothing reads fails `browser_parsable_css.js`, so define only what is used.
- Do not hand-edit generated `*.tokens.css`. Morph does not yet use the `*.tokens.json` pipeline; see `ROADMAP.md` M4.

See `FIREFOX_BASELINE.md` for the upstream systems Morph builds on.

## Material 3 Expressive relationship

[matraic/m3e](https://github.com/matraic/m3e) is a reference implementation and design resource, not a runtime dependency for browser chrome.

Do not import a web-component framework into Firefox chrome merely to reproduce Material components.

Instead, translate the useful concepts into Firefox-native implementation:

`Material concept -> Morph token/primitive -> browser component`

This keeps startup behaviour, accessibility, platform integration and upstream maintenance under our control.

## Performance

Animation must not make browser chrome feel slower.

Prefer compositor-friendly properties when appropriate and avoid unnecessary layout work during common tab/sidebar transitions.

A visual transition must never block the underlying browser action.

## Accessibility

Morph-specific components inherit Firefox's accessibility obligations.

Any new primitive must account for:

- keyboard operation;
- focus order and focus visibility;
- screen-reader naming/state;
- high contrast / forced colours;
- reduced motion;
- zoom and text scaling where applicable;
- RTL layout;
- platform conventions.

## Testing

Behavioural changes should gain automated tests in the closest appropriate Firefox test suite.

Visual/motion behaviour should be structured so state can be tested independently of animation timing wherever possible.
