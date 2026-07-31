import test from 'node:test'
import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'
import { join } from 'node:path'

const root = process.cwd()

test('targets Active Max as a permission-free 8 Ball Mini Program', async () => {
  const manifest = JSON.parse(await readFile(join(root, 'app.json'), 'utf8'))
  assert.equal(manifest.app.appName, '8 Ball')
  assert.equal(manifest.app.appType, 'app')
  assert.equal(manifest.targets.genevaw.designWidth, 480)
  assert.deepEqual(manifest.targets.genevaw.platforms, [{ st: 'r' }])
  assert.deepEqual(manifest.permissions, [])
})

test('implements tap, timed reveal, and one short haptic without microphone or network APIs', async () => {
  const source = await readFile(join(root, 'page/genevaw/index.js'), 'utf8')
  assert.match(source, /CLICK_UP/)
  assert.match(source, /setTimeout/)
  assert.match(source, /VIBRATOR_SCENE_SHORT_LIGHT/)
  assert.match(source, /create\(id\.PLAYER\)/)
  assert.match(source, /mystical-reveal\.mp3/)
  assert.doesNotMatch(source, /Recorder|fetch|@zos\/http|microphone/i)
  assert.doesNotMatch(source, /Vector Sigma/i)
})

test('ships dedicated 8 Ball icon and original mystical reveal sound', async () => {
  const icon = await readFile(join(root, 'assets/genevaw.r/images/app-icon.png'))
  const sound = await readFile(join(root, 'assets/genevaw.r/sounds/mystical-reveal.mp3'))
  assert.ok(icon.length > 1000)
  assert.ok(sound.length > 1000)
})
