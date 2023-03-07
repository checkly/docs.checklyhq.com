import { test, expect } from '@playwright/test'
import { ChecklySitePage } from './poms/ChecklySitePage'

test('pricing', async ({ page }) => {
  const checklyPage = new ChecklySitePage(page)
  await checklyPage.goto('/pricing')
  await checklyPage.screenshot('pricing')

  expect(await page.title()).toEqual('Pricing | Checkly')
  await page.locator('[data-test="pricing-free-signup"]').click()
  await page.waitForNavigation({ url: 'https://auth.checklyhq.com/**' })

  await checklyPage.screenshot('signup')
})
