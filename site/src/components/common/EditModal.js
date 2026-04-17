import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { createPrFromEdit } from '@/lib/github';
const FILE_MAP = {
    'palette/light': 'tokens/palette/light.json',
    'palette/dark': 'tokens/palette/dark.json',
    'palette/grey': 'tokens/palette/grey.json',
    'palette/common': 'tokens/palette/common.json',
    'typography/base': 'tokens/typography/base.json',
    'typography/variants': 'tokens/typography/variants.json',
    spacing: 'tokens/spacing.json',
    shape: 'tokens/shape.json',
    breakpoints: 'tokens/breakpoints.json',
    zIndex: 'tokens/zIndex.json',
    'transitions/duration': 'tokens/transitions/duration.json',
    'transitions/easing': 'tokens/transitions/easing.json',
};
export function EditModal({ token, pat, onPatNeeded, onClose, onPrCreated }) {
    const [newValue, setNewValue] = useState(token.value);
    const [description, setDescription] = useState('');
    const [status, setStatus] = useState('idle');
    const [errorMsg, setErrorMsg] = useState('');
    const handleSubmit = async () => {
        if (!pat) {
            onPatNeeded();
            return;
        }
        if (newValue === token.value) {
            onClose();
            return;
        }
        setStatus('submitting');
        try {
            const url = await createPrFromEdit({
                pat,
                filePath: FILE_MAP[token.fileKey] ?? `tokens/${token.fileKey}.json`,
                tokenPath: token.path,
                currentValue: token.value,
                newValue,
                prDescription: description,
            });
            onPrCreated(url);
            onClose();
        }
        catch (err) {
            setStatus('error');
            setErrorMsg(err instanceof Error ? err.message : 'Unknown error');
        }
    };
    return (_jsx("div", { className: "modal-backdrop", onClick: onClose, children: _jsxs("div", { className: "modal", onClick: e => e.stopPropagation(), children: [_jsx("h2", { children: "Edit token" }), _jsx("p", { className: "token-path", children: token.path.join('.') }), _jsxs("label", { children: ["New value", token.type === 'color'
                            ? _jsxs("div", { className: "color-input-row", children: [_jsx("input", { type: "color", value: newValue.startsWith('#') ? newValue : '#000000', onChange: e => setNewValue(e.target.value) }), _jsx("input", { type: "text", value: newValue, onChange: e => setNewValue(e.target.value) })] })
                            : _jsx("input", { type: "text", value: newValue, onChange: e => setNewValue(e.target.value) })] }), _jsxs("label", { children: ["PR description (optional)", _jsx("textarea", { value: description, onChange: e => setDescription(e.target.value), rows: 3 })] }), status === 'error' && _jsx("p", { className: "error", children: errorMsg }), _jsxs("div", { className: "modal-actions", children: [_jsx("button", { onClick: onClose, children: "Cancel" }), _jsx("button", { className: "primary", onClick: handleSubmit, disabled: status === 'submitting', children: status === 'submitting' ? 'Creating PR…' : 'Create PR' })] })] }) }));
}
