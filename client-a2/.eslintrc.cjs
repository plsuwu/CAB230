module.exports = {
	settings: {
		'import/resolver': {
			node: {
				extensions: ['.ts', '.tsx', '.js', '.jsx'],
			},
			alias: {
				extensions: ['.ts', '.tsx', '.js', '.jsx', '.scss', '.css', '.d.ts'],
				map: [['@/*', './*']],
			},
		},
	},
	root: true,
	env: { browser: true, es2020: true, node: true },
	extends: [
		'eslint:recommended',
		'plugin:@typescript-eslint/recommended',
		'plugin:react-hooks/recommended',
	],
	ignorePatterns: ['dist', '.eslintrc.cjs'],
	parser: '@typescript-eslint/parser',
	plugins: ['react-refresh', '@typescript-eslint'],
	rules: {
		'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
	},
};
