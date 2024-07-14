const cucumber = require('cypress-cucumber-preprocessor').default;

module.exports = (on, config) => {
  on('file:preprocessor', cucumber());
  require('@percy/cypress/task')(on, config);
  return config;
};
