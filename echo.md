# eslint-config-echo

Enterprise ESLint config package that ships dual v8/v9 flat-config presets aligned to **Prettier-first** formatting, Sonar, and Jest workflows — standardizing dev setup while enforcing consistent quality gates across repositories.

![ChecKMarK Echo Social Banner](./assets/echo-social-sized.png)

### 📊 Project Stats

![GitHub Repo Stars](https://img.shields.io/github/stars/ChecKMarKDevTools/eslint-config-echo?style=for-the-badge&logo=github)
![GitHub Issues](https://img.shields.io/github/issues/ChecKMarKDevTools/eslint-config-echo?style=for-the-badge&logo=github)
![GitHub Release](https://img.shields.io/github/v/release/ChecKMarKDevTools/eslint-config-echo?style=for-the-badge&logo=github)
![License: Polyform Shield License 1.0.0](https://img.shields.io/badge/License-PolyForm%20Shield%201.0.0-blue?style=for-the-badge)

### 🗣️ Languages & Runtime

![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=000&style=for-the-badge)
![Node.js](https://img.shields.io/badge/Node.js%20%E2%89%A5%2024-5FA04E?logo=nodedotjs&logoColor=fff&style=for-the-badge)
![ESM](https://img.shields.io/badge/ESM-Ready-43853D?style=for-the-badge&logo=javascript&logoColor=white)

### 🔧 Quality & Standards

![Conventional Commits](https://img.shields.io/badge/Conventional%20Commits-FE5196?logo=conventionalcommits&logoColor=fff&style=for-the-badge)
![commitlint](https://img.shields.io/badge/commitlint-000?logo=commitlint&logoColor=fff&style=for-the-badge)
![ESLint](https://img.shields.io/badge/ESLint-4B32C3?logo=eslint&logoColor=fff&style=for-the-badge)
![Prettier](https://img.shields.io/badge/Prettier-F7B93E?logo=prettier&logoColor=fff&style=for-the-badge)
![SonarJS](https://img.shields.io/badge/SonarJS-126ED3?logo=sonarqube&logoColor=fff&style=for-the-badge)
![YAML Lint](https://img.shields.io/badge/YAML%20Lint-CB171E?logo=yaml&logoColor=fff&style=for-the-badge)
![SonarQube Quality Gate](https://sonarcloud.io/api/project_badges/quality_gate?project=ChecKMarKDevTools_eslint-config-echo)
![Codecov](https://img.shields.io/badge/Codecov-F01F7A?logo=codecov&logoColor=fff&style=for-the-badge)
![Dual Mode](https://img.shields.io/badge/Legacy%20%2B%20Flat%20Config-4B32C3?style=for-the-badge&logo=eslint&logoColor=white)

### 🤖 AI Contributors

![GitHub Copilot](https://img.shields.io/badge/GitHub%20Copilot-000?logo=githubcopilot&logoColor=fff&style=for-the-badge)
![ChatGPT](https://img.shields.io/badge/ChatGPT-74AA9C?logo=openai&logoColor=fff&style=for-the-badge)

## Features

- 🔄 **Dual ESLint Support**: Seamlessly works with both ESLint v8 (legacy `.eslintrc` format) and v9 (flat config format), providing maximum compatibility across different project setups and team preferences
- ✨ **Prettier Enforced**: Runs Prettier as an ESLint rule (`prettier/prettier`) and disables conflicting formatting rules
- 🧠 **Sonar Baseline**: Includes `eslint-plugin-sonarjs` recommended rules (Sonar-ish defaults)
- 🧹 **Unused Imports**: Flags dead imports (`eslint-plugin-unused-imports`)
- 🧾 **YAML Linting**: Includes `eslint-plugin-yml` recommended rules

## Dual ESLint Support Explained

This configuration provides **maximum compatibility** by supporting both ESLint v8 and v9, allowing teams to adopt modern linting practices without breaking existing workflows.

### When to Use ESLint v9 (Flat Config)

**Recommended for new projects** or when modernizing existing ones:

- ✅ **Future-proof**: ESLint v9's flat config is the direction of the ecosystem
- ✅ **ESM-first**: Native support for ES modules and modern JavaScript
- ✅ **Performance**: Faster configuration loading and resolution
- ✅ **Simplicity**: Single configuration file instead of multiple `.eslintrc` files

**File naming**: `eslint.config.mjs` (ESM) or `eslint.config.js` (with `"type": "module"`)

### When to Use ESLint v8 (Legacy Config)

**Best for existing projects** that need stability:

- ✅ **Proven stability**: Battle-tested in production environments
- ✅ **Gradual migration**: Can coexist with existing `.eslintrc` files
- ✅ **Tool compatibility**: Some tools and plugins still expect legacy format
- ✅ **Team familiarity**: Many developers are already comfortable with `.eslintrc`

**File naming**: `eslint.config.cjs` (CommonJS flat config) or `.eslintrc.js` (legacy)

### Migration Strategy

**From ESLint v8 to v9:**

1. Keep your existing v8 setup working
2. Add ESLint v9 flat config alongside (`eslint.config.cjs`)
3. Test both configurations in parallel
4. Gradually migrate teams and CI/CD
5. Remove legacy config when ready

**Both configurations use the same rule set**, ensuring consistent code quality regardless of ESLint version.

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

### ESLint v8 (Legacy / `.eslintrc.*`)

Create or update your `.eslintrc.cjs`:

```javascript
module.exports = {
  extends: ['@checkmarkdevtools/eslint-config-echo'],
  // Your project-specific overrides
};
```

### ESLint v9+ (Flat Config, CommonJS projects)

If your project is CommonJS-only but you want flat config, use the explicit flat entrypoint:

```javascript
const echoConfig = require('@checkmarkdevtools/eslint-config-echo/flat');

module.exports = [
  ...echoConfig,
  // Your custom configurations
];
```

### Examples

The `./examples` folder contains copy-pasteable configs:

- `examples/eslint.config.mjs` — ESLint v9 flat config (recommended)
- `examples/.eslintrc.cjs` — ESLint v8 legacy `.eslintrc` config (extends this package)

See `examples/README.md` for the minimal index.

````

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
````

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
  - **ESLint v10**: planned. This repo includes a forward-compat export setup and a conditional test hook, but cannot be verified until `eslint@10` is published.
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
