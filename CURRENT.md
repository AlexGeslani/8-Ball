# Current

## Approved outcome

8 Ball is an offline Active Max Mini Program with a faithful browser interaction preview in TheArkLab.

## Current version

- App version: `0.2.0`
- Target: Amazfit Active Max / Zepp OS 5.0 / API level 4.2
- Browser lane: `http://8ball.watch.lan` tracking `origin/dev`
- Release branch: `main`

## Acceptance boundary

Automated tests and browser acceptance verify the shared oracle behavior and preview. The physical Active Max remains the authority for native rendering, touch geometry, haptics, sound volume, and lifecycle.

## Next gate

Accept the canonical `8ball.watch.lan` browser interaction, then use the normal `dev → main` pull-request promotion for subsequent releases.
