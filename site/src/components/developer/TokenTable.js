import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { CopyButton } from '@/components/common/CopyButton';
import { toCssVar, toJsName } from '@/lib/tokenUtils';
export function TokenTable({ tokens, onEdit }) {
    if (tokens.length === 0)
        return _jsx("p", { className: "empty", children: "No tokens found." });
    return (_jsxs("div", { className: "dev-token-table", children: [_jsxs("div", { className: "dev-token-header", children: [_jsx("span", { children: "CSS Variable" }), _jsx("span", { children: "JS Name" }), _jsx("span", { children: "Value" }), _jsx("span", { children: "Actions" })] }), tokens.map(t => {
                const cssVar = toCssVar(t.path);
                const jsName = toJsName(t.path);
                return (_jsxs("div", { className: "dev-token-row", children: [_jsxs("span", { className: "css-var", children: [_jsx("code", { children: cssVar }), _jsx(CopyButton, { value: cssVar, label: "Copy" })] }), _jsxs("span", { className: "js-name", children: [_jsx("code", { children: jsName }), _jsx(CopyButton, { value: jsName, label: "Copy" })] }), _jsxs("span", { className: "token-value", children: [t.type === 'color' && _jsx("span", { className: "color-dot", style: { backgroundColor: t.value } }), t.value] }), _jsxs("span", { className: "token-actions", children: [_jsx(CopyButton, { value: t.value, label: "Value" }), onEdit && _jsx("button", { className: "edit-btn", onClick: () => onEdit(t), children: "Edit" })] })] }, `${t.fileKey}:${t.path.join('.')}`));
            })] }));
}
