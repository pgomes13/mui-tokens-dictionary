import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { ColorSection } from '@/components/designer/ColorSection';
import { TypographySection } from '@/components/designer/TypographySection';
import { SpacingSection } from '@/components/designer/SpacingSection';
import { SimpleTokenSection } from '@/components/designer/SimpleTokenSection';
import { downloadW3CExport } from '@/lib/w3cExport';
import { rawTokenFiles } from '@/tokens';
export function DesignerPage({ data, activeCategory, onEdit }) {
    const { byCategory } = data;
    const show = (cat) => activeCategory === cat || activeCategory === 'palette';
    return (_jsxs("main", { className: "main-content", children: [_jsxs("div", { className: "page-header", children: [_jsx("h1", { children: "Design Tokens" }), _jsx("button", { className: "primary", onClick: () => downloadW3CExport(rawTokenFiles), children: "Download Tokens Studio JSON" })] }), (activeCategory === 'palette') &&
                _jsx(ColorSection, { tokens: [...(byCategory.get('palette') ?? [])], onEdit: onEdit }), activeCategory === 'typography' &&
                _jsx(TypographySection, { tokens: byCategory.get('typography') ?? [], onEdit: onEdit }), activeCategory === 'spacing' &&
                _jsx(SpacingSection, { tokens: byCategory.get('spacing') ?? [], onEdit: onEdit }), activeCategory === 'shape' &&
                _jsx(SimpleTokenSection, { id: "shape", title: "Shape", tokens: byCategory.get('shape') ?? [], onEdit: onEdit, renderPreview: t => _jsx("div", { style: { width: 24, height: 24, background: '#1976d2', borderRadius: t.value } }) }), activeCategory === 'breakpoints' &&
                _jsx(SimpleTokenSection, { id: "breakpoints", title: "Breakpoints", tokens: byCategory.get('breakpoints') ?? [], onEdit: onEdit }), activeCategory === 'zIndex' &&
                _jsx(SimpleTokenSection, { id: "zIndex", title: "Z-Index", tokens: byCategory.get('zIndex') ?? [], onEdit: onEdit }), activeCategory === 'transitions' &&
                _jsx(SimpleTokenSection, { id: "transitions", title: "Transitions", tokens: byCategory.get('transitions') ?? [], onEdit: onEdit })] }));
}
