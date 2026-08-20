import { useCallback, useEffect, useRef, useState } from 'react'
import { useReducedMotion } from '../../hooks/useReducedMotion'
import { GbConsoleArt } from './GbConsoleArt'
import { SkeletonPage } from './SkeletonPage'
import { resume } from '../../data/resume'
import './gameboy.css'

type Phase = 'shelf' | 'clearing' | 'inserting' | 'booting' | 'zooming' | 'reveal' | 'done'

const CLEAR_MS = 750
const INSERT_MS = 420
const BOOT_MS = 1700
const ZOOM_MS = 800
const REVEAL_MS = 700

/** where the cartridge slot sits on the console art, as a fraction of its height */
const SLOT_RATIO = 0.055
/** cartridge width relative to the console, so it looks like it fits the slot */
const CART_TO_CONSOLE = 0.46
/** centre of the green screen on the console art, as a fraction of its box */
const SCREEN_CENTER_X = 0.525
const SCREEN_CENTER_Y = 0.289

interface Cartridge {
  id: string
  label: string
  subtitle: string
  color: string
  ready: boolean
}

const CARTRIDGES: Cartridge[] = [
  { id: 'resume', label: 'RESUME', subtitle: 'career mode', color: '#ffde59', ready: true },
  { id: 'gallery', label: 'GALLERY', subtitle: 'photo album', color: '#5ce1e6', ready: false },
  { id: 'mystery', label: '???', subtitle: 'locked', color: '#c99cff', ready: false },
]

const greetingFor = (hour: number) => {
  if (hour < 5) return 'Working late'
  if (hour < 12) return 'Good morning'
  if (hour < 17) return 'Good afternoon'
  return 'Good evening'
}

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
    playTone(140, 0, 0.09, 0.09, ctx)
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
  const [picked, setPicked] = useState<string | null>(null)
  const [hovered, setHovered] = useState<string | null>(null)
  const [greeting, setGreeting] = useState('Welcome')

  const introRef = useRef<HTMLDivElement>(null)
  const stageRef = useRef<HTMLDivElement>(null)
  const consoleRef = useRef<HTMLDivElement>(null)
  const cartRefs = useRef<Record<string, HTMLButtonElement | null>>({})
  const soundPlayed = useRef(false)
  const doneNotified = useRef(false)

  useEffect(() => setGreeting(greetingFor(new Date().getHours())), [])

  useEffect(() => {
    if ((phase === 'reveal' || phase === 'done') && !doneNotified.current) {
      doneNotified.current = true
      onDone?.()
    }
  }, [phase, onDone])

  /* measure where the chosen cartridge has to travel so it lands over the slot */
  const pick = useCallback((id: string) => {
    const cart = cartRefs.current[id]
    const console_ = consoleRef.current
    const intro = introRef.current
    if (cart && console_ && intro) {
      // the console ends centred in the viewport, so its final box is known from its own size
      const width = console_.offsetWidth
      const height = console_.offsetHeight
      const finalLeft = window.innerWidth / 2 - width / 2
      const finalTop = window.innerHeight / 2 - height / 2

      const cartRect = cart.getBoundingClientRect()
      const slotY = finalTop + height * SLOT_RATIO

      cart.style.setProperty(
        '--to-x',
        `${(window.innerWidth / 2 - (cartRect.left + cartRect.width / 2)).toFixed(1)}px`,
      )
      cart.style.setProperty('--to-y', `${(slotY - cartRect.bottom - 10).toFixed(1)}px`)
      const scale = (width * CART_TO_CONSOLE) / cartRect.width
      cart.style.setProperty('--to-scale', scale.toFixed(3))
      // drop far enough that the whole cartridge is swallowed by the console front
      cart.style.setProperty('--slot-drop', `${(cartRect.height * scale + 16).toFixed(1)}px`)

      // zoom straight into the middle of the little green screen
      intro.style.setProperty('--zoom-x', `${(finalLeft + width * SCREEN_CENTER_X).toFixed(1)}px`)
      intro.style.setProperty('--zoom-y', `${(finalTop + height * SCREEN_CENTER_Y).toFixed(1)}px`)
    }
    setPicked(id)
    setPhase('clearing')
  }, [])

  useEffect(() => {
    if (phase === 'shelf' || phase === 'done') return
    if (phase === 'booting' && !soundPlayed.current) {
      soundPlayed.current = true
      playClunkThenDing()
    }
    const next: Record<Exclude<Phase, 'shelf' | 'done'>, [Phase, number]> = {
      clearing: ['inserting', CLEAR_MS],
      inserting: ['booting', INSERT_MS],
      booting: ['zooming', BOOT_MS],
      zooming: ['reveal', ZOOM_MS],
      reveal: ['done', REVEAL_MS],
    }
    const [target, delay] = next[phase]
    const timer = setTimeout(() => setPhase(target), delay)
    return () => clearTimeout(timer)
  }, [phase])

  useEffect(() => {
    if (phase === 'done') return
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setPhase('done')
      else if (phase === 'shelf' && event.key === 'Enter') pick('resume')
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [phase, pick])

  if (phase === 'done') return null

  // hand-off: the green screen washes out over a skeleton of the page
  if (phase === 'reveal') {
    return (
      <>
        <SkeletonPage />
        <div className="gb-reveal" aria-hidden="true" />
      </>
    )
  }

  const consoleLive = phase !== 'shelf' && phase !== 'clearing'

  return (
    <div ref={introRef} className={`gb-intro gb-intro--${phase}`} role="dialog" aria-label="Retro intro — press Escape to skip">
      <div className="gb-room-bg" aria-hidden="true" />

      <div className="gb-stage" ref={stageRef}>
        <div className="gb-welcome">
          <p className="gb-welcome-line">
            {greeting}, and welcome — I&apos;m {resume.nickname}.
          </p>
          <p className="gb-welcome-title" role="heading" aria-level={2}>
            CHOOSE YOUR CARTRIDGE
          </p>
          <p className="gb-welcome-sub">Thank you for stopping by. Please pick a cartridge to begin.</p>
        </div>

        <div className="gb-console-holder" ref={consoleRef} aria-hidden="true">
          <GbConsoleArt ledOn={consoleLive} />
          <div className="gb-screen-overlay">
            {(phase === 'booting' || phase === 'zooming') && (
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

        <div className="gb-shelf">
          <div className="gb-shelf-row">
            {CARTRIDGES.map((cart) => (
              <button
                key={cart.id}
                ref={(node) => {
                  cartRefs.current[cart.id] = node
                }}
                type="button"
                className={[
                  'gb-cart',
                  `gb-cart--${cart.ready ? 'ready' : 'empty'}`,
                  picked === cart.id ? 'gb-cart--picked' : '',
                  picked && picked !== cart.id ? 'gb-cart--dismissed' : '',
                ]
                  .filter(Boolean)
                  .join(' ')}
                style={{ ['--cart-color' as string]: cart.color }}
                onClick={cart.ready && !picked ? () => pick(cart.id) : undefined}
                onPointerEnter={() => setHovered(cart.id)}
                onPointerLeave={() => setHovered((c) => (c === cart.id ? null : c))}
                onFocus={() => setHovered(cart.id)}
                onBlur={() => setHovered((c) => (c === cart.id ? null : c))}
                disabled={!cart.ready}
                aria-label={`${cart.label} — ${cart.ready ? cart.subtitle : 'coming soon'}`}
              >
                <span className="gb-cart-body">
                  <span className="gb-cart-shine" aria-hidden="true" />
                  <span className="gb-cart-notch" aria-hidden="true" />
                  <span className="gb-cart-label">{cart.label}</span>
                  <span className="gb-cart-sub">{cart.subtitle}</span>
                  {cart.ready ? (
                    <span className="gb-cart-badge">PRESS ▶</span>
                  ) : (
                    <span className="gb-cart-soon">COMING SOON</span>
                  )}
                </span>
              </button>
            ))}
          </div>
          <div className="gb-shelf-board" aria-hidden="true">
            <span className="gb-shelf-front" />
          </div>
        </div>

        <p className="gb-shelf-status" aria-live="polite">
          {hovered
            ? CARTRIDGES.find((cart) => cart.id === hovered)?.ready
              ? '▶ RESUME — my work, skills and experience'
              : '✦ still in development — check back soon'
            : '▶ click a cartridge to load'}
        </p>
      </div>

      <button type="button" className="gb-skip" onClick={() => setPhase('done')}>
        SKIP ▸▸
      </button>
    </div>
  )
}
