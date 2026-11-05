import type { Page } from 'playwright/test';
import { BasePage } from '@pages/base/BasePage';

export const locators = {
  firstnameInput: 'input#firstName',
  lastnameInput: 'input#lastName',
  email: 'input#email',
  passwordInput: 'input#password',
  submitButton: 'button#submit',
  cancelButton: 'button#cancel',
  signupButton: 'button#signup',
} as const;


export class LoginPage extends BasePage {
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
    const emailInput = this.getLocator(locators.email);

    await emailInput.fill(email);
  }

  async clickSubmitButton() {
    await this.click(locators.submitButton);
  }

  async clickCancelButton() {
    await this.click(locators.cancelButton);
  }

  async clickSignupButton() {
    await this.click(locators.signupButton);
  }

}