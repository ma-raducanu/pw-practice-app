import { test } from '@playwright/test';
import { PageManager } from '../page-objects/page-manager';
import { faker } from '@faker-js/faker';

test.beforeEach(async ({ page }) => {
  await page.goto('/');
});

test('Navigate to form layouts page', async ({ page }) => {
  const pageManager = new PageManager(page);
  await pageManager.navigateTo.FormLayoutsPage();
  await pageManager.navigateTo.DatepickerPage();
  await pageManager.navigateTo.ToastrPage();
  await pageManager.navigateTo.TooltipPage();
  await pageManager.navigateTo.SmartTablePage();
});

test('Parametrized page object methods', async ({ page }) => {
  const pageManager = new PageManager(page);
  const fakeFullName = faker.person.fullName();
  const fakeEmail = faker.internet.email({ provider: 'test.com' });
  // const fakePassword = faker.internet.password();
  await pageManager.navigateTo.FormLayoutsPage();
  await page.screenshot({ path: 'screenshots/form-layouts-page.png' });
  await pageManager.formLayoutsPage.submitUsingTheGridForm(process.env.TEST_USER_EMAIL!, process.env.TEST_USER_PASSWORD!, 'Option 1');
  await pageManager.formLayoutsPage.submitInlineForm(fakeFullName, fakeEmail, true);
  await pageManager.navigateTo.DatepickerPage();
  await pageManager.datepickerPage.selectCommonDatePickerDateFromToday(100);
  await pageManager.datepickerPage.selectDatePickerWithRangeFromToday(40, 70);
});
