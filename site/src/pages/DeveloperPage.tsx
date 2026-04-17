import { useState } from 'react'
import { SearchBar } from '@/components/developer/SearchBar'
import { TokenTable } from '@/components/developer/TokenTable'
import { UsageSnippet } from '@/components/developer/UsageSnippet'
import type { FlatToken } from '@/lib/tokenUtils'
import { toCssVar, toJsName } from '@/lib/tokenUtils'
import type { TokenData } from '@/hooks/useTokenData'

interface Props {
  data: TokenData
  activeCategory: string
}

export function DeveloperPage({ data, activeCategory }: Props) {
  const [search, setSearch] = useState('')
  const [selectedToken, setSelectedToken] = useState<FlatToken | null>(null)

  const baseTokens = activeCategory === 'all'
    ? data.allTokens
    : (data.byCategory.get(activeCategory) ?? [])

  const filtered = search
    ? baseTokens.filter(t => {
        const q = search.toLowerCase()
        return (
          toCssVar(t.path).includes(q) ||
          toJsName(t.path).toLowerCase().includes(q) ||
          t.value.toLowerCase().includes(q)
        )
      })
    : baseTokens

  return (
    <main className="main-content">
      <div className="page-header">
        <h1>Token Reference</h1>
        <SearchBar value={search} onChange={setSearch} />
      </div>
      <div className="dev-layout">
        <TokenTable tokens={filtered} selectedToken={selectedToken} onSelect={setSelectedToken} />
        <UsageSnippet token={selectedToken} />
      </div>
    </main>
  )
}
