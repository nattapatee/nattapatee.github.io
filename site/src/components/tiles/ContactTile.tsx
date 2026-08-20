import { resume } from '../../data/resume'

export function ContactTile() {
  const { email, phone, line } = resume.contact

  return (
    <section className="tile tile--contact" aria-labelledby="contact-heading">
      <h2 id="contact-heading">Contact</h2>
      <p className="contact-row"><b>Email</b> <a href={`mailto:${email}`}>{email}</a></p>
      <p className="contact-row"><b>Tel</b> <a href={`tel:${phone.replaceAll('-', '')}`}>{phone}</a></p>
      <p className="contact-row"><b>Line</b> {line}</p>
    </section>
  )
}
