# Wikipedia E2E Test Automation

## Descrição

Este projeto contém testes de automação E2E para a página da Wikipedia, utilizando Cypress e integração com Percy para testes de regressão visual. O objetivo é testar a existência dos principais elementos da página principal e validar a busca por "Brasil".

## Pré-requisitos

- Node.js (versão 16)
- npm (gerenciador de pacotes Node)
- Conta no Percy (para testes de regressão visual)

## Instalação

1. Clone o repositório:

```bash
git clone <URL_DO_REPOSITORIO>
cd wikipedia
```

2. Instale as dependências do projeto:

```bash
npm install
```

## Configuração

1. Adicione o token do Percy nas variáveis de ambiente. No GitHub Actions, adicione um segredo chamado `PERCY_TOKEN` com o valor do seu token do Percy.

2. Crie o arquivo `cypress.env.json` na raiz do projeto com o seguinte conteúdo:

```json
{
  "graphqlUrl": "https://graphqlzero.almansi.me/api",
  "USER_ID": "1",
  "USERNAME": "Bret",
  "EMAIL": "Sincere@april.biz",
  "LATITUDE": -37.3159,
  "LONGITUDE": 81.1496
}
```

## Estrutura do Projeto

- `cypress/e2e/features`: Contém os arquivos `.feature` que definem os cenários de teste.
- `cypress/e2e/features/step_definitions`: Contém os arquivos `.js` que implementam os passos dos cenários.
- `cypress/pages`: Contém a classe `WikipediaPage` que encapsula as interações com a página da Wikipedia.
- `cypress/support`: Contém arquivos de suporte e utilitários, incluindo queries GraphQL.

## Execução dos Testes

### Abrir a interface do Cypress

```bash
npm run cypress
```

### Executar os testes

```bash
npm test
```

### Executar os testes com Percy

```bash
npm run test-percy
```

## Integração com GitHub Actions

O workflow do GitHub Actions está configurado para executar os testes automaticamente em cada push para a branch `main`. Os artefatos (vídeos e screenshots) serão carregados após a execução dos testes.

### Configuração do GitHub Actions

Crie um arquivo `.github/workflows/cypress.yml` com o seguinte conteúdo:

```yaml
name: Cypress Tests

on:
  workflow_dispatch:
  push:
    branches:
      - main

jobs:
  cypress-run:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout code
        uses: actions/checkout@v2

      - name: Setup Node.js
        uses: actions/setup-node@v2
        with:
          node-version: '16'

      - name: Install dependencies
        run: npm install

      - name: Run Cypress tests
        run: npm run test-percy

      - name: Upload Cypress Videos
        uses: actions/upload-artifact@v2
        with:
          name: cypress-videos
          path: cypress/videos

      - name: Upload Cypress Screenshots
        uses: actions/upload-artifact@v2
        with:
          name: cypress-screenshots
          path: cypress/screenshots
```

## Teste de Busca na Wikipedia

### Arquivo de Teste: `wikipedia.feature`

```gherkin
Feature: Wikipedia Search

  Scenario: Search Wikipedia
    Given I open the Wikipedia home page
    When I search for "Brasil"
    Then the main content should contain "Brasil"
    And the main sections should be visible
```

### Arquivo de Definições de Passos: `wikipedia_steps.cy.js`

```javascript
import { Given, When, Then } from 'cypress-cucumber-preprocessor/steps';
import WikipediaPage from '../../../pages/WikipediaPage';

const wikipediaPage = new WikipediaPage();

Given('I open the Wikipedia home page', () => {
  wikipediaPage.visit();
});

When('I search for {string}', (term) => {
  wikipediaPage.search(term);
});

Then('the main content should contain {string}', (term) => {
  wikipediaPage.verifyMainContent(term);
});

Then('the main sections should be visible', () => {
  wikipediaPage.verifyMainSections();
});
```

### Arquivo de Página: `WikipediaPage.js`

```javascript
class WikipediaPage {
  visit() {
    cy.visit('/');
  }

  search(term) {
    cy.get('input[name="search"]').type(term + '{enter}');
  }

  verifyMainContent(term) {
    cy.get('h1#firstHeading', { timeout: 30000 }).should('contain', term);
    cy.percySnapshot('Main Content');
  }

  verifyMainSections() {
    cy.get('body', { timeout: 30000 }).should('be.visible');
    cy.get('#content', { timeout: 30000 }).should('be.visible');
    cy.get('#firstHeading', { timeout: 30000 }).should('be.visible');
    cy.get('.infobox', { timeout: 30000 }).should('be.visible');
    cy.percySnapshot('Main Sections');
  }
}

export default WikipediaPage;
```

## Formatação de Código

Para garantir a consistência do código, utilize o Prettier:

```bash
npm run prettier
```

