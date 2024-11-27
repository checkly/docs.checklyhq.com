import { test, expect } from '@playwright/test'

test('Sign up', async ({ page }) => {
  await page.goto('https://danube-web.shop/')

  await page.getByRole('button', { name: 'Sign up' }).click()
  await page.getByPlaceholder('Name', { exact: true }).fill('John')
  await page.getByPlaceholder('Surname').fill('Doe')
  await page.getByPlaceholder('Email').fill('user@email.com')
  await page.getByPlaceholder('Password').fill('supersecure1')

  await page.getByPlaceholder('Company (optional)').fill('Test Inc.')
  await page.getByLabel('Myself').check()
  await page.getByLabel('I would like to receive').check()
  await page.getByLabel('I have read and accept the').check()

  await page.getByRole('button', { name: 'Register' }).click()
  await expect(page.getByText('Welcome back, user@email.com')).toBeVisible()
})
