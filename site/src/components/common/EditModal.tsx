import { useState } from 'react'
import { createPrFromEdit } from '@/lib/github'
import type { FlatToken } from '@/lib/tokenUtils'

interface Props {
  token: FlatToken
  pat: string
  onPatNeeded: () => void
  onClose: () => void
  onPrCreated: (url: string) => void
}

const FILE_MAP: Record<string, string> = {
  'palette/light': 'tokens/palette/light.json',
  'palette/dark': 'tokens/palette/dark.json',
  'palette/grey': 'tokens/palette/grey.json',
  'palette/common': 'tokens/palette/common.json',
  'typography/base': 'tokens/typography/base.json',
  'typography/variants': 'tokens/typography/variants.json',
  spacing: 'tokens/spacing.json',
  shape: 'tokens/shape.json',
  breakpoints: 'tokens/breakpoints.json',
  zIndex: 'tokens/zIndex.json',
  'transitions/duration': 'tokens/transitions/duration.json',
  'transitions/easing': 'tokens/transitions/easing.json',
}

export function EditModal({ token, pat, onPatNeeded, onClose, onPrCreated }: Props) {
  const [newValue, setNewValue] = useState(token.value)
  const [description, setDescription] = useState('')
  const [status, setStatus] = useState<'idle' | 'submitting' | 'error'>('idle')
  const [errorMsg, setErrorMsg] = useState('')

  const handleSubmit = async () => {
    if (!pat) { onPatNeeded(); return }
    if (newValue === token.value) { onClose(); return }
    setStatus('submitting')
    try {
      const url = await createPrFromEdit({
        pat,
        filePath: FILE_MAP[token.fileKey] ?? `tokens/${token.fileKey}.json`,
        tokenPath: token.path,
        currentValue: token.value,
        newValue,
        prDescription: description,
      })
      onPrCreated(url)
      onClose()
    } catch (err) {
      setStatus('error')
      setErrorMsg(err instanceof Error ? err.message : 'Unknown error')
    }
  }

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal" onClick={e => e.stopPropagation()}>
        <h2>Edit token</h2>
        <p className="token-path">{token.path.join('.')}</p>
        <label>
          New value
          {token.type === 'color'
            ? <div className="color-input-row">
                <input type="color" value={newValue.startsWith('#') ? newValue : '#000000'}
                  onChange={e => setNewValue(e.target.value)} />
                <input type="text" value={newValue} onChange={e => setNewValue(e.target.value)} />
              </div>
            : <input type="text" value={newValue} onChange={e => setNewValue(e.target.value)} />
          }
        </label>
        <label>
          PR description (optional)
          <textarea value={description} onChange={e => setDescription(e.target.value)} rows={3} />
        </label>
        {status === 'error' && <p className="error">{errorMsg}</p>}
        <div className="modal-actions">
          <button onClick={onClose}>Cancel</button>
          <button className="primary" onClick={handleSubmit} disabled={status === 'submitting'}>
            {status === 'submitting' ? 'Creating PR…' : 'Create PR'}
          </button>
        </div>
      </div>
    </div>
  )
}
