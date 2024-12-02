const { test } = require('@playwright/test')

test('basic performance paint timing', async ({ page }) => {
  await page.goto('https://danube-web.shop/')

  const paintTimingJson = await page.evaluate(() =>
    JSON.stringify(window.performance.getEntriesByType('paint'))
  )
  const paintTiming = JSON.parse(paintTimingJson)
  console.log(paintTiming)
})
