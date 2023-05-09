import { test, expect } from '@playwright/test'
import { ChecklySitePage } from './poms/ChecklySitePage'

test('404', async ({ page }) => {
  const checklyPage = new ChecklySitePage(page)
  await checklyPage.goto('/does-not-exist')
  await checklyPage.screenshot('404')

  expect(await page.title()).toEqual('404 | Checkly')
  expect(await page.locator('.container h1').innerText()).toContain('Page not found')
})
