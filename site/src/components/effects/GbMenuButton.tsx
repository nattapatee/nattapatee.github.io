import { useEffect, useRef, useState } from 'react'
import { GbConsoleArt } from './GbConsoleArt'
import './gameboy.css'

const MENU_ITEMS = [
  { id: 'resume', label: 'RESUME', status: 'now-playing' },
  { id: 'gallery', label: 'GALLERY', status: 'soon' },
  { id: 'mystery', label: '???', status: 'soon' },
] as const

interface GbMenuButtonProps {
  onReplayIntro: () => void
}

export function GbMenuButton({ onReplayIntro }: GbMenuButtonProps) {
  const [open, setOpen] = useState(false)
  const wrapRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!open) return
    const onAway = (event: PointerEvent) => {
      if (!wrapRef.current?.contains(event.target as Node)) setOpen(false)
    }
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false)
    }
    window.addEventListener('pointerdown', onAway)
    window.addEventListener('keydown', onKey)
    return () => {
      window.removeEventListener('pointerdown', onAway)
      window.removeEventListener('keydown', onKey)
    }
  }, [open])

  return (
    <div className="gb-menu-wrap" ref={wrapRef}>
      {open && (
        <div className="gb-menu" role="menu" aria-label="Cartridge menu">
          <p className="gb-menu-title">— MENU —</p>
          {MENU_ITEMS.map((item) => (
            <button
              key={item.id}
              type="button"
              role="menuitem"
              className={`gb-menu-item gb-menu-item--${item.status}`}
              disabled={item.status === 'soon'}
            >
              <span>{item.label}</span>
              <span className="gb-menu-tag">
                {item.status === 'now-playing' ? '▶ NOW PLAYING' : 'COMING SOON'}
              </span>
            </button>
          ))}
          <button
            type="button"
            role="menuitem"
            className="gb-menu-item gb-menu-item--action"
            onClick={() => {
              setOpen(false)
              onReplayIntro()
            }}
          >
            <span>REPLAY INTRO</span>
            <span className="gb-menu-tag">↻</span>
          </button>
        </div>
      )}
      <button
        type="button"
        className="gb-menu-fab"
        aria-label={open ? 'Close cartridge menu' : 'Open cartridge menu'}
        aria-expanded={open}
        onClick={() => setOpen((value) => !value)}
      >
        <GbConsoleArt ledOn={open} />
      </button>
    </div>
  )
}
