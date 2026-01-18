// ESLint v9+ flat config (shared)
//
// Single source-of-truth consumed by:
// - ESLint v9+ via `eslint.config.mjs` (ESM wrapper)
// - ESLint v8 via `eslint.config.cjs` (CJS wrapper)

const globals = require('globals');
const { FlatCompat } = require('@eslint/eslintrc');
const path = require('path');

const unusedImports = require('eslint-plugin-unused-imports');
const sonarjs = require('eslint-plugin-sonarjs');
const yml = require('eslint-plugin-yml');
const jestPlugin = require('eslint-plugin-jest');
const importPlugin = require('eslint-plugin-import');
const eslintPluginPrettierRecommended = require('eslint-plugin-prettier/recommended');

// Initialize FlatCompat for legacy config compatibility
const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const ignores = ['build/**', 'node_modules/**', 'playwright-report/**', 'test-results/**'];

const jsRules = {
  files: ['**/*.{js,mjs,cjs}'],
  languageOptions: {
    ecmaVersion: 2022,
    sourceType: 'module',
    globals: {
      ...globals.node,
      ...globals.es2021,
      // Jest globals for test environments
      afterAll: 'readonly',
      afterEach: 'readonly',
      beforeAll: 'readonly',
      beforeEach: 'readonly',
      describe: 'readonly',
      expect: 'readonly',
      it: 'readonly',
      jest: 'readonly',
      test: 'readonly',
      fit: 'readonly',
      xit: 'readonly',
      xtest: 'readonly',
    },
  },
  plugins: {
    'unused-imports': unusedImports,
    jest: jestPlugin,
    import: importPlugin,
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
        terms: ['eslint-disable', 'eslint-disable-next-line', 'eslint-disable-line', 'nosonar'],
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
    ...jestPlugin.configs.recommended.rules,
  },
};

const cjsFiles = {
  files: ['**/*.cjs'],
  languageOptions: {
    sourceType: 'script',
  },
};

const testRules = {
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
};

const sonarRecommended = {
  ...sonarjs.configs.recommended,
  files: jsRules.files,
};

const sonarOverrides = {
  files: jsRules.files,
  rules: {
    // Prettier is the formatting source of truth.
    // Disable Sonar's trailing-comma rule (S3723) to avoid formatter-vs-linter fights.
    'sonarjs/enforce-trailing-comma': 'off',
  },
};

module.exports = [
  { ignores },
  // Airbnb base configuration (using FlatCompat for legacy format)
  ...compat.extends('airbnb-base'),
  jsRules,
  // Sonar baseline ("recommended") for quality rules. (Prettier still wins formatting conflicts.)
  sonarRecommended,
  sonarOverrides,
  cjsFiles,
  testRules,
  ...yml.configs['flat/recommended'],
  // Must be last: enables `prettier/prettier` and disables formatting rules that conflict with Prettier.
  eslintPluginPrettierRecommended,
];
