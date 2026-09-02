import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('https://playground.bondaracademy.com/');
});

test.describe('Form navigation tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.getByRole('link', { name: 'Forms' }).click();
  });

  test('Navigate to the Form Layouts page', async ({ page }) => {
    await page.getByRole('link', { name: 'Form Layouts' }).click();
    await expect(page).toHaveURL(/\/pages\/forms\/layouts$/);
  });

  test('Navigate to the Datepicker page', async ({ page }) => {
    await page.getByRole('link', { name: 'Datepicker' }).click();
    await expect(page).toHaveURL(/\/pages\/forms\/datepicker$/);
  });
});

test.describe('Tables & Data navigation tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.getByRole('link', { name: 'Tables & Data' }).click();
  });

  test('Navigate to the Smart Table page', async ({ page }) => {
    await page.getByRole('link', { name: 'Smart Table' }).click();
    await expect(page).toHaveURL(/\/pages\/tables\/smart-table$/);
  });

  test('Navigate to the Tree Grid page', async ({ page }) => {
    await page.getByRole('link', { name: 'Tree Grid' }).click();
    await expect(page).toHaveURL(/\/pages\/tables\/tree-grid$/);
  });
});