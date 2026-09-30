# Shape system

Shape is semantic in Morph.

Material 3 Expressive offers a broad shape vocabulary, but Morph should not change shape randomly. Geometry should communicate state.

## Shape roles

### Resting

Persistent controls and tabs use restrained geometry suitable for dense desktop chrome.

### Selected

Selection gains a clearer enclosing surface. The selected shape may be softer or more expressive than the resting state, but should remain stable enough for prolonged use.

### Expanding

A control that creates a larger surface may continuously reshape into the destination surface.

### Grouped

Containers visually encompass related children. Expanding a group should feel like its existing container gaining capacity, not like unrelated rows being inserted beneath it.

### Dragging

Dragged objects gain separation from their original surface through elevation, spacing and/or shape.

### Progress

Loading state may subtly change the active surface or indicator. Progress geometry must not create distracting perpetual motion.

## Rules

- Shape changes must have a reason.
- Shape should not obscure hit targets.
- Avoid excessive simultaneous deformation.
- Selected and focused states must remain distinguishable without relying on colour alone.
- Geometry must work in both left- and right-side sidebar layouts.
- Reduced-motion mode may switch shape states immediately rather than interpolating them.
