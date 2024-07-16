module.exports = {
	env: {
		browser: true,
		es2021: true,
		node: true,
	},
	extends: [
		'eslint:recommended',
		'plugin:@typescript-eslint/recommended',
		'plugin:prettier/recommended',
	],
	overrides: [],
	ignorePatterns: ['*.html'],
	parser: '@typescript-eslint/parser',
	parserOptions: {
		ecmaVersion: 'latest',
		sourceType: 'module',
	},
	plugins: ['@typescript-eslint', 'prettier'],
	settings: {
		react: {
			version: 'detect',
		},
	},
	rules: {
		'@typescript-eslint/no-non-null-assertion': 'off',
		'@typescript-eslint/no-explicit-any': 'off',
		'@typescript-eslint/no-this-alias': 'off',
		'@typescript-eslint/ban-ts-comment': 'off',
		'@typescript-eslint/no-empty-interface': 'off',
		'@typescript-eslint/no-unused-vars': 'warn',
		'prettier/prettier': [
			'error',
			{
				endOfLine: 'auto',
				useTabs: true,
				singleQuote: true,
				printWidth: 100,
				singleAttributePerLine: true,
			},
		],
	},
};
