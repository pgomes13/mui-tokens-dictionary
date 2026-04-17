import { useEffect } from 'react'

interface Props {
  message: string
  link?: { href: string; label: string }
  onClose: () => void
}

export function SnackBar({ message, link, onClose }: Props) {
  useEffect(() => {
    const t = setTimeout(onClose, 5000)
    return () => clearTimeout(t)
  }, [onClose])

  return (
    <div className="snackbar">
      <span>{message}</span>
      {link && <a href={link.href} target="_blank" rel="noreferrer">{link.label}</a>}
      <button onClick={onClose}>✕</button>
    </div>
  )
}
