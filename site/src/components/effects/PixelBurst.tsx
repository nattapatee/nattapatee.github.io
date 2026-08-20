import { useEffect } from 'react'
import { useReducedMotion } from '../../hooks/useReducedMotion'

const COLORS = ['#ff5c8a', '#5ce1e6', '#b4ff5c', '#c99cff', '#111111']
const PARTICLES = 10
const BURST_MS = 550

export function PixelBurst() {
  const reduced = useReducedMotion()

  useEffect(() => {
    if (reduced) return

    const onClick = (event: MouseEvent) => {
      for (let i = 0; i < PARTICLES; i++) {
        const piece = document.createElement('div')
        piece.className = 'pixel-piece'
        piece.style.left = `${event.clientX}px`
        piece.style.top = `${event.clientY}px`
        piece.style.background = COLORS[i % COLORS.length]
        document.body.appendChild(piece)

        const angle = (Math.PI * 2 * i) / PARTICLES + Math.random() * 0.5
        const distance = 40 + Math.random() * 50
        piece
          .animate(
            [
              { transform: 'translate(-50%, -50%) scale(1)', opacity: 1 },
              {
                transform: `translate(calc(-50% + ${Math.cos(angle) * distance}px), calc(-50% + ${Math.sin(angle) * distance}px)) scale(0)`,
                opacity: 0.6,
              },
            ],
            { duration: BURST_MS, easing: 'steps(6)' },
          )
          .finished.finally(() => piece.remove())
      }
    }

    window.addEventListener('click', onClick)
    return () => window.removeEventListener('click', onClick)
  }, [reduced])

  return null
}
