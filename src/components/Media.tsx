import { useState } from 'react'
import { asset } from '../lib/asset'
import { AssetSlot } from './AssetSlot'

/**
 * An <img> that degrades into a labelled placeholder instead of a broken
 * icon. Every project image on the site goes through this, which is what
 * lets projects.ts list files that do not exist yet.
 */
export function Media({
  src,
  alt,
  note,
  loading = 'lazy',
}: {
  src?: string
  alt: string
  note?: string
  loading?: 'lazy' | 'eager'
}) {
  const [failed, setFailed] = useState(false)

  if (!src || failed) return <AssetSlot kind="image" path={src} note={note} />

  return (
    <img
      src={asset(src)}
      alt={alt}
      loading={loading}
      decoding="async"
      onError={() => setFailed(true)}
    />
  )
}
