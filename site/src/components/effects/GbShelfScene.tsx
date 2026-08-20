import { useEffect, useRef, useState } from 'react'
import { resume } from '../../data/resume'

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

const GREETING_BY_HOUR = (hour: number) => {
  if (hour < 5) return 'Working late'
  if (hour < 12) return 'Good morning'
  if (hour < 17) return 'Good afternoon'
  return 'Good evening'
}

interface GbShelfSceneProps {
  onPick: () => void
}

export function GbShelfScene({ onPick }: GbShelfSceneProps) {
  const [hovered, setHovered] = useState<string | null>(null)
  const [greeting, setGreeting] = useState('Welcome')
  const sceneRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setGreeting(GREETING_BY_HOUR(new Date().getHours()))
  }, [])

  useEffect(() => {
    const scene = sceneRef.current
    if (!scene) return
    const wants = window.matchMedia('(hover: hover) and (prefers-reduced-motion: no-preference)')
    if (!wants.matches) return

    const onMove = (event: PointerEvent) => {
      const px = event.clientX / window.innerWidth - 0.5
      const py = event.clientY / window.innerHeight - 0.5
      scene.style.setProperty('--par-x', `${(-px * 26).toFixed(1)}px`)
      scene.style.setProperty('--par-y', `${(-py * 14).toFixed(1)}px`)
    }
    window.addEventListener('pointermove', onMove)
    return () => window.removeEventListener('pointermove', onMove)
  }, [])

  return (
    <div className="gb-room" ref={sceneRef}>
      <div className="gb-room-bg" aria-hidden="true">
        <span className="gb-room-window">
          <i className="gb-room-moon" />
          <i className="gb-room-star gb-room-star--1" />
          <i className="gb-room-star gb-room-star--2" />
          <i className="gb-room-star gb-room-star--3" />
        </span>
        <span className="gb-room-poster">
          <b>PLAYER</b>
          <i>ONE</i>
        </span>
        <span className="gb-room-plant" />
        <span className="gb-room-tv">
          <i />
        </span>
      </div>

      <div className="gb-welcome">
        <p className="gb-welcome-line">
          {greeting}, and welcome — I&apos;m {resume.nickname}.
        </p>
        <p className="gb-welcome-title" role="heading" aria-level={2}>
          CHOOSE YOUR CARTRIDGE
        </p>
        <p className="gb-welcome-sub">
          Thank you for stopping by. Please pick a cartridge to begin.
        </p>
      </div>

      <div className="gb-shelf">
        <div className="gb-shelf-row">
          {CARTRIDGES.map((cart) => (
            <button
              key={cart.id}
              type="button"
              className={`gb-cart gb-cart--${cart.ready ? 'ready' : 'empty'}`}
              style={{ ['--cart-color' as string]: cart.color }}
              onClick={cart.ready ? onPick : undefined}
              onPointerEnter={() => setHovered(cart.id)}
              onPointerLeave={() => setHovered((current) => (current === cart.id ? null : current))}
              onFocus={() => setHovered(cart.id)}
              onBlur={() => setHovered((current) => (current === cart.id ? null : current))}
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
  )
}
