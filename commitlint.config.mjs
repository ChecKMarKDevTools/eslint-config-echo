export default {
  extends: ['@commitlint/config-conventional'],
  // plugins: ['@checkmarkdevtools/commitlint-plugin-rai'],
  rules: {
    'header-max-length': [2, 'always', 72],
    'footer-max-line-length': [2, 'always', 100],
    // 'rai-footer-exists': [2, 'always'],
    // 'signed-off-by': [1, 'always', 'Signed-off-by:'],
    'subject-case': [0],
  },
};
