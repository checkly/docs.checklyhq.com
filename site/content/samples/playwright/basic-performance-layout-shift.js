const { chromium } = require('playwright')

;(async () => {
  const browser = await chromium.launch()
  const page = await browser.newPage()
  await page.goto('https://danube-web.shop/')

  const cummulativeLayoutShift = await page.evaluate(() => {
    return new Promise((resolve) => {
      let CLS = 0

      new PerformanceObserver((l) => {
        const entries = l.getEntries()

        entries.forEach(entry => {
          if (!entry.hadRecentInput) {
            CLS += entry.value
          }
        })

        resolve(CLS)
      }).observe({
        type: 'layout-shift',
        buffered: true
      })
    })
  })

  console.log(parseFloat(cummulativeLayoutShift)) // 0.0001672498

  await browser.close()
})()
