# Morph

Morph is a Firefox-based browser exploring Material 3 Expressive as a native desktop browsing experience.

Morph treats motion as structure rather than decoration. Controls transform into the surfaces they create, navigation preserves spatial relationships, and the browser interface behaves as one continuous system.

> **Nothing appears when it can transform.**

## Product principles

1. **The interface is continuous.** UI states should feel connected rather than replaced.
2. **Vertical tabs are canonical.** Morph is designed around a sidebar-first browsing model from the beginning.
3. **Motion explains state.** Animation must communicate what changed, where it came from, or where it went.
4. **Shape has meaning.** Shape changes represent hierarchy, selection, grouping, progress, drag state, or transformation.
5. **Expressive does not mean noisy.** Frequent actions should remain quick and restrained.
6. **The web stays central.** Browser chrome should be distinctive without competing with page content.
7. **Accessibility is a system constraint.** Reduced motion, keyboard access, contrast, focus visibility, density, and screen-reader semantics must be designed in rather than added later.

## Material 3 Expressive

Morph is strongly informed by Material 3 Expressive and by the work in [matraic/m3e](https://github.com/matraic/m3e).

The browser chrome does **not** depend on `@m3e/web` or another web component runtime. Material concepts are translated into native Firefox chrome primitives so Morph can remain maintainable against Mozilla upstream.

`m3e` is therefore a design and behavioural reference for:

- colour and theme tokens;
- shape families and expressive geometry;
- component states and state layers;
- motion patterns;
- typography;
- accessibility behaviour.

## Documentation

- [Design](DESIGN.md)
- [Motion](MOTION.md)
- [Shapes](SHAPES.md)
- [Vertical tabs](VERTICAL_TABS.md)
- [Architecture](ARCHITECTURE.md)
- [Upstream strategy](UPSTREAM.md)

These documents describe intended behaviour, not a claim that every item is already implemented.
