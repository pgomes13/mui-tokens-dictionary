import { CopyButton } from '@/components/common/CopyButton'
import type { FlatToken } from '@/lib/tokenUtils'
import { toCssVar } from '@/lib/tokenUtils'

interface Props {
  tokens: FlatToken[]
}

const VARIANT_ORDER = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'subtitle1', 'subtitle2', 'body1', 'body2', 'button', 'caption', 'overline']

function buildVariantStyle(name: string, variantTokens: FlatToken[]): React.CSSProperties {
  const get = (key: string) => variantTokens.find(t => t.path.includes(key))?.value
  return {
    fontFamily: get('fontFamily'),
    fontWeight: get('fontWeight') ? Number(get('fontWeight')) : undefined,
    fontSize: get('fontSize'),
    lineHeight: get('lineHeight'),
    letterSpacing: get('letterSpacing'),
    textTransform: name === 'overline' || name === 'button' ? 'uppercase' : undefined,
  }
}

export function TypographySection({ tokens }: Props) {
  const variantTokens = tokens.filter(t => VARIANT_ORDER.includes(t.path[1]))
  const baseTokens = tokens.filter(t => !VARIANT_ORDER.includes(t.path[1]))

  const variantMap = new Map<string, FlatToken[]>()
  for (const t of variantTokens) {
    const variant = t.path[1]
    const existing = variantMap.get(variant) ?? []
    existing.push(t)
    variantMap.set(variant, existing)
  }

  return (
    <section id="typography" className="token-section">
      <h2>Typography</h2>

      <div className="token-table">
        <div className="token-table-header">
          <span>Token</span><span>Value</span><span>CSS Variable</span>
        </div>
        {baseTokens.map(t => {
          const cssVar = toCssVar(t.path)
          return (
            <div key={t.path.join('.')} className="token-row">
              <span className="token-name">{t.path.filter(s => s !== 'DEFAULT').join('.')}</span>
              <span className="inline-copy">
                <span className="token-value">{t.value}</span>
                <CopyButton value={t.value} label="Copy" />
              </span>
              <span className="inline-copy">
                <code className="token-value">{cssVar}</code>
                <CopyButton value={cssVar} label="Copy" />
              </span>
            </div>
          )
        })}
      </div>

      <h3>Variants</h3>
      {VARIANT_ORDER.filter(v => variantMap.has(v)).map(variant => {
        const vTokens = variantMap.get(variant)!
        const style = buildVariantStyle(variant, vTokens)
        return (
          <div key={variant} className="type-specimen">
            <div className="specimen-label">{variant}</div>
            <div className="specimen-preview" style={style}>The quick brown fox jumps over the lazy dog</div>
            <div className="specimen-meta">
              {vTokens.map(t => (
                <span key={t.path.join('.')} className="meta-chip">
                  {t.path[t.path.length - 1]}: {t.value}
                </span>
              ))}
            </div>
          </div>
        )
      })}
    </section>
  )
}
