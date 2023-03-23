import { test, expect } from '@playwright/test'
const fs = require('fs')

test('file download', async ({ page }) => {
  await page.goto('https://danube-web.shop/')

  await page.click('#login')

  await page.type('#n-email', process.env.USER_EMAIL)
  await page.type('#n-password2', process.env.USER_PASSWORD)
  await page.click('#goto-signin-btn')

  await page.click('#account')
  page.locator('#orders > ul > li:nth-child(1) > a')

  const downloadPromise = page.waitForEvent('download')
  await page.getByRole('link', { name: 'Invoice' }).click()
  const download = downloadPromise
  const newFilePath = await download.path()

  const testFile = await fs.promises.readFile(process.env.TEST_FILE_PATH)
  const newFile = await fs.promises.readFile(newFilePath)

  expect(testFile).toEqual(newFile)
})
