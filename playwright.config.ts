import { defineConfig } from "@playwright/test";

export default defineConfig({
  testMatch: "**/*.spec.ts",
  timeout: 30 * 1000,
  use: {
    headless: true,
  },
});
