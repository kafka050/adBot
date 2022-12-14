// .eslintrc.js
module.exports = {
  parserOptions: {
    ecmaVersion: 2018,
  },
  extends: ['prettier', 'plugin:prettier/recommended'],
  env: {
    node: true,
  },
  rules: {
    'prettier/prettier': [
      'error',
      {
        endOfLine: 'auto',
      },
    ],
  },
}
