import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { CopyButton } from '@/components/common/CopyButton';
import { toCssVar } from '@/lib/tokenUtils';
const VARIANT_ORDER = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'subtitle1', 'subtitle2', 'body1', 'body2', 'button', 'caption', 'overline'];
function buildVariantStyle(name, variantTokens) {
    const get = (key) => variantTokens.find(t => t.path.includes(key))?.value;
    return {
        fontFamily: get('fontFamily'),
        fontWeight: get('fontWeight') ? Number(get('fontWeight')) : undefined,
        fontSize: get('fontSize'),
        lineHeight: get('lineHeight'),
        letterSpacing: get('letterSpacing'),
        textTransform: name === 'overline' || name === 'button' ? 'uppercase' : undefined,
    };
}
export function TypographySection({ tokens, onEdit }) {
    const variantTokens = tokens.filter(t => VARIANT_ORDER.includes(t.path[1]));
    const baseTokens = tokens.filter(t => !VARIANT_ORDER.includes(t.path[1]));
    const variantMap = new Map();
    for (const t of variantTokens) {
        const variant = t.path[1];
        const existing = variantMap.get(variant) ?? [];
        existing.push(t);
        variantMap.set(variant, existing);
    }
    return (_jsxs("section", { id: "typography", className: "token-section", children: [_jsx("h2", { children: "Typography" }), _jsxs("div", { className: "token-table", children: [_jsxs("div", { className: "token-table-header", children: [_jsx("span", { children: "Token" }), _jsx("span", { children: "Value" }), _jsx("span", { children: "Copy" })] }), baseTokens.map(t => (_jsxs("div", { className: "token-row", children: [_jsx("span", { className: "token-name", children: t.path.filter(s => s !== 'DEFAULT').join('.') }), _jsx("span", { className: "token-value", children: t.value }), _jsxs("div", { className: "token-actions", children: [_jsx(CopyButton, { value: t.value, label: "Value" }), _jsx(CopyButton, { value: toCssVar(t.path), label: "CSS" }), onEdit && _jsx("button", { className: "edit-btn", onClick: () => onEdit(t), children: "Edit" })] })] }, t.path.join('.'))))] }), _jsx("h3", { children: "Variants" }), VARIANT_ORDER.filter(v => variantMap.has(v)).map(variant => {
                const vTokens = variantMap.get(variant);
                const style = buildVariantStyle(variant, vTokens);
                return (_jsxs("div", { className: "type-specimen", children: [_jsx("div", { className: "specimen-label", children: variant }), _jsx("div", { className: "specimen-preview", style: style, children: "The quick brown fox jumps over the lazy dog" }), _jsx("div", { className: "specimen-meta", children: vTokens.map(t => (_jsxs("span", { className: "meta-chip", children: [t.path[t.path.length - 1], ": ", t.value] }, t.path.join('.')))) })] }, variant));
            })] }));
}
