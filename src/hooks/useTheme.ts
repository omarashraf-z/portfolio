import { useCallback, useEffect, useState } from 'react'

export type Theme = 'dark' | 'light'

const KEY = 'theme'

/** Dark is the site's identity, so it is the default rather than the OS. */
export function readTheme(): Theme {
  try {
    return localStorage.getItem(KEY) === 'light' ? 'light' : 'dark'
  } catch {
    // Private mode, or storage blocked — the choice just won't be remembered.
    return 'dark'
  }
}

/**
 * Applies the theme to <html data-theme> and remembers the choice.
 *
 * The same value is read by an inline script in index.html before first
 * paint, so a returning day-mode visitor never sees a flash of the dark one.
 */
export function useTheme() {
  const [theme, setTheme] = useState<Theme>(readTheme)

  useEffect(() => {
    document.documentElement.dataset.theme = theme

    try {
      localStorage.setItem(KEY, theme)
    } catch { /* not fatal */ }

    // Keeps the browser's own chrome — the phone status bar, mainly — in step.
    const meta = document.querySelector('meta[name="theme-color"]')
    if (meta) meta.setAttribute('content', theme === 'light' ? '#faf9f7' : '#0a0a0a')
  }, [theme])

  const toggle = useCallback(() => {
    setTheme((current) => (current === 'dark' ? 'light' : 'dark'))
  }, [])

  return { theme, toggle }
}
