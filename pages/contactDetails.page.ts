import type { Page } from 'playwright/test';
import { BasePage } from '@pages/base/BasePage';
import { DynamicLocators } from '@pages/base/DynamicLocators';
import { ContactField } from '@test-data/types/ContactField';

export const locators = {
  contactValue: 'form#contactDetails span#{param}',
  editContactButton: 'button#edit-contact',
  deleteContactButton: 'button#delete',
  returnButton: 'button#return',
  logoutButton: 'button#logout',
} as const;

/**
 * Page Object for the Contact Details page.
 *
 * Reads contact values using dynamic locators and handles the edit, delete and return actions.
 */

export class ContactDetailsPage extends BasePage {
  private readonly dynamicLocators: DynamicLocators;

  constructor(page: Page) {
    super(page);
    this.dynamicLocators = new DynamicLocators(page);
  }

  /**
   * Returns the displayed value of a contact field.
   *
   * @param field - Contact field to read.
   * @returns Locator of the field's value, for use with expect().toHaveText().
   */
  getContactField(field: ContactField) {
    return this.dynamicLocators.getDynamicLocator(locators.contactValue, field);
  }

  async clickEditContactButton() {
    await this.click(locators.editContactButton);
  }

  async clickDeleteContactButton(confirm: boolean = true): Promise<string> {
    let dialogMessage = '';

    this.page.once('dialog', async (dialog) => {
      dialogMessage = dialog.message();
      if (confirm) {
        await dialog.accept();
      } else {
        await dialog.dismiss();
      }
    });

    await this.click(locators.deleteContactButton);

    return dialogMessage;
  }

  async clickReturnButton() {
    if(await this.isVisible(locators.returnButton)){
      await this.click(locators.returnButton);
      await this.waitForElementToDisappear(locators.returnButton);
    }
  }

  async clickLogoutButton() {
    await this.click(locators.logoutButton);
  }
}
