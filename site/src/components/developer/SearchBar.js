import { jsx as _jsx } from "react/jsx-runtime";
export function SearchBar({ value, onChange }) {
    return (_jsx("div", { className: "search-bar", children: _jsx("input", { type: "search", placeholder: "Search tokens\u2026", value: value, onChange: e => onChange(e.target.value) }) }));
}
