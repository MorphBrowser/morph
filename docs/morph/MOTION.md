# Motion

> **Nothing appears when it can transform.**

Motion is part of Morph's information architecture.

## Principles

### Preserve spatial origin

A surface should normally emerge from the control or region that created it. Menus, permission prompts, downloads, search surfaces and similar UI should have an understandable source.

### Preserve identity

If one object becomes another state, animate the existing object into that state where practical.

Prefer:

`A -> B`

over:

`A disappears -> unrelated B appears`

### Explain state

Animation should answer at least one useful question:

- What changed?
- Where did this come from?
- Where did it go?
- Which item became active?
- What is loading?
- What was grouped or separated?

If it answers none of these, the motion is probably decorative.

### Frequent actions are fast

Tab switching, selection changes and pointer feedback should be short and responsive. Larger surfaces may use more expressive transitions.

Morph should not bounce everything by default.

### Transitions are interruptible

User input wins. A user who changes tabs twice quickly, closes a panel during its entrance, or changes direction mid-transition should not need to wait for an animation to finish.

State should converge cleanly on the newest requested result.

### Reduced motion

Reduced-motion mode is a first-class presentation mode.

Large transforms, long travel and elastic effects should collapse to short fades, immediate geometry changes or other low-motion alternatives while preserving hierarchy and state clarity.

## Direction

Spatial motion can encode navigation history.

For example, browser history may use consistent opposing directions for back and forward navigation, including tab-title/content changes where appropriate.

Direction must remain consistent across the product.

## Shared-element transformations

Good candidates include:

- new-tab button -> new tab;
- selected-tab indicator -> newly selected tab;
- toolbar control -> popup or panel;
- site identity control -> permissions/site information;
- download control -> download panel;
- collapsed group -> expanded group;
- dragged tab -> detached/floating tab.

Shared-element transitions should be used only when the conceptual identity is genuinely shared.
