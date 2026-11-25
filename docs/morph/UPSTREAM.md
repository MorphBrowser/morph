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

### Practical notes

- The development clone is shallow. Fetch upstream with `git fetch --shallow-since=<date before the last sync> upstream main` until `git merge-base HEAD upstream/main` returns the previous sync point.
- Morph's own diff against upstream should stay small and reviewable. Check it with `git diff --stat upstream/main HEAD`.
- After a sync, run `browser_morph_sidebar.js` and the vertical-tabs tests. If Morph styling misbehaves, set `browser.morph.enabled` to `false` to tell an upstream regression from a Morph one.

### Sync log

| Date | Upstream revision | Notes |
|---|---|---|
| 2026-11-25 | `4f6c8bb9a8` | 13,416 upstream commits since `83cebcf5a5`. The only conflict was in `moz.build`: Morph's and upstream's `SPHINX_TREES` additions, resolved by keeping both. |

## Patch discipline

Prefer changes that are:

- focused;
- documented;
- covered by tests where behaviour changes;
- easy to distinguish from unmodified Mozilla code.

Do not carry cosmetic changes in unrelated engine files.

## Security

Security updates take priority over preserving an animation or cosmetic modification. If an upstream security change conflicts with Morph UI code, restore correctness first and reintroduce presentation changes afterwards.
