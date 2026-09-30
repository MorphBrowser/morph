# Upstream strategy

Morph tracks Mozilla Firefox rather than treating the initial fork as a one-time code import.

## Goals

- receive Firefox security fixes quickly;
- minimise unnecessary conflicts;
- keep Morph-specific changes easy to identify;
- avoid editing upstream files when an equally maintainable extension point exists;
- document deliberate divergence.

## Remotes

A local development clone should normally have both:

```text
origin    https://github.com/MorphBrowser/morph.git
upstream  https://github.com/mozilla-firefox/firefox.git
```

## Branches

`main` is Morph's integration branch.

Feature work should happen on focused branches and land through pull requests.

Do not maintain a permanently modified copy of Mozilla's `main` under a misleading upstream branch name. The Git remote is the source of truth for Mozilla upstream.

## Syncing

When synchronising with Mozilla:

1. fetch `upstream`;
2. review the incoming range;
3. merge or otherwise integrate upstream into a dedicated sync branch;
4. resolve conflicts with Morph's documented product behaviour in mind;
5. run relevant builds/tests;
6. land the sync through a reviewable PR.

The exact automation can evolve once Morph has its own CI and release cadence.

## Patch discipline

Prefer changes that are:

- focused;
- documented;
- covered by tests where behaviour changes;
- easy to distinguish from unmodified Mozilla code.

Do not carry cosmetic changes in unrelated engine files.

## Security

Security updates take priority over preserving an animation or cosmetic modification. If an upstream security change conflicts with Morph UI code, restore correctness first and reintroduce presentation changes afterwards.
