import type { Page } from '@playwright/test';
import { step } from '../helpers/test-step-decorator';
import { BasePage } from './base-page';

export class FormLayoutsPage extends BasePage {

  constructor(page: Page) {
    super(page);
  }

  @step
  async submitUsingTheGridForm(email: string, password: string, optionText: string): Promise<void> {
    const usingTheGridForm = this.page.locator('nb-card', { hasText: 'Using the Grid' })
    await usingTheGridForm.getByRole('textbox', { name: 'Email' }).fill(email);
    await usingTheGridForm.getByRole('textbox', { name: 'Password' }).fill(password);
    await usingTheGridForm.getByLabel(optionText).check({ force: true });
    await usingTheGridForm.getByRole('button', { name: 'Sign in' }).click();
  }

  /**
   * This method submits the inline form with the provided full name, email, and checkbox option.
   * @param fullName The full name to fill in the inline form.
   * @param email The email address to fill in the inline form.
   * @param checkbox Whether to check the "Remember me" checkbox.
   */
  @step
  async submitInlineForm(fullName: string, email: string, checkbox: boolean): Promise<void> {
    const inlineForm = this.page.locator('nb-card', { hasText: 'Inline form' });
    await inlineForm.getByRole('textbox', { name: 'Jane Doe' }).fill(fullName);
    await inlineForm.getByRole('textbox', { name: 'Email' }).fill(email);
    if (checkbox) {
      await inlineForm.getByRole('checkbox', { name: 'Remember me' }).check({ force: true });
    }
    await inlineForm.getByRole('button', { name: 'Submit' }).click();
  }
}