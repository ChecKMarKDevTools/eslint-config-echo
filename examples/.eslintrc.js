/**
 * Example ESLint v8 (Legacy) Configuration
 * 
 * This is the traditional CommonJS-based ESLint configuration
 * that works with ESLint v8.x
 */

module.exports = {
  // Extend the echo config
  extends: ['@checkmarkdevtools/eslint-config-echo'],
  
  // Optional: Override specific rules for your project
  rules: {
    // Example: Warn on console statements instead of error
    // 'no-console': 'warn',
    
    // Example: Customize max line length
    // 'max-len': ['error', { code: 120 }],
    
    // Example: Allow unused vars with underscore prefix
    // 'no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
  },
  
  // Optional: Project-specific overrides
  overrides: [
    // Example: Relax rules for test files
    {
      files: ['**/*.test.js', '**/*.spec.js'],
      rules: {
        // 'max-lines': 'off',
      },
    },
  ],
};
