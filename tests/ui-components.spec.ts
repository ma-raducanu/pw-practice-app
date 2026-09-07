import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('/');
});

test('Sliders', async ({ page }) => {
  // 1. setting the attribute values
  const tempGauge = page.locator('[tabtitle="Temperature"] ngx-temperature-dragger circle');
  await tempGauge.evaluate(element => {
    element.setAttribute('cx', '232.630');
    element.setAttribute('cy', '232.630');
  });
  await tempGauge.click();
  // 2. using mouse movements
  const tempCard = page.locator('[tabtitle="Temperature"] ngx-temperature-dragger');
  await tempCard.scrollIntoViewIfNeeded();
  const box = await tempCard.boundingBox(); // this creates x and y coordinates for the element
  if (!box) {
    throw new Error('Bounding box not found');
  }
  const x = box.x + box.width / 2;
  const y = box.y + box.height / 2;
  await page.mouse.move(x, y);
  await page.mouse.down();
  await page.mouse.move(x + 100, y); // example: move the mouse 100 pixels to the right
  await page.mouse.move(x + 100, y + 100); // example: move the mouse 100 pixels down as well
  await page.mouse.up(); // release the mouse button after moving
  await expect(tempCard).toContainText('30');
});

test.describe('Forms section', () => {
  test.describe.configure({ retries: 2 }); // retry each test in this describe block up to 2 times, in case of failures
  test.beforeEach(async ({ page }) => {
    await page.getByRole('link', { name: 'Forms' }).click();
  });

  test('Input fields', async ({ page }, testInfo) => {
    if (testInfo.retry) {
      // clean test data etc, for the next attempt
    }
    await page.getByRole('link', { name: 'Form Layouts' }).click();
    const usingTheGridEmailInput = page.locator('nb-card', { hasText: 'Using the Grid' }).getByRole('textbox', { name: 'Email' });
    await usingTheGridEmailInput.fill('test@example.com'); // fill does not require click or clear, it replaces the existing value automatically
    await usingTheGridEmailInput.clear();
    await usingTheGridEmailInput.pressSequentially('test@example.com', { delay: 5_00 }); // simulate typing with a delay between each keypress
    const inputValue = await usingTheGridEmailInput.inputValue(); // use this method to extract the value
    await expect(usingTheGridEmailInput).toHaveValue('test@example.com');
    await expect(usingTheGridEmailInput).toHaveValue(/example.com/); // use regex for partial match
  });

  test('Radio buttons', async ({ page }) => {
    await page.getByRole('link', { name: 'Form Layouts' }).click();
    const usingTheGridForm = page.locator('nb-card', { hasText: 'Using the Grid' });
    await usingTheGridForm.getByLabel('Option 1').check({ force: true }); // force check the radio button even if it is not visible; it will also disable playwright auto-waiting (actionability test)
    await usingTheGridForm.getByRole('radio', { name: 'Option 2' }).check({ force: true });
    await expect(usingTheGridForm.getByRole('radio', { name: 'Option 2' })).toBeChecked();
    await expect(usingTheGridForm.getByRole('radio', { name: 'Option 1' })).not.toBeChecked();
  });

  test('Datepicker', async ({ page }) => {
    await page.getByRole('link', { name: 'Datepicker' }).click();
    const calendarInput = page.getByPlaceholder('Form Picker');
    await calendarInput.click();
    const date = new Date();
    date.setDate(date.getDate() + 500);
    const expectedDay = date.getDate().toString();
    const expectedMonthShort = date.toLocaleString('en-US', { month: 'short' });
    const expectedMonthLong = date.toLocaleString('en-US', { month: 'long' });
    const expectedYear = date.getFullYear().toString();
    const expectedDate = `${expectedMonthShort} ${expectedDay}, ${expectedYear}`;
    let currentMonthAndYear = await page.locator('nb-calendar-view-mode').textContent();
    const expectedMonthAndYear = `${expectedMonthLong} ${expectedYear}`;
    while (!currentMonthAndYear?.includes(expectedMonthAndYear)) {
      await page.locator('button.next-month').click();
      currentMonthAndYear = await page.locator('nb-calendar-view-mode').textContent();
    }
    await page.locator('.day-cell:not(.bounding-month)').getByText(expectedDay, { exact: true }).click(); // use :not to isolate the current month; use exact: true to match the exact text
    await expect(calendarInput).toHaveValue(expectedDate);
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

  test('iFrames', async ({ page }) => {
    await page.getByRole('link', { name: 'Dialog' }).click();
    const iframeDialog = page.frameLocator('iframe');
    await iframeDialog.getByRole('button', { name: 'Open Dialog with esc close' }).click();
  });
});

test('Drag & Drop', async ({ page }) => {
  await page.getByRole('link', { name: 'Extra Components' }).click();
  await page.getByRole('link', { name: 'Drag & Drop' }).click();
  // 1.
  await page.getByText('Clean my room').dragTo(page.locator('#drop-list'));
  // 2.
  await page.getByText('Get groceries').hover();
  await page.mouse.down();
  await page.locator('#drop-list').hover();
  await page.mouse.up();
});

test.describe('Tables & Data section', () => {
  test.beforeEach(async ({ page }) => {
    await page.getByRole('link', { name: 'Tables & Data' }).click();
    await page.getByRole('link', { name: 'Smart Table' }).click();
  });

  test('Dialog boxes', async ({ page }) => {
    page.on('dialog', dialog => { // this will apply to all dialog boxes that will appear in the test, so you only need to call it once; it also needs to declared before the action that triggers the dialog
      expect(dialog.message()).toEqual('Are you sure you want to delete?');
      dialog.accept();
    });
    const tableRowDeleteButton = page.locator('tr', { hasText: 'mdo@gmail.com' }).locator('.nb-trash');
    await tableRowDeleteButton.click();
    await expect(tableRowDeleteButton).not.toBeVisible();
  });

  test('Web tables', async ({ page }) => {
    // 1. select row by any visible text
    const tableRowByEmail = page.getByRole('row', { name: 'twitter@outlook.com' });
    await tableRowByEmail.locator('.nb-edit').click();
    await tableRowByEmail.getByPlaceholder('Age').fill('35');
    await tableRowByEmail.locator('.nb-checkmark').click();
    await expect(tableRowByEmail.locator('td').last()).toHaveText('35');
    // 2. select row by a specific column value
    const tableRowById = page.getByRole('row').filter({ has: page.getByRole('cell').nth(1).getByText('10') });
    await tableRowById.locator('.nb-edit').click(); // the table row will shift into edit mode and the cells become inputs, rather than plain text, so you need to use a different root for those inputs
    await page.locator('tbody').getByPlaceholder('E-mail').fill('test@example.com');
    await page.locator('tbody').locator('.nb-checkmark').click();
    await expect(tableRowById.locator('td').nth(5)).toHaveText('test@example.com');
    // 3. loop through table rows
    const ages = ['20', '30', '40', '200'];
    for (const age of ages) {
      await page.getByPlaceholder('Age').fill(age);
      if (age === '200') {
        await expect(page.locator('tbody')).toContainText('No data found');
      } else {
        await expect(page.locator('tbody tr').first().locator('td').last()).toHaveText(age) // in real scenarios, you can use api responses as smart waits
        const allTableRows = await page.locator('tbody tr').all();
        for (let row of allTableRows) {
          await expect(row.locator('td').last()).toHaveText(age);
        }
      }
    }
  });
});