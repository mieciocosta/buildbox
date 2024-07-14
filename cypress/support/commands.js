// cypress/support/e2e.js
// Se você não precisa do commands.js, comente ou remova esta linha
import './commands';
import '@percy/cypress';

Cypress.Commands.add('login', () => {
  cy.visit('/');
});
