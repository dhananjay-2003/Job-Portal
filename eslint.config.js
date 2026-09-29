import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import eslintConfigPrettier from 'eslint-config-prettier';
import globals from 'globals';

export default tseslint.config(
  // ==============================
  // Global ignores
  // ==============================
  {
    ignores: ['**/node_modules/**', '**/dist/**', '**/coverage/**', '**/.vite/**'],
  },

  // ==============================
  // Base JavaScript rules
  // ==============================
  js.configs.recommended,

  // ==============================
  // TypeScript rules
  // ==============================
  ...tseslint.configs.recommended,

  // ==============================
  // FRONTEND
  // ==============================
  {
    files: ['Frontend/**/*.{js,jsx,ts,tsx}'],

    languageOptions: {
      globals: {
        ...globals.browser,
      },
    },

    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
    },

    rules: {
      // React Hooks
      ...reactHooks.configs.recommended.rules,

      // React Refresh
      'react-refresh/only-export-components': [
        'warn',
        {
          allowConstantExport: true,
        },
      ],

      // TypeScript
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
          caughtErrorsIgnorePattern: '^_',
        },
      ],

      '@typescript-eslint/no-explicit-any': 'warn',

      // JavaScript
      'no-console': 'warn',
      'no-debugger': 'error',
    },
  },

  // ==============================
  // BACKEND
  // ==============================
  {
    files: ['Backend/**/*.{js,mjs,cjs,ts}'],

    languageOptions: {
      globals: {
        ...globals.node,
      },
    },

    rules: {
      // TypeScript
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
          caughtErrorsIgnorePattern: '^_',
        },
      ],

      '@typescript-eslint/no-explicit-any': 'warn',

      // Node
      'no-console': 'warn',
      'no-debugger': 'error',
    },
  },

  // ==============================
  // Prettier
  // ==============================
  eslintConfigPrettier,
);
