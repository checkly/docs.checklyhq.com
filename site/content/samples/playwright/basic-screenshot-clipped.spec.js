const { test } = require('@playwright/test')

test('take a clipped screenshot', async ({ page }) => {
  const options = {
    path: 'clipped_screenshot.png',
    fullPage: false,
    clip: {
      x: 5,
      y: 60,
      width: 240,
      height: 40
    }
  }

  await page.setViewportSize({ width: 1280, height: 800 })
  await page.goto('https://danube-web.shop/')
  await page.screenshot(options)
})
