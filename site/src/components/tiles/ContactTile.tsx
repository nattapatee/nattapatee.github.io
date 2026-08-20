import { resume } from '../../data/resume'

export function ContactTile() {
  const { email, phone, line } = resume.contact

  return (
    <section className="tile tile--contact panel" aria-labelledby="contact-heading">
      <h2 id="contact-heading" className="panel-title">
        Contact
      </h2>
      <ul className="menu-list">
        <li className="menu-row">
          <span className="menu-key">Email</span>
          <a href={`mailto:${email}`}>{email}</a>
        </li>
        <li className="menu-row">
          <span className="menu-key">Tel</span>
          <a href={`tel:${phone.replaceAll('-', '')}`}>{phone}</a>
        </li>
        <li className="menu-row">
          <span className="menu-key">Line</span>
          <span>{line}</span>
        </li>
      </ul>
    </section>
  )
}
