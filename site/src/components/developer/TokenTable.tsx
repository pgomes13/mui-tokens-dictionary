import { CopyButton } from '@/components/common/CopyButton'
import type { FlatToken } from '@/lib/tokenUtils'
import { toCssVar, toJsName } from '@/lib/tokenUtils'

interface Props {
  tokens: FlatToken[]
  onEdit?: (token: FlatToken) => void
}

export function TokenTable({ tokens, onEdit }: Props) {
  if (tokens.length === 0) return <p className="empty">No tokens found.</p>

  return (
    <div className="dev-token-table">
      <div className="dev-token-header">
        <span>CSS Variable</span>
        <span>JS Name</span>
        <span>Value</span>
        <span>Actions</span>
      </div>
      {tokens.map(t => {
        const cssVar = toCssVar(t.path)
        const jsName = toJsName(t.path)
        return (
          <div key={`${t.fileKey}:${t.path.join('.')}`} className="dev-token-row">
            <span className="css-var">
              <code>{cssVar}</code>
              <CopyButton value={cssVar} label="Copy" />
            </span>
            <span className="js-name">
              <code>{jsName}</code>
              <CopyButton value={jsName} label="Copy" />
            </span>
            <span className="token-value">
              {t.type === 'color' && <span className="color-dot" style={{ backgroundColor: t.value }} />}
              {t.value}
            </span>
            <span className="token-actions">
              <CopyButton value={t.value} label="Value" />
              {onEdit && <button className="edit-btn" onClick={() => onEdit(t)}>Edit</button>}
            </span>
          </div>
        )
      })}
    </div>
  )
}
