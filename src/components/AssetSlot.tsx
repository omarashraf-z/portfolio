/**
 * The placeholder that stands in for a picture or video you have not sent
 * yet. It prints the exact path the site is looking for, so adding the real
 * file is a matter of saving it to that name — no code change.
 */
export function AssetSlot({
  kind,
  path,
  note,
}: {
  kind: 'image' | 'video'
  path?: string
  note?: string
}) {
  return (
    <div className="slot">
      <span className="slot__kind">{kind === 'video' ? 'video pending' : 'image pending'}</span>
      {path && <code className="slot__path">{path}</code>}
      <p className="slot__note">
        {note ?? `Drop the file at this path in public/ and it appears here.`}
      </p>
    </div>
  )
}
