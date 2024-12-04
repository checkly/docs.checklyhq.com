import { test } from '@playwright/test'

test('take a screenshot', async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 800 })
  await page.goto('https://danube-web.shop/')
  await page.screenshot({ path: 'my_screenshot.png' })
})
