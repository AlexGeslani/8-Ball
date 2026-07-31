import test from 'node:test'
import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'
import { join } from 'node:path'

const root = process.cwd()

test('watch preview exposes one accessible 480 by 480 watch surface', async () => {
  const html = await readFile(join(root, 'web/index.html'), 'utf8')
  const css = await readFile(join(root, 'web/styles.css'), 'utf8')
  assert.match(html, /data-watch-face/)
  assert.match(html, /aria-live="polite"/)
  assert.match(html, /type="module" src="\.\/app\.js"/)
  assert.match(css, /--watch-size:\s*480px/)
  assert.match(css, /border-radius:\s*50%/)
  assert.match(css, /@media.*max-width/s)
})

test('build emits the browser artifact with shared oracle and watch audio', async () => {
  const [sourceOracle, publicOracle, sound] = await Promise.all([
    readFile(join(root, 'core/oracle.js')),
    readFile(join(root, 'public/core/oracle.js')),
    readFile(join(root, 'public/sounds/mystical-reveal.mp3')),
  ])
  assert.deepEqual(publicOracle, sourceOracle)
  assert.ok(sound.length > 1000)
})
