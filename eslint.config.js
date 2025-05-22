// // eslint.config.js
// import tseslint from 'typescript-eslint';

// export default tseslint.config({
//   files: ['**/*.ts'],
//   languageOptions: {
//     parserOptions: {
//       project: './tsconfig.json',
//     },
//   },
//   plugins: {
//     '@typescript-eslint': tseslint.plugin,
//   },
//   rules: {
//     '@typescript-eslint/no-unused-vars': 'warn',
//     '@typescript-eslint/no-explicit-any': 'off',
//   },
// });


import js from '@eslint/js';
import tseslint from '@typescript-eslint/eslint-plugin';
import tsparser from '@typescript-eslint/parser';
import globals from 'globals';

export default [
  js.configs.recommended,
  {
    files: ['**/*.ts', '**/*.tsx'],
    languageOptions: {
      parser: tsparser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
      },
      globals: {
        ...globals.node,
      },
    },
    plugins: {
      '@typescript-eslint': tseslint,
    },
    rules: {
      '@typescript-eslint/no-unused-vars': 'error',
      '@typescript-eslint/no-explicit-any': 'warn',
    },
  },
  {
    // Configuration for ES module .js files (like eslint.config.js)
    files: ['eslint.config.js'],
    languageOptions: {
      sourceType: 'module',
      globals: {
        ...globals.node,
      },
    },
  },
  {
    // Configuration for CommonJS files (like jest.config.js)
    files: ['**/*.js'],
    ignores: ['eslint.config.js'],
    languageOptions: {
      sourceType: 'commonjs',
      globals: {
        ...globals.node,
      },
    },
  },
  {
    // Ignore compiled JavaScript files and config files
    ignores: ['dist/**/*', 'node_modules/**/*', 'eslint.config.js'],
  },
];