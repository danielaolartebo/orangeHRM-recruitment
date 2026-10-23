import { Page, expect } from '@playwright/test';
import path from 'path';

export class RecruitmentPage {

  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  // =====================================================
  // COMMON
  // =====================================================

  private field(label: string) {
    return this.page
      .locator('.oxd-input-group')
      .filter({ hasText: label });
  }

  private async selectDropdown(
    label: string,
    optionText: string
  ) {
    const field = this.field(label);

    await field
      .locator('.oxd-select-text')
      .click();

    const option = this.page
      .locator('.oxd-select-option')
      .filter({ hasText: optionText })
      .first();

    await expect(option).toBeVisible({
      timeout: 10000
    });

    await option.click();
  }


  // =====================================================
  // VACANCIES
  // =====================================================

  async openVacancies() {
    await this.page
      .getByRole('link', {
        name: 'Vacancies',
        exact: true
      })
      .click();

    await expect(
      this.page.getByRole('heading', {
        name: 'Vacancies'
      })
    ).toBeVisible();
  }


  async openAddVacancy() {
    await this.page
      .getByRole('button', {
        name: 'Add'
      })
      .click();

    await expect(
      this.page.getByRole('heading', {
        name: 'Add Vacancy'
      })
    ).toBeVisible();
  }


  async enterVacancyName(
    vacancyName: string
  ) {
    const input = this.field('Vacancy Name')
      .locator('input');

    await input.fill(vacancyName);
  }


  async selectJobTitle(
    jobTitle: string
  ) {
    await this.selectDropdown(
      'Job Title',
      jobTitle
    );
  }


  async enterDescription(
    description: string
  ) {
    await this.field('Description')
      .locator('textarea')
      .fill(description);
  }


  async selectHiringManager(
    managerName: string
  ) {
    const input = this.field('Hiring Manager')
      .locator('input');

    await input.fill(managerName);

    const option = this.page
      .locator('.oxd-autocomplete-option')
      .filter({ hasText: managerName })
      .first();

    await expect(option).toBeVisible({
      timeout: 15000
    });

    await option.click();
  }


  async enterNumberOfPositions(
    positions: string
  ) {
    await this.field('Number of Positions')
      .locator('input')
      .fill(positions);
  }


  async saveVacancy() {
    await this.page
      .getByRole('button', {
        name: 'Save',
        exact: true
      })
      .click();
  }


  async verifyVacancyCreated(
    vacancyName: string
  ) {
    await expect(this.page).toHaveURL(
      /\/recruitment\/addJobVacancy\/\d+/,
      { timeout: 15000 }
    );

    await expect(
      this.field('Vacancy Name')
        .locator('input')
    ).toHaveValue(vacancyName);
  }


  async selectExistingJobTitle() {
    const field = this.field('Job Title');

    await field
      .locator('.oxd-select-text')
      .click();

    const option = this.page
      .locator('.oxd-select-option')
      .nth(1);

    await expect(option).toBeVisible();

    const text =
      (await option.textContent())?.trim() ?? '';

    await option.click();

    return text;
  }


  async selectExistingVacancy() {
    const field = this.field('Vacancy');

    await field
      .locator('.oxd-select-text')
      .click();

    const option = this.page
      .locator('.oxd-select-option')
      .nth(1);

    await expect(option).toBeVisible();

    const vacancy =
      (await option.textContent())?.trim() ?? '';

    await option.click();

    return vacancy;
  }


  async searchVacancies() {
    await this.page
      .getByRole('button', {
        name: 'Search',
        exact: true
      })
      .click();
  }


  async verifyVacancyInResults(
    vacancyName: string
  ) {
    await expect(
      this.page
        .locator('.oxd-table-body')
        .getByText(vacancyName, {
          exact: false
        })
        .first()
    ).toBeVisible({
      timeout: 10000
    });
  }


async openFirstVacancyFromResults() {
  const row = this.page
    .locator('.oxd-table-body .oxd-table-row')
    .first();

  await expect(row).toBeVisible();

  const vacancyName =
    (await row
      .locator('.oxd-table-cell')
      .nth(1)
      .textContent())?.trim() ?? '';

  await row
    .locator('button')
    .last()
    .click();

  await expect(
    this.page.getByRole('heading', {
      name: 'Edit Vacancy'
    })
  ).toBeVisible({
    timeout: 10000
  });

  return vacancyName;
}


  async updateVacancyDescription(
    description: string
  ) {
    const textarea =
      this.field('Description')
        .locator('textarea');

    await expect(textarea).toBeVisible();

    await textarea.fill(description);

    await expect(textarea).toHaveValue(
      description
    );
  }

  async getMethodOfApplication() {
  const field = this.page
    .locator('.oxd-input-group')
    .filter({
      hasText: 'Method of Application'
    });

  await expect(field).toBeVisible({
    timeout: 5000
  });

  return (
    await field.innerText()
  ).trim();
}

  async verifyMethodOfApplicationDisplayed() {
  const methodOfApplication =
    this.page.getByText(
      'Method of Application',
      { exact: true }
    );

  await expect(methodOfApplication).toBeVisible({
    timeout: 5000
  });
}


  async saveVacancyChanges() {
    const saveButton = this.page.getByRole(
      'button',
      {
        name: 'Save',
        exact: true
      }
    );

    await expect(saveButton).toBeVisible({
      timeout: 10000
    });

    await expect(saveButton).toBeEnabled();

    await saveButton.click();

    await this.page.waitForTimeout(1000);
  }


  async verifyVacancyDescription(
    description: string
  ) {
    const textarea =
      this.field('Description')
        .locator('textarea');

    await expect(textarea).toBeVisible({
      timeout: 10000
    });

    await expect(textarea).toHaveValue(
      description,
      {
        timeout: 10000
      }
    );
  }


  async deleteFirstVacancy() {
    const row = this.page
      .locator('.oxd-table-body .oxd-table-row')
      .first();

    await expect(row).toBeVisible();

    const vacancyName =
      (await row
        .locator('.oxd-table-cell')
        .nth(1)
        .textContent())?.trim() ?? '';

    await row
      .locator('button')
      .first()
      .click();

    return vacancyName;
  }


  async confirmDeletion() {
    await this.page
      .getByRole('button', {
        name: /Yes, Delete/i
      })
      .click();
  }


  async verifyVacancyDeleted(
    vacancyName: string
  ) {
    await expect(
      this.page
        .locator('.oxd-table-body')
        .getByText(vacancyName, {
          exact: true
        })
    ).toHaveCount(0);
  }

async setVacancyInactive() {
  const activeCheckbox = this.page
    .getByText('Active', { exact: true })
    .locator('..')
    .locator('input[type="checkbox"]');

  await expect(activeCheckbox).toBeAttached({
    timeout: 10000
  });

  if (await activeCheckbox.isChecked()) {
    await activeCheckbox.uncheck({
      force: true
    });
  }

  await expect(activeCheckbox).not.toBeChecked();
}


  async openCandidateVacancyDropdown() {
    const vacancyField = this.page
      .locator('.oxd-input-group')
      .filter({ hasText: 'Vacancy' });

    await vacancyField
      .locator('.oxd-select-text')
      .click();

    await expect(
      this.page.locator('.oxd-select-option').first()
    ).toBeVisible({
      timeout: 10000
    });
  }


async verifyVacancyNotAvailable(
  vacancyName: string
) {
  const options = this.page
    .locator('.oxd-select-option');

  const matchingVacancy = options.filter({
    hasText: vacancyName
  });

  await expect(
    matchingVacancy
  ).toHaveCount(0);
}


  // =====================================================
  // CANDIDATES
  // =====================================================

  async openCandidates() {
    await this.page
      .getByRole('link', {
        name: 'Candidates',
        exact: true
      })
      .click();
  }


  async openAddCandidate() {

    await this.openCandidates();

    await this.page
      .getByRole('button', {
        name: 'Add'
      })
      .click();

    await expect(
      this.page.getByRole('heading', {
        name: 'Add Candidate'
      })
    ).toBeVisible({
      timeout: 10000
    });
  }


  async enterCandidateInformation(
    firstName: string,
    middleName: string,
    lastName: string,
    email: string
  ) {

    await this.page
      .getByPlaceholder('First Name')
      .fill(firstName);

    await this.page
      .getByPlaceholder('Middle Name')
      .fill(middleName);

    await this.page
      .getByPlaceholder('Last Name')
      .fill(lastName);

    await this.field('Email')
      .locator('input')
      .fill(email);
  }


  async selectCandidateVacancy(
    vacancyName: string
  ) {
    await this.selectDropdown(
      'Vacancy',
      vacancyName
    );
  }


  async selectFirstCandidateVacancy() {
    const field = this.field('Vacancy');

    await field
      .locator('.oxd-select-text')
      .click();

    const option = this.page
      .locator('.oxd-select-option')
      .nth(1);

    await expect(option).toBeVisible({
      timeout: 10000
    });

    const vacancy =
      (await option.textContent())?.trim() ?? '';

    await option.click();

    return vacancy;
  }


  async uploadCandidateResume() {

    const cvPath = path.resolve(
      process.cwd(),
      'test-data',
      'candidate-cv.pdf'
    );

    await this.page
      .locator('input[type="file"]')
      .setInputFiles(cvPath);
  }


  async saveCandidate() {
    await this.page
      .getByRole('button', {
        name: 'Save',
        exact: true
      })
      .click();
  }


  async verifyCandidateCreated(
    candidateLastName: string
  ) {
    await expect(
      this.page.getByText(
        candidateLastName,
        { exact: false }
      ).first()
    ).toBeVisible({
      timeout: 15000
    });
  }


  async verifyCandidateVacancy(
    vacancyName: string
  ) {
    const vacancyField = this.page
      .locator('.oxd-input-group')
      .filter({ hasText: 'Vacancy' })
      .locator('.oxd-select-text-input');

    await expect(vacancyField).toHaveText(
      vacancyName,
      {
        timeout: 10000
      }
    );
  }

  async createTestCandidate(
  firstName: string,
  middleName: string,
  lastName: string,
  email: string
) {
  await this.openAddCandidate();

  await this.enterCandidateInformation(
    firstName,
    middleName,
    lastName,
    email
  );

  await this.uploadCandidateResume();

  await this.saveCandidate();

  await this.verifyCandidateCreated(
    lastName
  );
}


  // =====================================================
  // CANDIDATE SEARCH
  // =====================================================

  async enterCandidateSearchName(
    name: string
  ) {
    const input = this.field('Candidate Name')
      .locator('input');

    await input.fill(name);
  }


async getCandidateSuggestions() {
  const options = this.page.locator(
    '.oxd-autocomplete-option'
  );

  await expect(options.first()).toBeVisible({
    timeout: 10000
  });

  const searchingOption = options.filter({
    hasText: /Searching/i
  });

  if (await searchingOption.count()) {
    await expect(searchingOption).toHaveCount(0, {
      timeout: 10000
    });
  }

  const texts = await options.allTextContents();

  return texts
    .map(text => text.trim())
    .filter(text =>
      text &&
      !/Searching/i.test(text) &&
      !/No Records Found/i.test(text)
    );
}

  async waitForCandidateSuggestion(
  candidateLastName: string,
  attempts = 3
) {
  for (let attempt = 1; attempt <= attempts; attempt++) {

    const suggestions =
      await this.getCandidateSuggestions();

    const candidate =
      suggestions.find(
        suggestion =>
          suggestion.includes(candidateLastName)
      );

    if (candidate) {
      return candidate.trim();
    }

    if (attempt < attempts) {
      const candidateNameInput = this.field(
        'Candidate Name'
      ).locator('input');

      await candidateNameInput.fill('');
      await candidateNameInput.fill(
        candidateLastName
      );

      await this.page.waitForTimeout(1500);
    }
  }

  throw new Error(
    `Candidate "${candidateLastName}" was not found in autocomplete after ${attempts} attempts`
  );
}

  async selectCandidateSuggestion(
    candidateName: string
  ) {
    const option = this.page
      .locator('.oxd-autocomplete-option')
      .filter({
        hasText: candidateName
      })
      .first();

    await expect(option).toBeVisible();

    await option.click();
  }


  async searchCandidates() {
    await this.page
      .getByRole('button', {
        name: 'Search',
        exact: true
      })
      .click();
  }


  async verifyCandidateInResults(
    candidateName: string
  ) {
    await expect(
      this.page
        .locator('.oxd-table-body')
        .getByText(
          candidateName,
          { exact: false }
        )
        .first()
    ).toBeVisible({
      timeout: 10000
    });
  }


  // =====================================================
  // APPLICATION
  // =====================================================

  async openFirstCandidateApplication() {
    const row = this.page
      .locator('.oxd-table-body .oxd-table-row')
      .first();

    await expect(row).toBeVisible();

    await row
      .locator('button')
      .last()
      .click();
  }


  async getApplicationMethod() {
    const body = this.page.locator('body');

    await expect(
      body.getByText(
        'Method of Application',
        { exact: false }
      )
    ).toBeVisible();

    return body.textContent();
  }

  async selectFirstAvailableHiringManager() {
  const input = this.field('Hiring Manager')
    .locator('input');

  await expect(input).toBeVisible();

  const searchTerms = [
    'a',
    'e',
    'i',
    'm',
    'r',
    's'
  ];

  for (const searchTerm of searchTerms) {
    await input.fill('');
    await input.fill(searchTerm);

    const options = this.page
      .locator('.oxd-autocomplete-option');

    try {
      await options.first().waitFor({
        state: 'visible',
        timeout: 5000
      });
    } catch {
      continue;
    }

    // Give OrangeHRM autocomplete a moment to replace
    // "Searching..." with the actual results.
    await this.page.waitForTimeout(1000);

    const count = await options.count();

    for (let i = 0; i < count; i++) {
      const option = options.nth(i);

      const text =
        (await option.textContent())
          ?.trim() ?? '';

      if (
        text &&
        !/searching/i.test(text) &&
        !/no records found/i.test(text)
      ) {
        await option.click();

        return text;
      }
    }
  }

  throw new Error(
    'No available Hiring Manager was found after trying multiple search terms'
  );
}
}

