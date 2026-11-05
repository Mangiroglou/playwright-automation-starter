import { expect, type Page} from '@playwright/test';

/**
 * ValidationHelper
 *
 * Provides reusable assertions for validating UI messages,
 * text, numbers, and element visibility.
 *
 * Uses Playwright's standard assertions.
 * A failed assertion immediately fails the current test.
 *
 * No SoftAssertionsUtils dependency is required.
 */
export class ValidationHelper {
  constructor(private readonly page: Page) {}

  // ---------------- MESSAGE VALIDATIONS ----------------

  /**
   * Verifies that a message is visible.
   */
  async assertMessageVisible(message: string, timeout = 5_000): Promise<void> {
    await expect(this.page.getByText(message)).toBeVisible({ timeout });
  }

  /**
   * Verifies that a message is not visible.
   */
  async assertMessageNotVisible(message: string, timeout = 3_000): Promise<void> {
    await expect(this.page.getByText(message)).not.toBeVisible({ timeout });
  }

  // ---------------- TEXT VALIDATIONS ----------------

  /**
   * Verifies that two strings are equal.
   */
  assertTextEquals(actual: string, expected: string): void {
    expect(actual).toBe(expected);
  }
}
