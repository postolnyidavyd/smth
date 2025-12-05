import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import cypressPlugin from 'eslint-plugin-cypress/flat' // Зміна: Використовуємо 'flat' експорт для сумісності з новим ESLint

export default [
  //Глобальне ігнорування
  {
    ignores: ['dist'],
  },

  // Базова конфігурація для React та JS файлів
  {
    files: ['**/*.{js,jsx}'],
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
    },

    rules: {
      ...js.configs.recommended.rules,
      ...reactHooks.configs.recommended.rules,
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
      'no-unused-vars': ['error', { varsIgnorePattern: '^[A-Z_]' }],
    },

    languageOptions: {
      ecmaVersion: 'latest',
      globals: {
        ...globals.browser,
      },
      parserOptions: {
        ecmaVersion: 'latest',
        ecmaFeatures: { jsx: true },
        sourceType: 'module',
      },
    },
  },

  // Спеціальна конфігурація тільки для Cypress
  {
    // Застосовуємо ці правила лише до папки cypress або файлів з розширенням .cy.js
    files: ['cypress/**/*.{js,jsx}', '**/*.cy.{js,jsx}'],
    plugins: {
      cypress: cypressPlugin,
    },

    // Підключаємо рекомендовані правила Cypress
    rules: {
      ...cypressPlugin.configs.recommended.rules,
      'no-unused-expressions': 'off',
    },

    languageOptions: {
      globals: {
        ...globals.node,   // Додає глобальні змінні Node.js
        ...cypressPlugin.configs.recommended.languageOptions.globals, // Додає cy, describe, it, expect
      },
    },
  },
]