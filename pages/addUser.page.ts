import type { Page } from 'playwright/test';
import { BasePage } from '@pages/base/BasePage';

export const locators = {
  firstnameInput: 'input#firstName',
  lastnameInput: 'input#lastName',
  emailInput: 'input#email',
  passwordInput: 'input#password',
  submitButton: 'button#submit',
  cancelButton: 'button#cancel',
} as const;

export class AddUserPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  async fillFirstName(firstname: string): Promise<void> {
    const firstnameInput = this.getLocator(locators.firstnameInput);

    await firstnameInput.fill(firstname);
  }

  async fillLastName(lastname: string): Promise<void> {
    const lastnameInput = this.getLocator(locators.lastnameInput);

    await lastnameInput.fill(lastname);
  }

  async fillEmail(email: string): Promise<void> {
    const emailInput = this.getLocator(locators.emailInput);

    await emailInput.fill(email);
  }

  async fillPassword(password: string): Promise<void> {
    const passwordInput = this.getLocator(locators.passwordInput);

    await passwordInput.fill(password);
  }

  async clickSubmitButton(): Promise<void> {
    for (let attempt = 1; attempt <= 3; attempt++) {
      await this.click(locators.submitButton);

      try {
        await this.waitForElementToDisappear(locators.submitButton, 3000);
        return;
      } catch {
        if (attempt === 3) {
          throw new Error('Submit button did not disappear after 3 attempts');
        }
      }
    }
  }

  async clickCancelButton() {
    await this.click(locators.cancelButton);
  }
}
