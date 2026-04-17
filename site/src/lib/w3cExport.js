function deepMerge(target, source) {
    const result = { ...target };
    for (const [k, v] of Object.entries(source)) {
        if (typeof v === 'object' && v !== null && !('$value' in v) && typeof result[k] === 'object' && result[k] !== null) {
            result[k] = deepMerge(result[k], v);
        }
        else {
            result[k] = v;
        }
    }
    return result;
}
export function buildW3CExport(files) {
    const baseKeys = [
        'palette/grey',
        'palette/common',
        'typography/base',
        'typography/variants',
        'spacing',
        'shape',
        'breakpoints',
        'zIndex',
        'transitions/duration',
        'transitions/easing',
    ];
    let global = {};
    for (const key of baseKeys) {
        global = deepMerge(global, files[key]);
    }
    global = deepMerge(global, files['palette/light']);
    const dark = files['palette/dark'];
    const output = {
        $metadata: { tokenSetOrder: ['global', 'dark'] },
        global,
        dark,
    };
    return JSON.stringify(output, null, 2);
}
export function downloadW3CExport(files) {
    const json = buildW3CExport(files);
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'tokens-studio.json';
    a.click();
    URL.revokeObjectURL(url);
}
