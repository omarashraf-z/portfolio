import { useCallback, useEffect, useRef, useState } from 'react'
import { asset } from '../lib/asset'
import { prefersReducedMotion } from '../lib/motion'
import { AssetSlot } from './AssetSlot'

/** Browsers skip a <source> whose type they cannot play, so label each one. */
function mimeFor(path: string) {
  if (path.endsWith('.webm')) return 'video/webm'
  if (path.endsWith('.ogv')) return 'video/ogg'
  return 'video/mp4'
}

/**
 * A screen recording of the finished site, playing on a loop.
 *
 * It starts when it scrolls into view and pauses when it leaves, so a page
 * with several of these is not decoding video nobody is looking at. Click it
 * to pause; that choice sticks, and scrolling away and back does not undo it.
 *
 * Falls back, in order: no file → placeholder; reduced motion → the same
 * video with controls and no autoplay; every source dead → placeholder.
 */
export function SiteVideo({
  src,
  poster,
  title,
  portrait = false,
}: {
  src?: string | string[]
  poster?: string
  title: string
  /** A recording of the site's phone layout, so the frame is a phone shape. */
  portrait?: boolean
}) {
  const sources = src ? (Array.isArray(src) ? src : [src]) : []
  const sourceKey = sources.join('|')

  const videoRef = useRef<HTMLVideoElement>(null)
  const barRef = useRef<HTMLDivElement>(null)
  const deadSources = useRef(0)
  const pausedByViewer = useRef(false)

  const [failed, setFailed] = useState(false)
  const [reduced, setReduced] = useState(false)
  const [playing, setPlaying] = useState(true)

  useEffect(() => setReduced(prefersReducedMotion()), [])

  // Moving between projects swaps the <source> elements, but a media element
  // picks its resource once and never looks again — so without load() the
  // previous project's recording keeps playing under the new project's page.
  // The failure count resets with it, or one dead file would condemn the next.
  useEffect(() => {
    deadSources.current = 0
    setFailed(false)
    videoRef.current?.load()
  }, [sourceKey])

  const playable = sources.length > 0 && !failed

  // Only play what is on screen.
  useEffect(() => {
    const video = videoRef.current
    if (!video || !playable || reduced) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !pausedByViewer.current) {
          void video.play().catch(() => {
            // Autoplay can still be refused (a battery-saver mode, say).
            // Nothing to recover from — the poster stays up.
          })
        } else {
          video.pause()
        }
      },
      { threshold: 0.25 },
    )

    observer.observe(video)
    return () => observer.disconnect()
  }, [playable, reduced])

  const onTimeUpdate = useCallback(() => {
    const video = videoRef.current
    const bar = barRef.current
    if (!video || !bar || !Number.isFinite(video.duration) || video.duration === 0) return
    bar.style.transform = `scaleX(${video.currentTime / video.duration})`
  }, [])

  const toggle = useCallback(() => {
    const video = videoRef.current
    if (!video) return

    if (video.paused) {
      pausedByViewer.current = false
      void video.play().catch(() => {})
      setPlaying(true)
    } else {
      pausedByViewer.current = true
      video.pause()
      setPlaying(false)
    }
  }, [])

  if (!playable) {
    return (
      <div className="sitevid">
        <div className={`sitevid__frame ${portrait ? "sitevid__frame--portrait" : ""}`.trim()}>
          <AssetSlot
            kind="video"
            path={sources[0]}
            note={
              failed
                ? 'Nothing loaded from this path. Add the recording as MP4 (H.264) and it plays here.'
                : 'A screen recording of the site being scrolled through. It loops here once the file exists.'
            }
          />
        </div>
      </div>
    )
  }

  // Reduced motion: same video, but the visitor starts it.
  if (reduced) {
    return (
      <div className="sitevid">
        <div className={`sitevid__frame ${portrait ? "sitevid__frame--portrait" : ""}`.trim()}>
          <video
            controls
            muted
            playsInline
            preload="metadata"
            poster={asset(poster)}
            aria-label={`${title} — a recording of the site`}
          >
            {sources.map((source) => (
              <source key={source} src={asset(source)} type={mimeFor(source)} />
            ))}
          </video>
        </div>
      </div>
    )
  }

  return (
    <div className="sitevid">
      <div className={`sitevid__frame ${portrait ? "sitevid__frame--portrait" : ""}`.trim()}>
        <video
          ref={videoRef}
          poster={asset(poster)}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          onTimeUpdate={onTimeUpdate}
          // Only the media element's own failures land here; a bad <source>
          // is counted below instead.
          onError={(event) => {
            if (event.target !== videoRef.current) return
            setFailed(true)
          }}
          aria-label={`${title} — a recording of the site`}
        >
          {sources.map((source) => (
            <source
              key={source}
              src={asset(source)}
              type={mimeFor(source)}
              // When a <source> list is exhausted the browser sets
              // networkState to NETWORK_NO_SOURCE and fires nothing at the
              // video itself — so count the dead candidates and fall back
              // once every one is gone. One failing encoding out of several
              // is fine: that is what offering several is for.
              onError={() => {
                deadSources.current += 1
                if (deadSources.current >= sources.length) setFailed(true)
              }}
            />
          ))}
        </video>

        <button className="sitevid__toggle" onClick={toggle} aria-label={playing ? 'Pause' : 'Play'}>
          <span className="sitevid__badge">{playing ? 'Pause' : 'Play'}</span>
        </button>

        <div className="sitevid__track">
          <div ref={barRef} className="sitevid__bar" style={{ transform: 'scaleX(0)' }} />
        </div>
      </div>
    </div>
  )
}
