import { test, expect } from '@playwright/test'

test('visual regression', async ({ page }) => {
  await page.goto('https://danube-web.shop/')
  const screenshot = await page.screenshot()
  expect(screenshot).toMatchSnapshot('danube-web-shop.png')
})
