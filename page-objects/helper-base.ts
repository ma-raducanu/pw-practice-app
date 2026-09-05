import type { Page } from '@playwright/test';

export class HelperBase {
  protected readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  protected async getToastrMessage(): Promise<string> {
    return "I'm a toastr message";
  }
}