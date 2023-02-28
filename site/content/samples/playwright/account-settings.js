import { test, expect } from '@playwright/test'

test('account settings', async ({ page }) => {
  await page.goto('https://danube-web.shop/')

  await page.click('#login')
  await page.click('#n-email')

  await page.type('#n-email', process.env.USER_EMAIL)

  await page.type('#n-password2', process.env.USER_PASSWORD)
  await page.click('#goto-signin-btn')

  await page.click('.fa-user')

  await page.waitForSelector('#user-details > div > input')

  await page.getByPlaceholder('Name', { exact: true }).click()
  await page.getByPlaceholder('Name', { exact: true }).fill('John')

  await page.getByRole('button', { name: 'Update' }).click()

  // If there was UI confirmation the below code would be a useful assertion
  const successMessage = await page.locator('#upload-message-succcess')

  await expect(successMessage).toBeVisible()
})
