import test from 'node:test'
import assert from 'node:assert/strict'
import { createPreviewController } from '../web/app.js'

test('browser preview follows READY to CONSULTING to ANSWER', () => {
  const states = []
  const timers = []
  const controller = createPreviewController({
    oracle: { ask: () => ({ kind: 'yes', text: 'YES.' }) },
    render: (state) => states.push({ ...state }),
    schedule: (fn) => { timers.push(fn); return timers.length },
    vibrate: () => states.push({ effect: 'vibrate' }),
    playSound: () => states.push({ effect: 'sound' }),
  })

  controller.start()
  controller.ask()
  assert.equal(states.at(-1).phase, 'consulting')
  timers.shift()()
  assert.equal(states.at(-3).phase, 'answer')
  assert.deepEqual(states.slice(-2), [{ effect: 'vibrate' }, { effect: 'sound' }])
})

test('browser preview ignores repeated taps while consulting', () => {
  let asks = 0
  const timers = []
  const controller = createPreviewController({
    oracle: { ask: () => { asks += 1; return { kind: 'yes', text: 'YES.' } } },
    render: () => {},
    schedule: (fn) => { timers.push(fn); return timers.length },
    vibrate: () => {},
    playSound: () => {},
  })

  controller.start()
  controller.ask()
  controller.ask()
  assert.equal(timers.length, 1)
  timers[0]()
  assert.equal(asks, 1)
})
