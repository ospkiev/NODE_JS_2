import js from '@eslint/js';
import globals from 'globals';

export default [
  {
    files: ['**/*.js'],
    languageOptions: {
      ecmaVersion: 2022,
      globals: {
        ...globals.node
      },
      sourceType: 'module'
    },
    plugins: {
      js
    },
    rules: {
      semi: ['error', 'always'],
      quotes: ['error', 'single'],
      'no-console': ['warn']
    }
  }
];
