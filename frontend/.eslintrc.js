/* eslint-disable import/unambiguous */
module.exports = {
  root: true,
  env: {
    node: true,
    jest: true,
  },
  extends: [
    '@lacussoft',
    'plugin:vue/essential',
  ],
  ignorePatterns: [
    '!babel.config.js',
  ],
  parserOptions: {
    parser: 'babel-eslint',
  },
  rules: {
    'import/no-internal-modules': 'off',
    'import/no-unresolved': 'off',
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
  },
}
