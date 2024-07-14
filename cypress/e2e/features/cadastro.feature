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
  Then I should see an error message for invalid email


