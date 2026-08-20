import './bento.css'
import { HeroTile } from './tiles/HeroTile'
import { ContactTile } from './tiles/ContactTile'
import { SkillsTile } from './tiles/SkillsTile'
import { ExperienceTile } from './tiles/ExperienceTile'
import { EducationTile } from './tiles/EducationTile'
import { LinksTile } from './tiles/LinksTile'

export function BentoGrid() {
  return (
    <main className="bento">
      <HeroTile />
      <ContactTile />
      <SkillsTile />
      <ExperienceTile />
      <EducationTile />
      <LinksTile />
    </main>
  )
}
