import { test as base, expect } from '@playwright/test';

import { HomeJourney } from '@business/Journeys/HomeJourney';
import { ValidationHelper } from '@business/Assertions/ValidationHelper';

interface CustomFixtures {
  homeJourney: HomeJourney;
  validationHelper: ValidationHelper;
}

export const test = base.extend<CustomFixtures>({
  homeJourney: async ({ page }, use) => {
    await page.goto('/');

    await use(new HomeJourney(page));
  },
  validationHelper: async ({ page }, use) => {

    await use(new ValidationHelper(page));
  },
});

export { expect };
