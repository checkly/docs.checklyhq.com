import { test, expect } from '@playwright/test'

test('file upload', async ({ page }) => {
  await page.goto('https://danube-web.shop/')

  await page.getByRole('button', { name: 'Log in' }).click()
  await page.getByPlaceholder('Email').fill(process.env.USER_EMAIL)
  await page.getByPlaceholder('Password').fill(process.env.USER_PASSWORD)
  await page.getByRole('button', { name: 'Sign In' }).click()
  await page.locator('#account').click()

  const handle = await page.$('input[type="file"]')
  await handle.setInputFiles(process.env.FILE_PATH)

  await page.getByRole('button', { name: 'Upload' }).click()
  await expect(page.getByText('Upload successful.')).toBeVisible()
})
