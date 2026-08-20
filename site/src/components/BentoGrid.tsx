import { useEffect, useRef } from 'react'
import './bento.css'
import { HeroTile } from './tiles/HeroTile'
import { ContactTile } from './tiles/ContactTile'
import { SkillsTile } from './tiles/SkillsTile'
import { ExperienceTile } from './tiles/ExperienceTile'
import { EducationTile } from './tiles/EducationTile'
import { LinksTile } from './tiles/LinksTile'

const TILT_MAX_DEG = 5

export function BentoGrid() {
  const tiles = [HeroTile, ContactTile, SkillsTile, ExperienceTile, EducationTile, LinksTile]
  const gridRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const grid = gridRef.current
    if (!grid) return
    const wants = window.matchMedia('(hover: hover) and (prefers-reduced-motion: no-preference)')
    if (!wants.matches) return

    const onMove = (event: PointerEvent) => {
      const tile = (event.target as HTMLElement).closest<HTMLElement>('.tile')
      if (!tile || !grid.contains(tile)) return
      const rect = tile.getBoundingClientRect()
      const px = (event.clientX - rect.left) / rect.width - 0.5
      const py = (event.clientY - rect.top) / rect.height - 0.5
      tile.style.transform = `rotateX(${(-py * TILT_MAX_DEG).toFixed(2)}deg) rotateY(${(px * TILT_MAX_DEG).toFixed(2)}deg) translateY(-2px)`
    }

    const onOut = (event: PointerEvent) => {
      const tile = (event.target as HTMLElement).closest<HTMLElement>('.tile')
      if (tile) tile.style.transform = ''
    }

    grid.addEventListener('pointermove', onMove)
    grid.addEventListener('pointerout', onOut)
    return () => {
      grid.removeEventListener('pointermove', onMove)
      grid.removeEventListener('pointerout', onOut)
    }
  }, [])

  return (
    <main className="bento" ref={gridRef}>
      {tiles.map((Tile, index) => (
        <div key={Tile.name} style={{ display: 'contents', ['--tile-index' as string]: index }}>
          <Tile />
        </div>
      ))}
    </main>
  )
}
