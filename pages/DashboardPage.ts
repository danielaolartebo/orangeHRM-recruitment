import { Page, expect } from '@playwright/test';

export class DashboardPage {

  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  // Verify that the Dashboard is displayed after login
  async verifyDashboard() {
    await expect(
      this.page.getByRole('heading', { name: 'Dashboard' })
    ).toBeVisible({ timeout: 10000 });
  }

  // Navigate to PIM module
  async goToPIM() {
    await this.page
      .getByRole('link', { name: 'PIM' })
      .click();
  }

  // Navigate to Recruitment module
  async goToRecruitment() {
    await this.page
      .getByRole('link', { name: 'Recruitment' })
      .click();

    await expect(
      this.page.getByRole('heading', { name: 'Recruitment' })
    ).toBeVisible({ timeout: 10000 });
  }

  // Logout from OrangeHRM
  async logout() {
    await this.page
      .locator('.oxd-userdropdown-tab')
      .click();

    await this.page
      .getByRole('menuitem', { name: 'Logout' })
      .click();
  }
}