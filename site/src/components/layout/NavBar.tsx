import type { Theme } from '@/App'

interface Props {
  view: 'designer' | 'developer'
  onViewChange: (v: 'designer' | 'developer') => void
  theme: Theme
  onThemeToggle: () => void
  isPatSet: boolean
  onPatClick: () => void
}

export function NavBar({ view, onViewChange, theme, onThemeToggle, isPatSet, onPatClick }: Props) {
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
        <button className={`icon-btn pat-btn${isPatSet ? ' pat-set' : ''}`} onClick={onPatClick} title="GitHub PAT">
          {isPatSet ? '🔑' : '🔒'}
        </button>
      </div>
    </nav>
  )
}
