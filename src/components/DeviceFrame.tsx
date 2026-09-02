import { useState } from 'react'
import { Media } from './Media'
import { prettyUrl } from '../lib/asset'

/**
 * The live-demo panel — where a client clicks around the real site without
 * leaving the portfolio.
 *
 * The iframe is not mounted until the visitor asks for it: a third-party site
 * loading on every project page is slow, and nobody wants three sites booting
 * behind a page they are only scrolling past.
 *
 * Sites that send X-Frame-Options: DENY or a frame-ancestors CSP cannot be
 * embedded at all, and the browser gives us no event for it — so each project
 * carries an `embed` flag. Set it false and this shows a screenshot with a
 * button out to the real thing instead.
 */
export function DeviceFrame({
  url,
  embed,
  cover,
  title,
}: {
  url?: string
  embed: boolean
  cover?: string
  title: string
}) {
  const [live, setLive] = useState(false)
  const [device, setDevice] = useState<'desktop' | 'phone'>('desktop')

  const canEmbed = embed && Boolean(url)

  return (
    <div className={`device ${device === 'phone' ? 'device--phone' : ''}`.trim()}>
      <div className="device__bar">
        <div className="device__dots" aria-hidden="true">
          <span className="device__dot" />
          <span className="device__dot" />
          <span className="device__dot" />
        </div>
        <span className="device__url">{url ? prettyUrl(url) : 'not published yet'}</span>
        {canEmbed && live && (
          <div className="device__dots" role="group" aria-label="Preview size">
            <button
              className="chip"
              aria-pressed={device === 'desktop'}
              onClick={() => setDevice('desktop')}
            >
              Desktop
            </button>
            <button
              className="chip"
              aria-pressed={device === 'phone'}
              onClick={() => setDevice('phone')}
            >
              Phone
            </button>
          </div>
        )}
      </div>

      <div className="device__screen">
        {live && canEmbed ? (
          <iframe
            src={url}
            title={`${title} — live site`}
            loading="lazy"
            referrerPolicy="no-referrer"
            sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
          />
        ) : (
          <Media src={cover} alt={`${title} — screenshot`} />
        )}
      </div>

      <div className="device__actions">
        {canEmbed && !live && (
          <button className="btn btn--solid" onClick={() => setLive(true)}>
            Launch live preview
          </button>
        )}

        {canEmbed && live && (
          <button
            className="btn btn--ghost"
            onClick={() => {
              setLive(false)
              setDevice('desktop')
            }}
          >
            Close preview
          </button>
        )}

        {url && (
          <a className="btn" href={url} target="_blank" rel="noreferrer noopener">
            Open live site <span aria-hidden="true">↗</span>
          </a>
        )}

        {!canEmbed && url && (
          <span className="label" style={{ alignSelf: 'center' }}>
            Opens in a new tab
          </span>
        )}
      </div>
    </div>
  )
}
