import { resume } from '../data/resume'

export function PrintResume() {
  return (
    <div className="print-only print-resume">
      <header>
        <p className="print-resume-name">{resume.name} ({resume.nickname})</p>
        <p>{resume.role}</p>
        <p>
          {resume.contact.email} · {resume.contact.phone} · Line: {resume.contact.line}
        </p>
        <p>
          {resume.links.github} · {resume.links.linkedin}
        </p>
      </header>

      <section>
        <h2>Summary</h2>
        <p>{resume.summary}</p>
      </section>

      <section>
        <h2>Experience</h2>
        {resume.experience.map((job) => (
          <div key={`${job.company}-${job.period}`}>
            <p>
              <strong>{job.role} — {job.company}</strong> ({job.period})
            </p>
            <ul>
              {job.bullets.map((bullet) => (
                <li key={bullet}>{bullet}</li>
              ))}
            </ul>
          </div>
        ))}
      </section>

      <section>
        <h2>Skills</h2>
        {resume.skills.map((group) => (
          <p key={group.category}>
            <strong>{group.category}:</strong> {group.items.join(', ')}
          </p>
        ))}
      </section>

      <section>
        <h2>Education</h2>
        <p>{resume.education.degree}</p>
        <p>
          {resume.education.university}, {resume.education.period} · GPA {resume.education.gpa}
        </p>
      </section>

      <section>
        <h2>Personal</h2>
        <p>Nationality: {resume.personal.nationality}</p>
        <p>Languages: {resume.personal.languages}</p>
        <p>Date of birth: {resume.personal.dateOfBirth}</p>
      </section>
    </div>
  )
}
