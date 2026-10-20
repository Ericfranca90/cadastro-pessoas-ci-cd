const js = require('@eslint/js');
const globals = require('globals');

module.exports = [
  {
    ignores: [
      'node_modules/**',
      'coverage/**',
      '.nyc_output/**',
      'output/**',
      'tmp/**',
      'temp/**',
      'backend/data/*.json',
    ],
  },
  js.configs.recommended,
  {
    files: ['backend/**/*.js', '*.config.js', '*.config.cjs'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'commonjs',
      globals: globals.node,
    },
  },
  {
    files: [
      'backend/**/*.test.js',
      'backend/**/*.spec.js',
      'backend/**/__tests__/**/*.js',
      'backend/tests/**/*.js',
    ],
    languageOptions: {
      globals: {
        ...globals.node,
        ...globals.jest,
      },
    },
  },
  {
    files: ['frontend/**/*.js'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'script',
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
  },
  {
    files: [
      'frontend/**/*.test.js',
      'frontend/**/*.spec.js',
      'frontend/**/__tests__/**/*.js',
    ],
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
        ...globals.jest,
      },
    },
  },
];
