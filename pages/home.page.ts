import type { Page } from 'playwright/test';
import { BasePage } from '@pages/base/BasePage';

export const locators = {
  signupButton: 'button#signup',
} as const;


export class HomePage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  async clickSignupButton() {
    await this.click(locators.signupButton);
  }
}
