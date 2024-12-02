import { test, expect } from '@playwright/test'
import * as fs from 'fs'

test('file download alternative', async ({ page }) => {
  await page.goto('https://danube-web.shop/')

  await page.getByRole('button', { name: 'Log in' }).click()
  await page.getByPlaceholder('Email').fill(process.env.USER_EMAIL)
  await page.getByPlaceholder('Password').fill(process.env.USER_PASSWORD)
  await page.getByRole('button', { name: 'Sign In' }).click()
  await page.locator('#account').click()

  const downloadPromise = page.waitForEvent('download')
  await page.getByRole('link', { name: 'Invoice' }).click()
  const download = await downloadPromise

  await download.saveAs('/path/to/save/at/' + download.suggestedFilename())

  const path = await download.path()
  const newFile = await fs.readFileSync(path)
  const testFile = await fs.readFileSync('fixtures/testfile.pdf')

  expect(newFile.equals(testFile)).toBe(true)
})
