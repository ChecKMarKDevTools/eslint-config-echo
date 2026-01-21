/**
 * Example ESLint flat config in CommonJS.
 *
 * Use this when:
 * - you want flat config
 * - your project is CommonJS-only
 * - you're using the package as a devDependency
 */

const echoFlat = require('@checkmarkdevtools/eslint-config-echo/flat');

module.exports = [
  ...echoFlat,
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
];
