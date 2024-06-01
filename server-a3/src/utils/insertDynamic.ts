
// uses regex to replace the `{{dyn}}` template literal with the
// substitution string
export function insertDynamic(dyn: string, sub: string) {
    const re = /\{\{dyn\}\}/;
    return dyn.replace(re, sub);
}
