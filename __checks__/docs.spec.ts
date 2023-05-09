import { test, expect } from '@playwright/test'
import { ChecklySitePage } from './poms/ChecklySitePage'

test('homepage', async ({ page }) => {
  const checklyPage = new ChecklySitePage(page)
  await checklyPage.goto()
  await checklyPage.screenshot('homepage')
  expect(await page.title()).toEqual('Build and Run Synthetics That Scale')
})
