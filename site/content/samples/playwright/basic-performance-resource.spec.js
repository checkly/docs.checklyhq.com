const { test } = require('@playwright/test')

test('basic performance resource', async ({ page }) => {
  await page.goto('https://danube-web.shop/')

  const resourceTimingJson = await page.evaluate(() =>
    JSON.stringify(window.performance.getEntriesByType('resource'))
  )

  const resourceTiming = JSON.parse(resourceTimingJson)
  const logoResourceTiming = resourceTiming.find((element) =>
    element.name.includes('.svg')
  )

  console.log(logoResourceTiming)
})
