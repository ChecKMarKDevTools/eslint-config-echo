# eslint-config-echo

Enterprise ESLint plugin repo that ships dual v8/v9 configs and rule presets aligned to Prettier, Sonar, and Jest workflows, standardizing dev setup while enforcing consistent quality gates across repositories.

## Features

- 🔄 **Dual ESLint Support**: Compatible with both ESLint v8 (CommonJS) and v9 (ESM/Flat Config)
- 🎯 **Enterprise-Ready**: Based on Airbnb's battle-tested JavaScript style guide
- 🧪 **Jest Integration**: Pre-configured for Jest testing with globals
- 💅 **Prettier Integration**: Conflict-free Prettier setup
- 🔒 **Quality Gates**: Enforces strict mode and prevents bypass comments (eslint-disable, nosonar)
- 📦 **ES2022 Target**: Modern JavaScript with ECMAScript 2022 support
- 🔧 **Extensible**: Placeholder sections for custom rule overrides

## Installation

```bash
npm install --save-dev @checkmarkdevtools/eslint-config-echo eslint
```

or

```bash
yarn add -D @checkmarkdevtools/eslint-config-echo eslint
```

## Usage

### ESLint v8 (CommonJS)

Create or update your `.eslintrc.js`:

```javascript
module.exports = {
  extends: ['@checkmarkdevtools/eslint-config-echo'],
};
```

Or in `.eslintrc.json`:

```json
{
  "extends": ["@checkmarkdevtools/eslint-config-echo"]
}
```

### ESLint v9 (ESM/Flat Config)

Create or update your `eslint.config.mjs`:

```javascript
import echoConfig from '@checkmarkdevtools/eslint-config-echo';

export default [
  ...echoConfig,
  // Your custom configurations
];
```

Or in `eslint.config.js` if your project has `"type": "module"` in package.json:

```javascript
import echoConfig from '@checkmarkdevtools/eslint-config-echo';

export default [
  ...echoConfig,
  // Your custom configurations
];
```

## Configuration Details

### Included Plugins & Configs

- **eslint-config-airbnb-base**: Industry-standard JavaScript style guide
- **eslint-plugin-jest**: Jest-specific linting rules
- **eslint-config-prettier**: Disables ESLint rules that conflict with Prettier

### Key Rules

- **Strict Mode**: Enforced globally for better error handling
- **No Warning Comments**: Prevents use of `eslint-disable` and `nosonar` in comments to maintain quality gates
- **ES2022**: Modern JavaScript features enabled
- **Jest Globals**: Automatically available in test files
- **Scoped Imports**: Allowed for better module organization

### Test File Support

Automatically detects and applies Jest-specific rules to:

- Files in `__tests__` directories
- Files matching `*.spec.js`, `*.test.js` patterns

### Customization

The configuration includes placeholder sections for future rule overrides:

```javascript
// In your project's ESLint config
module.exports = {
  extends: ['@checkmarkdevtools/eslint-config-echo'],
  rules: {
    // Override any rules here
    'no-console': 'warn',
    'max-len': ['error', { code: 120 }],
  },
};
```

## Prettier Integration

This config works seamlessly with Prettier. Install Prettier in your project:

```bash
npm install --save-dev prettier
```

Create a `.prettierrc`:

```json
{
  "semi": true,
  "trailingComma": "es5",
  "singleQuote": true,
  "printWidth": 100,
  "tabWidth": 2
}
```

## Commitlint Integration

The repository includes commitlint configuration following conventional commits:

```bash
npm install --save-dev @commitlint/cli @commitlint/config-conventional
```

## Scripts

Add these scripts to your `package.json`:

```json
{
  "scripts": {
    "lint": "eslint .",
    "lint:fix": "eslint . --fix",
    "format": "prettier --write .",
    "format:check": "prettier --check ."
  }
}
```

## Version Compatibility

- **ESLint**: v8.x or v9.x
- **Node.js**: 14.x or higher recommended
- **Prettier**: v3.x recommended

## About the License ⚖️

This project exists to standardize linting behavior across environments. It’s meant to be used, extended, and reused inside real codebases without ceremony.

You’re free to use this configuration, fork it, adapt it for your own projects, and run it internally. That’s the expected use case.

What you can’t do is package it as a paid product, service, or commercial offering without permission. If this configuration becomes part of something you sell or monetize, that requires a conversation first.

This repository is licensed under the PolyForm Shield License 1.0.0. Public forks or substantial reuse require attribution. No warranties are provided, no endorsements are implied, and if it breaks, that’s on whoever wired it in. 💎

## Contributing

Contributions are welcome! Please follow the conventional commits specification for commit messages.

## Support

For issues and questions, please use the [GitHub Issues](https://github.com/ChecKMarKDevTools/eslint-config-echo/issues) page.
