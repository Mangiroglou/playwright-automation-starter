import { randomInt, randomUUID } from 'node:crypto';

export class RandomDataUtils {
  /**
   * Generates a random first name with a unique suffix.
   * Maximum length: 15 characters.
   * Example: Olivia_a82f31
   */
  static randomFirstName(): string {
    const names = [
      'John',
      'James',
      'Michael',
      'David',
      'Daniel',
      'Emma',
      'Olivia',
      'Sophia',
      'Emily',
      'Anna',
    ];

    const name = names[randomInt(names.length)];
    const suffix = this.uniqueSuffix();

    return `${name.slice(0, 15 - suffix.length - 1)}_${suffix}`;
  }

  /**
   * Generates a random last name with a unique suffix.
   * Maximum length: 15 characters.
   * Example: Johnson_f74c20
   */
  static randomLastName(): string {
    const lastNames = [
      'Smith',
      'Johnson',
      'Williams',
      'Brown',
      'Jones',
      'Miller',
      'Davis',
      'Wilson',
      'Taylor',
      'Anderson',
    ];

    const name = lastNames[randomInt(lastNames.length)];
    const suffix = this.uniqueSuffix();

    return `${name.slice(0, 15 - suffix.length - 1)}_${suffix}`;
  }

  /**
   * Generates a random 7-digit numeric password.
   */
  static randomPassword(): string {
    return randomInt(1_000_000, 10_000_000).toString();
  }

  /**
   * Generates a unique random email address.
   */
  static randomEmail(): string {
    return `test.${randomUUID()}@example.com`;
  }

  /**
   * Generates a random date of birth (yyyy-MM-dd) for an adult aged 18–80.
   */
  static randomBirthdate(): string {
    const year = new Date().getFullYear() - randomInt(18, 81);
    const month = randomInt(1, 13);
    const day = randomInt(1, 29);

    return `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
  }

  /**
   * Generates a random 10-digit phone number.
   */
  static randomPhone(): string {
    return `210${randomInt(1_000_000, 10_000_000)}`;
  }

  /**
   * Generates a random street address.
   */
  static randomStreet1(): string {
    const streets = ['Main Street', 'Oak Avenue', 'Pine Road', 'Maple Lane', 'Cedar Drive'];

    return `${randomInt(1, 200)} ${streets[randomInt(streets.length)]}`;
  }

  /**
   * Generates a random second address line.
   * Example: Apt 12
   */
  static randomStreet2(): string {
    return `Apt ${randomInt(1, 51)}`;
  }

  /**
   * Generates a random city with its state/province,
   * postal code and country.
   */
  static randomLocation(): {
    city: string;
    stateProvince: string;
    postalCode: string;
    country: string;
  } {
    const locations = [
      {
        city: 'Athens',
        stateProvince: 'Attica',
        postalCode: '10431',
        country: 'Greece',
      },
      {
        city: 'Thessaloniki',
        stateProvince: 'Central Macedonia',
        postalCode: '54624',
        country: 'Greece',
      },
      {
        city: 'Berlin',
        stateProvince: 'Berlin',
        postalCode: '10115',
        country: 'Germany',
      },
      {
        city: 'Toronto',
        stateProvince: 'Ontario',
        postalCode: 'M5H 2N2',
        country: 'Canada',
      },
    ];

    return locations[randomInt(locations.length)];
  }

  /**
   * Generates a short random suffix.
   * Example: a82f31
   */
  static uniqueSuffix(): string {
    return randomUUID().replace(/-/g, '').slice(0, 6);
  }
}
