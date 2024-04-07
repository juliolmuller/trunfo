module.exports = {
  root: true,
  extends: ['react-app', 'react-app/jest'],
  ignorePatterns: ['public/', '*.html'],
  plugins: ['import-helpers', 'prettier'],
  rules: {
    '@typescript-eslint/no-unused-vars': [
      'error',
      {
        args: 'all',
        argsIgnorePattern: '^_',
        vars: 'all',
        caughtErrors: 'all',
        ignoreRestSiblings: true,
      },
    ],
    eqeqeq: 'error',
    'func-style': ['error', 'declaration'],
    'import/no-anonymous-default-export': 'off',
    'import-helpers/order-imports': [
      'warn',
      {
        alphabetize: {
          order: 'asc',
          ignoreCase: true,
        },
        groups: ['module', ['/^~//'], ['parent', 'sibling', 'index']],
        newlinesBetween: 'always',
      },
    ],
    'prefer-arrow-callback': 'error',
    'no-console': [
      'error',
      {
        allow: ['info', 'error', 'warn'],
      },
    ],
    'prefer-const': 'error',
    'prefer-template': 'error',
    'prettier/prettier': [
      'warn',
      {
        arrowParens: 'always',
        lineEndings: 'lf',
        printWidth: 100,
        semi: false,
        singleQuote: true,
        trailingComma: 'all',
      },
    ],
    'react/jsx-curly-brace-presence': [
      'warn',
      {
        props: 'never',
        children: 'never',
        propElementValues: 'always',
      },
    ],
  },
}
