Feature: Recruitment Management

  As an OrangeHRM administrator
  I want to manage job vacancies
  So that candidates can apply for available positions

  Background:
    Given the administrator is logged into OrangeHRM
    And the administrator navigates to the Recruitment module

  Scenario: Create a new vacancy successfully
    Given the administrator opens the Vacancies section
    And the administrator opens the Add Vacancy form
    When the administrator enters a unique vacancy name
    And selects "Automaton Tester" as the job title
    And enters a vacancy description
    And selects "manda akhil user" as the hiring manager
    And enters "1" as the number of positions
    And the administrator saves the vacancy
    Then the vacancy should be created successfully