module.exports = {
  root: true,
  env: {
    browser: true,
    'jest/globals': true,
    node: true
  },
  extends: [
    '@nuxtjs/eslint-config-typescript',
    'plugin:nuxt/recommended',
    'prettier'
  ],
  plugins: ['jest'],
  rules: {
    // TODO: ルールを決めよう
    // 'vue/require-default-prop': 2
  }
};
