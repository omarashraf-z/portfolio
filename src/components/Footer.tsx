import { site, socials } from '../data/site'

export function Footer() {
  return (
    <footer className="footer">
      <div className="shell">

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
