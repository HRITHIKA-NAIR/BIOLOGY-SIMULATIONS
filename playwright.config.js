import { defineConfig } from "@playwright/test";
export default defineConfig({
  testDir: "tests",
  testMatch: "*.spec.js",
  timeout: 30000,
  use: {
    baseURL: "http://127.0.0.1:4173/BIOLOGY-SIMULATIONS/",
    headless: true,
    launchOptions: process.env.PLAYWRIGHT_EXECUTABLE_PATH
      ? {
          executablePath: process.env.PLAYWRIGHT_EXECUTABLE_PATH,
          args: [
            "--no-sandbox",
            "--disable-dev-shm-usage",
            "--disable-gpu",
            "--no-zygote",
          ],
        }
      : {},
  },
  webServer: {
    command:
      "npx vite preview --host 127.0.0.1 --port 4173 --base /BIOLOGY-SIMULATIONS/",
    url: "http://127.0.0.1:4173/BIOLOGY-SIMULATIONS/",
    reuseExistingServer: false,
  },
});
