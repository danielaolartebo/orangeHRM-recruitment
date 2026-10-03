import { Page, expect } from '@playwright/test';

export class RecruitmentPage {

  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async openVacancies() {
    await this.page
      .getByRole('link', { name: 'Vacancies', exact: true })
      .click();

    await expect(
      this.page.getByRole('heading', { name: 'Vacancies' })
    ).toBeVisible({ timeout: 10000 });
  }

  async openAddVacancy() {
    await this.page
      .getByRole('button', { name: 'Add' })
      .click();

    await expect(
      this.page.getByRole('heading', { name: 'Add Vacancy' })
    ).toBeVisible({ timeout: 10000 });
  }

  async enterVacancyName(vacancyName: string) {
    const field = this.page
      .locator('.oxd-input-group')
      .filter({ hasText: 'Vacancy Name' })
      .locator('input');

    await expect(field).toBeVisible();

    await field.fill(vacancyName);
  }

  async selectJobTitle(jobTitle: string) {

    const field = this.page
      .locator('.oxd-input-group')
      .filter({ hasText: 'Job Title' });

    await field
      .locator('.oxd-select-text')
      .click();

    const option = this.page
      .locator('.oxd-select-option')
      .filter({
        hasText: new RegExp(`^${jobTitle}$`)
      });

    await expect(option).toBeVisible({
      timeout: 10000
    });

    await option.click();
  }

  async enterDescription(description: string) {
    const field = this.page
      .locator('.oxd-input-group')
      .filter({ hasText: 'Description' })
      .locator('textarea');

    await expect(field).toBeVisible();

    await field.fill(description);
  }

  async selectHiringManager(managerName: string) {
    const field = this.page
      .locator('.oxd-input-group')
      .filter({ hasText: 'Hiring Manager' })
      .locator('input');

    await expect(field).toBeVisible();

    // The Add Vacancy screen uses an autocomplete
    await field.fill(managerName);

    const option = this.page
      .locator('.oxd-autocomplete-option')
      .filter({ hasText: managerName })
      .first();

    await expect(option).toBeVisible({
      timeout: 15000
    });

    await option.click();
  }

  async enterNumberOfPositions(numberOfPositions: string) {
    const field = this.page
      .locator('.oxd-input-group')
      .filter({ hasText: 'Number of Positions' })
      .locator('input');

    await expect(field).toBeVisible();

    await field.fill(numberOfPositions);
  }

  async saveVacancy() {
    await this.page
      .getByRole('button', {
        name: 'Save',
        exact: true
      })
      .click();
  }

  async verifyVacancyCreated(vacancyName: string) {
    await expect(this.page).toHaveURL(
      /\/recruitment\/addJobVacancy\/\d+/,
      { timeout: 15000 }
    );

    await expect(
      this.page.getByRole('heading', {
        name: 'Edit Vacancy'
      })
    ).toBeVisible({
      timeout: 10000
    });

    const vacancyNameInput = this.page
      .locator('.oxd-input-group')
      .filter({ hasText: 'Vacancy Name' })
      .locator('input');

    await expect(vacancyNameInput)
      .toHaveValue(vacancyName);
  }
}