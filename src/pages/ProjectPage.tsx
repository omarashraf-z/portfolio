import { Link, useParams } from 'react-router-dom'
import { getNeighbours, getProject } from '../data/projects'
import { ScrollVideo } from '../components/ScrollVideo'
import { DeviceFrame } from '../components/DeviceFrame'
import { Media } from '../components/Media'
import { Reveal } from '../components/Reveal'
import { NotFound } from './NotFound'

export function ProjectPage() {
  const { slug } = useParams()
  const project = getProject(slug)

  if (!project) return <NotFound />

  const { prev, next } = getNeighbours(project.slug)
  const shots = project.shots ?? []

  return (
    <>
      <section className="shell project-head">
        <Link className="label" to="/work">
          ← All work
        </Link>

        <h1 className="h1" style={{ paddingTop: '1.5rem' }}>
          {project.title}
        </h1>
        <p className="lede" style={{ paddingTop: '1rem' }}>
          {project.summary}
        </p>
      </section>

      <section className="shell">
        <div className="project-facts">
          <div className="fact">
            <span className="label">Year</span>
            <span>{project.year}</span>
          </div>
          <div className="fact">
            <span className="label">Type</span>
            <span>{project.kind}</span>
          </div>
          <div className="fact">
            <span className="label">Role</span>
            <span>{project.role.join(', ')}</span>
          </div>
          <div className="fact">
            <span className="label">Built with</span>
            <div className="chips">
              {project.stack.map((tech) => (
                <span className="chip" key={tech}>
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* The scroll-through. Scrubbing this is the point of the page. */}
      <section className="section--tight">
        <ScrollVideo src={project.scrollVideo} poster={project.cover} title={project.title} />
      </section>

      {project.body && project.body.length > 0 && (
        <section className="shell section">
          <div className="section-head">
            <span className="label">The build</span>
            <div style={{ display: 'grid', gap: '1.25rem' }}>
              {project.body.map((paragraph, i) => (
                <Reveal key={i} delay={i * 80}>
                  <p className={i === 0 ? 'lede' : 'body-muted'}>{paragraph}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      <hr className="rule" />

      <section className="shell section">
        <div className="section-head">
          <span className="label">Try it</span>
          <p className="lede">
            {project.embed
              ? 'The real site, running here. Click around it — links, forms, the lot.'
              : 'This site blocks being embedded, so the live version opens in a new tab.'}
          </p>
        </div>

        <Reveal>
          <DeviceFrame
            url={project.liveUrl}
            embed={project.embed}
            cover={project.cover}
            title={project.title}
          />
        </Reveal>
      </section>

      <hr className="rule" />

      <section className="shell section">
        <div className="section-head">
          <span className="label">Pages</span>
          <p className="lede">Screens from the finished site.</p>
        </div>

        <div className="shots">
          {shots.length === 0 && (
            <div className="shot">
              <div className="shot__frame">
                <Media src={undefined} alt="" note="Add screenshots to shots[] in projects.ts." />
              </div>
            </div>
          )}

          {/* Wide shots take the full row; the rest pair up two across. */}
          {shots.map((shot, i) =>
            shot.wide ? (
              <Reveal key={shot.src} delay={(i % 2) * 80}>
                <figure className="shot">
                  <div className="shot__frame">
                    <Media src={shot.src} alt={`${project.title} — ${shot.caption ?? 'page'}`} />
                  </div>
                  {shot.caption && <figcaption className="shot__caption">{shot.caption}</figcaption>}
                </figure>
              </Reveal>
            ) : null,
          )}

          <div className="shots shots--two">
            {shots.map((shot, i) =>
              shot.wide ? null : (
                <Reveal key={shot.src} delay={(i % 2) * 80}>
                  <figure className="shot">
                    <div className="shot__frame">
                      <Media src={shot.src} alt={`${project.title} — ${shot.caption ?? 'page'}`} />
                    </div>
                    {shot.caption && (
                      <figcaption className="shot__caption">{shot.caption}</figcaption>
                    )}
                  </figure>
                </Reveal>
              ),
            )}
          </div>
        </div>
      </section>

      <section className="shell">
        <div className="pager">
          {prev ? (
            <Link className="pager__link" to={`/work/${prev.slug}`}>
              <span className="label">← Previous</span>
              <span className="h3">{prev.title}</span>
            </Link>
          ) : (
            <span />
          )}

          {next ? (
            <Link className="pager__link pager__link--next" to={`/work/${next.slug}`}>
              <span className="label">Next →</span>
              <span className="h3">{next.title}</span>
            </Link>
          ) : (
            <span />
          )}
        </div>
      </section>
    </>
  )
}
