const { defineConfig } = require("cypress");
const cucumber = require("cypress-cucumber-preprocessor").default;

module.exports = defineConfig({
  viewportWidth: 1366,
  viewportHeight: 768,
  defaultCommandTimeout: 10000, 
  reporter: "mochawesome",
  reporterOptions: {
    reportDir: "cypress/reports/mochawesome-report",
    overwrite: false,
    html: true,
    json: true,
    timestamp: "dd-mm-yyyy_HHMMss",
    charts: true,
    reportPageTitle: "Relatório de testes",
  },
  e2e: {
    baseUrl: "https://qastage.buildbox.one",
    setupNodeEvents(on, config) {
      on("file:preprocessor", cucumber());
    },
    specPattern: 'cypress/e2e/**/*.feature',
    supportFile: 'cypress/support/e2e.js',
  },
  video: true,
});
