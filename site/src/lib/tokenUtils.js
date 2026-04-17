function isLeaf(node) {
    return typeof node === 'object' && node !== null && '$value' in node;
}
export function flattenTokens(obj, fileKey, pathPrefix = []) {
    if (isLeaf(obj)) {
        return [{ path: pathPrefix, value: String(obj.$value), type: obj.$type ?? 'unknown', fileKey }];
    }
    if (typeof obj !== 'object' || obj === null)
        return [];
    return Object.entries(obj).flatMap(([key, val]) => flattenTokens(val, fileKey, [...pathPrefix, key]));
}
export function toCssVar(path) {
    const parts = path.filter(s => s !== 'DEFAULT').join('-');
    return `--mui-${parts}`;
}
export function toJsName(path) {
    return 'Mui' + path
        .filter(s => s !== 'DEFAULT')
        .map(s => s.charAt(0).toUpperCase() + s.slice(1))
        .join('');
}
export function groupByCategory(tokens) {
    const map = new Map();
    for (const t of tokens) {
        const cat = t.path[0] ?? 'other';
        const existing = map.get(cat) ?? [];
        existing.push(t);
        map.set(cat, existing);
    }
    return map;
}
