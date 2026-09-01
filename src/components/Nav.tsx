import { useEffect, useRef } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { site } from '../data/site'

export function Nav() {
  const ref = useRef<HTMLElement>(null)

  // A hairline appears under the bar once the page has moved, so it reads as
  // sitting on top of the content rather than floating in it.
  useEffect(() => {
    const onScroll = () => {
      const el = ref.current
      if (el) el.dataset.stuck = window.scrollY > 8 ? 'true' : 'false'
    }

    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header ref={ref} className="nav" data-stuck="false">
      <div className="nav__inner">
        <Link to="/" className="nav__mark">
          {site.name}
        </Link>

        <nav className="nav__links" aria-label="Primary">
          <NavLink to="/work" className="nav__link">
            Work
          </NavLink>
          <NavLink to="/about" className="nav__link">
            About
          </NavLink>
          <a className="nav__link" href={`mailto:${site.email}`}>
            Contact
          </a>
        </nav>
      </div>
    </header>
  )
}
