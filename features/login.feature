Feature: OrangeHRM Authentication

  Scenario: Login successfully with valid credentials
    Given the administrator is on the OrangeHRM login page
    When the administrator enters valid credentials
    And the administrator clicks the Login button
    Then the OrangeHRM Dashboard should be displayed