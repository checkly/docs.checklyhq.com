import { test, expect } from '@playwright/test'
import { ChecklySitePage } from './poms/ChecklySitePage'

test('homepage', async ({ page }) => {
  const checklyPage = new ChecklySitePage(page)
  const response = await checklyPage.goto('/docs')
  expect(response?.status()).toBe(200)
})
