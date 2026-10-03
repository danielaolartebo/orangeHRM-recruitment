import {
  Before,
  After,
  setDefaultTimeout
} from '@cucumber/cucumber';

import { chromium } from '@playwright/test';

import { CustomWorld } from './world';

import { LoginPage } from '../pages/LoginPage';
import { DashboardPage } from '../pages/DashboardPage';
import { RecruitmentPage } from '../pages/RecruitmentPage';

// Maximum execution time allowed for each Cucumber step
setDefaultTimeout(30 * 1000);

Before(async function (this: CustomWorld) {

  // Launch browser
  this.browser = await chromium.launch({
    headless: false
  });

  // Create isolated browser context
  this.context = await this.browser.newContext();

  // Create new page
  this.page = await this.context.newPage();

  // Initialize Page Objects
  this.loginPage = new LoginPage(this.page);
  this.dashboardPage = new DashboardPage(this.page);
  this.recruitmentPage = new RecruitmentPage(this.page);

});

After(async function (this: CustomWorld) {

  if (this.context) {
    await this.context.close();
  }

  if (this.browser) {
    await this.browser.close();
  }

});