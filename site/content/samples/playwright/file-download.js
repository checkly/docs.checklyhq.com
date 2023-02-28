import { test, expect } from '@playwright/test'
const fs = require('fs')
const axios = require('axios')

test('file download', async ({ page }) => {
  await page.goto('https://danube-web.shop/')

  await page.click('#login')

  await page.type('#n-email', process.env.USER_EMAIL)
  await page.type('#n-password2', process.env.USER_PASSWORD)
  await page.getByRole('button', { name: 'Sign In' }).click()

  await page.locator('#account').click()

  const url = await page.$eval('#orders > ul > li > a', (el) => el.href)
  const filePath = './tests/fixtures/downloadedFile.pdf'
  // Download the file using Axios
  const response = await axios({
    method: 'get',
    url: url,
    responseType: 'stream'
  })
  const writer = fs.createWriteStream(filePath)
  response.data.pipe(writer)

  // Handle if writing passes or failes
  await new Promise((resolve, reject) => {
    writer.on('finish', resolve)
    writer.on('error', reject)
  })

  // Compare the downloaded file to the existing file using Playwright/Test
  const downloadedFile = await page.locator('input[type=file]').inputValue(filePath)
  const existingFile = await page
    .locator('input[type=file]')
    .inputValue(process.env.TEST_FILE_PATH)

  expect(downloadedFile).toEqual(existingFile)
})
