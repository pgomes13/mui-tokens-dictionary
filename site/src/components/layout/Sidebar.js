import { jsx as _jsx } from "react/jsx-runtime";
const DESIGNER_CATEGORIES = ['palette', 'typography', 'spacing', 'shape', 'breakpoints', 'zIndex', 'transitions'];
const DEVELOPER_CATEGORIES = ['all', 'palette', 'typography', 'spacing', 'shape', 'breakpoints', 'zIndex', 'transitions'];
export function Sidebar({ view, activeCategory, onCategoryClick }) {
    const categories = view === 'designer' ? DESIGNER_CATEGORIES : DEVELOPER_CATEGORIES;
    return (_jsx("aside", { className: "sidebar", children: categories.map(cat => (_jsx("button", { className: `sidebar-item${activeCategory === cat ? ' active' : ''}`, onClick: () => onCategoryClick(cat), children: cat.charAt(0).toUpperCase() + cat.slice(1) }, cat))) }));
}
