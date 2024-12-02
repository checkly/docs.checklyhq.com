import { test } from '@playwright/test'

test('basic built-in waiting', async ({ page }) => {
  await page.goto('https://danube-web.shop/')
  await page.getByRole('button', { name: 'Log in' }).click()
  await page.getByPlaceholder('Email').click()
  await page.getByPlaceholder('Email').fill('test@test.com')
})
