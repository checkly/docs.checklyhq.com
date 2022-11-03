const { test, expect } = require('@playwright/test')
const ChecklySitePage = require('./ChecklySitePage')

test('homepage', async ({ page }) => {
  const checklyPage = new ChecklySitePage(page)
  await checklyPage.goto()
  await checklyPage.screenshot('homepage')
  expect(await page.title()).toEqual('Delightful Active Monitoring for Developers')
})
