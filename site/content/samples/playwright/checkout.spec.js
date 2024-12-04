const { test } = require('@playwright/test')
const productsNumber = process.env.PRODUCTS_NUMBER || 3

test('checkout', async ({ page }) => {
  await page.goto('https://danube-web.shop/')

  for (let i = 1; i <= productsNumber; i++) {
    await page.click(`.preview:nth-child(${i}) > .preview-author`)
    await page.getByRole('button', { name: 'Add to cart' }).click()
    await page.click('#logo')
  }

  await page.locator('#cart').click()
  await page.getByRole('button', { name: 'Checkout' }).click()

  await page.getByPlaceholder('Name', { exact: true }).fill('Max')
  await page.getByPlaceholder('Surname', { exact: true }).fill('Mustermann')
  await page.getByPlaceholder('Address').fill('Charlottenstr. 57')
  await page.getByPlaceholder('Zipcode').fill('10117')
  await page.getByPlaceholder('City').fill('Berlin')
  await page.getByPlaceholder('Company (optional)').fill('Firma GmbH')
  await page.getByLabel('as soon as possible').check()
  await page.getByRole('button', { name: 'Buy' }).click()
})
