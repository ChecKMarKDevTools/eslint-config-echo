import path from 'node:path';
import { spawn } from 'node:child_process';

function getLocalEslintBin(repoRoot) {
  const bin = process.platform === 'win32' ? 'eslint.cmd' : 'eslint';
  return path.join(repoRoot, 'node_modules', '.bin', bin);
}

export async function runEslint({ repoRoot, cwd, args, env = {} }) {
  const eslintBin = getLocalEslintBin(repoRoot);

  return await new Promise((resolve) => {
    const child = spawn(eslintBin, args, {
      cwd,
      env: {
        ...process.env,
        ...env,
      },
      stdio: ['ignore', 'pipe', 'pipe'],
    });

    let stdout = '';
    let stderr = '';

    child.stdout.on('data', (d) => {
      stdout += d.toString('utf8');
    });

    child.stderr.on('data', (d) => {
      stderr += d.toString('utf8');
    });

    child.on('close', (code) => {
      resolve({ code, stdout, stderr });
    });
  });
}

function getNpxBin() {
  const bin = process.platform === 'win32' ? 'npx.cmd' : 'npx';
  return bin;
}

export async function runEslintNpx({ cwd, eslintPackageSpec, args, env = {} }) {
  const npxBin = getNpxBin();
  const fullArgs = ['--yes', eslintPackageSpec, ...args];

  return await new Promise((resolve) => {
    const child = spawn(npxBin, fullArgs, {
      cwd,
      env: {
        ...process.env,
        ...env,
      },
      stdio: ['ignore', 'pipe', 'pipe'],
    });

    let stdout = '';
    let stderr = '';

    child.stdout.on('data', (d) => {
      stdout += d.toString('utf8');
    });

    child.stderr.on('data', (d) => {
      stderr += d.toString('utf8');
    });

    child.on('close', (code) => {
      resolve({ code, stdout, stderr });
    });
  });
}
