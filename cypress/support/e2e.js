// e2e.js це файл підтримки для енд-ту-енд тестів у Cypress.
// Він використовується для налаштування середовища тестування та підключення плагінів і команд.

// імпортуємо глобальні команди
import "./commands";
// імпортуємо підтримку для code-coverage
import "@cypress/code-coverage/support";
// імпортуємо підтримку для real-events
import "cypress-real-events/support";
