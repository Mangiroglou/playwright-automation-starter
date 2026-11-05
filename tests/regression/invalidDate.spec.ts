import { test } from '@fixtures/test.fixture';
import { RandomDataUtils } from '../../utilities/RandomDataUtils';
import { ContactDataFactory } from '@test-data/builders/ContactDataFactory';

test.describe('Contact Management - Add Contact', () => {

  test(
    'Verify that creating a contact with an invalid birthdate displays a validation error and prevents contact creation',
    async ({ homeJourney, validationHelper }) => {

      const contact = ContactDataFactory.contactWithBirthdate('1990-13-01');

      await test.step(
        'Step 1: Attempt to create a contact with an invalid birthdate and verify that the appropriate validation error is displayed',
        async () => {

          // Register a new user
          await homeJourney.signup(
            RandomDataUtils.randomFirstName(),
            RandomDataUtils.randomLastName(),
            RandomDataUtils.randomEmail(),
            RandomDataUtils.randomPassword(),
          );

          // Fill and submit the contact form
          await homeJourney.fillContactForm(contact);

          // Verify the validation error
          await validationHelper.assertMessageVisible(
            'Contact validation failed: birthdate: Birthdate is invalid',
          );

          // Verify the user remains on the Add Contact page
          await validationHelper.assertMessageVisible('Add Contact');
        }
      );
    }
  );
});