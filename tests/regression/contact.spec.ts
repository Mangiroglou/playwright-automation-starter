import { test } from '@fixtures/test.fixture';
import { RandomDataUtils } from '../../utilities/RandomDataUtils';
import { ContactDataFactory } from '@test-data/builders/ContactDataFactory';

test.describe('Contact Management - Create, View and Delete Contacts', () => {
  test.slow();

  test('@regression Verify that a user can create and view a contact, then delete another contact successfully', async ({
    homeJourney,
    validationHelper,
  }) => {
    const contact = ContactDataFactory.validContact();
    const otherContact = ContactDataFactory.validContact();

    await test.step('Step 1: Register a new user, create a contact and verify that all saved contact details are displayed correctly', async () => {
      await homeJourney.signup(
        RandomDataUtils.randomFirstName(),
        RandomDataUtils.randomLastName(),
        RandomDataUtils.randomEmail(),
        RandomDataUtils.randomPassword(),
      );

      await homeJourney.createContact(contact);
      await homeJourney.openContact(contact);
      await homeJourney.verifyContactDetails(contact);
    });

    await test.step('Step 2: Create a second contact, delete it and verify that it is no longer displayed in the Contact List', async () => {
      await homeJourney.createContact(otherContact);
      await homeJourney.deleteContact(otherContact);

      await validationHelper.assertMessageNotVisible(otherContact.firstName);
      await validationHelper.assertMessageNotVisible(otherContact.lastName);
    });
  });
});
