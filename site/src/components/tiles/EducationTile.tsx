import { resume } from '../../data/resume'

export function EducationTile() {
  const { degree, faculty, university, period, gpa } = resume.education

  return (
    <section className="tile tile--education" aria-labelledby="education-heading">
      <h2 id="education-heading">Education</h2>
      <p style={{ fontWeight: 700 }}>{degree}</p>
      <p>{faculty}</p>
      <p>{university}</p>
      <p className="xp-period" style={{ marginTop: 6 }}>
        {period} · GPA {gpa}
      </p>
    </section>
  )
}
