import { CopyButton } from '@/components/common/CopyButton'
import { toCssVar, toJsName } from '@/lib/tokenUtils'
import type { FlatToken } from '@/lib/tokenUtils'

interface Props {
  token: FlatToken | null
}

export function UsageSnippet({ token }: Props) {
  if (!token) return null
  const cssVar = toCssVar(token.path)
  const jsName = toJsName(token.path)
  const cssSnippet = `.element {\n  /* ${token.path.filter(s => s !== 'DEFAULT').join('.')} */\n  property: var(${cssVar});\n}`
  const jsSnippet = `import { ${jsName} } from './build/tokens.js'\n\n// ${jsName} = "${token.value}"`

  return (
    <div className="usage-snippet">
      <h3>Usage</h3>
      <div className="snippet-block">
        <div className="snippet-header">
          <span>CSS</span>
          <CopyButton value={cssSnippet} label="Copy" />
        </div>
        <pre><code>{cssSnippet}</code></pre>
      </div>
      <div className="snippet-block">
        <div className="snippet-header">
          <span>JavaScript / TypeScript</span>
          <CopyButton value={jsSnippet} label="Copy" />
        </div>
        <pre><code>{jsSnippet}</code></pre>
      </div>
    </div>
  )
}
