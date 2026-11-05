import { expect, type Locator, type Page } from '@playwright/test';

/**
 * BasePage
 *
 * Provides common functionality shared across Page Objects.
 *
 * Uses Playwright's built-in auto-waiting and standard assertions.
 * No custom soft assertions or retry mechanisms.
 *
 * All application-specific Page Objects should extend this class.
 */
export abstract class BasePage {
  protected readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  // ---------------- LOCATORS ----------------

  /**
   * Returns a Playwright Locator.
   */
  protected getLocator(selector: string): Locator {
    return this.page.locator(selector);
  }

  /**
   * Converts a selector or Locator into a Locator.
   */
  protected toLocator(target: string | Locator): Locator {
    return typeof target === 'string'
      ? this.page.locator(target)
      : target;
  }

  // ---------------- ELEMENT ACTIONS ----------------

  /**
   * Clicks an element using Playwright auto-waiting.
   */
  async click(target: string | Locator): Promise<void> {
    await this.toLocator(target).click();
  }

  /**
   * Fills an input field.
   */
  async fillInput(
    target: string | Locator,
    value: string
  ): Promise<void> {
    await this.toLocator(target).fill(value);
  }

  /**
   * Clears an input field.
   */
  async clearInput(target: string | Locator): Promise<void> {
    await this.toLocator(target).fill('');
  }

  /**
   * Presses a keyboard key on an element.
   */
  async pressKey(
    target: string | Locator,
    key: string
  ): Promise<void> {
    await this.toLocator(target).press(key);
  }

  // ---------------- ELEMENT WAITS ----------------

  /**
   * Waits until an element becomes visible.
   */
  async waitForElement(
    target: string | Locator,
    timeout = 5_000
  ): Promise<void> {
    await this.toLocator(target).waitFor({
      state: 'visible',
      timeout
    });
  }

  /**
   * Waits until an element becomes hidden or detached.
   */
  async waitForElementToDisappear(
    target: string | Locator,
    timeout = 10_000
  ): Promise<void> {
    await this.toLocator(target).waitFor({
      state: 'hidden',
      timeout
    });
  }

  /**
   * Waits for an optional element.
   * Returns false instead of throwing on timeout.
   */
  async waitIfAppears(
    target: string | Locator,
    timeout = 3_000
  ): Promise<boolean> {
    try {
      await this.waitForElement(target, timeout);
      return true;
    } catch {
      return false;
    }
  }

  // ---------------- ELEMENT INFORMATION ----------------

  /**
   * Returns the visible text of an element.
   */
  async getText(target: string | Locator): Promise<string> {
    return this.toLocator(target).innerText();
  }

  /**
   * Returns the visible text of all matching elements.
   */
  async getAllTexts(
    target: string | Locator
  ): Promise<string[]> {
    return this.toLocator(target).allInnerTexts();
  }

  /**
   * Checks whether an element is currently visible.
   * Does not wait for visibility.
   */
  async isVisible(target: string | Locator): Promise<boolean> {
    return this.toLocator(target).isVisible();
  }

  /**
   * Returns the number of matching elements.
   */
  async getElementCount(
    target: string | Locator
  ): Promise<number> {
    return this.toLocator(target).count();
  }

  // ---------------- ASSERTIONS ----------------

  /**
   * Asserts that an element is visible.
   */
  async expectVisible(target: string | Locator): Promise<void> {
    await expect(this.toLocator(target)).toBeVisible();
  }

  /**
   * Asserts that an element is hidden.
   */
  async expectHidden(target: string | Locator): Promise<void> {
    await expect(this.toLocator(target)).toBeHidden();
  }

  /**
   * Asserts that an element contains the expected text.
   */
  async expectText(
    target: string | Locator,
    expected: string
  ): Promise<void> {
    await expect(this.toLocator(target)).toContainText(expected);
  }

  // ---------------- PAGE ACTIONS ----------------

  /**
   * Reloads the current page.
   */
  async refreshPage(): Promise<void> {
    await this.page.reload({
      waitUntil: 'domcontentloaded'
    });
  }

  /**
   * Waits for the DOM to be loaded.
   */
  async waitForPageLoad(): Promise<void> {
    await this.page.waitForLoadState('domcontentloaded');
  }

  /**
   * Pauses execution for Playwright debugging.
   */
  async pause(): Promise<void> {
    await this.page.pause();
  }
}