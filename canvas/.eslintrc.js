module.exports = {
	root: true,
	env: {
		node: true
	},
	extends: ['plugin:vue/vue3-essential', '@vue/standard'],
	parserOptions: {
		parser: 'babel-eslint'
	},
	rules: {
		semi: [0],
		'indent' : 'off',
		'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
		'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
		'space-before-function-paren': 0,
		'no-tabs': 'off'
	}
};
