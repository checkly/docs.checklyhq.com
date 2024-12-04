import { test } from '@playwright/test'

test('Google login', async ({ page }) => {
  await page.goto('https://stackoverflow.com/users/login')

  await page.getByRole('button', { name: 'Log in with Google' }).click()
  await page.getByLabel('Email or phone').fill(process.env.GOOGLE_USER)
  await page.getByRole('button', { name: 'Next' }).click()

  await page.getByLabel('Enter your password').fill(process.env.GOOGLE_PWD)
  await page.getByRole('button', { name: 'Next' }).click()
  await page.getByRole('button', { name: 'Continue' }).click()
})
