import { projects } from '../data/projects'
import { ProjectCard } from '../components/ProjectCard'
import { Reveal } from '../components/Reveal'

/**
 * Every project, newest first as listed in projects.ts. This is the page the
 * pictures and videos land on once they arrive — nothing here changes when
 * they do, the cards just stop showing placeholders.
 */
export function Work() {
  return (
    <>
      <section className="shell section section--tight">
        <h1 className="h1">Work</h1>
        <p className="lede" style={{ paddingTop: '1.25rem' }}>
          {projects.length} {projects.length === 1 ? 'project' : 'projects'}. Open one to scroll
          through the whole site and test the live version.
        </p>
      </section>

      <hr className="rule" />

      <section className="shell section">
        <div className="work-grid">
          {projects.map((project, i) => (
            <Reveal key={project.slug} delay={(i % 2) * 80}>
              <ProjectCard project={project} />
            </Reveal>
          ))}
        </div>
      </section>
    </>
  )
}
