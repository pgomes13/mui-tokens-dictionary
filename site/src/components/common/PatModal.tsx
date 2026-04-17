import { useState } from 'react'
import { validatePat } from '@/lib/github'

interface Props {
  currentPat: string
  onSave: (pat: string) => void
  onClose: () => void
}

export function PatModal({ currentPat, onSave, onClose }: Props) {
  const [value, setValue] = useState(currentPat)
  const [status, setStatus] = useState<'idle' | 'validating' | 'valid' | 'invalid'>('idle')

  const handleSave = async () => {
    if (!value.trim()) return
    setStatus('validating')
    const ok = await validatePat(value.trim())
    if (ok) {
      setStatus('valid')
      onSave(value.trim())
      setTimeout(onClose, 800)
    } else {
      setStatus('invalid')
    }
  }

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal" onClick={e => e.stopPropagation()}>
        <h2>GitHub Personal Access Token</h2>
        <p>Required to create PRs when editing tokens. Needs <code>repo</code> scope.</p>
        <input
          type="password"
          value={value}
          onChange={e => { setValue(e.target.value); setStatus('idle') }}
          placeholder="ghp_..."
          autoFocus
        />
        {status === 'invalid' && <p className="error">Invalid token or missing repo scope.</p>}
        {status === 'valid' && <p className="success">Token valid!</p>}
        <div className="modal-actions">
          <button onClick={onClose}>Cancel</button>
          <button className="primary" onClick={handleSave} disabled={status === 'validating'}>
            {status === 'validating' ? 'Validating…' : 'Save'}
          </button>
        </div>
      </div>
    </div>
  )
}
