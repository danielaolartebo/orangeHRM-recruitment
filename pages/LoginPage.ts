import { Page, expect } from '@playwright/test';

export class LoginPage {

  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async navigate() {
    await this.page.goto(
      'https://opensource-demo.orangehrmlive.com/web/index.php/auth/login'
    );
  }

  async enterCredentials(
    username: string,
    password: string
  ) {
    await this.page
      .getByPlaceholder('Username')
      .fill(username);

    await this.page
      .getByPlaceholder('Password')
      .fill(password);
  }

  async clickLogin() {
    await this.page
      .getByRole('button', { name: 'Login' })
      .click();
  }

  async login(
    username: string,
    password: string
  ) {
    await this.enterCredentials(username, password);
    await this.clickLogin();
  }

  async verifyLoginPage() {
    await expect(
      this.page.getByRole('heading', { name: 'Login' })
    ).toBeVisible();
  }
}