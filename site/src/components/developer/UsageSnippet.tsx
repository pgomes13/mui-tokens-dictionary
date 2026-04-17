import { CopyChip } from '@/components/common/CopyChip'
import { toCssVar, toJsName } from '@/lib/tokenUtils'
import type { FlatToken } from '@/lib/tokenUtils'

interface Props {
  token: FlatToken | null
  onClose: () => void
}

export function UsageSnippet({ token, onClose }: Props) {
  if (!token) return null
  const cssVar = toCssVar(token.path)
  const jsName = toJsName(token.path)
  const cssSnippet = `.element {\n  /* ${token.path.filter(s => s !== 'DEFAULT').join('.')} */\n  property: var(${cssVar});\n}`
  const jsSnippet = `import { ${jsName} } from 'mui-tokens-dictionary'\n\n// ${jsName} = "${token.value}"`

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal usage-modal" onClick={e => e.stopPropagation()}>
        <div className="usage-modal-header">
          <h2>Usage</h2>
          <button className="icon-btn" onClick={onClose}>✕</button>
        </div>
        <p className="token-path">{token.path.filter(s => s !== 'DEFAULT').join('.')}</p>
        <div className="snippet-block">
          <div className="snippet-header">
            <span>CSS</span>
            <CopyChip value={cssSnippet} label="Copy" />
          </div>
          <pre><code>{cssSnippet}</code></pre>
        </div>
        <div className="snippet-block">
          <div className="snippet-header">
            <span>JavaScript / TypeScript</span>
            <CopyChip value={jsSnippet} label="Copy" />
          </div>
          <pre><code>{jsSnippet}</code></pre>
        </div>
      </div>
    </div>
  )
}
