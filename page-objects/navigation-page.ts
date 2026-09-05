import type { Page } from '@playwright/test';
import { step } from '../helpers/test-step-decorator';

export class NavigationPage {
  private readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  @step
  async FormLayoutsPage() {
    await this.expandMenuItemAndSelectSubMenuItem('Forms', 'Form Layouts');
  }

  @step
  async DatepickerPage() {
    await this.expandMenuItemAndSelectSubMenuItem('Forms', 'Datepicker');
  }

  @step
  async ToastrPage() {
    await this.expandMenuItemAndSelectSubMenuItem('Modal & Overlays', 'Toastr');
  }

  @step
  async TooltipPage() {
    await this.expandMenuItemAndSelectSubMenuItem('Modal & Overlays', 'Tooltip');
  }

  @step
  async SmartTablePage() {
    await this.expandMenuItemAndSelectSubMenuItem('Tables & Data', 'Smart Table');
  }

  private async expandMenuItemAndSelectSubMenuItem(menuItemTitle: string, subMenuItemTitle: string) {
    const menuItem = this.page.getByTitle(menuItemTitle);
    const isExpanded = await menuItem.getAttribute('aria-expanded');
    if (isExpanded == 'false') {
      await menuItem.click();
    }
    await this.page.getByTitle(subMenuItemTitle).click();
  }
}