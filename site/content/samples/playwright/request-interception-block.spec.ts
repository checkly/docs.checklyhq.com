import { test } from '@playwright/test'

test('intercept requests block', async ({ page }) => {
  await page.route('**/*', (route) => {
    return route.request().resourceType() === 'image'
      ? route.abort()
      : route.continue()
  })

  await page.goto('https://danube-web.shop/')
})
