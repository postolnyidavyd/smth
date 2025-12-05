import { defineConfig } from "cypress";
import codeCoverageTask from "@cypress/code-coverage/task";

function setupCoverage(on, config) {
    const shouldEnableCoverage =
        config.isTextTerminal || process.env.CYPRESS_COVERAGE === "true";

    if (shouldEnableCoverage) {
        process.env.CYPRESS_COVERAGE = "true";
        codeCoverageTask(on, config);
    }

    return config;
}

export default defineConfig({
    viewportWidth: 1000,
    viewportHeight: 600,
    e2e: {
        supportFile: "cypress/support/e2e.js",
        setupNodeEvents(on, config) {
            // Увімкнено інтеграцію збору покриття лише для запусків у терміналі (cypress run)
            // щоб Cypress Open з компонентними тестами не зависав через інструментування коду.
            // Встановлюємо CYPRESS_COVERAGE=true лише коли потрібне покриття.
            // (vite-plugin-istanbul читає цю змінну оточення)
            return setupCoverage(on, config);
        },
    },
    component: {
        devServer: {
            framework: "react",
            bundler: "vite",
        },
        setupNodeEvents(on, config) {
            return setupCoverage(on, config);
        },
    },
});