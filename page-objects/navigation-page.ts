import type { Page } from '@playwright/test';
import { step } from '../helpers/test-step-decorator';
import { HelperBase } from './helper-base';

export class NavigationPage extends HelperBase {

  constructor(page: Page) {
    super(page);
  }

  @step
  async FormLayoutsPage(): Promise<void> {
    await this.expandMenuItemAndSelectSubMenuItem('Forms', 'Form Layouts');
  }

  @step
  async DatepickerPage(): Promise<void> {
    await this.expandMenuItemAndSelectSubMenuItem('Forms', 'Datepicker');
  }

  @step
  async ToastrPage(): Promise<void> {
    await this.expandMenuItemAndSelectSubMenuItem('Modal & Overlays', 'Toastr');
  }

  @step
  async TooltipPage(): Promise<void> {
    await this.expandMenuItemAndSelectSubMenuItem('Modal & Overlays', 'Tooltip');
  }

  @step
  async SmartTablePage(): Promise<void> {
    await this.expandMenuItemAndSelectSubMenuItem('Tables & Data', 'Smart Table');
  }

  private async expandMenuItemAndSelectSubMenuItem(menuItemTitle: string, subMenuItemTitle: string): Promise<void> {
    const menuItem = this.page.getByTitle(menuItemTitle);
    const isExpanded = await menuItem.getAttribute('aria-expanded');
    if (isExpanded == 'false') {
      await menuItem.click();
    }
    await this.page.getByTitle(subMenuItemTitle).click();
  }
}