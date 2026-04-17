import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { CopyButton } from '@/components/common/CopyButton';
export function SpacingSection({ tokens, onEdit }) {
    return (_jsxs("section", { id: "spacing", className: "token-section", children: [_jsx("h2", { children: "Spacing" }), _jsx("div", { className: "spacing-list", children: tokens.map(t => {
                    const px = parseInt(t.value);
                    return (_jsxs("div", { className: "spacing-row", children: [_jsx("span", { className: "spacing-label", children: t.path.filter(s => s !== 'DEFAULT').join('-') }), _jsx("div", { className: "spacing-bar-wrap", children: _jsx("div", { className: "spacing-bar", style: { width: `${Math.min(px, 160)}px` } }) }), _jsx("span", { className: "spacing-value", children: t.value }), _jsxs("div", { className: "token-actions", children: [_jsx(CopyButton, { value: t.value, label: "Value" }), onEdit && _jsx("button", { className: "edit-btn", onClick: () => onEdit(t), children: "Edit" })] })] }, t.path.join('.')));
                }) })] }));
}
