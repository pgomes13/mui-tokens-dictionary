import type { rawTokenFiles } from '@/tokens'

type RawFiles = typeof rawTokenFiles

function deepMerge(target: Record<string, unknown>, source: Record<string, unknown>): Record<string, unknown> {
  const result = { ...target }
  for (const [k, v] of Object.entries(source)) {
    if (typeof v === 'object' && v !== null && !('$value' in v) && typeof result[k] === 'object' && result[k] !== null) {
      result[k] = deepMerge(result[k] as Record<string, unknown>, v as Record<string, unknown>)
    } else {
      result[k] = v
    }
  }
  return result
}

export function buildW3CExport(files: RawFiles): string {
  const baseKeys: (keyof RawFiles)[] = [
    'palette/grey',
    'palette/common',
    'typography/base',
    'typography/variants',
    'spacing',
    'shape',
    'breakpoints',
    'zIndex',
    'transitions/duration',
    'transitions/easing',
  ]

  let global: Record<string, unknown> = {}
  for (const key of baseKeys) {
    global = deepMerge(global, files[key] as Record<string, unknown>)
  }
  global = deepMerge(global, files['palette/light'] as Record<string, unknown>)

  const dark = files['palette/dark'] as Record<string, unknown>

  const output = {
    $metadata: { tokenSetOrder: ['global', 'dark'] },
    global,
    dark,
  }

  return JSON.stringify(output, null, 2)
}

export function downloadW3CExport(files: RawFiles): void {
  const json = buildW3CExport(files)
  const blob = new Blob([json], { type: 'application/json' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = 'tokens-studio.json'
  a.click()
  URL.revokeObjectURL(url)
}
