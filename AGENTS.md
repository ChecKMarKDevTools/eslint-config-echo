# AI Agent Working Memory 🤖

**Purpose:** Context document for AI agents (Copilot, ChatGPT, etc.) working with this repository.

---

## Repository Overview

**Package:** `@checkmarkdevtools/eslint-config-echo`
**Type:** Shareable ESLint configuration (dual v8/v9 support)
**Architecture:** CommonJS with ESM wrapper for flat config
**Target:** Node.js >=24

### Product Config (what consumers install and use)

**Files that ship to consumers:**

- **`index.js`** - ESLint v8 legacy config (CommonJS, exports object)
- **`eslint.config.mjs`** - ESLint v9+ flat config wrapper (ESM)
- **`eslint.config.cjs`** - ESLint v9+ flat config wrapper (CJS)
- **`config/echo-flat.cjs`** - flat config implementation consumed by both wrappers

**What the shipped config includes:**

- Prettier enforcement
- SonarJS recommended rules
- `unused-imports` plugin
- YAML linting (`eslint-plugin-yml`)
- Test file restrictions (no try/catch)

---

## Critical Constraints

### Commitlint Footer Rules

**NOTE:** The custom plugin rules are currently commented out in `commitlint.config.js` because the plugin is not available:

```javascript
// 'rai-footer-exists': [2, 'always'],
// 'signed-off-by-exists': [1, 'always'],
```

- These rules would enforce required Git trailers for all commits
- Plugin `@checkmarkdevtools/commitlint-plugin-rai` is a **custom internal plugin**
- It is NOT published to npm and will not be found in package.json
- The plugin and rules are commented out to allow commitlint to run without errors
- When the plugin becomes available, uncomment the plugin reference and rules in `commitlint.config.js`

### Node.js Version

- **Minimum:** Node.js >=24 (specified in `package.json` `engines` field)
- **CI/CD:** CI runs on Node 24.x (matching the published package target: Node >=24)
- **Volta pin:** Node 24.13.0

### GitHub Actions Version Standards

Latest verified versions (January 2026):

- `actions/checkout@v6`
- `actions/setup-node@v5`
- `googleapis/release-please-action@v4`
- `codecov/codecov-action@v5`

**Pinning strategy:**

- Actions under `actions/*` namespace: Pin to latest version tag (e.g., `v6`)
- Third-party actions: Pin to SHA with version comment (e.g., `@abc123def # v1.2.3`)

---

## Workflow Requirements

### CI Workflow (`.github/workflows/ci.yml`)

**Must include:**

- Concurrency group: `${{ github.workflow }}-${{ github.ref }}`
- Draft PR exclusion: `if: github.event.pull_request.draft == false || github.event_name == 'push'`
- Job-level permissions (least privilege)
- Job-level timeouts (recommend: 10 minutes)

**Test stages:**

1. Prettier formatting check (`npm run format:check`)
2. Tests (`npm test`) including:

- coverage output (for Codecov)
- JUnit XML output (for artifacts)

3. Smoke test matrix on Node 20/22/24

### Release Workflow (`.github/workflows/release-please.yml`)

- Node.js 24
- `NPM_TOKEN` secret warning is **expected** (configured at repo level, not in code)
- Uses OIDC for provenance: `id-token: write` permission required
- Must use `concurrency` to prevent overlapping releases

---

## Package Structure

### Dual Export Strategy

```json
"exports": {
  ".": {
    "import": "./eslint.config.mjs",
    "require": "./index.js"
  }
}
```

- **CommonJS consumers** (ESLint v8): Get `index.js`
- **ESM consumers** (ESLint v9): Get `eslint.config.mjs`

### Published Files

Only the following are included in the npm package:

- `index.js`
- `config/` (directory)
- `eslint.config.cjs`
- `eslint.config.mjs`

**NOT published:** examples, tests, workflows, dotfiles

---

## Linting & Formatting

### Prettier First

- **Prettier is the source of truth** for all formatting
- ESLint integrates via `eslint-plugin-prettier`
- **DO NOT** enable ESLint formatting rules that conflict with Prettier
- Sonar's `enforce-trailing-comma` is disabled to prevent conflicts

### Rule Enforcement

- **No console statements:** `no-console: error`
- **No unused imports:** Via `eslint-plugin-unused-imports`
- **Sonar quality rules:** Enabled via `eslint-plugin-sonarjs`
- **YAML linting:** Via `eslint-plugin-yml` (flat config only)

### Test File Restrictions

Test files (`**/*.{spec,test}.js`, `test/**/*.js`) have special rules:

- **No try/catch blocks:** Use `expect(...).rejects` or `.toThrow()` instead
- Enforced via `no-restricted-syntax` AST rules

---

## Development Workflow

### Before Committing

1. Format: `npm run format`
2. Validate: `npm test`
3. Check trailers: Ensure commit message includes:
   - `Assisted-by:` or `Generated-by:` (required by `rai-footer-exists`)
   - `Signed-off-by:` (warning level expected)

### Local Testing

```bash
# Run tests
npm test

# Formatting
npm run format:check
npm run format  # auto-fix
```

---

## Common Failure Scenarios

### 1. Node Version Mismatch

**Symptom:** CI fails with "Unsupported engine" or uses wrong Node version
**Fix:** Ensure all `node-version` fields in workflows use `'24'` or `'24.x'`

### 2. Commitlint Plugin Not Found

**Symptom:** Error about `@checkmarkdevtools/commitlint-plugin-rai` not found causing commitlint to fail
**Fix:** The plugin is internal and not available. The plugin reference and its rules have been commented out in `commitlint.config.js` to allow commitlint to run. When the plugin becomes available, the references can be uncommented.

### 3. NPM_TOKEN Secret Warning

**Symptom:** GitHub Actions linter warns about `secrets.NPM_TOKEN`
**Fix:** This is **expected**. Secret is configured at repository level, not in workflow file.

### 4. ESLint Flat Config Errors

**Symptom:** ESLint v9 fails to load config
**Fix:** Verify `config/echo-flat.cjs` exports an array of config objects

### 5. Prettier vs ESLint Conflicts

**Symptom:** Code passes Prettier but fails ESLint (or vice versa)
**Fix:** Ensure `eslint-plugin-prettier/recommended` is **last** in config array

---

## Key Design Decisions

### Why Dual Config?

- **ESLint v8** (legacy): Still widely used, requires `.eslintrc` or `module.exports`
- **ESLint v9** (flat config): Future-proof, uses array-based config
- Maintains both for maximum compatibility

### Why is the flat config implemented in `config/echo-flat.cjs`?

- The package must support both ESM and CommonJS config entrypoints.
- A CommonJS implementation can be synchronously consumed from both wrappers:
  - `eslint.config.cjs` via `require()`
  - `eslint.config.mjs` via Node's CJS-to-ESM interop
- Keeping one implementation avoids rule drift.

---

## Agent Checklist for Changes

When modifying this repository, verify:

- [ ] Node.js version remains >=24 in all configs
- [ ] Commitlint footer rules remain intact
- [ ] Prettier runs before tests in CI
- [ ] CI runs on Node 24.x
- [ ] Workflow uses latest action versions (check Context7 if uncertain)
- [ ] Concurrency and draft PR filters are present in workflows
- [ ] Job-level permissions follow least privilege principle
- [ ] No new formatting rules conflict with Prettier

---

**Last Updated:** 2026-01-17
**Maintained for:** AI agent consumption (Copilot, ChatGPT, etc.)
