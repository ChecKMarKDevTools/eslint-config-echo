# ESLint Config Echo - Examples

This directory contains example configurations for using `@checkmarkdevtools/eslint-config-echo` in your projects.

![ESLint-Config-Echo Social Banner](../assets/echo-social-sized.png)

### 📊 Project Stats

![GitHub Repo Stars](https://img.shields.io/github/stars/ChecKMarKDevTools/eslint-config-echo?style=for-the-badge&logo=github)
![GitHub Issues](https://img.shields.io/github/issues/ChecKMarKDevTools/eslint-config-echo?style=for-the-badge&logo=github)
![GitHub Release](https://img.shields.io/github/v/release/ChecKMarKDevTools/eslint-config-echo?style=for-the-badge&logo=github)
![License: PolyForm Shield](https://img.shields.io/badge/License-PolyForm%20Shield%201.0.0-blue?style=for-the-badge)

### 🗣️ Languages & Runtime

![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=000&style=for-the-badge)
![Node.js](https://img.shields.io/badge/Node.js%20%E2%89%A5%2024-5FA04E?logo=nodedotjs&logoColor=fff&style=for-the-badge)
![ESM](https://img.shields.io/badge/ESM-Ready-43853D?style=for-the-badge&logo=javascript&logoColor=white)

### 🔧 Lint & Format Stack

![ESLint](https://img.shields.io/badge/ESLint-4B32C3?logo=eslint&logoColor=fff&style=for-the-badge)
![Prettier](https://img.shields.io/badge/Prettier-F7B93E?logo=prettier&logoColor=fff&style=for-the-badge)
![SonarJS](https://img.shields.io/badge/SonarJS-126ED3?logo=sonarqube&logoColor=fff&style=for-the-badge)
![YAML Lint](https://img.shields.io/badge/YAML%20Lint-CB171E?logo=yaml&logoColor=fff&style=for-the-badge)

### 🤖 AI & Automation

![GitHub Copilot](https://img.shields.io/badge/GitHub%20Copilot-000?logo=githubcopilot&logoColor=fff&style=for-the-badge)
![ChatGPT](https://img.shields.io/badge/ChatGPT-74AA9C?logo=openai&logoColor=fff&style=for-the-badge)
![GitHub Actions](https://img.shields.io/badge/GitHub%20Actions-2088FF?logo=githubactions&logoColor=fff&style=for-the-badge)
![Codecov](https://img.shields.io/badge/Codecov-F01F7A?logo=codecov&logoColor=fff&style=for-the-badge)

### 📜 Quality & Standards

![Conventional Commits](https://img.shields.io/badge/Conventional%20Commits-FE5196?logo=conventionalcommits&logoColor=fff&style=for-the-badge)
![commitlint](https://img.shields.io/badge/commitlint-000?logo=commitlint&logoColor=fff&style=for-the-badge)
![Dual Mode](https://img.shields.io/badge/Legacy%20%2B%20Flat%20Config-4B32C3?style=for-the-badge&logo=eslint&logoColor=white)

## Files

### `.eslintrc.js` - ESLint v8 (Legacy) Example

Traditional legacy configuration for ESLint v8.x. Use this if you're using:

- ESLint version 8.x
- Legacy config format (`.eslintrc.*`)
- Standard CommonJS projects

### `eslint.config.mjs` - ESLint v9 (Flat Config) Example

Modern ESM-based flat configuration for ESLint v9.x. Use this if you're using:

- ESLint version 9.x
- Flat config format (required for v9)
- ESM project structure

### `eslint.config.cjs` - ESLint v8/v9 Flat Config (Advanced)

Flat config in CommonJS format. Use this if you're using:

- ESLint v8 with experimental flat config enabled
- ESLint v9 in a CommonJS-only project
- Backporting flat config features to v8

## Usage

1. Choose the appropriate example file based on your ESLint version
2. Copy the file to your project root
3. Uncomment and customize any rules as needed
4. Ensure you have installed the package:
   ```bash
   npm install --save-dev @checkmarkdevtools/eslint-config-echo eslint prettier
   ```

## Key Differences

| Feature        | ESLint v8 (Legacy)    | ESLint v9 (Flat Config) |
| -------------- | --------------------- | ----------------------- |
| Config Format  | Object export         | Array export (ESM)      |
| File Extension | `.js` or `.json`      | `.mjs` or `.js`         |
| Extends        | String array          | Spread operator `...`   |
| Customization  | `rules` + `overrides` | Append config objects   |

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

Add as a separate config object (both v8 and v9 flat config):

```javascript
files: ['**/*.test.js', '**/*.spec.js'],
rules: {
  'max-lines': 'off',
}
```
