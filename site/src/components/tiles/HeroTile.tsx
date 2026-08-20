import { resume } from '../../data/resume'
import { useTypewriter } from '../../hooks/useTypewriter'

export function HeroTile() {
  const typedRole = useTypewriter(resume.role)

  return (
    <section className="tile tile--hero" aria-labelledby="hero-heading">
      <div className="hero-head">
        <div>
          <h1 id="hero-heading" className="hero-name">
            {resume.name}
          </h1>
          <p className="hero-role">{typedRole}</p>
        </div>
        <img
          className="hero-avatar"
          src="/avatar-pixel.png"
          alt={`Pixel-art portrait of ${resume.name}`}
          width={112}
          height={112}
        />
      </div>
      <p style={{ marginTop: 16, lineHeight: 1.6 }}>{resume.summary}</p>
      <img
        className="hero-sprite"
        src="/sprite-tee.svg"
        alt=""
        aria-hidden="true"
        width={64}
        height={96}
      />
    </section>
  )
}
