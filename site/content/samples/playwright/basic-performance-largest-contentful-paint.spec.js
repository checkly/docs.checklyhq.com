const { test } = require('@playwright/test')

test('basic performance largest contentful paint', async ({ page }) => {
  await page.goto('https://danube-web.shop/')

  const largestContentfulPaint = await page.evaluate(() => {
    return new Promise((resolve) => {
      new PerformanceObserver((l) => {
        const entries = l.getEntries()
        // the last entry is the largest contentful paint
        const largestPaintEntry = entries.at(-1)
        resolve(largestPaintEntry.startTime)
      }).observe({
        type: 'largest-contentful-paint',
        buffered: true
      })
    })
  })

  console.log(parseFloat(largestContentfulPaint)) // 1139.39
})
