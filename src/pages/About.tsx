import { site } from '../data/site'
import { Reveal } from '../components/Reveal'

export function About() {
  return (
    <>
      <section className="shell section section--tight">
        <h1 className="h1">About</h1>
      </section>

      <hr className="rule" />

      <section className="shell section">
        <div className="about-grid">
          <div style={{ display: 'grid', gap: '1.5rem' }}>
            <Reveal>
              <p className="h2">{site.about.intro}</p>
            </Reveal>
            <Reveal delay={90}>
              <p className="body-muted">{site.about.detail}</p>
            </Reveal>
          </div>

          <Reveal delay={140}>
            <div style={{ display: 'grid', gap: '1.5rem' }}>
              <div className="fact">
                <span className="label">Based in</span>
                <span>{site.location}</span>
              </div>
              <div className="fact">
                <span className="label">Email</span>
                <a href={`mailto:${site.email}`} style={{ textDecoration: 'underline' }}>
                  {site.email}
                </a>
              </div>
              <div className="fact">
                <span className="label">Elsewhere</span>
                <div className="chips">
                  {site.socials.map((social) => (
                    <a
                      className="chip"
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noreferrer noopener"
                    >
                      {social.label} ↗
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="shell section">
        <div className="section-head">
          <span className="label">What I do</span>
          <div className="list-rows">
            {site.services.map((service, i) => (
              <Reveal key={service.label} delay={i * 70}>
                <div className="list-row">
                  <span>{service.label}</span>
                  <span className="body-muted">{service.items}</span>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
