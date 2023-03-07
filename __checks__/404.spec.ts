import { test, expect } from '@playwright/test'
import { ChecklySitePage } from './poms/ChecklySitePage'

test('404', async ({ page }) => {
  const checklyPage = new ChecklySitePage(page)
  await checklyPage.goto('/does-not-exist')
  await checklyPage.screenshot('404')

  expect(await page.title()).toEqual('404 Page not found | Checkly')
  expect(await page.locator('.main h1').innerText()).toContain('404')
  expect(await page.locator('.main h3').innerText()).toContain('Whoops, that page does not exist!')
})
