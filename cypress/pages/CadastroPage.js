class CadastroPage {
  visit() {
    cy.visit('https://qastage.buildbox.one/18/cadastro')
  }

  clickEnrollButton() {
    cy.get('[data-cy="button-btn-enroll"]').scrollIntoView().should('be.visible').click({ force: true })
  }

  clickNextButton() {
    cy.get('[data-cy="button-signup_submit_button_1"]').scrollIntoView().should('be.visible').click({ force: true })
  }

  fillForm({ firstName, lastName, birthDate, cpf, email, confirmEmail, password, confirmPassword, proficiency }) {
    if (firstName) {
      cy.get('[data-cy="input-signup-personal-data-firstName"]').should('be.visible').type(firstName)
    }
    if (lastName) {
      cy.get('[data-cy="input-signup-personal-data-lastName"]').should('be.visible').type(lastName)
    }
    if (birthDate) {
      cy.get('[data-cy="input-signup-personal-data-birthDate"]').should('be.visible').type(birthDate)
    }
    if (cpf) {
      cy.get('[data-cy="input-signup-personal-data-cpf"]').should('not.be.disabled').type(cpf)
    }
    if (email) {
      cy.get('[data-cy="input-signup-personal-data-email"]').should('be.visible').type(email)
    }
    if (confirmEmail) {
      cy.get('[data-cy="input-signup-personal-data-email-confirm"]').should('be.visible').type(confirmEmail)
    }
    if (password) {
      cy.get('[data-cy="input-signup-personal-data-password"]').should('be.visible').type(password)
    }
    if (confirmPassword) {
      cy.get('[data-cy="input-signup-personal-data-password-confirm"]').should('be.visible').type(confirmPassword)
    }
    if (proficiency) {
      cy.get('.lg\\:w-7\\/12 > .form-container > div.relative > .justify-between > .whitespace-nowrap').click()
      cy.get(`[x-init='options = [{\"key\":2,\"value\":\"Beginner\"},{\"key\":3,\"value\":\"Intermediate\"},{\"key\":4,\"value\":\"Advanced\"}]'] > span:contains("${proficiency}")`).click()
    }
    cy.get('[data-cy="input-signup-personal-data-lgpd"]').check() // Clique no checkbox da LGPD
  }

  fillAddressForm({ cep, neighborhood, street, number, complement }) {
    if (cep) {
      cy.get('[data-cy="input-signup-address-cep"]').scrollIntoView().should('be.visible').type(cep)
    }
    if (neighborhood) {
      cy.get('[data-cy="input-signup-address-neighborhood"]').should('be.visible').type(neighborhood)
    }
    if (street) {
      cy.get('[data-cy="input-signup-address-street"]').should('be.visible').type(street)
    }
    if (number) {
      cy.get('[data-cy="input-signup-address-number"]').should('be.visible').type(number)
    }
    if (complement) {
      cy.get('[data-cy="input-signup-address-complement"]').should('be.visible').type(complement)
    }
  }
}

export { CadastroPage }
