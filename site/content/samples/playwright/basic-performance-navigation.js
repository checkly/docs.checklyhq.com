const { chromium } = require('playwright')

;(async () => {
  const browser = await chromium.launch()
  const page = await browser.newPage()
  await page.goto('https://danube-web.shop/')

  const navigationTimingJson = await page.evaluate(() =>
    JSON.stringify(performance.getEntriesByType('navigation'))
  )
  const navigationTiming = JSON.parse(navigationTimingJson)

  console.log(navigationTiming)

  await browser.close()
})()
