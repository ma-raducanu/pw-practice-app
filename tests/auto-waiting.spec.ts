import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('https://playground.bondaracademy.com/');
  await page.getByRole('link', { name: 'Modal & Overlays' }).click();
  await page.getByRole('link', { name: 'Dialog' }).click();
});

test.skip('Auto-waiting', async ({ page }) => {
  const dialogWithDelayForm = page.locator('nb-card', { hasText: 'Dialog with delay' });
  await dialogWithDelayForm.getByRole('button', { name: '3 seconds' }).click();
  const dialogContainer = page.locator('nb-dialog-container');
  const dialogContainerHeaderText = await dialogContainer.locator('nb-card-header').allTextContents();
  expect(dialogContainerHeaderText).toContain('Friendly reminder'); // this will fail as it will not wait for the dialog container to appear
});

test('Alternative wait', async ({ page }) => {
  const dialogWithDelayForm = page.locator('nb-card', { hasText: 'Dialog with delay' });
  await dialogWithDelayForm.getByRole('button', { name: '3 seconds' }).click();
  const dialogContainer = page.locator('nb-dialog-container');
  const dialogContainerHeader = dialogContainer.locator('nb-card-header');
  // 1. wait for the dialog container to appear
  // await dialogContainer.waitFor();
  // await page.waitForSelector('nb-dialog-container');
  // 2. wait for the API response
  // await page.waitForResponse('**/delay/*')
  // 3. wait for the load state, not recommended
  // await page.waitForLoadState('networkidle');
  // 4. hard wait, not recommended, ever
  // await page.waitForTimeout(3500);
  // const dialogHeaderText = await dialogContainer.locator('nb-card-header').allTextContents();
  // expect(dialogHeaderText).toContain('Friendly reminder');
  await expect(dialogContainerHeader).toHaveText('Friendly reminder', { timeout: 5_000 }); // locator assertions are the best option
});

test('Timeouts', async ({ page }) => {
  // test.setTimeout(120_000);
  test.slow(); // increases the default test time by 3x
  const dialogWithDelayForm = page.locator('nb-card', { hasText: 'Dialog with delay' });
  await dialogWithDelayForm.getByRole('button', { name: '3 seconds' }).click();
  const dialogContainer = page.locator('nb-dialog-container');
  await dialogContainer.getByRole('button', { name: 'Ok' }).click({ timeout: 5_000 });
});