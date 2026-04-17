import type { Theme } from '@/App'

interface Props {
  view: 'designer' | 'developer'
  onViewChange: (v: 'designer' | 'developer') => void
  theme: Theme
  onThemeChange: (t: Theme) => void
}

export function NavBar({ view, onViewChange, theme, onThemeChange }: Props) {
  return (
    <nav className="navbar">
      <span className="navbar-brand">MUI Token Dictionary</span>
      <div className="view-toggle">
        <button className={view === 'designer' ? 'active' : ''} onClick={() => onViewChange('designer')}>
          Designers
        </button>
        <button className={view === 'developer' ? 'active' : ''} onClick={() => onViewChange('developer')}>
          Developers
        </button>
      </div>
      <div className="navbar-actions">
        <div className="theme-toggle">
          <span className="theme-label">Theme</span>
          <div className="view-toggle">
            <button className={theme === 'light' ? 'active' : ''} onClick={() => onThemeChange('light')}>Light</button>
            <button className={theme === 'dark' ? 'active' : ''} onClick={() => onThemeChange('dark')}>Dark</button>
          </div>
        </div>
      </div>
    </nav>
  )
}
