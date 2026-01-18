import test from 'node:test';
import assert from 'node:assert/strict';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { mkdtemp, writeFile } from 'node:fs/promises';
import os from 'node:os';

import { runEslintNpx } from './_util/run-eslint.mjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const repoRoot = path.resolve(__dirname, '..');

const eslintV8 = 'eslint@8.56.0';
const eslintV9 = 'eslint@9.39.2';
const eslintV10 = 'eslint@10';

async function makeTempProject() {
  const dir = await mkdtemp(path.join(os.tmpdir(), 'eslint-config-echo-test-'));
  return dir;
}

test('legacy config: no-console triggers', async () => {
  const cwd = await makeTempProject();

  // Create package.json so legacy config can resolve plugins relative to test project
  const pkgJsonPath = path.join(cwd, 'package.json');
  await writeFile(pkgJsonPath, JSON.stringify({ name: 'test-project' }, null, 2), 'utf8');

  // Symlink node_modules from repo so plugins resolve
  const { symlink } = await import('node:fs/promises');
  const targetModules = path.join(repoRoot, 'node_modules');
  const linkPath = path.join(cwd, 'node_modules');
  await symlink(targetModules, linkPath, 'dir');

  const eslintrcPath = path.join(cwd, '.eslintrc.test.json');
  await writeFile(
    eslintrcPath,
    JSON.stringify({ extends: [path.join(repoRoot, 'index.js')] }, null, 2),
    'utf8'
  );

  const filePath = path.join(cwd, 'console.js');
  await writeFile(filePath, 'console.log("nope");\n', 'utf8');

  const result = await runEslintNpx({
    cwd,
    eslintPackageSpec: eslintV8,
    args: ['--config', eslintrcPath, filePath],
    env: {
      ESLINT_USE_FLAT_CONFIG: 'false',
    },
  });

  assert.equal(
    result.code,
    1,
    `expected legacy lint to fail, got:\n${result.stdout}\n${result.stderr}`
  );
  assert.match(result.stdout + result.stderr, /no-console/);
});

test('flat config: yaml file lints (no crash)', async () => {
  const cwd = await makeTempProject();

  // Create package.json to establish project root
  const pkgJsonPath = path.join(cwd, 'package.json');
  await writeFile(pkgJsonPath, JSON.stringify({ name: 'test-project' }, null, 2), 'utf8');

  // Copy the product config into the temp directory
  const localConfigPath = path.join(cwd, 'eslint.config.mjs');
  await writeFile(
    localConfigPath,
    `import echoConfig from '${path.join(repoRoot, 'eslint.config.mjs')}';\nexport default echoConfig;\n`,
    'utf8'
  );

  const filePath = path.join(cwd, 'good.yaml');
  await writeFile(filePath, 'name: echo\nvalue: 1\n', 'utf8');

  const result = await runEslintNpx({
    cwd,
    eslintPackageSpec: eslintV9,
    args: [filePath],
  });

  assert.equal(
    result.code,
    0,
    `expected yaml lint to pass, got:\n${result.stdout}\n${result.stderr}`
  );
});

test('flat config: works on ESLint v10 (when published)', async (t) => {
  const cwd = await makeTempProject();

  // Create package.json to establish project root
  const pkgJsonPath = path.join(cwd, 'package.json');
  await writeFile(pkgJsonPath, JSON.stringify({ name: 'test-project' }, null, 2), 'utf8');

  // Copy the product config into the temp directory
  const localConfigPath = path.join(cwd, 'eslint.config.mjs');
  await writeFile(
    localConfigPath,
    `import echoConfig from '${path.join(repoRoot, 'eslint.config.mjs')}';\nexport default echoConfig;\n`,
    'utf8'
  );

  const filePath = path.join(cwd, 'good.yaml');
  await writeFile(filePath, 'name: echo\nvalue: 1\n', 'utf8');

  const result = await runEslintNpx({
    cwd,
    eslintPackageSpec: eslintV10,
    args: [filePath],
  });

  // If ESLint v10 isn't published yet (or isn't reachable), don't fail the suite.
  // This keeps the "support" intent explicit without pretending we can validate it today.
  const npmMissingEslint10 =
    /No match found for version 10|No matching version found for eslint@10|npm error 404|ETARGET|notarget/i.test(
      result.stderr + result.stdout
    );

  if (result.code !== 0 && npmMissingEslint10) {
    t.skip('eslint@10 is not available (yet); skipping forward-compat check');
    return;
  }

  assert.equal(
    result.code,
    0,
    `expected ESLint v10 to lint yaml successfully, got:\n${result.stdout}\n${result.stderr}`
  );
});
