const { test } = require('@playwright/test')

test('basic performance navigation', async ({ page }) => {
  await page.goto('https://danube-web.shop/')

  const navigationTimingJson = await page.evaluate(() =>
    JSON.stringify(performance.getEntriesByType('navigation'))
  )

  const navigationTiming = JSON.parse(navigationTimingJson)
  console.log(navigationTiming)
})
