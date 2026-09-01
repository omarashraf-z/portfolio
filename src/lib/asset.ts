/**
 * Turns a path from projects.ts ('/work/acme/cover.jpg') into a URL that
 * works both on a local dev server and under the /portfolio/ base path
 * GitHub Pages serves from.
 */
export function asset(path?: string) {
  if (!path) return undefined
  if (/^(https?:)?\/\//.test(path)) return path
  const base = import.meta.env.BASE_URL.replace(/\/$/, '')
  return `${base}${path.startsWith('/') ? path : `/${path}`}`
}

/** 'https://acme.com/shop?x=1' → 'acme.com/shop' */
export function prettyUrl(url?: string) {
  if (!url) return ''
  return url.replace(/^https?:\/\//, '').replace(/\/$/, '')
}
