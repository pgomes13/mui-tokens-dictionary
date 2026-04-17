import { CopyButton } from '@/components/common/CopyButton'
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
      <div className="token-table">
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
    </section>
  )
}
