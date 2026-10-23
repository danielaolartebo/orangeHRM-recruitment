import {
  Given,
  When,
  Then
} from '@cucumber/cucumber';

import { expect } from '@playwright/test';

import { CustomWorld } from '../../support/world';


// =====================================================
// NAVIGATION
// =====================================================

Given(
  'the administrator navigates to the Recruitment module',
  async function (this: CustomWorld) {

    await this.dashboardPage.goToRecruitment();
  }
);


// =====================================================
// VACANCIES
// =====================================================

Given(
  'the administrator opens the Vacancies section',
  async function (this: CustomWorld) {

    await this.recruitmentPage.openVacancies();
  }
);


Given(
  'the administrator opens the Add Vacancy form',
  async function (this: CustomWorld) {

    await this.recruitmentPage.openAddVacancy();
  }
);


When(
  'the administrator enters a unique vacancy name',
  async function (this: CustomWorld) {

    const uniqueId =
      Date.now().toString().slice(-6);

    this.vacancyName =
      `QA Automation ${uniqueId}`;

    await this.recruitmentPage
      .enterVacancyName(
        this.vacancyName
      );
  }
);


When(
  'selects {string} as the job title',
  async function (
    this: CustomWorld,
    jobTitle: string
  ) {

    this.jobTitle = jobTitle;

    await this.recruitmentPage
      .selectJobTitle(jobTitle);
  }
);


When(
  'enters a vacancy description',
  async function (this: CustomWorld) {

    this.vacancyDescription =
      'Vacancy created through Playwright and Cucumber automation';

    await this.recruitmentPage
      .enterDescription(
        this.vacancyDescription
      );
  }
);

When(
  'selects an available hiring manager',
  async function (this: CustomWorld) {

    this.hiringManager =
      await this.recruitmentPage
        .selectFirstAvailableHiringManager();
  }
);


When(
  'selects {string} as the hiring manager',
  async function (
    this: CustomWorld,
    hiringManager: string
  ) {

    this.hiringManager =
      hiringManager;

    await this.recruitmentPage
      .selectHiringManager(
        hiringManager
      );
  }
);


When(
  'enters {string} as the number of positions',
  async function (
    this: CustomWorld,
    numberOfPositions: string
  ) {

    this.numberOfPositions =
      numberOfPositions;

    await this.recruitmentPage
      .enterNumberOfPositions(
        numberOfPositions
      );
  }
);


When(
  'the administrator saves the vacancy',
  async function (this: CustomWorld) {

    await this.recruitmentPage
      .saveVacancy();
  }
);


Then(
  'the vacancy should be created successfully',
  async function (this: CustomWorld) {

    await this.recruitmentPage
      .verifyVacancyCreated(
        this.vacancyName
      );
  }
);


// =====================================================
// SEARCH VACANCY
// =====================================================

When(
  'the administrator selects an existing job title',
  async function (this: CustomWorld) {

    this.jobTitle =
      await this.recruitmentPage
        .selectExistingJobTitle();
  }
);


When(
  'selects an existing vacancy',
  async function (this: CustomWorld) {

    this.vacancyName =
      await this.recruitmentPage
        .selectExistingVacancy();
  }
);


When(
  'clicks the vacancy Search button',
  async function (this: CustomWorld) {

    await this.recruitmentPage
      .searchVacancies();
  }
);


Then(
  'the matching vacancy should be displayed in the results',
  async function (this: CustomWorld) {

    await this.recruitmentPage
      .verifyVacancyInResults(
        this.vacancyName
      );
  }
);


// =====================================================
// EDIT VACANCY
// =====================================================

Given(
  'an existing vacancy is available',
  async function (this: CustomWorld) {

    this.vacancyName =
      await this.recruitmentPage
        .selectExistingVacancy();

    await this.recruitmentPage
      .searchVacancies();
  }
);


When(
  'the administrator opens the vacancy',
  async function (this: CustomWorld) {

    await this.recruitmentPage
      .openFirstVacancyFromResults();
  }
);


When(
  'updates the vacancy description',
  async function (this: CustomWorld) {

    this.vacancyDescription =
      `Updated by automation ${Date.now()}`;

    await this.recruitmentPage
      .updateVacancyDescription(
        this.vacancyDescription
      );
  }
);


When(
  'saves the vacancy changes',
  async function (this: CustomWorld) {

    await this.recruitmentPage
      .saveVacancyChanges();
  }
);


Then(
  'the vacancy should be updated successfully',
  async function (this: CustomWorld) {

    await this.recruitmentPage
      .verifyVacancyDescription(
        this.vacancyDescription
      );
  }
);


// =====================================================
// DELETE VACANCY
// =====================================================

When(
  'the administrator deletes the vacancy',
  async function (this: CustomWorld) {

    this.vacancyName =
      await this.recruitmentPage
        .deleteFirstVacancy();
  }
);


When(
  'confirms the deletion',
  async function (this: CustomWorld) {

    await this.recruitmentPage
      .confirmDeletion();
  }
);


Then(
  'the vacancy should no longer appear in the vacancy list',
  async function (this: CustomWorld) {

    await this.recruitmentPage
      .verifyVacancyDeleted(
        this.vacancyName
      );
  }
);

Given(
  'an existing vacancy is closed',
  async function (this: CustomWorld) {

    await this.recruitmentPage
      .openVacancies();

    await this.recruitmentPage
      .openAddVacancy();

    const uniqueId =
      Date.now().toString().slice(-6);

    this.vacancyName =
      `Closed QA Vacancy ${uniqueId}`;

    this.jobTitle =
      'Automaton Tester';

    this.vacancyDescription =
      'Inactive vacancy created by automation';

    this.numberOfPositions = '1';

    await this.recruitmentPage
      .enterVacancyName(
        this.vacancyName
      );

    await this.recruitmentPage
      .selectJobTitle(
        this.jobTitle
      );

   this.hiringManager =
    await this.recruitmentPage
        .selectFirstAvailableHiringManager();
    await this.recruitmentPage
        .enterNumberOfPositions(
         this.numberOfPositions
      );

    await this.recruitmentPage
      .setVacancyInactive();

    await this.recruitmentPage
      .saveVacancy();

    await this.recruitmentPage
      .verifyVacancyCreated(
        this.vacancyName
      );
  }
);

When(
  'opens the Vacancy dropdown',
  async function (this: CustomWorld) {

    await this.recruitmentPage
      .openCandidateVacancyDropdown();
  }
);

Then(
  'the closed vacancy should not be available for selection',
  async function (this: CustomWorld) {

    await this.recruitmentPage
      .verifyVacancyNotAvailable(
        this.vacancyName
      );
  }
);


// =====================================================
// ADD CANDIDATE
// =====================================================

Given(
  'the administrator opens the Add Candidate form',
  async function (this: CustomWorld) {

    await this.recruitmentPage
      .openAddCandidate();
  }
);


When(
  'the administrator enters valid candidate information',
  async function (this: CustomWorld) {

    const uniqueId =
      Date.now().toString().slice(-6);

    this.candidateFirstName = 'Daniela';
    this.candidateMiddleName = 'QA';
    this.candidateLastName =
      `Candidate${uniqueId}`;

    this.candidateFullName =
      `${this.candidateFirstName} ${this.candidateMiddleName} ${this.candidateLastName}`;

    this.candidateEmail =
      `qa${uniqueId}@example.com`;

    await this.recruitmentPage
      .enterCandidateInformation(
        this.candidateFirstName,
        this.candidateMiddleName,
        this.candidateLastName,
        this.candidateEmail
      );
  }
);


When(
  'selects an existing vacancy for the candidate',
  async function (this: CustomWorld) {

    this.vacancyName =
      await this.recruitmentPage
        .selectFirstCandidateVacancy();
  }
);


When(
  'uploads the candidate resume',
  async function (this: CustomWorld) {

    await this.recruitmentPage
      .uploadCandidateResume();
  }
);


When(
  'saves the candidate',
  async function (this: CustomWorld) {

    await this.recruitmentPage
      .saveCandidate();
  }
);


Then(
  'the candidate should be created successfully',
  async function (this: CustomWorld) {

    await this.recruitmentPage
      .verifyCandidateCreated(
        this.candidateLastName
      );
  }
);


Then(
  'the candidate should be associated with the selected vacancy',
  async function (this: CustomWorld) {

    await this.recruitmentPage
      .verifyCandidateVacancy(
        this.vacancyName
      );
  }
);


// =====================================================
// CANDIDATE SEARCH
// =====================================================

Given(
  'the administrator opens the Candidates section',
  async function (this: CustomWorld) {

    await this.recruitmentPage
      .openCandidates();
  }
);


When(
  'the administrator enters part of the candidate name',
  async function (this: CustomWorld) {

    this.candidateSearchText =
      this.candidateFirstName || 'Daniela';

    await this.recruitmentPage
      .enterCandidateSearchName(
        this.candidateSearchText
      );
  }
);


Then(
  'matching candidates should appear in the autocomplete suggestions',
  async function (this: CustomWorld) {

    this.selectedCandidateSuggestion =
      await this.recruitmentPage
        .waitForCandidateSuggestion(
          this.candidateLastName
        );

    expect(
      this.selectedCandidateSuggestion
    ).toContain(
      this.candidateLastName
    );
  }
);

When(
  'the administrator selects the candidate',
  async function (this: CustomWorld) {

    this.candidateFullName =
      this.selectedCandidateSuggestion;

    await this.recruitmentPage
      .selectCandidateSuggestion(
        this.selectedCandidateSuggestion
      );
  }
);



When(
  'clicks the candidate Search button',
  async function (this: CustomWorld) {

    await this.recruitmentPage
      .searchCandidates();
  }
);


Then(
  'the selected candidate should appear in the search results',
  async function (this: CustomWorld) {

    await this.recruitmentPage
      .verifyCandidateInResults(
        this.candidateFullName
      );
  }
);

Given(
  'an existing candidate is registered',
  async function (this: CustomWorld) {

    const uniqueId =
      Date.now().toString().slice(-6);

    this.candidateFirstName = 'Daniela';
    this.candidateMiddleName = 'QA';
    this.candidateLastName =
      `Search${uniqueId}`;

    this.candidateFullName =
      `${this.candidateFirstName} ${this.candidateMiddleName} ${this.candidateLastName}`;

    this.candidateEmail =
      `search${uniqueId}@example.com`;

    await this.recruitmentPage
      .createTestCandidate(
        this.candidateFirstName,
        this.candidateMiddleName,
        this.candidateLastName,
        this.candidateEmail
      );
  }
);

Given(
  'an existing candidate is associated with a vacancy',
  async function (this: CustomWorld) {

    const uniqueId =
      Date.now().toString().slice(-6);

    this.candidateFirstName = 'Daniela';
    this.candidateMiddleName = 'QA';
    this.candidateLastName =
      `Application${uniqueId}`;

    this.candidateFullName =
      `${this.candidateFirstName} ${this.candidateMiddleName} ${this.candidateLastName}`;

    this.candidateEmail =
      `application${uniqueId}@example.com`;

    await this.recruitmentPage
      .openAddCandidate();

    await this.recruitmentPage
      .enterCandidateInformation(
        this.candidateFirstName,
        this.candidateMiddleName,
        this.candidateLastName,
        this.candidateEmail
      );

    this.vacancyName =
      await this.recruitmentPage
        .selectFirstCandidateVacancy();

    await this.recruitmentPage
      .uploadCandidateResume();

    await this.recruitmentPage
      .saveCandidate();

    await this.recruitmentPage
      .verifyCandidateCreated(
        this.candidateLastName
      );

    await this.recruitmentPage
      .verifyCandidateVacancy(
        this.vacancyName
      );
  }
);

Given(
  'multiple candidates are registered',
  async function (this: CustomWorld) {

    const uniqueId =
      Date.now().toString().slice(-6);

    this.matchingCandidateLastName =
      `Match${uniqueId}`;

    this.nonMatchingCandidateLastName =
      `Different${uniqueId}`;

    await this.recruitmentPage
      .createTestCandidate(
        'Daniela',
        'QA',
        this.matchingCandidateLastName,
        `match${uniqueId}@example.com`
      );

    await this.recruitmentPage
      .createTestCandidate(
        'Daniela',
        'QA',
        this.nonMatchingCandidateLastName,
        `different${uniqueId}@example.com`
      );
  }
);

When(
  'the administrator opens the candidate application',
  async function (this: CustomWorld) {
      this.page.url()
      await this.page.locator('body').innerText()
  }
);

When(
  'the administrator enters part of a candidate name',
  async function (this: CustomWorld) {
    this.candidateSearchText =
      this.matchingCandidateLastName;

    await this.recruitmentPage
      .enterCandidateSearchName(
        this.candidateSearchText
      );
  }
);


Then(
  'only candidates matching the entered text should appear in the autocomplete suggestions',
  async function (this: CustomWorld) {

    const suggestions =
      await this.recruitmentPage
        .getCandidateSuggestions();

    expect(suggestions.length)
      .toBeGreaterThan(0);

    // Our matching candidate must appear
    expect(
      suggestions.some(
        suggestion =>
          suggestion.includes(
            this.matchingCandidateLastName
          )
      )
    ).toBe(true);

    // Our non-matching candidate must not appear
    expect(
      suggestions.some(
        suggestion =>
          suggestion.includes(
            this.nonMatchingCandidateLastName
          )
      )
    ).toBe(false);

    // Every returned suggestion must match
    // the entered search text
    for (const suggestion of suggestions) {
      expect(
        suggestion.toLowerCase()
      ).toContain(
        this.candidateSearchText.toLowerCase()
      );
    }
  }
  
);