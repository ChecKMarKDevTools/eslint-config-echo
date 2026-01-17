/**
 * Example ESLint v9 (Flat Config) Configuration
 *
 * This is the new ESM-based flat configuration format
 * that works with ESLint v9.x
 */

import echoConfig from '@checkmarkdevtools/eslint-config-echo';

export default [
  // Spread the echo config
  ...echoConfig,

  // Optional: Add project-specific configuration
  {
    rules: {
      // Example: Warn on console statements instead of error
      // 'no-console': 'warn',
      // Example: Customize max line length
      // 'max-len': ['error', { code: 120 }],
      // Example: Allow unused vars with underscore prefix
      // 'no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
    },
  },

  // Optional: File-specific overrides
  {
    files: ['**/*.test.js', '**/*.spec.js'],
    rules: {
      // Example: Relax rules for test files
      // 'max-lines': 'off',
    },
  },
];
