const { test, expect } = require('@playwright/test')
const axios = require('axios')
const fs = require('fs')

test('file download', async ({ page }) => {
  await page.goto('https://danube-web.shop/')

  await page.getByRole('button', { name: 'Log in' }).click()
  await page.getByPlaceholder('Email').fill(process.env.USER_EMAIL)
  await page.getByPlaceholder('Password').fill(process.env.USER_PASSWORD)
  await page.getByRole('button', { name: 'Sign In' }).click()
  await page.locator('#account').click()

  const link = await page.getByRole('link', { name: 'Invoice' })
  const downloadUrl = await link.evaluateHandle(el => el.href)
  const response = await axios.get(downloadUrl)
  const newFile = Buffer.from(response.data)
  const testFile = fs.readFileSync('fixtures/testfile.pdf')

  expect(newFile.equals(testFile)).toBe(true)
})
