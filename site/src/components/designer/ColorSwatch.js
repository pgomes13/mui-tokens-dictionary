import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { CopyButton } from '@/components/common/CopyButton';
import { toCssVar } from '@/lib/tokenUtils';
export function ColorSwatch({ token, onEdit }) {
    const cssVar = toCssVar(token.path);
    return (_jsxs("div", { className: "color-swatch", children: [_jsx("div", { className: "swatch-preview", style: { backgroundColor: token.value } }), _jsxs("div", { className: "swatch-info", children: [_jsx("span", { className: "swatch-name", children: token.path.filter(s => s !== 'DEFAULT').join('.') }), _jsx("span", { className: "swatch-value", children: token.value }), _jsxs("div", { className: "swatch-actions", children: [_jsx(CopyButton, { value: token.value, label: "Hex" }), _jsx(CopyButton, { value: cssVar, label: "CSS" }), onEdit && _jsx("button", { className: "edit-btn", onClick: () => onEdit(token), children: "Edit" })] })] })] }));
}
