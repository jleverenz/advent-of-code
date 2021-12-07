module.exports = {
  env: {
    es6: true,
    mocha: true,
    node: true,
  },
  parserOptions: {
    tsconfigRootDir: __dirname,
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  extends: ['eslint:recommended'],
  rules: {
    'no-console': ['error'],
    'no-unused-expressions': ['error'],
    '@typescript-eslint/no-unused-vars': [
      'error',
      {
        ignoreRestSiblings: true,
      },
    ],
    'no-dupe-args': ['error'],
    'no-dupe-keys': ['error'],
    'no-dupe-class-members': ['error'],
    'no-bitwise': ['error'],
    'no-async-promise-executor': ['error'],
    'handle-callback-err': ['error'],
    'no-const-assign': ['error'],
    'prefer-const': ['error'],
  },
};
