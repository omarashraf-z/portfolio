import { useTheme } from '../hooks/useTheme'

/**
 * Switches between night and day. The icon shows the mode you would move to,
 * not the one you are in, which is the reading most people expect.
 */
export function ThemeToggle() {
  const { theme, toggle } = useTheme()
  const goingLight = theme === 'dark'

  return (
    <button
      className="theme-toggle"
      onClick={toggle}
      aria-label={goingLight ? 'Switch to day mode' : 'Switch to night mode'}
      title={goingLight ? 'Day mode' : 'Night mode'}
    >
      <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true" focusable="false">
        {goingLight ? (
          <g fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
            <circle cx="12" cy="12" r="4.2" />
            <path d="M12 2.6v2.4M12 19v2.4M2.6 12h2.4M19 12h2.4M5.4 5.4l1.7 1.7M16.9 16.9l1.7 1.7M18.6 5.4l-1.7 1.7M7.1 16.9l-1.7 1.7" />
          </g>
        ) : (
          <path
            fill="currentColor"
            d="M20.3 14.6A8.4 8.4 0 0 1 9.4 3.7a8.5 8.5 0 1 0 10.9 10.9Z"
          />
        )}
      </svg>
    </button>
  )
}
