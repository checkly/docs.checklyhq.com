import type { Page } from '@playwright/test'
import { expect } from '@playwright/test'
import { defaults } from '../defaults'

export class ChecklySitePage {
  public page: Page

  constructor (page: Page) {
    this.page = page
  }

  async goto (uri = '/') {
    // block linkedin pixel as it can hang
    await this.page.route(/.*px\.ads\.linkedin.*/, (route) => {
      route.abort();
    });
    await this.page.setViewportSize(defaults.playwright.viewportSize)
    return await this.page.goto(defaults.baseURL + uri)
  }

  async screenshot (name: string) {
    await this.page.screenshot({ path: `${defaults.screenshotPath}/${name}.jpg` })
  }

  async doScreenshotCompare () {
    await expect(this.page).toHaveScreenshot({
      maxDiffPixelRatio: 0.2,
      mask: [
        this.page.locator('.optanon-alert-box-wrapper'),
        this.page.locator('#intercom-container-body')
      ]
    })
  }
}
