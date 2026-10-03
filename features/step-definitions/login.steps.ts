import {
  Given,
  When,
  Then
} from '@cucumber/cucumber';

import { CustomWorld } from '../../support/world';


Given(
  'the administrator is logged into OrangeHRM',
  async function (this: CustomWorld) {

    await this.loginPage.navigate();

    await this.loginPage.login(
      'Admin',
      'admin123'
    );

    await this.dashboardPage.verifyDashboard();

  }
);


Given(
  'the administrator is on the OrangeHRM login page',
  async function (this: CustomWorld) {

    await this.loginPage.navigate();

    await this.loginPage.verifyLoginPage();

  }
);


When(
  'the administrator enters valid credentials',
  async function (this: CustomWorld) {

    await this.loginPage.enterCredentials(
      'Admin',
      'admin123'
    );

  }
);


When(
  'the administrator clicks the Login button',
  async function (this: CustomWorld) {

    await this.loginPage.clickLogin();

  }
);


Then(
  'the OrangeHRM Dashboard should be displayed',
  async function (this: CustomWorld) {

    await this.dashboardPage.verifyDashboard();

  }
);