import { CopyButton } from '@/components/common/CopyButton'
import type { FlatToken } from '@/lib/tokenUtils'

interface Props {
  tokens: FlatToken[]
}

export function SpacingSection({ tokens }: Props) {
  return (
    <section id="spacing" className="token-section">
      <h2>Spacing</h2>
      <div className="spacing-list">
        {tokens.map(t => {
          const px = parseInt(t.value)
          return (
            <div key={t.path.join('.')} className="spacing-row">
              <span className="spacing-label">{t.path.filter(s => s !== 'DEFAULT').join('-')}</span>
              <div className="spacing-bar-wrap">
                <div className="spacing-bar" style={{ width: `${Math.min(px, 160)}px` }} />
              </div>
              <span className="spacing-value">{t.value}</span>
              <div className="token-actions">
                <CopyButton value={t.value} label="Value" />
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}
