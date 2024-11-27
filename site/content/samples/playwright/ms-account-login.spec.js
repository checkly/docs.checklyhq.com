const { test } = require('@playwright/test')

test('test', async ({ page }) => {
  await page.goto('https://login.microsoftonline.com/')

  await page.getByRole('heading', { name: 'Sign in' }).click()
  await page.getByPlaceholder('Email address, phone number').fill(process.env.MS_USERNAME)
  await page.getByRole('button', { name: 'Next' }).click()

  await page.getByTestId('i0118').fill(process.env.MS_PASSWORD)
  await page.getByTestId('textButtonContainer').getByRole('button', { name: 'Sign in' }).click()
  await page.getByTestId('checkboxField').check()
  await page.getByLabel('Stay signed in?').click()
})
