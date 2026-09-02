import { channels, site } from '../data/site'
import { BrandIcon } from '../components/BrandIcon'
import { Reveal } from '../components/Reveal'

/**
 * Everywhere to reach him. The channels are marks rather than names — the
 * logos read faster than a list of words, and each carries its name for
 * screen readers and on hover.
 */
export function Contact() {
  return (
    <>
      <section className="shell section section--tight">
        <h1 className="h1">Contact</h1>
      </section>

      <hr className="rule" />

      <section className="shell section">
        <div className="contact-grid">
          <p className="lede">
            {site.available
              ? `${site.availableNote}. Tell me what you are building and roughly when you need it — email is the surest way, and I answer everything within a day or so.`
              : 'Tell me what you are building and roughly when you need it — email is the surest way, and I answer everything within a day or so.'}
          </p>

          <ul className="contact-links">
            {channels.map((channel, i) => (
              <Reveal key={channel.label} delay={i * 70}>
                <li>
                  <a
                    className="contact-icon"
                    href={channel.href}
                    aria-label={channel.label}
                    title={channel.label}
                    {...(channel.href.startsWith('http')
                      ? { target: '_blank', rel: 'noreferrer noopener' }
                      : {})}
                  >
                    <BrandIcon name={channel.icon} size={22} />
                  </a>
                </li>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      <section className="shell section">
        <div className="section-head">
          <span className="label">Where</span>
          <div style={{ display: 'grid', gap: '0.75rem' }}>
            <Reveal>
              <p className="h3">{site.location}</p>
            </Reveal>
            <Reveal delay={80}>
              <p className="body-muted">
                Working remotely with clients anywhere.
              </p>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  )
}
