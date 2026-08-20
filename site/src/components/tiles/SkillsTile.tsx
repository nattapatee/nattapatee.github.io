import { resume } from '../../data/resume'

export function SkillsTile() {
  return (
    <section className="tile tile--skills" aria-labelledby="skills-heading">
      <h2 id="skills-heading">Skills</h2>
      <div className="skill-tags">
        {resume.skills.flatMap((group) =>
          group.items.map((item) => (
            <span className="skill-tag" key={`${group.category}-${item}`}>
              {item}
            </span>
          )),
        )}
      </div>
    </section>
  )
}
