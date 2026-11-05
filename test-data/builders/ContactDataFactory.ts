import { RandomDataUtils } from '../../utilities/RandomDataUtils';
import { ContactData } from '@test-data/types/ContactData';

/**
 * Builds contact test data.
 */
export class ContactDataFactory {
  /**
   * A contact with every field filled with valid random data.
   * The last name gets a unique suffix so the contact can be found by name in the list.
   */
  static validContact(): ContactData {
    return {
      firstName: RandomDataUtils.randomFirstName(),
      lastName: RandomDataUtils.randomLastName(),
      birthdate: RandomDataUtils.randomBirthdate(),
      email: RandomDataUtils.randomEmail(),
      phone: RandomDataUtils.randomPhone(),
      street1: RandomDataUtils.randomStreet1(),
      street2: RandomDataUtils.randomStreet2(),
      ...RandomDataUtils.randomLocation(),
    };
  }

  /**
   * A valid contact with the given birthdate, e.g. for invalid date of birth tests.
   *
   * @param birthdate - Value to put in the Date of Birth field.
   */
  static contactWithBirthdate(birthdate: string): ContactData {
    return { ...this.validContact(), birthdate };
  }
}
