# Запуск Cypress та покриття коду

## Швидкий старт
- Відкритий режим компонентних тестів (без покриття, щоб нічого не зависало):
  ```bash
  npm run cypress:open:component
  ```
- Відкритий режим e2e-тестів (без покриття):
  ```bash
  npm run cypress:open:e2e
  ```

## Запуски з покриттям коду
Інструментування вмикається автоматично для запусків `cypress run` у терміналі. Для відкритого режиму використовуйте `CYPRESS_COVERAGE=true`.

- Компонентні тести з покриттям (headless):
  ```bash
  npm run cypress:run:component
  ```
- E2E тести з покриттям (headless):
  ```bash
  npm run cypress:run:e2e
  ```
- Відкритий режим із покриттям (за потреби, може бути повільніше):
  ```bash
  CYPRESS_COVERAGE=true npm run cypress:open:component
  # або
  CYPRESS_COVERAGE=true npm run cypress:open:e2e
  ```

## Пояснення
- Покриття вимикається в інтерактивному режимі за замовчуванням, щоб Cypress Open з компонентними тестами не зависав.
- `vite-plugin-istanbul` та `@cypress/code-coverage` вмикаються автоматично лише коли `CYPRESS_COVERAGE=true` або коли тестовий раннер працює у headless-режимі (`cypress run`).
