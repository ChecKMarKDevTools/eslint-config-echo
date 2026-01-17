/**
 * Example ESLint v8 (Flat Config, CommonJS)
 */

const echoConfig = require('@checkmarkdevtools/eslint-config-echo');

module.exports = [
  ...echoConfig,

  // Optional: add project-specific overrides
  {
    rules: {
      // 'no-console': 'warn',
    },
  },
];
