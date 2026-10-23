Feature: Recruitment Management

  As an OrangeHRM administrator
  I want to manage candidates and job vacancies
  So that I can control the recruitment process

  Background:
    Given the administrator is logged into OrangeHRM
    And the administrator navigates to the Recruitment module


  # =========================
  # MANAGE VACANCIES
  # =========================

  @vacancy
  Scenario: Create a new vacancy successfully
    Given the administrator opens the Vacancies section
    And the administrator opens the Add Vacancy form
    When the administrator enters a unique vacancy name
    And selects "Automaton Tester" as the job title
    And enters a vacancy description
    And selects an available hiring manager
    And enters "1" as the number of positions
    And the administrator saves the vacancy
    Then the vacancy should be created successfully

  @vacancy
  Scenario: Search for an existing vacancy
    Given the administrator opens the Vacancies section
    When the administrator selects an existing job title
    And selects an existing vacancy
    And clicks the vacancy Search button
    Then the matching vacancy should be displayed in the results

  @vacancy
  Scenario: Edit an existing vacancy
    Given the administrator opens the Vacancies section
    And an existing vacancy is available
    When the administrator opens the vacancy
    And updates the vacancy description
    And saves the vacancy changes
    Then the vacancy should be updated successfully


  Scenario: Delete an existing vacancy
    Given the administrator opens the Vacancies section
    And an existing vacancy is available
    When the administrator deletes the vacancy
    And confirms the deletion
    Then the vacancy should no longer appear in the vacancy list


  Scenario: Closed vacancy is not available for new candidates
    Given an existing vacancy is closed
    When the administrator opens the Add Candidate form
    And opens the Vacancy dropdown
    Then the closed vacancy should not be available for selection


  # =========================
  # MANAGE CANDIDATES
  # =========================

  @candidate
  Scenario: Create a candidate successfully
    Given the administrator opens the Add Candidate form
    When the administrator enters valid candidate information
    And uploads the candidate resume
    And saves the candidate
    Then the candidate should be created successfully

  @candidate
  Scenario: Associate a candidate with an existing vacancy
    Given the administrator opens the Add Candidate form
    When the administrator enters valid candidate information
    And selects an existing vacancy for the candidate
    And uploads the candidate resume
    And saves the candidate
    Then the candidate should be created successfully
    And the candidate should be associated with the selected vacancy

  @candidate
  Scenario: Register candidate application method
    Given an existing candidate is associated with a vacancy
    When the administrator opens the candidate application
    Then the Method of Application should be displayed
    And the application method should identify how the candidate applied

  @candidate
  Scenario: Register separate applications for different vacancies
    Given a candidate already exists in the recruitment system
    When the candidate is registered for another existing vacancy
    Then a separate application record should be created
    And each application should be associated with its corresponding vacancy


  # =========================
  # SEARCH CANDIDATES
  # =========================

  Scenario: Search candidate using Candidate Name autocomplete
    Given an existing candidate is registered
    And the administrator opens the Candidates section
    When the administrator enters part of the candidate name
    Then matching candidates should appear in the autocomplete suggestions
    When the administrator selects the candidate
    And clicks the candidate Search button
    Then the selected candidate should appear in the search results


  Scenario: Candidate autocomplete only displays matching candidates
    Given multiple candidates are registered
    And the administrator opens the Candidates section
    When the administrator enters part of a candidate name
    Then only candidates matching the entered text should appear in the autocomplete suggestions