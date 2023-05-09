import { test, expect } from '@playwright/test'
import { ChecklySitePage } from './poms/ChecklySitePage'

test('pricing', async ({ page, context }) => {
  const checklyPage = new ChecklySitePage(page)
  await checklyPage.goto('/pricing')
  await checklyPage.screenshot('pricing')

  expect(await page.title()).toEqual('Checkly pricing plans')

  // Last is required because otherwise this resolves to two links, one in the free plan
  // card and another one in the navbar
  await page.getByRole('link', { name: 'Start for free' }).last().click()

  // Waiting for click above to open window in new tab
  const newTabPage = await context.waitForEvent('page')

  expect(newTabPage.url()).toContain('app.checklyhq.com/signup')
  await checklyPage.screenshot('signup')
})
