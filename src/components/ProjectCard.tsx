import { Link } from 'react-router-dom'
import type { Project } from '../data/projects'
import { Media } from './Media'

export function ProjectCard({ project, wide = false }: { project: Project; wide?: boolean }) {
  return (
    <Link
      to={`/work/${project.slug}`}
      className={`card ${wide ? 'card--wide' : ''}`.trim()}
      aria-label={`${project.title} — ${project.summary}`}
    >
      <div className="card__frame">
        <Media src={project.cover} alt={`${project.title} — cover`} />
      </div>

      <div className="card__meta">
        <div>
          <div className="card__title">
            <h3 className="h3">{project.title}</h3>
            <span className="label">{project.kind}</span>
          </div>
          <p className="card__summary">{project.summary}</p>
        </div>

        <div className="card__title">
          <span className="label">{project.year}</span>
          <span className="card__arrow" aria-hidden="true">↗</span>
        </div>
      </div>
    </Link>
  )
}
