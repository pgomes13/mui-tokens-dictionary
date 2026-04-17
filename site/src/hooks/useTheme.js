import { useState, useEffect } from 'react';
const KEY = 'mui-tokens-ui-theme';
export function useTheme() {
    const [theme, setTheme] = useState(() => localStorage.getItem(KEY) ?? 'light');
    useEffect(() => {
        document.documentElement.setAttribute('data-mui-color-scheme', theme);
        localStorage.setItem(KEY, theme);
    }, [theme]);
    const toggleTheme = () => setTheme(t => (t === 'light' ? 'dark' : 'light'));
    return { theme, toggleTheme };
}
