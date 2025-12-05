// component.js це файл підтримки для тестів компонентів у Cypress.
// він використовується для налаштування середовища тестування компонентів, імпорту глобальних команд та плагінів,
// а також для додавання власних команд Cypress.

// імпортуєм о глобальні команди
import "./commands";
// імпортуєм підтримку для code-coverage
import "@cypress/code-coverage/support";
// імпортуєм підтримку для real-events, плагін для симуляції реальних подій користувача, таких як наведення курсора, фокусування тощо
import "cypress-real-events/support";

import { mount } from "cypress/react";
// додаємо власну команду "mount" для монтування React компонентів у тестах Cypress
Cypress.Commands.add("mount", mount);
