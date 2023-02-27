import { test, expect } from '@playwright/test'

test('login flow', async ({ page }) => {
  await page.goto('https://danube-web.shop/')

  await page.click('#login')

  await page.type('#n-email', process.env.USER_EMAIL)

  await page.type('#n-password2', process.env.USER_PASSWORD)

  await page.click('#goto-signin-btn')

  const loginMessage = await page.locator('#login-message')
  await expect(loginMessage).toBeVisible()
})
