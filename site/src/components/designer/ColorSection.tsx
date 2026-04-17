import { ColorSwatch } from './ColorSwatch'
import type { FlatToken } from '@/lib/tokenUtils'

interface Props {
  tokens: FlatToken[]
}

function hexToHsl(hex: string): [number, number, number] {
  const clean = hex.replace('#', '')
  if (clean.length !== 6) return [0, 0, 50]
  const r = parseInt(clean.slice(0, 2), 16) / 255
  const g = parseInt(clean.slice(2, 4), 16) / 255
  const b = parseInt(clean.slice(4, 6), 16) / 255
  const max = Math.max(r, g, b), min = Math.min(r, g, b)
  const l = (max + min) / 2
  if (max === min) return [0, 0, l * 100]
  const d = max - min
  const s = l > 0.5 ? d / (2 - max - min) : d / (max + min)
  let h = 0
  if (max === r) h = ((g - b) / d + (g < b ? 6 : 0)) / 6
  else if (max === g) h = ((b - r) / d + 2) / 6
  else h = ((r - g) / d + 4) / 6
  return [h * 360, s * 100, l * 100]
}

function sortByColor(tokens: FlatToken[]): FlatToken[] {
  return [...tokens].sort((a, b) => {
    const [ah, as_, al] = hexToHsl(a.value)
    const [bh, bs_, bl] = hexToHsl(b.value)
    if (Math.abs(ah - bh) > 5) return ah - bh
    return al - bl
  })
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

export function ColorSection({ tokens }: Props) {
  const groups = groupBySubcategory(tokens.filter(t => t.type === 'color'))
  return (
    <section id="palette" className="token-section">
      <h2>Palette</h2>
      {[...groups.entries()].map(([group, groupTokens]) => (
        <div key={group} className="color-group">
          <h3>{group.charAt(0).toUpperCase() + group.slice(1)}</h3>
          <div className="swatches-grid">
            {sortByColor(groupTokens).map(t => (
              <ColorSwatch key={t.path.join('.')} token={t} />
            ))}
          </div>
        </div>
      ))}
    </section>
  )
}
