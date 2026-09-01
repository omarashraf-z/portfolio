import { useCallback, useEffect, useState } from 'react'

export type Theme = 'dark' | 'light'

const KEY = 'theme'
const QUERY = '(prefers-color-scheme: light)'

/** The visitor's own choice, if they have made one. */
function storedTheme(): Theme | null {
  try {
    const value = localStorage.getItem(KEY)
    return value === 'light' || value === 'dark' ? value : null
  } catch {
    // Private mode, or storage blocked — treat it as no choice made.
    return null
  }
}

function systemTheme(): Theme {
  return typeof window !== 'undefined' && window.matchMedia(QUERY).matches ? 'light' : 'dark'
}

/** A stored choice wins; otherwise follow the operating system. */
export function readTheme(): Theme {
  return storedTheme() ?? systemTheme()
}

/**
 * Applies the theme to <html data-theme>.
 *
 * Nothing is written to storage until the visitor actually presses the
 * toggle — writing on load would record a "choice" they never made and stop
 * the site following their OS from then on. Until they do press it, a system
 * theme change is picked up live.
 *
 * The same rule runs in an inline script in index.html before first paint, so
 * there is no flash of the wrong theme.
 */
export function useTheme() {
  const [theme, setTheme] = useState<Theme>(readTheme)
  const [chosen, setChosen] = useState(() => storedTheme() !== null)

  useEffect(() => {
    document.documentElement.dataset.theme = theme

    // Keeps the browser's own chrome — the phone status bar, mainly — in step.
    const meta = document.querySelector('meta[name="theme-color"]')
    if (meta) meta.setAttribute('content', theme === 'light' ? '#faf9f7' : '#0a0a0a')
  }, [theme])

  useEffect(() => {
    if (chosen) return

    const query = window.matchMedia(QUERY)
    const onChange = () => setTheme(query.matches ? 'light' : 'dark')

    query.addEventListener('change', onChange)
    return () => query.removeEventListener('change', onChange)
  }, [chosen])

  const toggle = useCallback(() => {
    setTheme((current) => {
      const next: Theme = current === 'dark' ? 'light' : 'dark'
      try {
        localStorage.setItem(KEY, next)
      } catch { /* not fatal — it just won't be remembered */ }
      return next
    })
    setChosen(true)
  }, [])

  return { theme, toggle }
}
