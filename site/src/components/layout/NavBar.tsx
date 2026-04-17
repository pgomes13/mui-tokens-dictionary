import type { Theme } from '@/App'

interface Props {
  view: 'designer' | 'developer'
  onViewChange: (v: 'designer' | 'developer') => void
  theme: Theme
  onThemeToggle: () => void
}

export function NavBar({ view, onViewChange, theme, onThemeToggle }: Props) {
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
        <button className="icon-btn" onClick={onThemeToggle} title="Toggle theme">
          {theme === 'light' ? '🌙' : '☀️'}
        </button>
      </div>
    </nav>
  )
}
