import { test, expect } from '@playwright/test'

test('Login', async ({ page }) => {
  await page.goto('https://danube-web.shop/')

  await page.getByRole('button', { name: 'Log in' }).click()
  await page.getByPlaceholder('Email').fill(process.env.USER_EMAIL)
  await page.getByPlaceholder('Password').fill(process.env.USER_PASSWORD)
  await page.getByRole('button', { name: 'Sign In' }).click()

  await expect(page.getByText('Welcome back, user@email.com')).toBeVisible()
})
