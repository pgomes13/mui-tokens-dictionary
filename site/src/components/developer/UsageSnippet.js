import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { CopyButton } from '@/components/common/CopyButton';
import { toCssVar, toJsName } from '@/lib/tokenUtils';
export function UsageSnippet({ token }) {
    if (!token)
        return null;
    const cssVar = toCssVar(token.path);
    const jsName = toJsName(token.path);
    const cssSnippet = `.element {\n  /* ${token.path.filter(s => s !== 'DEFAULT').join('.')} */\n  property: var(${cssVar});\n}`;
    const jsSnippet = `import { ${jsName} } from './build/tokens.js'\n\n// ${jsName} = "${token.value}"`;
    return (_jsxs("div", { className: "usage-snippet", children: [_jsx("h3", { children: "Usage" }), _jsxs("div", { className: "snippet-block", children: [_jsxs("div", { className: "snippet-header", children: [_jsx("span", { children: "CSS" }), _jsx(CopyButton, { value: cssSnippet, label: "Copy" })] }), _jsx("pre", { children: _jsx("code", { children: cssSnippet }) })] }), _jsxs("div", { className: "snippet-block", children: [_jsxs("div", { className: "snippet-header", children: [_jsx("span", { children: "JavaScript / TypeScript" }), _jsx(CopyButton, { value: jsSnippet, label: "Copy" })] }), _jsx("pre", { children: _jsx("code", { children: jsSnippet }) })] })] }));
}
