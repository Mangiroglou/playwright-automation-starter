import type { Page } from 'playwright/test';
import { BasePage } from '@pages/base/BasePage';
import { DynamicLocators } from '@pages/base/DynamicLocators';
import { ContactField } from '@test-data/types/ContactField';

export const locators = {
  contactInput: 'input#{param}',
  submitButton: 'button#submit',
  cancelButton: 'button#cancel',
  logoutButton: 'button#logout',
} as const;

/**
 * Page Object for the Add Contact page.
 *
 * Handles contact form interactions using dynamic locators.
 */

export class EditContactPage extends BasePage {
  private readonly dynamicLocators: DynamicLocators;

  constructor(page: Page) {
    super(page);
    this.dynamicLocators = new DynamicLocators(page);
  }

  /**
   * Fills a contact field using its field name.
   *
   * @param field - Contact field to fill.
   * @param value - Value to enter.
   */

  async fillContactField(field: ContactField, value: string): Promise<void> {
    const input = this.dynamicLocators.getDynamicLocator(locators.contactInput, field);

    await this.fillInput(input, value);
  }

  /**
   * Edits the contact form.
   */

  async clickSubmitButton() {
    await this.click(locators.submitButton);
  }

  async clickCancelButton() {
    await this.click(locators.cancelButton);
  }

  async clickLogoutButton() {
    await this.click(locators.logoutButton);
  }
}
