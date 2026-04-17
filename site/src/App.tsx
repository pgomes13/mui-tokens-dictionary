import { useState } from 'react'
import { NavBar } from '@/components/layout/NavBar'
import { Sidebar } from '@/components/layout/Sidebar'
import { Footer } from '@/components/layout/Footer'
import { DesignerPage } from '@/pages/DesignerPage'
import { DeveloperPage } from '@/pages/DeveloperPage'
import { useTokenData } from '@/hooks/useTokenData'
import { useTheme } from '@/hooks/useTheme'

export type Theme = 'light' | 'dark'

export default function App() {
  const { theme, setTheme } = useTheme()
  const data = useTokenData(theme)

  const [view, setView] = useState<'designer' | 'developer'>('designer')
  const [activeCategory, setActiveCategory] = useState('palette')

  const handleViewChange = (v: 'designer' | 'developer') => {
    setView(v)
    setActiveCategory(v === 'developer' ? 'all' : 'palette')
  }

  return (
    <div className={`app ${theme}`}>
      <NavBar
        view={view}
        onViewChange={handleViewChange}
        theme={theme}
        onThemeChange={setTheme}
      />
      <div className="app-body">
        <Sidebar view={view} activeCategory={activeCategory} onCategoryClick={setActiveCategory} />
        {view === 'designer'
          ? <DesignerPage data={data} activeCategory={activeCategory} />
          : <DeveloperPage data={data} activeCategory={activeCategory} />
        }
      </div>
      <Footer />
    </div>
  )
}
