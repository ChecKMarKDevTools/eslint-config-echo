module.exports = {
  extends: ['@commitlint/config-conventional'],
  // Note: @checkmarkdevtools/commitlint-plugin-rai is an internal plugin not published to npm
  // The plugin and its rules are commented out to allow commitlint to run
  // When the plugin is available, uncomment the following lines:
  // plugins: ['@checkmarkdevtools/commitlint-plugin-rai'],
  plugins: [],
  rules: {
    'type-enum': [
      2,
      'always',
      [
        'feat',
        'fix',
        'docs',
        'style',
        'refactor',
        'perf',
        'test',
        'build',
        'ci',
        'chore',
        'revert',
      ],
    ],
    'subject-case': [2, 'never', ['upper-case']],
    'header-max-length': [2, 'always', 100],
    // Custom plugin rules (commented out until plugin is available):
    // 'rai-footer-exists': [2, 'always'],
    // 'signed-off-by-exists': [1, 'always'],
  },
};
