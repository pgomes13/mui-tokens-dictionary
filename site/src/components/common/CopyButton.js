import { jsx as _jsx } from "react/jsx-runtime";
import { useState } from 'react';
export function CopyButton({ value, label = 'Copy' }) {
    const [copied, setCopied] = useState(false);
    const handleClick = () => {
        navigator.clipboard.writeText(value).then(() => {
            setCopied(true);
            setTimeout(() => setCopied(false), 1500);
        });
    };
    return (_jsx("button", { className: `copy-btn${copied ? ' copied' : ''}`, onClick: handleClick, title: value, children: copied ? '✓' : label }));
}
