import test from 'node:test'
import assert from 'node:assert/strict'
import { ANSWERS, createOracle } from '../core/oracle.js'

test('ships a balanced 20-answer local pool', () => {
  assert.equal(ANSWERS.length, 20)
  assert.deepEqual(
    Object.fromEntries(['yes', 'uncertain', 'no'].map(kind => [kind, ANSWERS.filter(a => a.kind === kind).length])),
    { yes: 10, uncertain: 5, no: 5 },
  )
})

test('never returns the immediately previous answer', () => {
  const oracle = createOracle(() => 0)
  const first = oracle.ask()
  const second = oracle.ask()
  assert.notEqual(second.text, first.text)
})

test('returns only approved answers over repeated asks', () => {
  let n = 0
  const oracle = createOracle(() => ((n++ * 7) % 100) / 100)
  const approved = new Set(ANSWERS.map(a => a.text))
  for (let i = 0; i < 500; i += 1) assert.ok(approved.has(oracle.ask().text))
})
