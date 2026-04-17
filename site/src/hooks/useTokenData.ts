import { useMemo } from 'react'
import { rawTokenFiles } from '@/tokens'
import { flattenTokens, groupByCategory, type FlatToken } from '@/lib/tokenUtils'

export interface TokenData {
  allTokens: FlatToken[]
  byCategory: Map<string, FlatToken[]>
}

export function useTokenData(theme: 'light' | 'dark'): TokenData {
  return useMemo(() => {
    const excluded = theme === 'light' ? 'palette/dark' : 'palette/light'
    const allTokens = Object.entries(rawTokenFiles)
      .filter(([fileKey]) => fileKey !== excluded)
      .flatMap(([fileKey, obj]) => flattenTokens(obj, fileKey))
    const byCategory = groupByCategory(allTokens)
    return { allTokens, byCategory }
  }, [theme])
}
