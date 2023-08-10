const { defineConfig } = require("cypress");
const mongo = require("cypress-mongodb");
module.exports = defineConfig({
  e2e: {

    setupNodeEvents(on, config) {
      mongo.configurePlugin(on);
      // implement node event listeners here
    },
    testIsolation:false,
    url:'http://localhost:8080/api/v1/'
  },
   env: {
            mongodb: {
                uri: "mongodb://localhost:27017",
                database: "test",
                collection: "accounts"
            }
        }
});
