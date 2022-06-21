const puppeteer = require('puppeteer')

;(async () => {
  const browser = await puppeteer.launch()
  const page = await browser.newPage()
  await page.goto('https://danube-webshop.herokuapp.com')

  const resourceTimingJson = await page.evaluate(() =>
    JSON.stringify(window.performance.getEntriesByType('resource'))
  )

  const resourceTiming = JSON.parse(resourceTimingJson)
  const logoResourceTiming = resourceTiming.find((element) =>
    element.name.includes('.svg')
  )

  console.log(logoResourceTiming)
  // {
  //   name: 'https://danube-webshop.herokuapp.com/static/logo-horizontal.svg',
  //   entryType: 'resource',
  //   startTime: 1126.300000000745,
  //   ...
  // }

  await browser.close()
})()
