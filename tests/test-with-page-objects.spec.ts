import { test } from '@playwright/test';
import { PageManager } from '../page-objects/page-manager';

test.beforeEach(async ({ page }) => {
  await page.goto('https://playground.bondaracademy.com/');
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
  await pageManager.navigateTo.FormLayoutsPage();
  await pageManager.formLayoutsPage.submitUsingTheGridForm('test@example.com', 'Password123', 'Option 1');
  await pageManager.formLayoutsPage.submitInlineForm('John Doe', 'johndoe@example.com', true);
  await pageManager.navigateTo.DatepickerPage();
  await pageManager.datepickerPage.selectCommonDatePickerDateFromToday(100);
  await pageManager.datepickerPage.selectDatePickerWithRangeFromToday(40, 70);
});
