import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { NavBar } from '@/components/layout/NavBar';
import { Sidebar } from '@/components/layout/Sidebar';
import { DesignerPage } from '@/pages/DesignerPage';
import { DeveloperPage } from '@/pages/DeveloperPage';
import { PatModal } from '@/components/common/PatModal';
import { EditModal } from '@/components/common/EditModal';
import { SnackBar } from '@/components/common/SnackBar';
import { useTokenData } from '@/hooks/useTokenData';
import { useTheme } from '@/hooks/useTheme';
import { usePat } from '@/hooks/usePat';
export default function App() {
    const data = useTokenData();
    const { theme, toggleTheme } = useTheme();
    const { pat, setPat, isPatSet } = usePat();
    const [view, setView] = useState('designer');
    const [activeCategory, setActiveCategory] = useState('palette');
    const [showPatModal, setShowPatModal] = useState(false);
    const [editingToken, setEditingToken] = useState(null);
    const [snack, setSnack] = useState(null);
    const handleViewChange = (v) => {
        setView(v);
        setActiveCategory(v === 'developer' ? 'all' : 'palette');
    };
    const handleEdit = (token) => {
        if (!isPatSet) {
            setShowPatModal(true);
            return;
        }
        setEditingToken(token);
    };
    const handlePrCreated = (url) => {
        setSnack({ message: 'PR created!', link: { href: url, label: 'View PR →' } });
    };
    return (_jsxs("div", { className: `app ${theme}`, children: [_jsx(NavBar, { view: view, onViewChange: handleViewChange, theme: theme, onThemeToggle: toggleTheme, isPatSet: isPatSet, onPatClick: () => setShowPatModal(true) }), _jsxs("div", { className: "app-body", children: [_jsx(Sidebar, { view: view, activeCategory: activeCategory, onCategoryClick: setActiveCategory }), view === 'designer'
                        ? _jsx(DesignerPage, { data: data, activeCategory: activeCategory, onEdit: handleEdit })
                        : _jsx(DeveloperPage, { data: data, activeCategory: activeCategory, onEdit: handleEdit })] }), showPatModal && (_jsx(PatModal, { currentPat: pat, onSave: setPat, onClose: () => setShowPatModal(false) })), editingToken && (_jsx(EditModal, { token: editingToken, pat: pat, onPatNeeded: () => { setEditingToken(null); setShowPatModal(true); }, onClose: () => setEditingToken(null), onPrCreated: handlePrCreated })), snack && (_jsx(SnackBar, { message: snack.message, link: snack.link, onClose: () => setSnack(null) }))] }));
}
