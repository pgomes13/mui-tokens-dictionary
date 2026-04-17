import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { ColorSwatch } from './ColorSwatch';
function groupBySubcategory(tokens) {
    const map = new Map();
    for (const t of tokens) {
        const sub = t.fileKey.replace('palette/', '');
        const existing = map.get(sub) ?? [];
        existing.push(t);
        map.set(sub, existing);
    }
    return map;
}
export function ColorSection({ tokens, onEdit }) {
    const groups = groupBySubcategory(tokens.filter(t => t.type === 'color'));
    return (_jsxs("section", { id: "palette", className: "token-section", children: [_jsx("h2", { children: "Palette" }), [...groups.entries()].map(([group, groupTokens]) => (_jsxs("div", { className: "color-group", children: [_jsx("h3", { children: group.charAt(0).toUpperCase() + group.slice(1) }), _jsx("div", { className: "swatches-grid", children: groupTokens.map(t => (_jsx(ColorSwatch, { token: t, onEdit: onEdit }, t.path.join('.')))) })] }, group)))] }));
}
