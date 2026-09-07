import { test as base } from '@playwright/test';
import { PageManager } from '../page-objects/page-manager';

type FixtureTypes = {
  pageManager: PageManager;
};

export const test = base.extend<FixtureTypes>({
  pageManager: async ({ page }, use) => {
    await page.goto('/');
    await use(new PageManager(page));
  }
});

export { expect } from '@playwright/test';