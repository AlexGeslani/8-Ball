import test from 'node:test'
import assert from 'node:assert/strict'

test('Ask button is disabled and exposes busy state only during consultation', async () => {
  const timers = []
  const handlers = new Map()
  const nodes = Object.fromEntries(['prompt', 'answer', 'action', 'status'].map((key) => [key, {
    textContent: '', disabled: false, attributes: {},
    setAttribute(name, value) { this.attributes[name] = value },
    addEventListener(name, fn) { handlers.set(name, fn) },
  }]))
  const old = { document: globalThis.document, window: globalThis.window, Audio: globalThis.Audio, navigator: globalThis.navigator }
  let mount
  try {
    if (typeof globalThis.navigator === 'undefined') globalThis.navigator = {}
    globalThis.document = { body: { dataset: {} }, querySelector(selector) {
      return nodes[selector.slice(6, -1)]
    } }
    globalThis.window = {
      setTimeout(fn) { timers.push(fn) },
      addEventListener(name, fn) { if (name === 'DOMContentLoaded') mount = fn },
    }
    globalThis.Audio = class { play() { return Promise.resolve() } }
    await import('../web/app.js?button-state-test')
    mount()
    assert.equal(nodes.action.disabled, false)
    handlers.get('click')()
    assert.equal(nodes.action.disabled, true, 'consulting button must be disabled')
    assert.equal(nodes.action.attributes['aria-busy'], 'true')
    timers.shift()()
    assert.equal(nodes.action.disabled, false)
    assert.equal(nodes.action.attributes['aria-busy'], 'false')
    assert.equal(nodes.action.textContent, 'TAP TO ASK AGAIN')
  } finally {
    for (const [key, value] of Object.entries(old)) {
      if (globalThis[key] === value) continue
      if (value === undefined) delete globalThis[key]
      else globalThis[key] = value
    }
  }
})
