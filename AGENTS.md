# AI Agent Working Memory 🤖

**Purpose:** Context document for AI agents (Copilot, ChatGPT, etc.) working with this repository.

---

## Repository Overview

**Package:** `@checkmarkdevtools/eslint-config-echo`
**Type:** Shareable ESLint configuration (dual v8/v9 support)
**Architecture:** CommonJS with ESM wrapper for flat config
**Target:** Node.js >=24

### Core Files

- **`index.js`** - ESLint v8 legacy config (CommonJS, direct consumption)
- **`eslint.config.mjs`** - ESLint v9 flat config wrapper (ESM, imports from `config/echo-flat.cjs`)
- **`eslint.config.cjs`** - ESLint v9 flat config wrapper (CJS, for require-based tooling)
- **`config/echo-flat.cjs`** - Single source-of-truth flat config (consumed by both v8 and v9 wrappers)

---

## Critical Constraints

### Commitlint Footer Rules

**DO NOT REMOVE** the following rules from `commitlint.config.js`:

```javascript
'rai-footer-exists': [2, 'always'],
'signed-off-by-exists': [1, 'always'],
```

- These enforce required Git trailers for all commits
- Plugin `@checkmarkdevtools/commitlint-plugin-rai` is a **custom internal plugin**
- It is NOT published to npm and will not be found in package.json
- Warnings about missing plugin are **expected and acceptable**
- Workflows must accommodate this without failing

### Node.js Version

- **Minimum:** Node.js >=24 (specified in `package.json` `engines` field)
- **CI/CD:** All workflows MUST use Node 24.x (not 18, 20, or 22)
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
- Node.js 24.x matrix or single version

**Test stages:**

1. Prettier formatting check (`npm run format:check`)
2. ESLint v8 legacy validation (`ESLINT_USE_FLAT_CONFIG=false npx eslint ...`)
3. ESLint v9 flat config validation (`npx eslint ... --config eslint.config.mjs`)
4. Config load tests (both v8 and v9)

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
2. Validate: `npm run lint`
3. Check trailers: Ensure commit message includes:
   - `Assisted-by:` or `Generated-by:` (required by `rai-footer-exists`)
   - `Signed-off-by:` (warning level)

### Local Testing

```bash
# Test ESLint v8 config
ESLINT_USE_FLAT_CONFIG=false npx eslint index.js commitlint.config.js

# Test ESLint v9 config
npx eslint eslint.config.mjs --config eslint.config.mjs

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

**Symptom:** Warning about `@checkmarkdevtools/commitlint-plugin-rai` not found
**Fix:** This is **expected**. Do not add to dependencies. Do not remove plugin reference.

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

### Why CJS Source of Truth?

- Most ESLint plugins still distribute as CommonJS
- Flat config can consume CJS via `require()` in both ESM and CJS wrappers
- Avoids ESM/CJS interop issues

### Why `config/echo-flat.cjs`?

- Single source prevents drift between v8 and v9 configs
- Wrappers (`index.js`, `eslint.config.mjs`, `eslint.config.cjs`) are minimal
- Easier maintenance and rule updates

---

## Agent Checklist for Changes

When modifying this repository, verify:

- [ ] Node.js version remains >=24 in all configs
- [ ] Commitlint footer rules remain intact
- [ ] Prettier runs before ESLint in CI
- [ ] Both v8 and v9 configs still load and lint successfully
- [ ] Workflow uses latest action versions (check Context7 if uncertain)
- [ ] Concurrency and draft PR filters are present in workflows
- [ ] Job-level permissions follow least privilege principle
- [ ] No new formatting rules conflict with Prettier

---

**Last Updated:** 2026-01-17
**Maintained for:** AI agent consumption (Copilot, ChatGPT, etc.)
