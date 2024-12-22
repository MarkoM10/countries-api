const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    viewportWidth: 1920,
    viewportHeight: 1080,
    projectId: "srrveh",
    baseUrl: "http://localhost:3000",
    chromeWebSecurity: false, // Disable strict web security checks
    defaultCommandTimeout: 10000, // Increase timeout for requests
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
