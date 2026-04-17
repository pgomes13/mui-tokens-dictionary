import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { SearchBar } from '@/components/developer/SearchBar';
import { TokenTable } from '@/components/developer/TokenTable';
import { UsageSnippet } from '@/components/developer/UsageSnippet';
import { toCssVar, toJsName } from '@/lib/tokenUtils';
export function DeveloperPage({ data, activeCategory, onEdit }) {
    const [search, setSearch] = useState('');
    const [selectedToken, setSelectedToken] = useState(null);
    const baseTokens = activeCategory === 'all'
        ? data.allTokens
        : (data.byCategory.get(activeCategory) ?? []);
    const filtered = search
        ? baseTokens.filter(t => {
            const q = search.toLowerCase();
            return (toCssVar(t.path).includes(q) ||
                toJsName(t.path).toLowerCase().includes(q) ||
                t.value.toLowerCase().includes(q));
        })
        : baseTokens;
    const handleEdit = (token) => {
        setSelectedToken(token);
        onEdit?.(token);
    };
    return (_jsxs("main", { className: "main-content", children: [_jsxs("div", { className: "page-header", children: [_jsx("h1", { children: "Token Reference" }), _jsx(SearchBar, { value: search, onChange: setSearch })] }), _jsxs("div", { className: "dev-layout", children: [_jsx(TokenTable, { tokens: filtered, onEdit: handleEdit }), _jsx(UsageSnippet, { token: selectedToken })] })] }));
}
