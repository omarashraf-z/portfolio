import { useEffect, useState } from 'react'

/**
 * Tracks a CSS media query from JS.
 *
 * Images could pick a source with <picture media="…"> and no script, but a
 * <video> cannot — the media attribute on <source> is not honoured inside one.
 * So both go through this, and a project page shows one consistent set.
 */
export function useMediaQuery(query: string) {
  const [matches, setMatches] = useState(
    () => typeof window !== 'undefined' && window.matchMedia(query).matches,
  )

  useEffect(() => {
    const list = window.matchMedia(query)
    const onChange = () => setMatches(list.matches)

    onChange()
    list.addEventListener('change', onChange)
    return () => list.removeEventListener('change', onChange)
  }, [query])

  return matches
}

/** The width below which a project shows its phone captures. */
export const PHONE = '(max-width: 720px)'
