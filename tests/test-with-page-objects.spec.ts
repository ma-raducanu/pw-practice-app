import { test, expect } from '@playwright/test';
import { NavigationPage } from '../page-objects/navigation-page';
import { FormLayoutsPage } from '../page-objects/form-layouts-page';

test.beforeEach(async ({ page }) => {
  await page.goto('https://playground.bondaracademy.com/');
});

test('Navigate to form layouts page', async ({ page }) => {
  const navigateTo = new NavigationPage(page);
  await navigateTo.FormLayoutsPage();
  await navigateTo.DatepickerPage();
  await navigateTo.ToastrPage();
  await navigateTo.TooltipPage();
  await navigateTo.SmartTablePage();
});

test('Parametrizen page object methods', async ({ page }) => {
  const navigationPage = new NavigationPage(page);
  await navigationPage.FormLayoutsPage();
  const onFormLayoutsPage = new FormLayoutsPage(page);
  await onFormLayoutsPage.submitUsingTheGridForm('test@example.com', 'Password123', 'Option 1');
  await onFormLayoutsPage.submitInlineForm('John Doe', 'johndoe@example.com', true);
});
