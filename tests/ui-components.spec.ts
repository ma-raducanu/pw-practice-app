import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('https://playground.bondaracademy.com/');
});

test.describe('Forms section', () => {
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

test.describe('Modal & Overlays section', () => {
  test.beforeEach(async ({ page }) => {
    await page.getByRole('link', { name: 'Modal & Overlays' }).click();
  });

  test('Checkboxes', async ({ page }) => {
    await page.getByRole('link', { name: 'Toastr' }).click();
    await page.getByRole('checkbox', { name: 'Hide on click' }).check({ force: true }); // check only checks the box if it isn't already checked
    await page.getByRole('checkbox', { name: 'Hide on click' }).uncheck({ force: true });
    await page.getByRole('checkbox', { name: 'Hide on click' }).click({ force: true }); // click checks the box regardless of its current state
    const allCheckboxes = page.getByRole('checkbox');
    for (const checkbox of await allCheckboxes.all()) {
      await checkbox.check({ force: true });
      await expect(checkbox).toBeChecked();
    }
  });

  test('Lists and dropdowns', async ({ page }) => {
    await page.getByRole('link', { name: 'Toastr' }).click();
    // 1. standard dropdown
    const toastTypeDropdown = page.locator('.form-group', { hasText: 'Toast type' }).getByRole('combobox');
    await toastTypeDropdown.selectOption('info');
    await expect(toastTypeDropdown).toHaveValue('info');
    // 2. custom dropdown
    const positionDropdown = page.locator('.form-group', { hasText: 'Position' }).locator('nb-select');
    await positionDropdown.click();
    await page.getByRole('list').getByText('bottom-end').click();
    // await page.locator('nb-option', { hasText: 'bottom-end' }).click();
    await expect(positionDropdown).toHaveText('bottom-end');
    // looping thorugh the list
    await positionDropdown.click();
    const allListValues = await page.locator('nb-option').allTextContents();
    for (const listValue of allListValues) {
      await page.locator('nb-option', { hasText: listValue }).click();
      await expect(positionDropdown).toHaveText(listValue);
      await positionDropdown.click();
    }
  });

  test('Tooltips', async ({ page }) => {
    await page.getByRole('link', { name: 'Tooltip' }).click();
    await page.getByRole('button', { name: 'Top' }).hover();
    await expect(page.getByRole('tooltip')).toHaveText('This is a tooltip');
  });
});

test('Dialog boxes', async ({ page }) => {
  await page.getByRole('link', { name: 'Tables & Data' }).click();
  await page.getByRole('link', { name: 'Smart Table' }).click();
  page.on('dialog', dialog => { // this will apply to all dialog boxes that will appear in the test, so you only need to call it once; it also needs to declared before the action that triggers the dialog
    expect(dialog.message()).toEqual('Are you sure you want to delete?');
    dialog.accept();
  });
  const tableRowDeleteButton = page.locator('tr', { hasText: 'mdo@gmail.com' }).locator('.nb-trash');
  await tableRowDeleteButton.click();
  await expect(tableRowDeleteButton).not.toBeVisible();
});