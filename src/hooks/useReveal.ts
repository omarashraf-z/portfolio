import { useEffect, useRef } from 'react'

/**
 * Sets data-visible="true" on the element the first time it enters the
 * viewport. The CSS in .reveal does the actual animating; this only decides
 * when. One-shot on purpose — things do not re-animate when you scroll back.
 */
export function useReveal<T extends HTMLElement>(threshold = 0.15) {
  const ref = useRef<T>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    // No IntersectionObserver (or reduced motion) — just show it.
    if (typeof IntersectionObserver === 'undefined') {
      el.dataset.visible = 'true'
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue
          el.dataset.visible = 'true'
          observer.unobserve(el)
        }
      },
      { threshold, rootMargin: '0px 0px -8% 0px' },
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [threshold])

  return ref
}
