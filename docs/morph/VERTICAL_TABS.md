# Vertical tabs

Vertical tabs are Morph's canonical tab experience.

Horizontal tabs may be supported later, but the browser should not be architected around a horizontal tab strip and then adapt vertical tabs as an alternate skin.

## Sidebar goals

The sidebar should:

- keep page content visually dominant;
- make large tab counts easier to scan;
- support pointer, keyboard and touchpad use;
- expose clear active, pinned, loading, muted and attention states;
- support groups without turning the sidebar into a tree-view application;
- remain useful in compact and expanded widths.

## Sidebar states

Morph should support at least:

### Compact

Primarily icons/favicons, with strong selection and accessible labels/tooltips.

### Standard

Favicons, titles and core tab controls.

### Expanded

Additional context such as groups, spaces or secondary metadata may become visible.

Transitions between these states should preserve the physical identity of tabs and controls rather than rebuild the layout visually from scratch.

## Selection

The selected tab uses a material selection surface or indicator that transitions between tabs.

When selection changes, the indicator should move/reshape towards the destination rather than independently disappearing and reappearing.

## New tab

The new-tab affordance is a flagship Morph interaction.

Where layout constraints permit, activating the new-tab control should visually transform that affordance into the newly created tab or its creation surface.

The transition must remain fast enough for repeated keyboard/pointer use.

## Closing tabs

Closing should communicate removal and reflow. Adjacent tabs should settle naturally into the released space.

Animation must not delay actual close behaviour.

## Pinned tabs

Pinned tabs should remain recognisably part of the same tab system while supporting a denser presentation.

Pinned tabs must not depend on titles being visible.

## Groups

A collapsed group is one meaningful container. Expanding it should feel like that container grows to reveal its children.

Groups require clear keyboard navigation and must not trap focus.

## Spaces

Spaces/workspaces are a potential higher-level organisation system rather than a launch requirement.

If introduced, switching spaces should preserve sidebar continuity and should not present as an entire unrelated sidebar abruptly replacing the previous one.

## Drag and detach

A dragged tab should visibly separate from the sidebar. Detaching a tab into a new window is another strong shared-element opportunity, but correctness and platform behaviour come before animation.
