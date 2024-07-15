# QA Challenge

## Descrição

Este projeto contém testes de automação E2E para a página de cadastro, utilizando Cypress e Cucumber para definir os cenários de teste. O objetivo é testar o cadastro de usuário com diferentes cenários de dados.

## Pré-requisitos

- Node.js (versão 16 ou superior)
- npm (gerenciador de pacotes Node)

## Instalação

1. Clone o repositório:

```bash
git clone <URL_DO_REPOSITORIO>
cd qa-challenge
```

2. Instale as dependências do projeto:

```bash
npm install
```

## Configuração

Nenhuma configuração adicional é necessária.

## Estrutura do Projeto

- `cypress/e2e/features`: Contém os arquivos `.feature` que definem os cenários de teste.
- `cypress/e2e/features/step_definitions`: Contém os arquivos `.js` que implementam os passos dos cenários.
- `cypress/pages`: Contém a classe `CadastroPage` que encapsula as interações com a página de cadastro.
- `cypress/support`: Contém arquivos de suporte e utilitários.

## Execução dos Testes

### Abrir a interface do Cypress

```bash
npm run cypress
```

### Executar os testes

```bash
npm test
```

## Formatação de Código

Para garantir a consistência do código, utilize o Prettier:

```bash
npm run prettier
```

## Testes de Cadastro

### Arquivo de Teste: `cadastro.feature`

```gherkin
Feature: Cadastro de Usuário

  Scenario: Cadastro com dados válidos
    Given I open the cadastro page
    When I click on "Fazer inscrição"
    And I fill the form with valid data
    And I fill the address form

  Scenario: Cadastro com email inválido
    Given I open the cadastro page
    When I click on "Fazer inscrição"
    And I fill the form with an invalid email


```

### Arquivo de Definições de Passos: `cadastro_steps.cy.js`

```javascript
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
```

### Arquivo de Página: `CadastroPage.js`

```javascript
class CadastroPage {
  visit() {
    cy.visit('https://qastage.buildbox.one/18/cadastro');
  }

  clickEnrollButton() {
    cy.get('[data-cy="button-btn-enroll"]')
      .scrollIntoView()
      .should('be.visible')
      .click({ force: true });
  }

  clickNextButton() {
    cy.get('[data-cy="button-signup_submit_button_1"]')
      .scrollIntoView()
      .should('be.visible')
      .click({ force: true });
  }

  fillForm({
    firstName,
    lastName,
    birthDate,
    cpf,
    email,
    confirmEmail,
    password,
    confirmPassword,
    proficiency,
  }) {
    if (firstName) {
      cy.get('[data-cy="input-signup-personal-data-firstName"]')
        .should('be.visible')
        .type(firstName);
    }
    if (lastName) {
      cy.get('[data-cy="input-signup-personal-data-lastName"]')
        .should('be.visible')
        .type(lastName);
    }
    if (birthDate) {
      cy.get('[data-cy="input-signup-personal-data-birthDate"]')
        .should('be.visible')
        .type(birthDate);
    }
    if (cpf) {
      cy.get('[data-cy="input-signup-personal-data-cpf"]')
        .should('not.be.disabled')
        .type(cpf);
    }
    if (email) {
      cy.get('[data-cy="input-signup-personal-data-email"]')
        .should('be.visible')
        .type(email);
    }
    if (confirmEmail) {
      cy.get('[data-cy="input-signup-personal-data-email-confirm"]')
        .should('be.visible')
        .type(confirmEmail);
    }
    if (password) {
      cy.get('[data-cy="input-signup-personal-data-password"]')
        .should('be.visible')
        .type(password);
    }
    if (confirmPassword) {
      cy.get('[data-cy="input-signup-personal-data-password-confirm"]')
        .should('be.visible')
        .type(confirmPassword);
    }
    if (proficiency) {
      cy.get(
        '.lg\\:w-7\\/12 > .form-container > div.relative > .justify-between > .whitespace-nowrap'
      ).click();
      cy.get(
        `[x-init='options = [{\"key\":2,\"value\":\"Beginner\"},{\"key\":3,\"value\":\"Intermediate\"},{\"key\":4,\"value\":\"Advanced\"}]'] > span:contains("${proficiency}")`
      ).click();
    }
    cy.get('[data-cy="input-signup-personal-data-lgpd"]').check();
  }

  fillAddressForm({ cep, neighborhood, street, number, complement }) {
    if (cep) {
      cy.get('[data-cy="input-signup-address-cep"]')
        .scrollIntoView()
        .should('be.visible')
        .type(cep);
    }
    if (neighborhood) {
      cy.get('[data-cy="input-signup-address-neighborhood"]')
        .should('be.visible')
        .type(neighborhood);
    }
    if (street) {
      cy.get('[data-cy="input-signup-address-street"]')
        .should('be.visible')
        .type(street);
    }
    if (number) {
      cy.get('[data-cy="input-signup-address-number"]')
        .should('be.visible')
        .type(number);
    }
    if (complement) {
      cy.get('[data-cy="input-signup-address-complement"]')
        .should('be.visible')
        .type(complement);
    }
  }
}

export { CadastroPage };
```

## Formatação de Código

Para garantir a consistência do código, utilize o Prettier:

```bash
npm run prettier
```