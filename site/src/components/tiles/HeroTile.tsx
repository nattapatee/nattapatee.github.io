import { resume } from '../../data/resume'
import { useTypewriter } from '../../hooks/useTypewriter'

export function HeroTile() {
  const typedRole = useTypewriter(resume.role)

  return (
    <section className="tile tile--hero" aria-labelledby="hero-heading">
      <h1 id="hero-heading" className="hero-name">
        {resume.name}
      </h1>
      <p className="hero-role">{typedRole}</p>
      <p style={{ marginTop: 16, lineHeight: 1.6 }}>{resume.summary}</p>
    </section>
  )
}
