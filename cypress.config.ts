import gmailTester from "gmail-tester";
import path from "path";
const { defineConfig } = require('cypress');

module.exports = defineConfig({
  reporter: 'cypress-mochawesome-reporter',
  reporterOptions: {
    charts: true,
    reportPageTitle: 'Cypress Test Report',
    embeddedScreenshots: true,
    inlineAssets: true
  },
  screenshotsFolder: "cypress/reports/screenshots",
  e2e: {
    experimentalOriginDependencies: true,
    setupNodeEvents(on, config) {
      require('cypress-mochawesome-reporter/plugin')(on);
      on("task", {
        "gmail:get-messages": async (args) => {
          const messages = await gmailTester.check_inbox(
            path.resolve(__dirname, "credentials.json"),
            path.resolve(__dirname, "token.json"),
            args.options
          );
          if(messages !== undefined) {
            return messages;
          } else return []    
        },
      });
    }
  },
});
