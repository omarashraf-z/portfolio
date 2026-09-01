import type { CSSProperties, ReactNode } from 'react'
import { useReveal } from '../hooks/useReveal'

/**
 * Fades its children up as they scroll into view. `delay` staggers a run of
 * siblings — 60–90ms apart reads as one movement, more than that reads as a
 * queue.
 */
export function Reveal({
  children,
  delay = 0,
  className = '',
}: {
  children: ReactNode
  delay?: number
  className?: string
}) {
  const ref = useReveal<HTMLDivElement>()

  return (
    <div
      ref={ref}
      className={`reveal ${className}`.trim()}
      style={delay ? ({ '--reveal-delay': `${delay}ms` } as CSSProperties) : undefined}
    >
      {children}
    </div>
  )
}
