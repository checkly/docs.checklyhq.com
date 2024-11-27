import { test } from '@playwright/test'

test('basic performance long task', async ({ page }) => {
  await page.goto('https://danube-web.shop/')

  const totalBlockingTime: number = await page.evaluate(() => {
    return new Promise<number>((resolve) => {
      let totalBlockingTime = 0
      new PerformanceObserver(function (list) {
        const perfEntries = list.getEntries()
        for (const perfEntry of perfEntries) {
          totalBlockingTime += perfEntry.duration - 50
        }
        resolve(totalBlockingTime)
      }).observe({ type: 'longtask', buffered: true })

      // Resolve promise if there haven't been long tasks
      setTimeout(() => resolve(totalBlockingTime), 5000)
    })
  }, 0)

  console.log(parseFloat(totalBlockingTime.toString())) // 0
})
