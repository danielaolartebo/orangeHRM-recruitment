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

  browser!: Browser;
  context!: BrowserContext;
  page!: Page;

  loginPage!: LoginPage;
  dashboardPage!: DashboardPage;
  recruitmentPage!: RecruitmentPage;

  // Vacancy data
  vacancyName!: string;
  jobTitle!: string;
  vacancyDescription!: string;
  hiringManager!: string;
  numberOfPositions!: string;

  // Candidate data
  candidateFirstName!: string;
  candidateMiddleName!: string;
  candidateLastName!: string;
  candidateFullName!: string;
  candidateEmail!: string;

  // Candidate search
  candidateSearchText!: string;
  matchingCandidateLastName!: string;
  nonMatchingCandidateLastName!: string; 
  selectedCandidateSuggestion!: string;

  // Application
  applicationMethod!: string;

  constructor(options: IWorldOptions) {
    super(options);
  }
}

setWorldConstructor(CustomWorld);