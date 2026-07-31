import ui from '@zos/ui'
import { setTimeout, clearTimeout } from '@zos/timer'
import { Vibrator, VIBRATOR_SCENE_SHORT_LIGHT } from '@zos/sensor'
import { create, id } from '@zos/media'
import { createOracle } from '../../core/oracle'

const CYAN = 0x00e5ff
const WHITE = 0xf5fbff
const MUTED = 0x8aa8b8
const PANEL = 0x002331

const oracle = createOracle()
const vibrator = new Vibrator()
const player = create(id.PLAYER)
player.addEventListener(player.event.PREPARE, (ready) => {
  if (ready) player.start()
})
player.addEventListener(player.event.COMPLETE, () => player.stop())
player.setSource(player.source.FILE, { file: 'sounds/mystical-reveal.mp3' })
let revealTimer = null
let busy = false
let prompt
let answer
let action

function setText(widget, text) {
  widget.setProperty(ui.prop.TEXT, text)
}

function reveal() {
  const result = oracle.ask()
  setText(prompt, 'THE ORACLE HAS SPOKEN')
  setText(answer, result.text)
  setText(action, 'TAP TO ASK AGAIN')
  vibrator.start({ mode: VIBRATOR_SCENE_SHORT_LIGHT })
  player.prepare()
  busy = false
  revealTimer = null
}

function ask() {
  if (busy) return
  busy = true
  setText(prompt, 'CONSULTING THE ORACLE…')
  setText(answer, '◆')
  setText(action, 'PLEASE WAIT')
  revealTimer = setTimeout(reveal, 700)
}

Page({
  build() {
    ui.createWidget(ui.widget.FILL_RECT, {
      x: 0, y: 0, w: 480, h: 480, color: 0x000000,
    })

    ui.createWidget(ui.widget.TEXT, {
      x: 60, y: 48, w: 360, h: 54,
      text: '8 BALL', text_size: 34, color: CYAN,
      align_h: ui.align.CENTER_H, align_v: ui.align.CENTER_V,
    })

    prompt = ui.createWidget(ui.widget.TEXT, {
      x: 70, y: 104, w: 340, h: 58,
      text: 'THINK OR ASK A YES/NO QUESTION', text_size: 19, color: MUTED,
      align_h: ui.align.CENTER_H, align_v: ui.align.CENTER_V,
      text_style: ui.text_style.WRAP,
    })

    ui.createWidget(ui.widget.FILL_RECT, {
      x: 82, y: 166, w: 316, h: 178, color: CYAN,
      radius: 30,
    })
    ui.createWidget(ui.widget.FILL_RECT, {
      x: 88, y: 172, w: 304, h: 166, color: PANEL,
      radius: 26,
    })

    answer = ui.createWidget(ui.widget.TEXT, {
      x: 108, y: 190, w: 264, h: 104,
      text: 'READY', text_size: 30, color: WHITE,
      align_h: ui.align.CENTER_H, align_v: ui.align.CENTER_V,
      text_style: ui.text_style.WRAP,
    })

    action = ui.createWidget(ui.widget.BUTTON, {
      x: 118, y: 292, w: 244, h: 62,
      text: 'TAP TO ASK', text_size: 22,
      normal_color: 0x00465c, press_color: 0x00738f,
      color: WHITE, radius: 31,
    })
    action.addEventListener(ui.event.CLICK_UP, ask)

    ui.createWidget(ui.widget.TEXT, {
      x: 92, y: 386, w: 296, h: 48,
      text: 'NO LISTENING  •  FOR ENTERTAINMENT ONLY',
      text_size: 14, color: MUTED,
      align_h: ui.align.CENTER_H, align_v: ui.align.CENTER_V,
      text_style: ui.text_style.WRAP,
    })
  },

  onDestroy() {
    if (revealTimer !== null) clearTimeout(revealTimer)
    revealTimer = null
    busy = false
    player.stop()
  },
})
