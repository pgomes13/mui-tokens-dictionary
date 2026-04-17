interface Props {
  view: 'designer' | 'developer'
  activeCategory: string
  onCategoryClick: (cat: string) => void
}

const DESIGNER_CATEGORIES = ['palette', 'typography', 'spacing', 'shape', 'breakpoints', 'zIndex', 'transitions']
const DEVELOPER_CATEGORIES = ['all', 'palette', 'typography', 'spacing', 'shape', 'breakpoints', 'zIndex', 'transitions']

export function Sidebar({ view, activeCategory, onCategoryClick }: Props) {
  const categories = view === 'designer' ? DESIGNER_CATEGORIES : DEVELOPER_CATEGORIES
  return (
    <aside className="sidebar">
      {categories.map(cat => (
        <button
          key={cat}
          className={`sidebar-item${activeCategory === cat ? ' active' : ''}`}
          onClick={() => onCategoryClick(cat)}
        >
          {cat.charAt(0).toUpperCase() + cat.slice(1)}
        </button>
      ))}
    </aside>
  )
}
