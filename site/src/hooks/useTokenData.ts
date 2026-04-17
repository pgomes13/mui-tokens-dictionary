import { useMemo } from 'react'
import { rawTokenFiles } from '@/tokens'
import { flattenTokens, groupByCategory, type FlatToken } from '@/lib/tokenUtils'

export interface TokenData {
  allTokens: FlatToken[]
  byCategory: Map<string, FlatToken[]>
}

export function useTokenData(): TokenData {
  return useMemo(() => {
    const allTokens = Object.entries(rawTokenFiles).flatMap(([fileKey, obj]) =>
      flattenTokens(obj, fileKey)
    )
    const byCategory = groupByCategory(allTokens)
    return { allTokens, byCategory }
  }, [])
}
