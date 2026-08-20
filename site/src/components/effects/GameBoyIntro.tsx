import { useEffect, useRef, useState } from 'react'
import { useReducedMotion } from '../../hooks/useReducedMotion'
import { GbConsoleArt } from './GbConsoleArt'
import { GbShelfScene } from './GbShelfScene'
import './gameboy.css'

type Phase = 'shelf' | 'inserting' | 'booting' | 'zooming' | 'reveal' | 'done'

const INSERT_MS = 450
const BOOT_MS = 1800
const ZOOM_MS = 850
const REVEAL_MS = 600

function playTone(freq: number, at: number, dur: number, gainValue: number, ctx: AudioContext) {
  const osc = ctx.createOscillator()
  const gain = ctx.createGain()
  osc.type = 'square'
  osc.frequency.value = freq
  gain.gain.setValueAtTime(gainValue, ctx.currentTime + at)
  gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + at + dur)
  osc.connect(gain).connect(ctx.destination)
  osc.start(ctx.currentTime + at)
  osc.stop(ctx.currentTime + at + dur)
}

function playClunkThenDing() {
  try {
    const ctx = new AudioContext()
    playTone(140, 0, 0.09, 0.09, ctx) // cartridge clunk
    playTone(1046, 0.35, 0.1, 0.05, ctx)
    playTone(2093, 0.44, 0.32, 0.05, ctx)
  } catch {
    // audio unavailable — intro stays silent
  }
}

interface GameBoyIntroProps {
  onDone?: () => void
}

export function GameBoyIntro({ onDone }: GameBoyIntroProps) {
  const reduced = useReducedMotion()
  const [phase, setPhase] = useState<Phase>(() => (reduced ? 'done' : 'shelf'))
  const soundPlayed = useRef(false)
  const doneNotified = useRef(false)

  useEffect(() => {
    // the page behind the intro starts its entrance while the green screen dissolves
    if ((phase === 'reveal' || phase === 'done') && !doneNotified.current) {
      doneNotified.current = true
      onDone?.()
    }
  }, [phase, onDone])

  useEffect(() => {
    if (phase === 'shelf' || phase === 'done') return
    if (phase === 'booting' && !soundPlayed.current) {
      soundPlayed.current = true
      playClunkThenDing()
    }
    const nextByPhase: Record<Exclude<Phase, 'shelf' | 'done'>, [Phase, number]> = {
      inserting: ['booting', INSERT_MS],
      booting: ['zooming', BOOT_MS],
      zooming: ['reveal', ZOOM_MS],
      reveal: ['done', REVEAL_MS],
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

  if (phase === 'reveal') {
    return <div className="gb-reveal" aria-hidden="true" />
  }

  return (
    <div className={`gb-intro gb-intro--${phase}`} role="dialog" aria-label="Retro intro — press Escape to skip">
      {phase === 'shelf' && <GbShelfScene onPick={() => setPhase('inserting')} />}

      {phase !== 'shelf' && (
        <div className="gb-console-scene">
          <div className="gb-px-console" aria-hidden="true">
            <div className="gb-cart-track">
              <div className="gb-flying-cart">
                <span className="gb-cart-notch" />
                <span className="gb-cart-label">RESUME</span>
              </div>
            </div>
            <GbConsoleArt ledOn={phase !== 'inserting'} />
            <div className="gb-screen-overlay">
              {phase !== 'inserting' && (
                <>
                  <span className="gb-boot-logo">RESUME</span>
                  <span className="gb-boot-tm">Nattapat game 2026</span>
                </>
              )}
            </div>
            <span className="gb-bezel-brand">
              RESUME BOY <i>COLOR</i>
            </span>
          </div>
        </div>
      )}

      <button type="button" className="gb-skip" onClick={() => setPhase('done')}>
        SKIP ▸▸
      </button>
    </div>
  )
}
