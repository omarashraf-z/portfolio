import { Link } from 'react-router-dom'

export function NotFound() {
  return (
    <section className="shell notfound">
      <span className="label">404</span>
      <h1 className="h1">That page moved, or never existed.</h1>
      <div>
        <Link className="btn" to="/work">
          See the work <span aria-hidden="true">→</span>
        </Link>
      </div>
    </section>
  )
}
