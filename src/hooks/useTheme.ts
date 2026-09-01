import { useCallback, useEffect, useState } from 'react'

export type Theme = 'dark' | 'light'

const KEY = 'theme'

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

/** A stored choice wins; otherwise night, which is the site's identity. */
export function readTheme(): Theme {
  return storedTheme() ?? 'dark'
}

/**
 * Applies the theme to <html data-theme>.
 *
 * Night is the default rather than the visitor's OS setting, since it is the
 * site's own look. Nothing is written to storage until the toggle is actually
 * pressed, so a stored value always means somebody chose it.
 *
 * The same rule runs in an inline script in index.html before first paint, so
 * a returning day-mode visitor sees no flash of the dark one.
 */
export function useTheme() {
  const [theme, setTheme] = useState<Theme>(readTheme)

  useEffect(() => {
    document.documentElement.dataset.theme = theme

    // Keeps the browser's own chrome — the phone status bar, mainly — in step.
    const meta = document.querySelector('meta[name="theme-color"]')
    if (meta) meta.setAttribute('content', theme === 'light' ? '#faf9f7' : '#0a0a0a')
  }, [theme])

  const toggle = useCallback(() => {
    setTheme((current) => {
      const next: Theme = current === 'dark' ? 'light' : 'dark'
      try {
        localStorage.setItem(KEY, next)
      } catch { /* not fatal — it just won't be remembered */ }
      return next
    })
  }, [])

  return { theme, toggle }
}
