import { CadastroPage } from '../../../pages/CadastroPage';
const gerador = require('gerador-validador-cpf');

const cadastroPage = new CadastroPage();

Given('I open the cadastro page', () => {
  cadastroPage.visit();
});

When('I click on "Fazer inscrição"', () => {
  cy.wait(2000);
  cadastroPage.clickEnrollButton();
});

When('I fill the form with valid data', () => {
  const cpfValido = gerador.generate();

  cadastroPage.fillForm({
    firstName: 'John',
    lastName: 'Doe',
    birthDate: '01/01/1990',
    cpf: cpfValido,
    email: 'john.doe@example.com',
    confirmEmail: 'john.doe@example.com',
    password: 'Password123!',
    confirmPassword: 'Password123!',
    proficiency: 'Intermediate',
  });
  cadastroPage.clickNextButton();
});

When('I fill the address form', () => {
  cadastroPage.fillAddressForm({
    cep: '65110000',
    neighborhood: 'Centro',
    street: 'Rua Principal',
    number: '123',
    complement: 'Apto 101',
  });
});

When('I fill the form with an invalid email', () => {
  const cpfValido = gerador.generate();

  cadastroPage.fillForm({
    firstName: 'John',
    lastName: 'Doe',
    birthDate: '01/01/1990',
    cpf: cpfValido,
    email: 'invalid-email',
    confirmEmail: 'invalid-email',
    password: 'Password123!',
    confirmPassword: 'Password123!',
    proficiency: 'Intermediate',
  });
  cadastroPage.clickNextButton();
});

When('I submit the form without filling required fields', () => {
  cadastroPage.clickNextButton();
});

When('I partially fill the form and clear it', () => {
  cy.get('[data-cy="input-signup-personal-data-firstName"]')
    .should('be.visible')
    .type('abc')
    .clear();
  cadastroPage.clickNextButton();
});

Then(
  'I should see error messages for required fields after clearing them',
  () => {
    cy.get('.input-error').should('be.visible');
  }
);

When('I submit the form', () => {
  cadastroPage.clickNextButton();
});

When('I click on "Fazer inscrição" again', () => {
  cadastroPage.clickEnrollButton();
});

Then('I should see an error message for invalid email', () => {});

Then('I should see error messages for required fields', () => {});
