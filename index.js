/**
 * ESLint v8 Legacy Config (CommonJS)
 *
 * Traditional .eslintrc-style configuration for ESLint v8.x
 */

module.exports = {
  env: {
    es2024: true,
    node: true,
  },

  extends: ['eslint-config-prettier'],

  plugins: ['unused-imports', 'sonarjs', 'yml'],

  parserOptions: {
    ecmaVersion: 2024,
    sourceType: 'module',
  },

  rules: {
    'no-console': 'error',
    'no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
    'func-style': ['error', 'expression', { allowArrowFunctions: true }],
    'prefer-const': 'error',
    'no-var': 'error',
    'unused-imports/no-unused-imports': 'error',
    'no-unsafe-optional-chaining': 'error',
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
