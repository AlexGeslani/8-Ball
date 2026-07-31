# Device-app delivery profile

## Decision

For device-first projects, TheArkLab exposes one browser development surface at `<slug>.watch.lan`. That worktree tracks `origin/dev`. The browser is an interaction preview, not a production web application.

Accepted source is promoted by pull request from `dev` to `main`. A tagged `.zab` built from `main` is the production artifact. Expiring authenticated Zeus QR codes are generated locally from an exact candidate or release commit.

## Consequences

- No redundant `-dev.watch.lan` or local browser-production hostname.
- No per-app container or backend for static previews.
- Browser and watch share pure oracle logic.
- Physical-device acceptance remains mandatory for native claims.
- Web-native TheArkLab applications retain their existing paired production/dev convention.

## Reconsider when

A watch project gains a genuine browser production product, authenticated backend, or marketplace delivery automation that changes the release boundary.
