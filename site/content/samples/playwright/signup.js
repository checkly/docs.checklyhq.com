import { test, expect } from '@playwright/test'

test('signup flow', async ({ page }) => {
  await page.goto('https://danube-web.shop/')

  await page.click('#signup')
  await page.click('#s-name')

  await page.type('#s-name', 'John')
  await page.type('#s-surname', 'Doe')
  await page.type('#s-email', process.env.USER_EMAIL)
  await page.type('#s-password2', process.env.USER_PASSWORD)
  await page.type('#s-company', 'John Doe Inc.')

  await page.click('#business')
  await page.click('#marketing-agreement')
  await page.click('#privacy-policy')
  await page.click('#register-btn')

  const loginMessage = await page.locator('#login-message')

  await expect(loginMessage).toBeVisible()
})
