module.exports = {
  root: true,
  env: {
    browser: true, // browser global variables
    node: true,
    es2021: true, // adds all ECMAScript 2021 globals and automatically sets the ecmaVersion parser option to 12.
  },
  parserOptions: {
    ecmaVersion: 2020,
  },
  parser: 'vue-eslint-parser',
  extends: ['plugin:vue/vue3-recommended'],
  rules: {
    'vue/valid-template-root': 'off',
    'vue/no-multiple-template-root': 'off',
    'vue/script-setup-uses-vars': 'error',
    'vue/multi-word-component-names': [
      'error',
      {
        ignores: ['index', '401', '404'],
      },
    ],
  },
}
