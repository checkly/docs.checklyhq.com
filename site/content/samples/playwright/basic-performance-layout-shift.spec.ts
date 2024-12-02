import { test } from '@playwright/test'

test('basic performance layout shift', async ({ page }) => {
  await page.goto('https://danube-web.shop/')

  const cummulativeLayoutShift: string = await page.evaluate(() => {
    return new Promise((resolve) => {
      let CLS = 0

      new PerformanceObserver((l) => {
        const entries = l.getEntries()

        entries.forEach(entry => {
          if (!entry.hadRecentInput) {
            CLS += entry.value
          }
        })

        resolve(CLS.toString())
      }).observe({
        type: 'layout-shift',
        buffered: true
      })
    })
  }, '0')

  console.log(parseFloat(cummulativeLayoutShift)) // 0.0001672498
})
