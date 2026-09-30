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

Exact source locations should follow Firefox conventions and be documented once the first implementation lands.

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
