import { test } from '@playwright/test'

test('file upload', async ({ page }) => {
  await page.goto('https://danube-web.shop/')

  await page.click('#login')

  await page.type('#n-email', process.env.USER_EMAIL)
  await page.type('#n-password2', process.env.USER_PASSWORD)
  await page.getByRole('button', { name: 'Sign In' }).click()

  await page.locator('#account').click()

  await page.locator('input[type="file"]').setInputFiles(process.env.FILE_PATH)
  await page.getByRole('button', { name: 'Upload' }).click()

  await page.getByText('Upload successful.')
})
