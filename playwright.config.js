// playwright.config.js

const { defineConfig } = require('@playwright/test');

module.exports = defineConfig({
  testDir: './tests', // Directory where your tests are located
  timeout: 30000, // Maximum time one test can run
  retries: 1, // Number of retries on failure
  reporter: [
    ['list'], 
    ['html', { outputFolder: 'test-reports', open: 'never' }], // HTML report
  ],
  use: {
    headless: true, // Run tests in headless mode
    viewport: { width: 1280, height: 720 }, // Default viewport size
    actionTimeout: 10000, // Maximum time for each action
    ignoreHTTPSErrors: true, // Ignore HTTPS errors
    video: 'on-first-retry', // Record video on first retry
    screenshot: 'only-on-failure', // Take screenshots on test failure
  },
});
