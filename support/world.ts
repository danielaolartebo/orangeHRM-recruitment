import {
  IWorldOptions,
  setWorldConstructor,
  World
} from '@cucumber/cucumber';

import {
  Browser,
  BrowserContext,
  Page
} from '@playwright/test';

import { LoginPage } from '../pages/LoginPage';
import { DashboardPage } from '../pages/DashboardPage';
import { RecruitmentPage } from '../pages/RecruitmentPage';

export class CustomWorld extends World {

  // Playwright
  browser!: Browser;
  context!: BrowserContext;
  page!: Page;

  // Page Objects
  loginPage!: LoginPage;
  dashboardPage!: DashboardPage;
  recruitmentPage!: RecruitmentPage;

  // Vacancy test data
  vacancyName!: string;
  jobTitle!: string;
  vacancyDescription!: string;
  hiringManager!: string;
  numberOfPositions!: string;

  // Candidate test data
  candidateFirstName!: string;
  candidateMiddleName!: string;
  candidateLastName!: string;
  candidateEmail!: string;

  constructor(options: IWorldOptions) {
    super(options);
  }
}

setWorldConstructor(CustomWorld);