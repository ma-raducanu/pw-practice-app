import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('https://playground.bondaracademy.com/');
});

test.describe('Form Layouts page', () => {

  test.beforeEach(async ({ page }) => {
    await page.getByRole('link', { name: 'Forms' }).click();
    await page.getByRole('link', { name: 'Form Layouts' }).click();
  });

  test('Input fields', async ({ page }) => {
    const usingTheGridEmailInput = page.locator('nb-card', { hasText: 'Using the Grid' }).getByRole('textbox', { name: 'Email' });
    await usingTheGridEmailInput.fill('test@example.com'); // fill does not require click or clear, it replaces the existing value automatically
    await usingTheGridEmailInput.clear();
    await usingTheGridEmailInput.pressSequentially('test@example.com', { delay: 5_00 }); // simulate typing with a delay between each keypress
    const inputValue = await usingTheGridEmailInput.inputValue(); // use this method to extract the value
    await expect(usingTheGridEmailInput).toHaveValue('test@example.com');
    await expect(usingTheGridEmailInput).toHaveValue(/example.com/); // use regex for partial match
  });

  test('Radio buttons', async ({ page }) => {
    const usingTheGridForm = page.locator('nb-card', { hasText: 'Using the Grid' });
    await usingTheGridForm.getByLabel('Option 1').check({ force: true }); // force check the radio button even if it is not visible; it will also disable playwright auto-waiting (actionability test)
    await usingTheGridForm.getByRole('radio', { name: 'Option 2' }).check({ force: true });
    await expect(usingTheGridForm.getByRole('radio', { name: 'Option 2' })).toBeChecked();
    await expect(usingTheGridForm.getByRole('radio', { name: 'Option 1' })).not.toBeChecked();
  });
});