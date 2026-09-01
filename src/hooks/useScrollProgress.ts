import { useEffect, type RefObject } from 'react'

/**
 * Reports how far the page has scrolled through a tall element, 0 → 1.
 *
 * 0 is the moment the element's top reaches the top of the viewport, 1 is
 * when its bottom reaches the bottom. Used to drive the scroll video: the
 * element is a tall track, the video inside it sits sticky and scrubs.
 *
 * The value goes to a callback rather than state — this fires on every frame
 * of a scroll, and re-rendering React that often would drop frames.
 */
export function useScrollProgress(
  ref: RefObject<HTMLElement | null>,
  onChange: (progress: number) => void,
) {
  useEffect(() => {
    const el = ref.current
    if (!el) return

    let frame = 0
    let last = -1

    const measure = () => {
      frame = 0
      const rect = el.getBoundingClientRect()
      const travel = rect.height - window.innerHeight

      // Too short to scrub through — treat it as fully scrolled.
      if (travel <= 0) {
        if (last !== 1) { last = 1; onChange(1) }
        return
      }

      const progress = Math.min(Math.max(-rect.top / travel, 0), 1)
      if (Math.abs(progress - last) < 0.0005) return
      last = progress
      onChange(progress)
    }

    const schedule = () => {
      if (frame) return
      frame = requestAnimationFrame(measure)
    }

    measure()
    window.addEventListener('scroll', schedule, { passive: true })
    window.addEventListener('resize', schedule)

    return () => {
      if (frame) cancelAnimationFrame(frame)
      window.removeEventListener('scroll', schedule)
      window.removeEventListener('resize', schedule)
    }
  }, [ref, onChange])
}

/** True when the user has asked the OS for less motion. */
export function prefersReducedMotion() {
  return (
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches
  )
}
