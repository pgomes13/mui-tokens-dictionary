import { useState } from 'react'
import { NavBar } from '@/components/layout/NavBar'
import { Sidebar } from '@/components/layout/Sidebar'
import { DesignerPage } from '@/pages/DesignerPage'
import { DeveloperPage } from '@/pages/DeveloperPage'
import { PatModal } from '@/components/common/PatModal'
import { EditModal } from '@/components/common/EditModal'
import { SnackBar } from '@/components/common/SnackBar'
import { useTokenData } from '@/hooks/useTokenData'
import { useTheme } from '@/hooks/useTheme'
import { usePat } from '@/hooks/usePat'
import type { FlatToken } from '@/lib/tokenUtils'

export type Theme = 'light' | 'dark'

export default function App() {
  const data = useTokenData()
  const { theme, toggleTheme } = useTheme()
  const { pat, setPat, isPatSet } = usePat()

  const [view, setView] = useState<'designer' | 'developer'>('designer')
  const [activeCategory, setActiveCategory] = useState('palette')
  const [showPatModal, setShowPatModal] = useState(false)
  const [editingToken, setEditingToken] = useState<FlatToken | null>(null)
  const [snack, setSnack] = useState<{ message: string; link?: { href: string; label: string } } | null>(null)

  const handleViewChange = (v: 'designer' | 'developer') => {
    setView(v)
    setActiveCategory(v === 'developer' ? 'all' : 'palette')
  }

  const handleEdit = (token: FlatToken) => {
    if (!isPatSet) { setShowPatModal(true); return }
    setEditingToken(token)
  }

  const handlePrCreated = (url: string) => {
    setSnack({ message: 'PR created!', link: { href: url, label: 'View PR →' } })
  }

  return (
    <div className={`app ${theme}`}>
      <NavBar
        view={view}
        onViewChange={handleViewChange}
        theme={theme}
        onThemeToggle={toggleTheme}
        isPatSet={isPatSet}
        onPatClick={() => setShowPatModal(true)}
      />
      <div className="app-body">
        <Sidebar view={view} activeCategory={activeCategory} onCategoryClick={setActiveCategory} />
        {view === 'designer'
          ? <DesignerPage data={data} activeCategory={activeCategory} onEdit={handleEdit} />
          : <DeveloperPage data={data} activeCategory={activeCategory} onEdit={handleEdit} />
        }
      </div>

      {showPatModal && (
        <PatModal
          currentPat={pat}
          onSave={setPat}
          onClose={() => setShowPatModal(false)}
        />
      )}
      {editingToken && (
        <EditModal
          token={editingToken}
          pat={pat}
          onPatNeeded={() => { setEditingToken(null); setShowPatModal(true) }}
          onClose={() => setEditingToken(null)}
          onPrCreated={handlePrCreated}
        />
      )}
      {snack && (
        <SnackBar
          message={snack.message}
          link={snack.link}
          onClose={() => setSnack(null)}
        />
      )}
    </div>
  )
}
