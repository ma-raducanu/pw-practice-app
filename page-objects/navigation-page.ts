import { Locator, Page } from '@playwright/test';

export class NavigationPage {
  private readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async FormLayoutsPage() {
    await this.expandMenuItemAndSelectSubMenuItem('Forms', 'Form Layouts');
  }

  async DatepickerPage() {
    await this.expandMenuItemAndSelectSubMenuItem('Forms', 'Datepicker');
  }

  async ToastrPage() {
    await this.expandMenuItemAndSelectSubMenuItem('Modal & Overlays', 'Toastr');
  }

  async TooltipPage() {
    await this.expandMenuItemAndSelectSubMenuItem('Modal & Overlays', 'Tooltip');
  }

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