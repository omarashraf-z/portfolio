import { site } from '../data/site'

export function Footer() {
  return (
    <footer className="footer">
      <div className="shell">
        <div className="footer__cta">
          <span className="label">Got something to build?</span>
          <a className="footer__mail" href={`mailto:${site.email}`}>
            {site.email}
          </a>
          {site.available && <p className="body-muted">{site.availableNote}.</p>}
        </div>

        <div className="footer__base">
          <span className="label">
            © {new Date().getFullYear()} {site.name} — {site.location}
          </span>

          <div className="footer__social">
            {site.socials.map((social) => (
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
