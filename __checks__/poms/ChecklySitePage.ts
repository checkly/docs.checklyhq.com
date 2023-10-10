import type { BrowserContext, Page } from '@playwright/test'
import { defaults } from '../defaults'

export class ChecklySitePage {
  public page: Page

  constructor (page) {
    this.page = page
  }

  async goto (uri = '/') {
    // block linkedin pixel as it can hang
    await this.page.route(/.*px\.ads\.linkedin.*/, (route) => {
      route.abort();
    });
    await this.page.setViewportSize(defaults.playwright.viewportSize)
    await this.page.goto(defaults.baseURL + uri)
  }

  async screenshot (name) {
    await this.page.screenshot({ path: `${defaults.screenshotPath}/${name}.jpg` })
  }
}
