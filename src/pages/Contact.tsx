import { useCallback, useState } from 'react'
import { channels, site } from '../data/site'
import { Reveal } from '../components/Reveal'

/** Every way to reach him, with email as the one that matters most. */
export function Contact() {
  const [copied, setCopied] = useState(false)

  const copyEmail = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(site.email)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 2000)
    } catch {
      // Clipboard refused (an insecure origin, or permission denied) — the
      // address is on screen and the mailto link still works.
    }
  }, [])

  return (
    <>
      <section className="shell section section--tight">
        <h1 className="h1">Contact</h1>
        <p className="lede" style={{ paddingTop: '1.25rem' }}>
          {site.available
            ? `${site.availableNote}. Tell me what you are building and roughly when you need it.`
            : 'Tell me what you are building and roughly when you need it.'}
        </p>
      </section>

      <hr className="rule" />

      <section className="shell section">
        <div className="contact-lead">
          <span className="label">Write to me</span>
          <a className="mail-xl" href={`mailto:${site.email}`}>
            {site.email}
          </a>
          <div className="contact-lead__actions">
            <a className="btn btn--solid" href={`mailto:${site.email}`}>
              Open in your mail app
            </a>
            <button className="btn btn--ghost" onClick={copyEmail}>
              {copied ? 'Copied' : 'Copy address'}
            </button>
          </div>
        </div>
      </section>

      <section className="shell section--tight">
        <div className="section-head">
          <span className="label">Everywhere else</span>
          <div className="channels">
            {channels.map((channel, i) => (
              <Reveal key={channel.label} delay={i * 70}>
                <div className="channel">
                  <span>{channel.label}</span>
                  <div className="channel__body">
                    <a
                      className="channel__link"
                      href={channel.href}
                      {...(channel.href.startsWith('http')
                        ? { target: '_blank', rel: 'noreferrer noopener' }
                        : {})}
                    >
                      {channel.value}
                    </a>
                    {channel.note && <p className="channel__note">{channel.note}</p>}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
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
                Working remotely with clients anywhere. Email reaches me fastest during
                the day in Cairo, and I answer everything within a day or so.
              </p>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  )
}
