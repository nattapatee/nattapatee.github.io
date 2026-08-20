import { resume } from '../../data/resume'

export function LinksTile() {
  return (
    <section className="tile tile--links panel" aria-labelledby="links-heading">
      <h2 id="links-heading" className="panel-title">
        Find me
      </h2>
      <div className="links-buttons">
        <a className="brutal-button" href={resume.links.github} target="_blank" rel="noreferrer">
          <span className="menu-cursor" aria-hidden="true">
            ▶
          </span>
          GitHub ↗
        </a>
        <a className="brutal-button" href={resume.links.linkedin} target="_blank" rel="noreferrer">
          <span className="menu-cursor" aria-hidden="true">
            ▶
          </span>
          LinkedIn ↗
        </a>
        <button className="brutal-button" type="button" onClick={() => window.print()}>
          <span className="menu-cursor" aria-hidden="true">
            ▶
          </span>
          Print resume 🖨
        </button>
      </div>
    </section>
  )
}
