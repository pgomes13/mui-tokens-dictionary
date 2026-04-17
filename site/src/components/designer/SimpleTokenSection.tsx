import { CopyButton } from '@/components/common/CopyButton'
import type { FlatToken } from '@/lib/tokenUtils'
import { toCssVar } from '@/lib/tokenUtils'

interface Props {
  id: string
  title: string
  tokens: FlatToken[]
  onEdit?: (token: FlatToken) => void
  renderPreview?: (token: FlatToken) => React.ReactNode
}

export function SimpleTokenSection({ id, title, tokens, onEdit, renderPreview }: Props) {
  return (
    <section id={id} className="token-section">
      <h2>{title}</h2>
      <div className="token-table">
        <div className="token-table-header">
          <span>Token</span>
          {renderPreview && <span>Preview</span>}
          <span>Value</span>
          <span>Actions</span>
        </div>
        {tokens.map(t => (
          <div key={t.path.join('.')} className="token-row">
            <span className="token-name">{t.path.filter(s => s !== 'DEFAULT').join('.')}</span>
            {renderPreview && <span className="token-preview">{renderPreview(t)}</span>}
            <span className="token-value">{t.value}</span>
            <div className="token-actions">
              <CopyButton value={t.value} label="Value" />
              <CopyButton value={toCssVar(t.path)} label="CSS" />
              {onEdit && <button className="edit-btn" onClick={() => onEdit(t)}>Edit</button>}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
