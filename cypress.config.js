const { defineConfig } = require('cypress')

module.exports = defineConfig({
    chromeWebSecurity: false,
    retries: 2,
    defaultCommandTimeout: 5000,
    watchForFileChanges: false,
    videosFolder: './cypress/videos',
    screenshotsFolder: './cypress/screenshots',
    fixturesFolder: './cypress/fixture',
    e2e: {
        setupNodeEvents(on, config) {
            return require('././cypress/plugins/index.js')(on, config)
        },
        baseUrl: 'http://localhost',
        specPattern: './cypress/integration/**/*.cy.{js,jsx,ts,tsx}',
        supportFile: './cypress/support/index.js',
    },
})
