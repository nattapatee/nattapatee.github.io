import { useEffect, useState } from 'react'
import { useReducedMotion } from '../../hooks/useReducedMotion'

const AUTO_DISMISS_MS = 2500
const FADE_MS = 400

export function BootScreen() {
  const reduced = useReducedMotion()
  const [phase, setPhase] = useState<'shown' | 'fading' | 'gone'>(
    () => (reduced ? 'gone' : 'shown'),
  )

  useEffect(() => {
    if (phase !== 'shown') return
    const dismiss = () => setPhase('fading')
    const timer = setTimeout(dismiss, AUTO_DISMISS_MS)
    window.addEventListener('keydown', dismiss)
    window.addEventListener('pointerdown', dismiss)
    return () => {
      clearTimeout(timer)
      window.removeEventListener('keydown', dismiss)
      window.removeEventListener('pointerdown', dismiss)
    }
  }, [phase])

  useEffect(() => {
    if (phase !== 'fading') return
    const timer = setTimeout(() => setPhase('gone'), FADE_MS)
    return () => clearTimeout(timer)
  }, [phase])

  if (phase === 'gone') return null

  return (
    <div className={`boot-screen ${phase === 'fading' ? 'boot-screen--fading' : ''}`} aria-hidden="true">
      <img className="boot-sprite" src="/sprite-tee.svg" alt="" width={48} height={72} />
      <p className="boot-title">NATTAPAT.EXE</p>
      <p className="boot-version">v2026 — resume cartridge</p>
      <p className="boot-press">▶ PRESS START</p>
    </div>
  )
}
