import test from 'node:test';
import assert from 'node:assert/strict';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { createRequire } from 'node:module';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const repoRoot = path.resolve(__dirname, '..');

const packageName = '@checkmarkdevtools/eslint-config-echo';

const require = createRequire(import.meta.url);

test('export contract: require() resolves legacy config object', () => {
  const legacy = require(packageName);

  assert.equal(typeof legacy, 'object');
  assert.equal(Array.isArray(legacy), false);

  assert.deepEqual(legacy.env, { es2024: true, node: true });
  assert.ok(Array.isArray(legacy.extends));
  assert.ok(legacy.extends.includes('eslint-config-prettier'));

  assert.equal(legacy.rules['no-console'], 'error');
  assert.deepEqual(legacy.rules['no-unused-vars'], ['error', { argsIgnorePattern: '^_' }]);
});

test('export contract: import resolves flat config array', async () => {
  const { default: flat } = await import(packageName);

  assert.ok(Array.isArray(flat));
  assert.ok(flat.length > 0);
});

test('flat config contains prettier enforcement and is last', async () => {
  const { default: flat } = await import(
    pathToFileURL(path.join(repoRoot, 'eslint.config.mjs')).href
  );

  assert.ok(Array.isArray(flat));

  const last = flat.at(-1);
  assert.equal(typeof last, 'object');
  assert.ok(last.plugins && typeof last.plugins.prettier === 'object');
  assert.ok(last.rules && Object.hasOwn(last.rules, 'prettier/prettier'));
});
