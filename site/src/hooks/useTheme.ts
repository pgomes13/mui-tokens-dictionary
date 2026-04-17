import { useState, useEffect } from 'react'

type Theme = 'light' | 'dark'
const KEY = 'mui-tokens-ui-theme'

export function useTheme() {
  const [theme, setTheme] = useState<Theme>(() => (localStorage.getItem(KEY) as Theme) ?? 'light')

  useEffect(() => {
    document.documentElement.setAttribute('data-mui-color-scheme', theme)
    localStorage.setItem(KEY, theme)
  }, [theme])

  return { theme, setTheme }
}
