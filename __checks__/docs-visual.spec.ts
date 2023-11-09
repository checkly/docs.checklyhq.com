import { test } from '@playwright/test'
import { ChecklySitePage } from './poms/ChecklySitePage'

test('homepage visual comparison', async ({ page }) => {
  const checklyPage = new ChecklySitePage(page)
  await checklyPage.goto('/docs')
  await checklyPage.doScreenshotCompare()
})
