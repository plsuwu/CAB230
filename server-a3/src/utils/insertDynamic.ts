export function insertDynamic(dyn: string, sub: string) {
    const re = /\{\{dyn\}\}/;
    return dyn.replace(re, sub);
}
