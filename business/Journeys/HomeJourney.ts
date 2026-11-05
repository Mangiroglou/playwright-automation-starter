import { HomePage } from '@pages/home.page';
import { Page } from 'playwright/test';
import { AddUserPage } from '@pages/addUser.page';
import { ValidationHelper } from '@business/Assertions/ValidationHelper';
import { ContactListPage } from '@pages/contactList.page';
import { AddContactPage } from '@pages/addContact.page';
import { ContactField } from '@test-data/types/ContactField';
import { ContactData } from '@test-data/types/ContactData';
import { ContactDetailsPage } from '@pages/contactDetails.page';
import { expect } from '@playwright/test';

export class HomeJourney {
  private readonly homePage: HomePage;
  private readonly addUser: AddUserPage;
  private readonly validationHelper: ValidationHelper;
  private readonly contactListPage: ContactListPage;
  private readonly addContactPage: AddContactPage;
  private readonly contactDetailsPage: ContactDetailsPage;

  constructor(page: Page) {
    this.homePage = new HomePage(page);
    this.addUser = new AddUserPage(page);
    this.validationHelper = new ValidationHelper(page);
    this.contactListPage = new ContactListPage(page);
    this.addContactPage = new AddContactPage(page);
    this.contactDetailsPage = new ContactDetailsPage(page);
  }
  public async signup(
    firstname: string,
    lastname: string,
    email: string,
    password: string,
  ): Promise<void> {
    await this.homePage.clickSignupButton();
    await this.addUser.fillFirstName(firstname);
    await this.addUser.fillLastName(lastname);
    await this.addUser.fillEmail(email);
    await this.addUser.fillPassword(password);
    await this.addUser.clickSubmitButton();
    await this.validationHelper.assertMessageVisible('Contact List');
    await this.validationHelper.assertMessageVisible(
      'Click on any contact to view the Contact Details',
    );
  }

  public async fillContactForm(contact: ContactData): Promise<void> {
    await this.contactListPage.clickNewContactButton();
    await this.validationHelper.assertMessageVisible('Add Contact');
    for (const [field, value] of Object.entries(contact) as [ContactField, string][]) {
      await this.addContactPage.fillContactField(field, value);
    }
    await this.addContactPage.clickSubmitButton();
  }

  public async createContact(contact: ContactData): Promise<void> {
    await this.contactDetailsPage.clickReturnButton();
    await this.fillContactForm(contact);
    await this.validationHelper.assertMessageVisible('Contact List');
    await this.validationHelper.assertMessageVisible(
      'Click on any contact to view the Contact Details',
    );
  }

  public async openContact(contact: ContactData): Promise<void> {
    await this.contactListPage.clickContactRow(`${contact.firstName} ${contact.lastName}`);
    await this.validationHelper.assertMessageVisible('Contact Details');
  }

  public async deleteContact(contact: ContactData): Promise<string> {
    await this.openContact(contact);
    const dialogMessage = await this.contactDetailsPage.clickDeleteContactButton();
    await this.validationHelper.assertMessageVisible('Contact List');
    await this.validationHelper.assertMessageVisible(
      'Click on any contact to view the Contact Details',
    );

    this.validationHelper.assertTextEquals(dialogMessage , 'Are you sure you want to delete this contact?');
    return dialogMessage;
  }

  public async verifyContactDetails(contact: ContactData): Promise<void> {
    for (const [field, value] of Object.entries(contact) as [ContactField, string][]) {
      await expect(
        this.contactDetailsPage.getContactField(field),
        `Incorrect value for field "${field}"`,
      ).toHaveText(value);
    }
  }
}