import { resume } from '../../data/resume'

export function LinksTile() {
  return (
    <section className="tile tile--links" aria-labelledby="links-heading">
      <h2 id="links-heading">Find me</h2>
      <div className="links-buttons">
        <a className="brutal-button" href={resume.links.github} target="_blank" rel="noreferrer">
          GitHub ↗
        </a>
        <a className="brutal-button" href={resume.links.linkedin} target="_blank" rel="noreferrer">
          LinkedIn ↗
        </a>
        <button className="brutal-button" type="button" onClick={() => window.print()}>
          Print resume 🖨
        </button>
      </div>
    </section>
  )
}
