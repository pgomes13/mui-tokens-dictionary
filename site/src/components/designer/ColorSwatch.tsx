import { CopyButton } from '@/components/common/CopyButton'
import type { FlatToken } from '@/lib/tokenUtils'
import { toCssVar } from '@/lib/tokenUtils'

interface Props {
  token: FlatToken
  onEdit?: (token: FlatToken) => void
}

export function ColorSwatch({ token, onEdit }: Props) {
  const cssVar = toCssVar(token.path)
  return (
    <div className="color-swatch">
      <div className="swatch-preview" style={{ backgroundColor: token.value }} />
      <div className="swatch-info">
        <span className="swatch-name">{token.path.filter(s => s !== 'DEFAULT').join('.')}</span>
        <span className="swatch-value">{token.value}</span>
        <div className="swatch-actions">
          <CopyButton value={token.value} label="Hex" />
          <CopyButton value={cssVar} label="CSS" />
          {onEdit && <button className="edit-btn" onClick={() => onEdit(token)}>Edit</button>}
        </div>
      </div>
    </div>
  )
}
