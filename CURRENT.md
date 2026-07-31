# Current

## Approved outcome

8 Ball is an offline Amazfit Active Max Mini Program with a browser interaction preview and a repeatable end-to-end path from source change to physical-watch candidate.

## Current version

- App version: `0.2.0`
- Target: Amazfit Active Max / Zepp OS 5.0 / API level 4.2
- Integration branch: `dev`
- Release-ready branch: `main`

## Acceptance boundary

Automated tests and browser acceptance verify shared oracle behavior, packaging contracts, and preview interaction. The physical Active Max remains authoritative for native rendering, touch geometry, haptics, sound volume, lifecycle behavior, and performance.

## Next gate

Complete physical-device acceptance for the current candidate, then promote `dev` to `main` through a pull request and create the corresponding version tag.
