import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { validatePat } from '@/lib/github';
export function PatModal({ currentPat, onSave, onClose }) {
    const [value, setValue] = useState(currentPat);
    const [status, setStatus] = useState('idle');
    const handleSave = async () => {
        if (!value.trim())
            return;
        setStatus('validating');
        const ok = await validatePat(value.trim());
        if (ok) {
            setStatus('valid');
            onSave(value.trim());
            setTimeout(onClose, 800);
        }
        else {
            setStatus('invalid');
        }
    };
    return (_jsx("div", { className: "modal-backdrop", onClick: onClose, children: _jsxs("div", { className: "modal", onClick: e => e.stopPropagation(), children: [_jsx("h2", { children: "GitHub Personal Access Token" }), _jsxs("p", { children: ["Required to create PRs when editing tokens. Needs ", _jsx("code", { children: "repo" }), " scope."] }), _jsx("input", { type: "password", value: value, onChange: e => { setValue(e.target.value); setStatus('idle'); }, placeholder: "ghp_...", autoFocus: true }), status === 'invalid' && _jsx("p", { className: "error", children: "Invalid token or missing repo scope." }), status === 'valid' && _jsx("p", { className: "success", children: "Token valid!" }), _jsxs("div", { className: "modal-actions", children: [_jsx("button", { onClick: onClose, children: "Cancel" }), _jsx("button", { className: "primary", onClick: handleSave, disabled: status === 'validating', children: status === 'validating' ? 'Validating…' : 'Save' })] })] }) }));
}
