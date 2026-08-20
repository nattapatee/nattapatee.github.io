import { resume } from '../../data/resume'

export function ExperienceTile() {
  return (
    <section className="tile tile--experience panel" aria-labelledby="experience-heading">
      <h2 id="experience-heading" className="panel-title">
        Experience
      </h2>
      {resume.experience.map((job) => (
        <article className="xp-item" key={`${job.company}-${job.period}`}>
          <div className="xp-head">
            <span className="xp-company">
              <span className="xp-cursor" aria-hidden="true">
                ▶
              </span>
              {job.role} @ {job.company}
            </span>
            <span className="xp-period">{job.period}</span>
          </div>
          <ul className="xp-bullets">
            {job.bullets.map((bullet) => (
              <li key={bullet}>{bullet}</li>
            ))}
          </ul>
        </article>
      ))}
    </section>
  )
}
