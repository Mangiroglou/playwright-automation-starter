# Contact List — Playwright Test Automation

A lightweight end-to-end UI test automation project for the [Contact List application](https://thinking-tester-contact-list.herokuapp.com), built with **Playwright** and **TypeScript**.

The framework is intentionally simple, readable, and suitable for junior QA engineers. Tests describe user behavior; reusable page interactions and business workflows live in separate classes.

## Prerequisites

- Node.js and npm
- A code editor (JetBrains WebStorm recommended)

## Getting started

```bash
npm install
npx playwright install
```

Run all tests:

```bash
npx playwright test
```

Run tests in a visible browser:

```bash
npx playwright test --headed
```

Run only regression tests:

```bash
npx playwright test --grep @regression
```

Run a specific test file:

```bash
npx playwright test tests/regression/contact.spec.ts
```

View the HTML report:

```bash
npx playwright show-report
```

## Project structure

```text
.
├── business/
│   ├── Assertions/           # Reusable verification helpers
│   └── Journeys/             # User workflows (e.g. HomeJourney)
├── fixtures/
│   └── test.fixture.ts       # Custom Playwright fixtures
├── pages/
│   ├── base/
│   │   ├── BasePage.ts       # Common page actions
│   │   └── DynamicLocators.ts
│   └── ...                   # Application page objects
├── test-data/
│   └── builders/
│       └── ContactDataFactory.ts
├── tests/
│   └── regression/               # Test specifications
├── types/                   # Contact data and field types
├── utilities/
│   └── RandomDataUtils.ts   # Random test data generators
└── playwright.config.ts
```

*The tree illustrates the framework's main folders; additional page objects and test files may be present.*

## How the framework works

| Layer | Responsibility |
| --- | --- |
| **Tests** | Define scenarios and expected behavior using `test.step()` |
| **Journeys** | Combine page actions into reusable user workflows |
| **Page Objects** | Encapsulate UI locators and interactions |
| **BasePage** | Provide shared UI interaction helpers |
| **DynamicLocators** | Build locators for parameterized elements |
| **ValidationHelper** | Provide reusable assertions using standard Playwright `expect` |
| **Fixtures** | Initialize Journeys and open the application |
| **Data factories / utilities** | Create contact records and randomized test values |

Typical flow:

```text
Test → Journey → Page Object → BasePage / Playwright
          └── ValidationHelper (assertions)
```

### Fixtures and navigation

Tests request the `homeJourney` fixture instead of creating page objects manually. The fixture navigates to `/` using the `baseURL` in `playwright.config.ts` before providing the Journey.

```ts
import { test } from '../../fixtures/test.fixture.js';

test('Example', async ({ homeJourney }) => {
  // The application is already open.
});
```

## Writing tests

Keep each test focused on a clear behavior. Use descriptive titles and number steps starting with **`Step 1:`**. Each step should contain **both actions and their related verifications**; do not create a separate step for every click or assertion.

```ts
import { test } from '../../fixtures/test.fixture.js';
import { RandomDataUtils } from '../../utilities/RandomDataUtils';
import { ContactDataFactory } from '../../test-data/builders/ContactDataFactory';

test.describe('Contact Management - Create and View Contacts', () => {
  test(
    '@regression Verify that a user can create a contact and view its saved details',
    async ({ homeJourney }) => {
      const contact = ContactDataFactory.validContact();

      await test.step(
        'Step 1: Register a user, create a contact and verify that its saved details are correct',
        async () => {
          await homeJourney.signup(
            RandomDataUtils.randomFirstName(),
            RandomDataUtils.randomLastName(),
            RandomDataUtils.randomEmail(),
            RandomDataUtils.randomPassword(),
          );

          await homeJourney.createContact(contact);
          await homeJourney.openContact(contact);
          await homeJourney.verifyContactDetails(contact);
        },
      );
    },
  );
});
```

## Conventions

- **Tests:** Describe what is being verified, not locator details.
- **Steps:** Start with `Step N:` and combine actions with verification of their outcome.
- **Journeys:** Coordinate workflows; reuse existing page methods.
- **Page Objects:** Keep selectors and direct UI actions here, not in tests.
- **Assertions:** Use standard Playwright `expect` and the existing `ValidationHelper`.
- **Test data:** Prefer `ContactDataFactory` and `RandomDataUtils` over hard-coded personal details.
- **Dynamic locators:** Use the existing `DynamicLocators` for parameterized selectors.
- **Asynchronous operations:** Use `await` for Playwright actions and async assertions; do not `await` synchronous string/number comparisons.

## Configuration

`playwright.config.ts` defines the application's `baseURL`, browser projects, retries, reporting, screenshots, videos, and traces. The current setup uses Chromium and generates an HTML report.

For debugging, run:

```bash
npx playwright test --debug
```

For a single test by title:

```bash
npx playwright test --grep "invalid birthdate"
```

## Troubleshooting

**Browser is missing:** Run `npx playwright install`.

**Test cannot find an element:** Check the selector in the corresponding Page Object, the current page, and whether the element is visible.

**Unexpected validation failure:** Log the generated test data and check application limits (for example, name length).

**Dialog blocks deletion:** Register a Playwright `dialog` handler before clicking the Delete Contact button.

**Flaky tests:** Prefer Playwright locator assertions and built-in waiting over fixed delays. Avoid repeating non-idempotent actions, such as submitting a contact, without checking the outcome.
