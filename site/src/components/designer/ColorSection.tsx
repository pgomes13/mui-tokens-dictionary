import { ColorSwatch } from './ColorSwatch'
import type { FlatToken } from '@/lib/tokenUtils'

interface Props {
  tokens: FlatToken[]
  onEdit?: (token: FlatToken) => void
}

function groupBySubcategory(tokens: FlatToken[]): Map<string, FlatToken[]> {
  const map = new Map<string, FlatToken[]>()
  for (const t of tokens) {
    const sub = t.fileKey.replace('palette/', '')
    const existing = map.get(sub) ?? []
    existing.push(t)
    map.set(sub, existing)
  }
  return map
}

export function ColorSection({ tokens, onEdit }: Props) {
  const groups = groupBySubcategory(tokens.filter(t => t.type === 'color'))
  return (
    <section id="palette" className="token-section">
      <h2>Palette</h2>
      {[...groups.entries()].map(([group, groupTokens]) => (
        <div key={group} className="color-group">
          <h3>{group.charAt(0).toUpperCase() + group.slice(1)}</h3>
          <div className="swatches-grid">
            {groupTokens.map(t => (
              <ColorSwatch key={t.path.join('.')} token={t} onEdit={onEdit} />
            ))}
          </div>
        </div>
      ))}
    </section>
  )
}
