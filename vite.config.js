import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import istanbul from "vite-plugin-istanbul";

export default defineConfig({
  plugins: [
    react(),
    istanbul({
      include: ["src/**/*", "frontend/**/*"],

      exclude: [
        "node_modules",
        "test",
        "cypress",
        "backend/**/*",
        "**/*.cy.jsx",
        "**/*.cy.js",
        "**/*.test.jsx",
        "**/*.spec.jsx"
      ],

      extension: [".js", ".jsx"],
      requireEnv: true,
      cypress: true,
    }),
  ],
  server: {
    port: 3030,
    watch: {
      usePolling: true,
    },
  },
});