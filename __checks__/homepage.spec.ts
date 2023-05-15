import { test, expect } from '@playwright/test'
import { ChecklySitePage } from './poms/ChecklySitePage'

test('homepage', async ({ page }) => {
  await page.route('https://alb.reddit.com/*', async route => {
    console.log('https://alb.reddit.com')
    await route.abort()
  })
  const checklyPage = new ChecklySitePage(page)
  const response = await checklyPage.goto('/')

  await checklyPage.screenshot('homepage')

  expect(response?.status()).toBeLessThan(399)
})
