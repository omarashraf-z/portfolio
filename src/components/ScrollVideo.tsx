import { useCallback, useEffect, useRef, useState } from 'react'
import { asset } from '../lib/asset'
import { AssetSlot } from './AssetSlot'
import { Media } from './Media'
import { prefersReducedMotion, useScrollProgress } from '../hooks/useScrollProgress'

/** Browsers skip a <source> whose type they cannot play, so label each one. */
function mimeFor(path: string) {
  if (path.endsWith('.webm')) return 'video/webm'
  if (path.endsWith('.ogv')) return 'video/ogg'
  return 'video/mp4'
}

/**
 * The centrepiece.
 *
 * A tall invisible track holds a sticky frame. As you scroll the track, the
 * page's progress through it is mapped onto the video's playhead — so
 * scrolling the portfolio scrolls the recorded site, at whatever speed you
 * move. The video never plays on its own; it is scrubbed.
 *
 * Falls back, in order: no video file → placeholder; reduced motion → the
 * static cover; video that fails to load → the static cover.
 */
export function ScrollVideo({
  src,
  poster,
  title,
  /** Track height. Taller = slower, more deliberate scrub. */
  trackVh = 320,
}: {
  src?: string | string[]
  poster?: string
  title: string
  trackVh?: number
}) {
  const sources = src ? (Array.isArray(src) ? src : [src]) : []

  const trackRef = useRef<HTMLDivElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const barRef = useRef<HTMLDivElement>(null)
  const hintRef = useRef<HTMLDivElement>(null)
  const targetRef = useRef(0)
  const rafRef = useRef(0)

  const [failed, setFailed] = useState(false)
  const [reduced, setReduced] = useState(false)

  useEffect(() => setReduced(prefersReducedMotion()), [])

  const onProgress = useCallback((progress: number) => {
    targetRef.current = progress

    if (barRef.current) barRef.current.style.transform = `scaleX(${progress})`
    if (hintRef.current) hintRef.current.dataset.hidden = progress > 0.02 ? 'true' : 'false'

    if (rafRef.current) return

    // Ease the playhead toward the scroll position rather than snapping to it.
    // Snapping makes every scroll wheel notch a visible jump; this smooths the
    // seek without ever letting the video drift out of sync.
    const step = () => {
      const video = videoRef.current
      if (!video || !Number.isFinite(video.duration) || video.duration === 0) {
        rafRef.current = 0
        return
      }

      const want = targetRef.current * video.duration
      const diff = want - video.currentTime

      if (Math.abs(diff) < 0.008) {
        rafRef.current = 0
        return
      }

      video.currentTime += diff * 0.2
      rafRef.current = requestAnimationFrame(step)
    }

    rafRef.current = requestAnimationFrame(step)
  }, [])

  useEffect(() => () => { if (rafRef.current) cancelAnimationFrame(rafRef.current) }, [])

  useScrollProgress(trackRef, onProgress)

  const scrubbable = sources.length > 0 && !failed && !reduced

  // Nothing to scrub. Reduced motion still gets the cover image; a missing or
  // broken file says so plainly, because that is a thing to go and fix.
  if (!scrubbable) {
    return (
      <div className="shell">
        <div className="scrollvid__frame">
          {reduced && sources.length > 0 && !failed ? (
            <Media src={poster} alt={`${title} — full page`} loading="eager" />
          ) : (
            <AssetSlot
              kind="video"
              path={sources[0]}
              note={
                failed
                  ? 'Nothing loaded from this path. Add the recording as MP4 (H.264) and this section becomes scroll-scrubbable.'
                  : 'A screen recording of the whole page scrolling top to bottom. Once this file exists, scrolling this section scrubs through it.'
              }
            />
          )}
        </div>
      </div>
    )
  }

  return (
    <div ref={trackRef} className="scrollvid" style={{ height: `${trackVh}vh` }}>
      <div className="scrollvid__stage">
        <div className="shell" style={{ width: '100%' }}>
          <div className="scrollvid__frame">
            <video
              ref={videoRef}
              poster={asset(poster)}
              muted
              playsInline
              preload="auto"
              // Scrubbed by scroll position — never plays on its own.
              // A <source> the browser cannot play fires its own error event,
              // which React routes here — so only give up once the media
              // element itself has exhausted every candidate.
              onError={(event) => {
                if (event.target !== videoRef.current) return
                setFailed(true)
              }}
              aria-label={`${title} — scroll to play through the site`}
            >
              {sources.map((source) => (
                <source key={source} src={asset(source)} type={mimeFor(source)} />
              ))}
            </video>

            <div ref={hintRef} className="scrollvid__hint">
              <span className="label">Scroll to play</span>
            </div>

            <div className="scrollvid__track">
              <div ref={barRef} className="scrollvid__bar" style={{ transform: 'scaleX(0)' }} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
