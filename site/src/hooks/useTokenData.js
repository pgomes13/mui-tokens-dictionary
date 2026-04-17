import { useMemo } from 'react';
import { rawTokenFiles } from '@/tokens';
import { flattenTokens, groupByCategory } from '@/lib/tokenUtils';
export function useTokenData() {
    return useMemo(() => {
        const allTokens = Object.entries(rawTokenFiles).flatMap(([fileKey, obj]) => flattenTokens(obj, fileKey));
        const byCategory = groupByCategory(allTokens);
        return { allTokens, byCategory };
    }, []);
}
