import { CopyChip } from '@/components/common/CopyChip'
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
        <CopyChip value={token.value} mono />
        <CopyChip value={cssVar} mono />
      </div>
    </div>
  )
}
