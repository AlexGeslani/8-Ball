import { createOracle } from './core/oracle.js'

export function createPreviewController({ oracle, render, schedule, vibrate, playSound }) {
  let busy = false

  function start() {
    render({ phase: 'ready', prompt: 'THINK OR ASK A YES/NO QUESTION', answer: 'READY', action: 'TAP TO ASK' })
  }

  function ask() {
    if (busy) return false
    busy = true
    render({ phase: 'consulting', prompt: 'CONSULTING THE ORACLE…', answer: '◆', action: 'PLEASE WAIT' })
    schedule(() => {
      const result = oracle.ask()
      render({ phase: 'answer', prompt: 'THE ORACLE HAS SPOKEN', answer: result.text, action: 'TAP TO ASK AGAIN', kind: result.kind })
      vibrate()
      playSound()
      busy = false
    }, 700)
    return true
  }

  return { start, ask }
}

function mountBrowserPreview() {
  const prompt = document.querySelector('[data-prompt]')
  const answer = document.querySelector('[data-answer]')
  const action = document.querySelector('[data-action]')
  const status = document.querySelector('[data-status]')
  const audio = new Audio('./sounds/mystical-reveal.mp3')

  const controller = createPreviewController({
    oracle: createOracle(),
    render(state) {
      document.body.dataset.phase = state.phase
      prompt.textContent = state.prompt
      answer.textContent = state.answer
      action.textContent = state.action
      status.textContent = state.phase === 'consulting' ? 'Oracle consultation in progress' : state.phase === 'answer' ? `Oracle answer: ${state.answer}` : '8 Ball ready'
    },
    schedule: window.setTimeout.bind(window),
    vibrate: () => navigator.vibrate?.(70),
    playSound: () => {
      audio.currentTime = 0
      audio.play().catch(() => {})
    },
  })

  action.addEventListener('click', controller.ask)
  controller.start()
}

if (typeof document !== 'undefined') {
  window.addEventListener('DOMContentLoaded', mountBrowserPreview)
}
