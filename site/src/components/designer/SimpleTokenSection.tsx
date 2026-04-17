import { CopyChip } from '@/components/common/CopyChip'
import type { FlatToken } from '@/lib/tokenUtils'
import { toCssVar } from '@/lib/tokenUtils'

interface Props {
  id: string
  title: string
  tokens: FlatToken[]
  renderPreview?: (token: FlatToken) => React.ReactNode
}

export function SimpleTokenSection({ id, title, tokens, renderPreview }: Props) {
  return (
    <section id={id} className="token-section">
      <h2>{title}</h2>
      <div className={`token-table${renderPreview ? ' has-preview' : ''}`}>
        <div className="token-table-header">
          <span>Token</span>
          {renderPreview && <span>Preview</span>}
          <span>Value</span>
          <span>CSS Variable</span>
        </div>
        {tokens.map(t => {
          const cssVar = toCssVar(t.path)
          return (
            <div key={t.path.join('.')} className="token-row">
              <span className="token-name">{t.path.filter(s => s !== 'DEFAULT').join('.')}</span>
              {renderPreview && <span className="token-preview">{renderPreview(t)}</span>}
              <CopyChip value={t.value} mono />
              <CopyChip value={cssVar} mono />
            </div>
          )
        })}
      </div>
    </section>
  )
}
