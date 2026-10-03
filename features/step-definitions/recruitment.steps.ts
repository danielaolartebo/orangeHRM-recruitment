import {
  Given,
  When,
  Then
} from '@cucumber/cucumber';

import { CustomWorld } from '../../support/world';


Given(
  'the administrator navigates to the Recruitment module',
  async function (this: CustomWorld) {

    await this.dashboardPage.goToRecruitment();
  }
);


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

    const uniqueId = Date.now()
      .toString()
      .slice(-6);

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

    await this.recruitmentPage.enterDescription(
      this.vacancyDescription
    );
  }
);


When(
  'selects {string} as the hiring manager',
  async function (
    this: CustomWorld,
    hiringManager: string
  ) {

    this.hiringManager = hiringManager;

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