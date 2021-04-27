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
    'tests/**/*.js',
  ],
  parserOptions: {
    parser: 'babel-eslint',
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
  },
}
