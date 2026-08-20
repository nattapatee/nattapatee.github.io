import { useEffect, useRef, useState } from 'react'
import { useReducedMotion } from '../../hooks/useReducedMotion'
import './gameboy.css'

type Phase = 'shelf' | 'inserting' | 'booting' | 'zooming' | 'done'

const INSERT_MS = 900
const BOOT_MS = 2100
const ZOOM_MS = 900

const CARTRIDGES = [
  { id: 'resume', label: 'RESUME', ready: true },
  { id: 'gallery', label: 'GALLERY', ready: false },
  { id: 'mystery', label: '???', ready: false },
]

function playBootDing() {
  try {
    const ctx = new AudioContext()
    const play = (freq: number, at: number, dur: number) => {
      const osc = ctx.createOscillator()
      const gain = ctx.createGain()
      osc.type = 'square'
      osc.frequency.value = freq
      gain.gain.setValueAtTime(0.06, ctx.currentTime + at)
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + at + dur)
      osc.connect(gain).connect(ctx.destination)
      osc.start(ctx.currentTime + at)
      osc.stop(ctx.currentTime + at + dur)
    }
    play(1046, 0, 0.12)
    play(2093, 0.1, 0.35)
  } catch {
    // audio unavailable — intro stays silent
  }
}

export function GameBoyIntro() {
  const reduced = useReducedMotion()
  const [phase, setPhase] = useState<Phase>(() => (reduced ? 'done' : 'shelf'))
  const dingPlayed = useRef(false)

  useEffect(() => {
    if (phase === 'shelf' || phase === 'done') return
    if (phase === 'booting' && !dingPlayed.current) {
      dingPlayed.current = true
      playBootDing()
    }
    const nextByPhase: Record<Exclude<Phase, 'shelf' | 'done'>, [Phase, number]> = {
      inserting: ['booting', INSERT_MS],
      booting: ['zooming', BOOT_MS],
      zooming: ['done', ZOOM_MS],
    }
    const [next, delay] = nextByPhase[phase]
    const timer = setTimeout(() => setPhase(next), delay)
    return () => clearTimeout(timer)
  }, [phase])

  useEffect(() => {
    if (phase === 'done') return
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setPhase('done')
      else if (phase === 'shelf' && event.key === 'Enter') setPhase('inserting')
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [phase])

  if (phase === 'done') return null

  return (
    <div className={`gb-intro gb-intro--${phase}`} role="dialog" aria-label="Retro intro — press Escape to skip">
      {phase === 'shelf' && (
        <div className="gb-shelf-scene">
          <p className="gb-shelf-title">PICK A CARTRIDGE</p>
          <div className="gb-shelf">
            {CARTRIDGES.map((cart) => (
              <button
                key={cart.id}
                type="button"
                className={`gb-cart gb-cart--${cart.ready ? 'ready' : 'empty'}`}
                onClick={cart.ready ? () => setPhase('inserting') : undefined}
                disabled={!cart.ready}
              >
                <span className="gb-cart-notch" />
                <span className="gb-cart-label">{cart.label}</span>
                {!cart.ready && <span className="gb-cart-soon">COMING SOON</span>}
              </button>
            ))}
          </div>
          <p className="gb-shelf-hint">▶ click RESUME to play</p>
        </div>
      )}

      {phase !== 'shelf' && (
        <div className="gb-console-scene">
          <div className="gb-flying-cart" aria-hidden="true">
            <span className="gb-cart-notch" />
            <span className="gb-cart-label">RESUME</span>
          </div>
          <div className="gb-console" aria-hidden="true">
            <div className="gb-screen-bezel">
              <div className="gb-screen">
                {phase !== 'inserting' && (
                  <span className="gb-boot-logo" data-text="RESUME">
                    RESUME
                  </span>
                )}
                {phase === 'booting' && <span className="gb-boot-tm">Nattapat game 2026</span>}
              </div>
              <span className="gb-bezel-text">RESUME BOY <i>COLOR</i></span>
              <span className="gb-power-led" />
            </div>
            <div className="gb-controls">
              <span className="gb-dpad" />
              <span className="gb-buttons">
                <i className="gb-btn-b">B</i>
                <i className="gb-btn-a">A</i>
              </span>
            </div>
            <span className="gb-startselect" />
            <span className="gb-speaker" />
          </div>
        </div>
      )}

      <button type="button" className="gb-skip" onClick={() => setPhase('done')}>
        SKIP ▸▸
      </button>
    </div>
  )
}
