/**
 * ESLint Configuration for v8 (CommonJS)
 * Enterprise-grade configuration with Jest, Airbnb, and Prettier support
 */

module.exports = {
  env: {
    es2022: true,
    node: true,
    'jest/globals': true,
  },

  extends: ['airbnb-base', 'plugin:jest/recommended', 'prettier'],

  plugins: ['jest'],

  parserOptions: {
    ecmaVersion: 2022,
    sourceType: 'module',
  },

  globals: {
    // Jest globals are handled by 'jest/globals' env
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

  overrides: [
    // Jest test files
    {
      files: ['**/__tests__/**/*', '**/*.{spec,test}.{js,jsx,ts,tsx}'],
      env: {
        'jest/globals': true,
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
  ],
};
