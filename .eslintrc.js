module.exports = {
  root: true,
  parser: '@babel/eslint-parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    requireConfigFile: false,
    babelOptions: {
      plugins: [
        [
          '@babel/plugin-proposal-decorators',
          {
            decoratorsBeforeExport: true,
          },
        ],
      ],
    },
  },
  plugins: ['ember'],
  extends: [
    'eslint:recommended',
    'plugin:ember/recommended',
    'plugin:prettier/recommended',
    '@addepar',
    '@addepar/eslint-config/ember',
  ],
  env: {
    browser: true,
  },
  rules: {
    'ember/no-classic-classes': 'off', // 41 errors
    'ember/no-classic-components': 'off', // 20 errors
    'ember/no-component-lifecycle-hooks': 'off', // 12 errors
    'ember/no-get': 'off', // 406 errors
    'ember/no-runloop': 'off', // 26 errors
    'ember/require-computed-property-dependencies': 'off', // 23 errors
    'ember/require-tagless-components': 'off', // 14 errors
    'ember-best-practices/require-dependent-keys': 'off', // 56 errors
    'no-restricted-imports': [
      'error',
      {
        paths: [
          {
            name: '@ember/object',
            importNames: ['observer'],
            message: 'For compatibility, use `import { observer } from "-private/utils/observer"`',
          },
          {
            name: '@ember/object/observers',
            importNames: ['addObserver', 'removeObserver'],
            message:
              'For compatibility, use `import { addObserver, removeObserver } from "-private/utils/observer"`',
          },
        ],
      },
    ],
  },
  overrides: [
    // node files
    {
      files: [
        './.eslintrc.js',
        './.prettierrc.js',
        './.stylelintrc.js',
        './.template-lintrc.js',
        './addon/index.js',
        './test-app/ember-cli-build.js',
        './test-app/testem.js',
        './test-app/config/**/*.js',
      ],
      parserOptions: {
        sourceType: 'script',
      },
      env: {
        browser: false,
        node: true,
      },
      extends: ['plugin:n/recommended'],
    },
    {
      // the test app is private, so the "published files" rules do not apply
      files: ['test-app/**/*.js'],
      rules: {
        'node/no-unpublished-require': 'off',
        'node/no-unpublished-import': 'off',
        'node/no-unsupported-features': 'off',
      },
    },
    {
      // test files
      files: ['test-app/tests/**/*-test.{js,ts}'],
      extends: ['plugin:qunit/recommended'],
    },
  ],
};
