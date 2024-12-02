const { test } = require('@playwright/test')

test('basic navigation', async ({ page }) => {
  await page.goto('https://danube-web.shop/')
  await page.click('#cart')
})
