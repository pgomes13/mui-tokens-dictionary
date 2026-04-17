import { useState } from 'react'

const KEY = 'mui-tokens-pat'

export function usePat() {
  const [pat, setPat] = useState<string>(() => localStorage.getItem(KEY) ?? '')

  const savePat = (value: string) => {
    localStorage.setItem(KEY, value)
    setPat(value)
  }

  const clearPat = () => {
    localStorage.removeItem(KEY)
    setPat('')
  }

  return { pat, setPat: savePat, clearPat, isPatSet: pat.length > 0 }
}
