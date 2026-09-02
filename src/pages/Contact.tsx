import { channels, site } from '../data/site'
import { BrandIcon } from '../components/BrandIcon'
import { Reveal } from '../components/Reveal'

/**
 * Everywhere to reach him. The channels are marks rather than names — the
 * logos read faster than a list of words, and each carries its name for
 * screen readers and on hover.
 *
 * The page's words all sit in the left column so the marks have something
 * tall to travel alongside: on a wide screen they stick to the middle of the
 * viewport and stay there for the length of the page.
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
          <div className="contact-body">
            <p className="lede">
              {site.available
                ? `${site.availableNote}. Tell me what you are building and roughly when you need it — email is the surest way, and I answer everything within a day or so.`
                : 'Tell me what you are building and roughly when you need it — email is the surest way, and I answer everything within a day or so.'}
            </p>

            <div className="contact-where">
              <span className="label">Where</span>
              <Reveal>
                <p className="h3">{site.location}</p>
              </Reveal>
              <Reveal delay={80}>
                <p className="body-muted">
                  Working remotely with clients anywhere. Email reaches me fastest during the
                  day in Cairo, and I answer everything within a day or so.
                </p>
              </Reveal>
            </div>
          </div>

          <ul className="contact-links">
            {channels.map((channel, i) => (
              <li key={channel.label}>
                <Reveal delay={i * 70}>
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
                </Reveal>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  )
}
