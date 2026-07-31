# 8 Ball

An offline, tap-first 8 Ball Mini Program for the Amazfit Active Max, with a browser-based interaction preview for TheArkLab.

## Surfaces

- **Watch:** native Zepp OS Mini Program targeting Active Max (`genevaw`, 480×480)
- **Development preview:** `http://8ball.watch.lan`
- **Source:** private `Vector-Sigma-Works/8-Ball`

The browser preview mirrors the visible layout, shared answer pool, reveal timing, vibration request, and mystical reveal sound. It is not a Zepp OS runtime emulator; physical watch testing remains authoritative for rendering, haptics, audio volume, lifecycle, and performance.

## Development flow

```text
8ball.watch.lan → dev → PR to main → version tag → .zab release
```

`dev` is the integration branch served by TheArkLab. `main` is release-ready source and receives changes only through accepted promotion.

## Commands

```bash
npm run build:web
npm test
npx --yes -p node@20 -c 'zeus build'
```

Authenticated physical preview generation is performed locally on The Ark; expiring QR codes are not durable release artifacts.

## Layout

```text
core/                  shared oracle behavior
page/genevaw/          Zepp OS watch UI
assets/genevaw.r/      watch icon and reveal audio
web/                   browser-preview source
public/                generated static TheArkLab artifact
test/                  Node test suite
scripts/build-web.mjs   deterministic browser build
```

## Privacy and scope

The app is offline and contains no microphone, speech recognition, network requests, accounts, ads, analytics, or history.
