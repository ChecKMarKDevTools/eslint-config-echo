/**
 * ESLint v8 Legacy Config (CommonJS)
 *
 * Traditional .eslintrc-style configuration for ESLint v8.x
 */

module.exports = {
  env: {
    es2021: true,
    node: true,
    // Jest globals for test environments
    jest: true,
  },

  extends: ['airbnb-base', 'eslint-config-prettier'],

  plugins: ['unused-imports', 'sonarjs', 'yml', 'jest', 'import'],

  parserOptions: {
    ecmaVersion: 2022,
    sourceType: 'module',
  },

  rules: {
    strict: ['error', 'safe'],
    'no-console': 'error',
    'no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
    'func-style': ['error', 'expression', { allowArrowFunctions: true }],
    'prefer-const': 'error',
    'no-var': 'error',
    'unused-imports/no-unused-imports': 'error',
    'no-unsafe-optional-chaining': 'error',
    'no-warning-comments': [
      'error',
      {
        terms: ['eslint-disable', 'nosonar'],
        location: 'anywhere',
      },
    ],
    'import/no-extraneous-dependencies': [
      'error',
      {
        devDependencies: true,
        optionalDependencies: false,
        peerDependencies: false,
      },
    ],
  },

  overrides: [
    {
      files: ['**/*.cjs'],
      parserOptions: {
        sourceType: 'script',
      },
    },
    {
      files: ['test/**/*.{js,mjs,cjs}', '**/*.{spec,test}.{js,mjs,cjs}', '**/*test*.{js,mjs,cjs}'],
      rules: {
        'no-restricted-syntax': [
          'error',
          {
            selector: 'TryStatement',
            message:
              'Do not use try/catch in test files. Use expect(...).rejects / .toThrow() (or equivalent) for error assertions.',
          },
          {
            selector: 'CatchClause',
            message:
              'Do not use catch clauses in test files. Assert errors via expect(...).rejects / .toThrow() instead.',
          },
        ],
      },
    },
    {
      files: ['**/*.{yml,yaml}'],
      parser: 'yaml-eslint-parser',
      extends: ['plugin:yml/recommended'],
    },
  ],
};
