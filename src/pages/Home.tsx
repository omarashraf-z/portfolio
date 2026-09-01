import type { CSSProperties } from 'react'
import { Link } from 'react-router-dom'
import { site } from '../data/site'
import { featuredProjects, projects } from '../data/projects'
import { ProjectCard } from '../components/ProjectCard'
import { Reveal } from '../components/Reveal'

export function Home() {
  return (
    <>
      <section className="shell hero">
        <h1 className="display">
          {site.headline.map((line, i) => (
            <span className="hero__line" key={line}>
              <span style={{ '--i': i } as CSSProperties}>
                {i === site.headline.length - 1 ? <span className="hero__dim">{line}</span> : line}
              </span>
            </span>
          ))}
        </h1>

        <div className="hero__meta">
          <p className="lede">{site.lede}</p>
        </div>

        <div className="hero__scroll">
          <span className="hero__scroll-line" aria-hidden="true" />
          <span className="label">Scroll</span>
        </div>
      </section>

      <hr className="rule" />

      <section className="shell section">
        <div className="section-head">
          <span className="label">Selected work</span>
          <p className="lede">
            Each one has a recording of the whole site and a live preview you can click
            around in.
          </p>
        </div>

        <div className="work-grid work-grid--feature">
          {featuredProjects.map((project, i) => (
            <Reveal key={project.slug} delay={i * 80}>
              <ProjectCard project={project} wide />
            </Reveal>
          ))}
        </div>

        {projects.length > featuredProjects.length && (
          <Reveal>
            <div style={{ paddingTop: 'clamp(2.5rem, 6vh, 4rem)' }}>
              <Link className="btn" to="/work">
                All work ({projects.length}) <span aria-hidden="true">→</span>
              </Link>
            </div>
          </Reveal>
        )}
      </section>

      <hr className="rule" />

      <section className="shell section">
        <div className="section-head">
          <span className="label">Approach</span>
          <div style={{ display: 'grid', gap: '1.25rem' }}>
            <Reveal>
              <p className="h2">{site.about.intro}</p>
            </Reveal>
            <Reveal delay={90}>
              <p className="body-muted">{site.about.detail}</p>
            </Reveal>
            <Reveal delay={160}>
              <div style={{ paddingTop: '0.75rem' }}>
                <Link className="btn btn--ghost" to="/about">
                  More about me <span aria-hidden="true">→</span>
                </Link>
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  )
}
