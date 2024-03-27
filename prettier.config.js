/** @type {import("prettier").Config} */
const config = {
    experimentalTernaries: true,
    tabWidth: 4,
    useTabs: true,
    singleQuote: true,
    jsxSingleQuote: true,
    trailingComma: "es5",
    bracketSpacing: true,
    bracketSameLine: false,
    proseWrap: "always",

    // $ npm i -D prettier prettier-plugin-tailwindcss
    plugins: ["prettier-plugin-tailwindcss"],
};

export default config;
