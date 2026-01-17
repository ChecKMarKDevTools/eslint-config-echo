/**
 * ESLint Configuration for v9 (ESM - Flat Config)
 * Enterprise-grade configuration with Jest, Airbnb, and Prettier support
 */

import { FlatCompat } from '@eslint/eslintrc';
import js from '@eslint/js';
import jestPlugin from 'eslint-plugin-jest';
import path from 'path';
import { fileURLToPath } from 'url';

// Mimic CommonJS __dirname in ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Initialize FlatCompat for legacy config compatibility
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
});

export default [
  // Base recommended rules
  js.configs.recommended,

  // Airbnb base configuration (using FlatCompat for legacy format)
  ...compat.extends('airbnb-base'),

  // Prettier integration (must come after airbnb to override formatting rules)
  ...compat.extends('prettier'),

  // Main configuration
  {
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: 'module',
      globals: {
        // Node.js globals
        __dirname: 'readonly',
        __filename: 'readonly',
        exports: 'writable',
        module: 'readonly',
        require: 'readonly',
        global: 'readonly',
        process: 'readonly',
        console: 'readonly',
        Buffer: 'readonly',

        // Jest globals
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
      jest: jestPlugin,
    },

    rules: {
      // Enforce strict mode in appropriate contexts
      // Using 'safe' instead of 'global' for better module compatibility
      strict: ['error', 'safe'],

      // Prevent warning comments that could bypass quality gates
      // This prevents TODO/FIXME with eslint-disable or nosonar
      'no-warning-comments': [
        'warn',
        {
          terms: ['eslint-disable', 'nosonar'],
          location: 'anywhere',
        },
      ],

      // Allow scoped imports/requires for better module organization
      'import/no-extraneous-dependencies': [
        'error',
        {
          devDependencies: true,
          optionalDependencies: false,
          peerDependencies: false,
        },
      ],

      // Jest recommended rules
      ...jestPlugin.configs.recommended.rules,

      // ============================================
      // PLACEHOLDER: Individual Rule Overrides
      // ============================================
      // Add specific rule customizations below as needed in future iterations
      // Examples:
      // 'no-console': 'warn',
      // 'max-len': ['error', { code: 120 }],
      // 'no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
      // ============================================
    },
  },

  // Test files configuration
  {
    files: ['**/__tests__/**/*', '**/*.{spec,test}.{js,jsx,ts,tsx,mjs,cjs}'],

    plugins: {
      jest: jestPlugin,
    },

    languageOptions: {
      globals: {
        // Jest globals already defined in main config
      },
    },

    rules: {
      // Allow scoped requires in test files
      'global-require': 'off',
      'import/no-dynamic-require': 'off',

      // ============================================
      // PLACEHOLDER: Test-Specific Rule Overrides
      // ============================================
      // Add test-specific rule customizations below as needed
      // Examples:
      // 'jest/expect-expect': 'warn',
      // 'jest/no-disabled-tests': 'warn',
      // ============================================
    },
  },
];
