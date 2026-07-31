# Device-app delivery profile

## Decision

Device-first projects use one browser development surface backed by the repository's `dev` branch. The browser is an interaction preview, not a production web application or a substitute for the native device runtime.

Accepted source is promoted by pull request from `dev` to `main`. A tagged `.zab` built from `main` is the production artifact. Expiring authenticated Zeus QR codes are generated locally from an exact candidate or release commit.

## Consequences

- No redundant development and production browser deployments for a watch-only product.
- No per-app container or backend for a static preview.
- Browser and watch share pure oracle logic.
- Physical-device acceptance remains mandatory for native claims.
- GitHub owns durable source, tests, documentation, version tags, checksums, and release artifacts.

## Reconsider when

The project gains a genuine browser product, authenticated backend, or marketplace-delivery automation that changes the release boundary.
