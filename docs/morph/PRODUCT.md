# Product

## Vision

Morph is a Firefox-based desktop browser whose chrome follows Material 3 Expressive and behaves as one continuous, transforming system. Its guiding rule is the one in [the index](index.md): nothing appears when it can transform.

## Positioning

- **A browser built around vertical tabs.** The sidebar is the primary browsing surface, not an option bolted onto a horizontal design.
- **Material, adapted to the desktop.** It uses M3 Expressive colour, shape, state layers and motion at pointer-and-keyboard density, rather than a stretched Android interface.
- **Flat at rest, expressive in transition.** Character comes from shape and purposeful motion, not glass, glow or gradients.
- **Firefox underneath.** It keeps Gecko, Firefox's privacy work, extensions and rapid security updates. Morph tracks Mozilla upstream rather than forking it once.

## Audience

- People who already prefer vertical tabs and modern layouts, including users of Zen Browser, and who want a flatter, Material-informed look with its own identity.
- Firefox users who want a more cohesive, tactile interface without giving up Firefox's engine or extension ecosystem.
- People who rely on keyboard navigation, reduced motion, high contrast or screen readers. They are a design constraint, not an afterthought.

## Not goals

- A fork of Zen or a re-skin of it.
- A dependency on the M3E web-component runtime in browser chrome.
- Animating everything, or visual effects that cost performance or clarity.
- Rewriting Firefox subsystems that already work, such as tab management, session restore and the address-bar backend.

## Status

| Item | Status |
|---|---|
| Product direction and principles | Confirmed (this page, `DESIGN.md`, `MOTION.md`) |
| Vertical tabs on by default | Implemented (M1) |
| Morph visual foundation for the sidebar | Implemented (M1); see `ROADMAP.md` |
| Signature interactions | Proposed; see `INTERACTIONS.md` |
| Spaces / workspaces | Proposal, not a launch requirement |
| Branding | Not started |
