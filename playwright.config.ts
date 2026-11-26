import { defineConfig, devices } from "@playwright/test";

/**
 * Tests mobiles (adaptation du 26/11/2026) sur WebKit, le moteur de Safari,
 * avec des profils iPhone (taille, densité, toucher, user agent).
 * Ils visent un serveur déjà lancé (`npm run dev`, port 3000) ou
 * `BASE_URL`. Lancer : `npm run test:mobile`.
 */
export default defineConfig({
  testDir: "tests/mobile",
  timeout: 60_000,
  fullyParallel: true,
  workers: 3,
  reporter: [
    ["list"],
    ["html", { open: "never", outputFolder: "playwright-report" }],
  ],
  use: {
    baseURL: process.env.BASE_URL ?? "http://localhost:3000",
    screenshot: "only-on-failure",
    trace: "retain-on-failure",
  },
  projects: [
    { name: "iphone-15", use: { ...devices["iPhone 15"] } },
    { name: "iphone-se", use: { ...devices["iPhone SE"] } },
  ],
});
