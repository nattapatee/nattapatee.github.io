import './bento.css'
import { HeroTile } from './tiles/HeroTile'
import { ContactTile } from './tiles/ContactTile'
import { SkillsTile } from './tiles/SkillsTile'
import { ExperienceTile } from './tiles/ExperienceTile'
import { EducationTile } from './tiles/EducationTile'
import { LinksTile } from './tiles/LinksTile'

export function BentoGrid() {
  const tiles = [HeroTile, ContactTile, SkillsTile, ExperienceTile, EducationTile, LinksTile]

  return (
    <main className="bento">
      {tiles.map((Tile, index) => (
        <div key={Tile.name} style={{ display: 'contents', ['--tile-index' as string]: index }}>
          <Tile />
        </div>
      ))}
    </main>
  )
}
