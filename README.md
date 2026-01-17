# eslint-config-echo

Enterprise ESLint config package that ships dual v8/v9 flat-config presets aligned to **Prettier-first** formatting, Sonar, and Jest workflows — standardizing dev setup while enforcing consistent quality gates across repositories.

![ChecKMarK Echo Social Banner](./assets/echo-social-sized.png)

### 📊 Project Stats

![GitHub Repo Stars](https://img.shields.io/github/stars/ChecKMarKDevTools/eslint-config-echo?style=for-the-badge&logo=github)
![GitHub Issues](https://img.shields.io/github/issues/ChecKMarKDevTools/eslint-config-echo?style=for-the-badge&logo=github)
![GitHub Release](https://img.shields.io/github/v/release/ChecKMarKDevTools/eslint-config-echo?style=for-the-badge&logo=github)
![License: Polyform Shield License 1.0.0](https://img.shields.io/badge/License-PolyForm%20Shield%201.0.0-blue?style=for-the-badge)

### 🔧 Quality & Standards

![Conventional Commits](https://img.shields.io/badge/Conventional%20Commits-FE5196?logo=conventionalcommits&logoColor=fff&style=for-the-badge)
![commitlint](https://img.shields.io/badge/commitlint-000?logo=commitlint&logoColor=fff&style=for-the-badge)
![ESLint](https://img.shields.io/badge/ESLint-4B32C3?logo=eslint&logoColor=fff&style=for-the-badge)
![Prettier](https://img.shields.io/badge/Prettier-F7B93E?logo=prettier&logoColor=fff&style=for-the-badge)
![SonarQube Cloud](https://img.shields.io/badge/SonarQube%20Cloud-126ED3?logo=sonarqube&logoColor=fff&style=for-the-badge)
![Codecov](https://img.shields.io/badge/Codecov-F01F7A?logo=codecov&logoColor=fff&style=for-the-badge)

### 🤖 AI Contributors

![GitHub Copilot](https://img.shields.io/badge/GitHub%20Copilot-000?logo=githubcopilot&logoColor=fff&style=for-the-badge)
![ChatGPT](https://img.shields.io/badge/ChatGPT-74AA9C?logo=openai&logoColor=fff&style=for-the-badge)

## Features

- 🔄 **Dual ESLint Support**: Works with ESLint v8 (CJS) and v9 (ESM) using flat config
- ✨ **Prettier Enforced**: Runs Prettier as an ESLint rule (`prettier/prettier`) and disables conflicting formatting rules
- 🧠 **Sonar Baseline**: Includes `eslint-plugin-sonarjs` recommended rules (Sonar-ish defaults)
- 🧹 **Unused Imports**: Flags dead imports (`eslint-plugin-unused-imports`)
- 🧾 **YAML Linting**: Includes `eslint-plugin-yml` recommended rules

## Installation

```bash
npm install --save-dev @checkmarkdevtools/eslint-config-echo eslint prettier
```

or

```bash
yarn add -D @checkmarkdevtools/eslint-config-echo eslint prettier
```

## Usage

### ESLint v9 (ESM / Flat Config)

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

### ESLint v8 (CommonJS / Flat Config)

Create or update your `eslint.config.cjs`:

```javascript
const echoConfig = require('@checkmarkdevtools/eslint-config-echo');

module.exports = [
  ...echoConfig,
  // Your custom configurations
];
```

## Configuration Details

### Included Plugins

- **eslint-plugin-prettier** + **eslint-config-prettier**: Enforces Prettier (`prettier/prettier`) and disables conflicting formatting rules
- **eslint-plugin-sonarjs**: Sonar rule presets
- **eslint-plugin-unused-imports**: Flags unused imports
- **eslint-plugin-yml**: YAML linting rules

### Key Rules

- **No Console**: `console.*` is an error
- **Unused Imports**: Dead imports are an error
- **Modernization**: Prefer newer safer APIs (primarily via SonarJS)

### Test File Support

Test files get extra restrictions (no try/catch and no catch clauses) to force explicit error assertions.

### Customization

Append your own config objects after the shared config:

```javascript
import echoConfig from '@checkmarkdevtools/eslint-config-echo';

export default [
  ...echoConfig,
  {
    rules: {
      // Override any rules here
      'no-console': 'warn',
    },
  },
];
```

## Prettier Integration

This config **requires Prettier** and **enforces it through ESLint**.

Precedence is intentional:

1. **Prettier formatting** (must win)
2. **SonarJS** (quality rules)
3. Everything else

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

Note: This config explicitly disables Sonar's trailing-comma rule (`sonarjs/enforce-trailing-comma`) to avoid conflicts with Prettier.

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
- **Node.js**: >= 24
- **Prettier**: required (v3.x)

## About the License ⚖️

This project exists to standardize linting behavior across environments. It’s meant to be used, extended, and reused inside real codebases without ceremony.

You’re free to use this configuration, fork it, adapt it for your own projects, and run it internally. That’s the expected use case.

What you can’t do is package it as a paid product, service, or commercial offering without permission. If this configuration becomes part of something you sell or monetize, that requires a conversation first.

This repository is licensed under the [PolyForm Shield License 1.0.0](./LICENSE). Public forks or substantial reuse require attribution. No warranties are provided, no endorsements are implied, and if it breaks, that’s on whoever wired it in. 💎

## Contributing

Contributions are welcome! Please follow the conventional commits specification for commit messages.

## Support

For issues and questions, please use the [GitHub Issues](https://github.com/ChecKMarKDevTools/eslint-config-echo/issues) page.
