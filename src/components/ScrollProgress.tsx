import { useEffect, useRef } from 'react'

/** The 1px line across the top that tracks how far down the page you are. */
export function ScrollProgress() {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    let frame = 0

    const measure = () => {
      frame = 0
      const el = ref.current
      if (!el) return
      const doc = document.documentElement
      const travel = doc.scrollHeight - window.innerHeight
      const progress = travel > 0 ? Math.min(window.scrollY / travel, 1) : 0
      el.style.transform = `scaleX(${progress})`
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
  }, [])

  return <div ref={ref} className="progress" style={{ width: '100%', transform: 'scaleX(0)' }} />
}
