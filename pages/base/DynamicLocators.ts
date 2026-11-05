import {Page, Locator} from '@playwright/test';


export class DynamicLocators {
  constructor(private readonly page: Page) {
  }


  /**
   * Replaces placeholders in a locator string with given parameters.
   * Supports:
   *  - {param} for the first parameter
   *  - {param1}, {param2}, ... for additional ones
   *
   * Enforces at least one param, and validates placeholder count.
   *
   * @param template - Locator string with placeholders
   * @param firstParam - Required first parameter
   * @param restParams - Optional additional parameters
   * @returns Locator with placeholders replaced
   */
  getDynamicLocator(template: string, firstParam: string, ...restParams: string[]): Locator {
    // Collect all params
    const allParams = [firstParam, ...restParams];

    // Count how many placeholders exist
    const placeholderMatches = [...template.matchAll(/\{param(?:\d*)\}/g)];
    const expectedCount = placeholderMatches.length;

    if (expectedCount === 0) {
      throw new Error('No placeholders found in template: ${template}');
    }

    if (allParams.length < expectedCount) {
      throw new Error('Not enough parameters provided for template. Expected ${expectedCount}, received ${allParams.length}');
    }

    if (allParams.length > expectedCount) {
      throw new Error('Too many parameters provided for template. Expected ${expectedCount}, received ${allParams.length}');
    }

    // Replace placeholders with values
    let finalLocator = template;
    placeholderMatches.forEach((match, i) => {
      const placeholder = match[0];
      finalLocator = finalLocator.replace(placeholder, allParams[i]);
    });

    return this.page.locator(finalLocator);
  }

  /**
   * Resolves a dynamic selector string by replacing placeholders without returning a Locator.
   * Useful when you need a raw string selector.
   *
   * @param template - A selector template with {param}, {param1}, etc.
   * @param params - Values to replace in the template.
   * @returns A resolved selector string.
   */
  getDynamicSelector(template: string, ...params: string[]): string {
    let result = template;
    params.forEach((val, i) => {
      const placeholder = i === 0 ? '{param}' : '{param${i}}';
      result = result.replace(placeholder, val);
    });
    return result;
  }

}