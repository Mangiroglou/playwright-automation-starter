import type { Page } from 'playwright/test';
import { BasePage } from '@pages/base/BasePage';
import { DynamicLocators } from '@pages/base/DynamicLocators';

export const locators = {
  newContactButton: 'button#add-contact',
  logoutButton: 'button#logout',
  contactRow: 'tr.contactTableBodyRow:has-text("{param}")',
} as const;

/**
 * Page Object for the Contact List page.
 */
export class ContactListPage extends BasePage {
  private readonly dynamicLocators: DynamicLocators;

  constructor(page: Page) {
    super(page);
    this.dynamicLocators = new DynamicLocators(page);
  }

  /**
   * Opens the Add Contact page.
   */
  async clickNewContactButton(): Promise<void> {
    await this.click(locators.newContactButton);
  }

  /**
   * Logs out the current user.
   */
  async clickLogoutButton(): Promise<void> {
    await this.click(locators.logoutButton);
  }

  /**
   * Returns the table row of a contact.
   *
   * @param fullName - Contact's first and last name, e.g. "Emma Smith-a3f9c1".
   */
  getContactRow(fullName: string) {
    return this.dynamicLocators.getDynamicLocator(locators.contactRow, fullName);
  }

  /**
   * Opens a contact's details page by clicking its row.
   *
   * @param fullName - Contact's first and last name.
   */
  async clickContactRow(fullName: string): Promise<void> {
    const contactRow = this.getContactRow(fullName);

    await contactRow.click();
  }
}
