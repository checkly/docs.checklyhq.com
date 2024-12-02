import { test } from '@playwright/test'

test('generate pdf', async ({ page }) => {
  await page.goto('https://checklyhq.com/learn/playwright')
  await page.pdf({ path: 'checkly.pdf' })
})
