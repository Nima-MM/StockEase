// @ts-check
import globals from 'globals';
import js from '@eslint/js';
import prettier from 'eslint-plugin-prettier/recommended';
import tseslint from 'typescript-eslint';
import pluginVue from 'eslint-plugin-vue';

export default tseslint.config(
  {
    languageOptions: {
      globals: {
        ...globals.node,
      },
    },
  },
  { ignores: ['src/main/docker/'] },
  { ignores: ['target/classes/static/', 'target/'] },
  js.configs.recommended,
  ...tseslint.configs.recommended.map(config =>
    config.name === 'typescript-eslint/base' ? config : { ...config, files: ['**/*.ts', '**/*.tsx', '**/*.mts', '**/*.cts'] },
  ),
  {
    files: ['**/*.{js,cjs,mjs}'],
    rules: {
      'no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
    },
  },
  ...pluginVue.configs['flat/recommended'],
  {
    languageOptions: {
      parserOptions: { parser: '@typescript-eslint/parser' },
      globals: { ...globals.browser },
    },
  },
  {
    files: ['src/main/webapp/**/*.vue', 'src/main/webapp/**/*.ts'],
    languageOptions: {
      globals: { ...globals.browser },
    },
    rules: {
      'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
      'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
      'vue/multi-word-component-names': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-unused-vars': 'off',
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      '@typescript-eslint/no-empty-function': 'off',
      '@typescript-eslint/ban-ts-comment': 'off',
      '@typescript-eslint/no-var-requires': 'off',
      '@typescript-eslint/consistent-type-imports': 'error',
      'vue/no-v-text-v-html-on-component': ['error', { allow: ['router-link', 'b-alert', 'b-badge', 'b-button', 'b-link'] }],
      'vue/no-reserved-component-names': 'off',
      'vue/attributes-order': 'off',
    },
  },
  {
    files: ['src/main/webapp/**/*.spec.ts'],
    rules: {
      '@typescript-eslint/no-empty-function': 'off',
    },
  },
  prettier,
);
