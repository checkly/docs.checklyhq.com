import { test, expect } from '@playwright/test'
import { ChecklySitePage } from './poms/ChecklySitePage.js'

test('homepage', async ({ page }) => {
  const checklyPage = new ChecklySitePage(page)
  await checklyPage.goto('/docs')
  await checklyPage.screenshot('docs')
  expect(await page.title()).toEqual('Getting started with Checkly - Checkly Docs')
})
