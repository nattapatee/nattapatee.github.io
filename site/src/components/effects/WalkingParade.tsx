import { useEffect, useRef, useState } from 'react'
import { useReducedMotion } from '../../hooks/useReducedMotion'

const WALKERS = [
  { name: 'tee', frames: ['/sprites/tee-a.svg', '/sprites/tee-b.svg'], width: 44, height: 66 },
  { name: 'bird', frames: ['/sprites/bird-a.svg', '/sprites/bird-b.svg'], width: 36, height: 36 },
  { name: 'turtle', frames: ['/sprites/turtle-a.svg', '/sprites/turtle-b.svg'], width: 36, height: 36 },
  { name: 'blob', frames: ['/sprites/blob-a.svg', '/sprites/blob-b.svg'], width: 36, height: 36 },
]

const SPEED_PX_PER_S = 55
const FRAME_MS = 180
const PARADE_WIDTH = 200

export function WalkingParade() {
  const reduced = useReducedMotion()
  const paradeRef = useRef<HTMLDivElement>(null)
  const [frame, setFrame] = useState(0)
  const [hopping, setHopping] = useState(false)

  useEffect(() => {
    if (reduced) return
    const timer = setInterval(() => setFrame((f) => (f + 1) % 2), FRAME_MS)
    return () => clearInterval(timer)
  }, [reduced])

  useEffect(() => {
    if (reduced) return
    const el = paradeRef.current
    if (!el) return

    let x = -PARADE_WIDTH
    let dir = 1
    let last = performance.now()
    let raf = 0

    const step = (now: number) => {
      const dt = (now - last) / 1000
      last = now
      x += dir * SPEED_PX_PER_S * dt
      const max = window.innerWidth - PARADE_WIDTH
      if (x > max) {
        x = max
        dir = -1
      } else if (x < 0 && dir === -1) {
        x = 0
        dir = 1
      }
      el.style.transform = `translateX(${x}px)`
      el.style.setProperty('--walk-dir', String(dir))
      raf = requestAnimationFrame(step)
    }
    raf = requestAnimationFrame(step)
    return () => cancelAnimationFrame(raf)
  }, [reduced])

  if (reduced) return null

  const onHop = () => {
    setHopping(true)
    setTimeout(() => setHopping(false), 500)
  }

  return (
    <div
      ref={paradeRef}
      className={`parade ${hopping ? 'parade--hop' : ''}`}
      onPointerDown={onHop}
      aria-hidden="true"
    >
      {WALKERS.map((walker, index) => (
        <img
          key={walker.name}
          className="parade-walker"
          style={{ animationDelay: `${index * 90}ms` }}
          src={walker.frames[frame]}
          alt=""
          width={walker.width}
          height={walker.height}
        />
      ))}
    </div>
  )
}
