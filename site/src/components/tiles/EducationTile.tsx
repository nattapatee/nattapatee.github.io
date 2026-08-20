import { resume } from '../../data/resume'

export function EducationTile() {
  const { degree, faculty, university, period, gpa } = resume.education

  return (
    <section className="tile tile--education panel" aria-labelledby="education-heading">
      <h2 id="education-heading" className="panel-title">
        Education
      </h2>
      <p className="edu-degree">{degree}</p>
      <p className="edu-line">{faculty}</p>
      <p className="edu-line">{university}</p>
      <p className="edu-meta">
        <span>{period}</span>
        <span className="edu-gpa">GPA {gpa}</span>
      </p>
    </section>
  )
}
