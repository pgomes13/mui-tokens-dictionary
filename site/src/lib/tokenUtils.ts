export interface FlatToken {
  path: string[]
  value: string
  type: string
  fileKey: string
}

type TokenNode = { $value: string; $type?: string } | { [key: string]: TokenNode }

function isLeaf(node: unknown): node is { $value: string; $type?: string } {
  return typeof node === 'object' && node !== null && '$value' in node
}

export function flattenTokens(obj: unknown, fileKey: string, pathPrefix: string[] = []): FlatToken[] {
  if (isLeaf(obj)) {
    return [{ path: pathPrefix, value: String(obj.$value), type: obj.$type ?? 'unknown', fileKey }]
  }
  if (typeof obj !== 'object' || obj === null) return []
  return Object.entries(obj as Record<string, unknown>).flatMap(([key, val]) =>
    flattenTokens(val, fileKey, [...pathPrefix, key])
  )
}

export function toCssVar(path: string[]): string {
  const parts = path.filter(s => s !== 'DEFAULT').join('-')
  return `--mui-${parts}`
}

export function toJsName(path: string[]): string {
  return 'Mui' + path
    .filter(s => s !== 'DEFAULT')
    .map(s => s.charAt(0).toUpperCase() + s.slice(1))
    .join('')
}

export function groupByCategory(tokens: FlatToken[]): Map<string, FlatToken[]> {
  const map = new Map<string, FlatToken[]>()
  for (const t of tokens) {
    const cat = t.path[0] ?? 'other'
    const existing = map.get(cat) ?? []
    existing.push(t)
    map.set(cat, existing)
  }
  return map
}
