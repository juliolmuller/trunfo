// eslint-disable-next-line import/unambiguous
module.exports = {
  root: true,
  env: {
    es6: true,
    node: true,
    jest: true,
  },
  extends: [
    '@lacussoft/typescript',
  ],
  ignorePatterns: [],
  rules: {
    '@typescript-eslint/no-explicit-any': 'off',
    'no-console': 'off',
  },
}
