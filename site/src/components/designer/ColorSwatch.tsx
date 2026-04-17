import { CopyButton } from '@/components/common/CopyButton'
import type { FlatToken } from '@/lib/tokenUtils'
import { toCssVar } from '@/lib/tokenUtils'

interface Props {
  token: FlatToken
}

export function ColorSwatch({ token }: Props) {
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
        </div>
      </div>
    </div>
  )
}
