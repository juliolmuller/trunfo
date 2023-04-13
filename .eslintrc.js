module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    'lacussoft',
    'lacussoft/react',
    'lacussoft/typescript',
  ],
  rules: {
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-namespace': 'off',
    'quote-props': ['error', 'as-needed'],
    'no-console': ['warn', { allow: ['info', 'warn', 'error'] }],
    'no-magic-numbers': 'off',
    'no-nested-ternary': 'off',
    'no-shadow': 'off',
    'react/display-name': 'off',
  },
}
