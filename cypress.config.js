import { defineConfig } from "cypress";
import codeCoverageTask from "@cypress/code-coverage/task";

export default defineConfig({
    viewportWidth: 1000,
    viewportHeight: 600,
    e2e: {
        setupNodeEvents(on, config) {
            //створюємо таск для збору інформації про покриття коду тестами
            codeCoverageTask(on, config);
            return config;
        },
    },
    component: {
        devServer: {
            framework: "react",
            bundler: "vite",
        },
        setupNodeEvents(on, config) {
            codeCoverageTask(on, config);
            return config;
        },
    },
});