import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('https://playground.bondaracademy.com/');
  await page.getByRole('link', { name: 'Forms' }).click();
  await page.getByRole('link', { name: 'Form Layouts' }).click();
});

test.skip('Locator syntax rules', async ({ page }) => {
  // by tag
  page.locator('input');
  // by id
  page.locator('#inputEmail1');
  // by class
  page.locator('.input-full-width');
  // by attribute
  page.locator('[placeholder="Email"]');
  // by full class value
  page.locator('[class="input-full-width size-medium status-basic shape-rectangle nb-transition"]');
  // by multiple selectors
  page.locator('input[placeholder="Email"][nbinput].shape-rectangle'); // no space between selectors means they are sibling attributes
  // by XPath
  page.locator('//*[@id="inputEmail1"]'); // always avoid XPath if possible
  // by partial text match
  page.locator(':text("Using")');
  // by exact text match
  page.locator(':text-is("Using the Grid")');
});

test('User-facing locators', async ({ page }) => {
  // by role
  await page.getByRole('button', { name: 'Sign in' }).first().click();
  await page.getByRole('textbox', { name: 'Email' }).first().fill('test@example.com');
  // by label
  await page.getByLabel('Email').first().fill('test@example.com');
  // by placeholder
  await page.getByPlaceholder('Jane Doe').fill('John Doe');
  // by text
  await page.getByText('Submit').first().click();
  // by TestId
  await page.getByTestId('inputEmail1').fill('test@example.com');
  // by title
  await page.getByTitle('IoT Dashboard').click();
});