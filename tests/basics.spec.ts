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
  page.locator('//*[@id="inputEmail1"]'); // avoid XPath if possible
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

test('Locate child elements', async ({ page }) => {
  await page.locator('nb-card').locator('nb-radio-group').locator(':text-is("Option 1")').click();
  await page.locator('nb-card nb-radio-group :text-is("Option 2")').click();
  await page.locator('nb-card').getByRole('button', { name: 'Sign in' }).first().click();
  await page.locator('nb-card').nth(0).getByRole('button').click(); // avoid index if possible
});

test('Locate parent elements', async ({ page }) => {
  await page.locator('nb-card', { hasText: 'Using the Grid' }).getByRole('button').click();
  await page.locator('nb-card', { has: page.locator('#inputEmail1') }).getByRole('button').click();
  await page.locator('nb-card').filter({ hasText: 'Using the Grid' }).getByRole('button').click(); // this is identical to the first example
  await page.locator('nb-card')
    .filter({ has: page.locator('nb-checkbox') })
    .filter({ hasText: 'Sign in' })
    .getByLabel('Email')
    .fill('test@example.com');
  await page.getByText('Using the Grid').locator('..').getByRole('button').click(); // this XPath method allows you to locate the parent element and then interact with its child elements; avoid if possible.
});

test('Reusing locators', async ({ page }) => {
  const basicFormSection = page.locator('nb-card', { hasText: 'Basic form' });
  const emailInput = basicFormSection.getByLabel('Email');
  await emailInput.fill('test@example.com');
  await basicFormSection.getByLabel('Password').fill('Test1234');
  await basicFormSection.locator('nb-checkbox').click();
  await basicFormSection.getByRole('button').click();
  await expect(emailInput).toHaveValue('test@example.com');
});

test('Extracting values', async ({ page }) => {
  // extract text
  const basicFormSection = page.locator('nb-card', { hasText: 'Basic form' });
  const submitButtonText = await basicFormSection.getByRole('button').textContent();
  expect(submitButtonText).toEqual('Submit');
  // extract multiple text values
  const allRadioButtonTextValues = await page.locator('nb-radio').allTextContents(); // useful for arrays and such
  expect(allRadioButtonTextValues).toContain('Option 1');
  // extract input field values
  const emailInput = basicFormSection.getByRole('textbox', { name: 'Email' });
  await emailInput.fill('test@example.com');
  const emailInputValue = await emailInput.inputValue();
  expect(emailInputValue).toEqual('test@example.com');
  // extract attribute value
  const emailInputPlaceholder = await emailInput.getAttribute('placeholder');
  expect(emailInputPlaceholder).toEqual('Email');
});