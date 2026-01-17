# ESLint Config Echo - Examples

This directory contains example configurations for using `@checkmarkdevtools/eslint-config-echo` in your projects.

## Files

### `.eslintrc.js` - ESLint v8 (Legacy) Example

Traditional CommonJS configuration file for ESLint v8.x. Use this if you're using:

- ESLint version 8.x
- Prefer the familiar `.eslintrc` format
- CommonJS project structure

### `eslint.config.mjs` - ESLint v9 (Flat Config) Example

Modern ESM-based flat configuration for ESLint v9.x. Use this if you're using:

- ESLint version 9.x
- Want to use the new flat config format
- ESM project structure

## Usage

1. Choose the appropriate example file based on your ESLint version
2. Copy the file to your project root
3. Uncomment and customize any rules as needed
4. Ensure you have installed the package:
   ```bash
   npm install --save-dev @checkmarkdevtools/eslint-config-echo eslint
   ```

## Key Differences

| Feature        | ESLint v8                 | ESLint v9               |
| -------------- | ------------------------- | ----------------------- |
| Config Format  | Object export             | Array export            |
| File Extension | `.js` or `.json`          | `.js` or `.mjs`         |
| Extends        | String array in `extends` | Spread operator `...`   |
| Overrides      | `overrides` array         | Separate config objects |

## Common Customizations

### Allow Console Logs (Development)

```javascript
rules: {
  'no-console': 'warn',
}
```

### Increase Line Length

```javascript
rules: {
  'max-len': ['error', { code: 120 }],
}
```

### Ignore Unused Vars with Underscore

```javascript
rules: {
  'no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
}
```

### Disable Rules in Test Files

Add to overrides (v8) or as separate config object (v9):

```javascript
files: ['**/*.test.js', '**/*.spec.js'],
rules: {
  'max-lines': 'off',
}
```
