import { useLocation } from 'react-router-dom'
import { site, socials } from '../data/site'

export function Footer() {
  // The footer's pitch points at the contact page, so on the contact page it
  // is just the same oversized address twice on one screen.
  const onContact = useLocation().pathname === '/contact'

  return (
    <footer className="footer">
      <div className="shell">
        {!onContact && (
        <div className="footer__cta">
          <span className="label">Got something to build?</span>
          <a className="mail-xl" href={`mailto:${site.email}`}>
            {site.email}
          </a>
          {site.available && <p className="body-muted">{site.availableNote}.</p>}
        </div>
        )}

        <div className="footer__base">
          <span className="label">
            © {new Date().getFullYear()} {site.name} — {site.location}
          </span>

          <div className="footer__social">
            {socials.map((social) => (
              <a key={social.label} href={social.href} target="_blank" rel="noreferrer noopener">
                {social.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
