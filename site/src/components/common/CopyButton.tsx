import { useState } from 'react'

interface Props {
  value: string
  label?: string
}

export function CopyButton({ value, label = 'Copy' }: Props) {
  const [copied, setCopied] = useState(false)

  const handleClick = () => {
    navigator.clipboard.writeText(value).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 1500)
    })
  }

  return (
    <button className={`copy-btn${copied ? ' copied' : ''}`} onClick={handleClick} title={value}>
      {copied ? '✓' : label}
    </button>
  )
}
