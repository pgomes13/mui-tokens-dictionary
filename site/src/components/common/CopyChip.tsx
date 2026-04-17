import { useState } from 'react'

interface Props {
  value: string
  mono?: boolean
}

export function CopyChip({ value, mono = false }: Props) {
  const [copied, setCopied] = useState(false)
  const handleClick = () => {
    navigator.clipboard.writeText(value).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 1500)
    })
  }
  return (
    <button
      className={`copy-chip${copied ? ' copied' : ''}`}
      onClick={handleClick}
      title="Copy to clipboard"
      style={mono ? { fontFamily: 'monospace' } : undefined}
    >
      {copied ? '✓ Copied' : value}
    </button>
  )
}
