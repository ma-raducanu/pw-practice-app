import type { Page } from '@playwright/test';
import { expect } from '@playwright/test';
import { step } from '../helpers/test-step-decorator';

export class DatepickerPage {
  private readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  @step
  async selectCommonDatePickerDateFromToday(daysFromToday: number) {
    const calendarInput = this.page.getByPlaceholder('Form Picker');
    await calendarInput.click();
    const expectedDate = await this.selectDateInCalendar(daysFromToday);
    await expect(calendarInput).toHaveValue(expectedDate);
  }

  @step
  async selectDatePickerWithRangeFromToday(daysFromTodayStart: number, daysFromTodayEnd: number) {
    const calendarInput = this.page.getByPlaceholder('Range Picker');
    await calendarInput.click();
    const expectedDateStart = await this.selectDateInCalendar(daysFromTodayStart);
    const expectedDateEnd = await this.selectDateInCalendar(daysFromTodayEnd);
    await expect(calendarInput).toHaveValue(`${expectedDateStart} - ${expectedDateEnd}`);
  }

  private async selectDateInCalendar(daysFromToday: number) {
    const date = new Date();
    date.setDate(date.getDate() + daysFromToday);
    const expectedDay = date.getDate().toString();
    const expectedMonthShort = date.toLocaleString('en-US', { month: 'short' });
    const expectedMonthLong = date.toLocaleString('en-US', { month: 'long' });
    const expectedYear = date.getFullYear().toString();
    const expectedDate = `${expectedMonthShort} ${expectedDay}, ${expectedYear}`;
    let currentMonthAndYear = await this.page.locator('nb-calendar-view-mode').textContent();
    const expectedMonthAndYear = `${expectedMonthLong} ${expectedYear}`;
    while (!currentMonthAndYear?.includes(expectedMonthAndYear)) {
      await this.page.locator('button.next-month').click();
      currentMonthAndYear = await this.page.locator('nb-calendar-view-mode').textContent();
    }
    await this.page.locator('.day-cell:not(.bounding-month)').getByText(expectedDay, { exact: true }).click();
    return expectedDate;
  }
}