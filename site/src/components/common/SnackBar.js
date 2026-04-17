import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect } from 'react';
export function SnackBar({ message, link, onClose }) {
    useEffect(() => {
        const t = setTimeout(onClose, 5000);
        return () => clearTimeout(t);
    }, [onClose]);
    return (_jsxs("div", { className: "snackbar", children: [_jsx("span", { children: message }), link && _jsx("a", { href: link.href, target: "_blank", rel: "noreferrer", children: link.label }), _jsx("button", { onClick: onClose, children: "\u2715" })] }));
}
