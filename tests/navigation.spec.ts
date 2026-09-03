import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('https://playground.bondaracademy.com/');
});

test.describe('Navigate to the Forms section', () => {
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

test.describe('Navigate to the Modal & Overlays section', () => {
  test.beforeEach(async ({ page }) => {
    await page.getByRole('link', { name: 'Modal & Overlays' }).click();
  });

  test('Navigate to the Dialog page', async ({ page }) => {
    await page.getByRole('link', { name: 'Dialog' }).click();
    await expect(page).toHaveURL(/\/pages\/modal-overlays\/dialog$/);
  });

  test('Navigate to the Window page', async ({ page }) => {
    await page.getByRole('link', { name: 'Window' }).click();
    await expect(page).toHaveURL(/\/pages\/modal-overlays\/window$/);
  });

  test('Navigate to the Popover page', async ({ page }) => {
    await page.getByRole('link', { name: 'Popover' }).click();
    await expect(page).toHaveURL(/\/pages\/modal-overlays\/popover$/);
  });

  test('Navigate to the Toastr page', async ({ page }) => {
    await page.getByRole('link', { name: 'Toastr' }).click();
    await expect(page).toHaveURL(/\/pages\/modal-overlays\/toastr$/);
  });

  test('Navigate to the Tooltip page', async ({ page }) => {
    await page.getByRole('link', { name: 'Tooltip' }).click();
    await expect(page).toHaveURL(/\/pages\/modal-overlays\/tooltip$/);
  });
});

test.describe('Navigate to the Extra Components section', () => {
  test.beforeEach(async ({ page }) => {
    await page.getByRole('link', { name: 'Extra Components' }).click();
  });

  test('Navigate to the Calendar page', async ({ page }) => {
    await page.getByRole('link', { name: 'Calendar' }).click();
    await expect(page).toHaveURL(/\/pages\/extra-components\/calendar$/);
  });

  test('Navigate to the Drag & Drop page', async ({ page }) => {
    await page.getByRole('link', { name: 'Drag & Drop' }).click();
    await expect(page).toHaveURL(/\/pages\/extra-components\/drag-drop$/);
  });

  test('Navigate to the PDF Download page', async ({ page }) => {
    await page.getByRole('link', { name: 'PDF Download' }).click();
    await expect(page).toHaveURL(/\/pages\/extra-components\/pdf-download$/);
  });
});

test.describe('Navigate to the Charts section', () => {
  test.beforeEach(async ({ page }) => {
    await page.getByRole('link', { name: 'Charts', exact: true }).click();
  });

  test('Navigate to the Echarts page', async ({ page }) => {
    await page.getByRole('link', { name: 'Echarts' }).click();
    await expect(page).toHaveURL(/\/pages\/charts\/echarts$/);
  });
});

test.describe('Navigate to the Tables & Data section', () => {
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

test.describe('Navigate to the Auth section', () => {
  test.beforeEach(async ({ page }) => {
    await page.getByRole('link', { name: 'Auth' }).click();
  });

  test('Navigate to the Login page', async ({ page }) => {
    await page.getByRole('link', { name: 'Login' }).click();
    await expect(page).toHaveURL(/\/auth\/login$/);
  });

  test('Navigate to the Register page', async ({ page }) => {
    await page.getByRole('link', { name: 'Register' }).click();
    await expect(page).toHaveURL(/\/auth\/register$/);
  });

  test('Navigate to the Request Password page', async ({ page }) => {
    await page.getByRole('link', { name: 'Request Password' }).click();
    await expect(page).toHaveURL(/\/auth\/request-password$/);
  });

  test('Navigate to the Reset Password page', async ({ page }) => {
    await page.getByRole('link', { name: 'Reset Password' }).click();
    await expect(page).toHaveURL(/\/auth\/reset-password$/);
  });
});