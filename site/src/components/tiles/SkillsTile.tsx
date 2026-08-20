import { resume } from '../../data/resume'

export function SkillsTile() {
  return (
    <section className="tile tile--skills panel" aria-labelledby="skills-heading">
      <h2 id="skills-heading" className="panel-title">
        Skills
      </h2>
      {resume.skills.map((group) => (
        <div className="skill-group" key={group.category}>
          <p className="skill-group-name">{group.category}</p>
          <div className="skill-tags">
            {group.items.map((item) => (
              <span className="skill-tag" key={item}>
                <i className="skill-chip" aria-hidden="true" />
                {item}
              </span>
            ))}
          </div>
        </div>
      ))}
    </section>
  )
}
