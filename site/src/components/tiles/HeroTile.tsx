import { resume } from '../../data/resume'
import { useTypewriter } from '../../hooks/useTypewriter'

const STATS = [
  { label: 'Experience', value: '7+ yrs', fill: 0.8 },
  { label: 'Frontend', value: 'main', fill: 0.9 },
  { label: 'Backend', value: 'when needed', fill: 0.55 },
]

export function HeroTile() {
  const typedRole = useTypewriter(resume.role)

  return (
    <section className="tile tile--hero panel" aria-labelledby="hero-heading">
      <span className="panel-title panel-title--corner">Profile</span>

      <div className="hero-head">
        <div>
          <h1 id="hero-heading" className="hero-name" data-text={resume.name}>
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

      <p className="hero-summary">{resume.summary}</p>

      <ul className="stat-list">
        {STATS.map((stat) => (
          <li className="stat-row" key={stat.label}>
            <span className="stat-label">{stat.label}</span>
            <span className="stat-bar" aria-hidden="true">
              <i style={{ width: `${stat.fill * 100}%` }} />
            </span>
            <span className="stat-value">{stat.value}</span>
          </li>
        ))}
      </ul>

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
