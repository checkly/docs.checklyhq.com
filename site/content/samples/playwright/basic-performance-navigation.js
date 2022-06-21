const { chromium } = require('playwright')

;(async () => {
  const browser = await chromium.launch()
  const page = await browser.newPage()
  await page.goto('https://danube-webshop.herokuapp.com')

  const navigationTimingJson = await page.evaluate(() =>
    JSON.stringify(performance.getEntriesByType('navigation'))
  )
  const navigationTiming = JSON.parse(navigationTimingJson)

  console.log(navigationTiming)
  // [{
  //   name: 'https://danube-webshop.herokuapp.com/',
  //   entryType: 'navigation',
  //   startTime: 0,
  //   duration: 1243.7999999998137,
  //   initiatorType: 'navigation',
  //   nextHopProtocol: 'http/1.1',
  //   ...
  // }]

  await browser.close()
})()
