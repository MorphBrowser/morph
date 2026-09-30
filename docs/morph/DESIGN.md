# Morph design language

Morph should feel tactile, calm, modern and unmistakably Material without looking like an Android interface stretched across a desktop.

## Core idea

Material 3 Expressive provides Morph's visual vocabulary. Morph's own identity comes from continuity: controls, surfaces and content should transform through state rather than repeatedly disappearing and reappearing.

## Surfaces

Use a small number of meaningful surface levels. Elevation should normally indicate temporary separation, drag state, modal focus or a floating surface rather than being applied for decoration.

The browser should remain comparatively flat at rest. Expressiveness comes from shape, colour, motion and state changes rather than permanent shadows everywhere.

## Colour

Colour should communicate hierarchy and state before decoration.

Morph should support:

- light and dark schemes;
- user-selected accent palettes;
- operating-system colour integration where practical;
- accessible contrast across all generated palettes;
- restrained use of high-chroma colour in persistent browser chrome.

Dynamic colour must never make security, permission or warning states ambiguous.

## Typography

Typography should be highly legible at browser-chrome sizes and remain visually stable during transitions.

Text motion may communicate navigation direction or state change, but labels must never become difficult to track during common interactions.

## Density

Morph should be comfortable rather than oversized. Material touch-target guidance informs interaction sizing, but desktop pointer density still matters.

Compact modes may reduce visual padding while preserving minimum hit targets and accessibility.

## Icons

Prefer Material Symbols where licensing and platform integration make sense, while retaining platform-specific or Firefox-specific symbols where replacing them would reduce clarity.

Icon changes should be semantic, not stylistic churn.

## Component rule

Before adding a new one-off control, ask whether it belongs to an existing Morph primitive:

- button/control;
- surface;
- tab;
- menu/panel;
- dialog;
- selection indicator;
- group/container;
- motion transition.

A consistent system is more important than making every screen individually expressive.
