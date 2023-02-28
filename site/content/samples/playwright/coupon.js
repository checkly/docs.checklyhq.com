import { test, expect } from '@playwright/test'
const productsNumber = process.env.PRODUCTS_NUMBER || 3

test('coupon', async ({ page }) => {
  await page.goto('https://danube-web.shop/')

  for (let i = 1; i <= productsNumber; i++) {
    await page.click(`.preview:nth-child(${i}) > .preview-author`)
    await page.click('.detail-wrapper > .call-to-action')
    await page.click('#logo')
  }

  await page.click('#cart')

  await page.waitForSelector('#total-price')
  const price = await page.$eval('#total-price', (e) => e.innerText)

  await page.click('.cart > label')
  await page.click('#coupon')
  await page.type('#coupon', 'COUPON2020')
  await page.click('.cart > div > button')

  const expectedDiscountedPrice = (await price) * 0.8
  // we use parseFloat to convert the string in the innerText to a floating decimal for comparison
  const discountedPrice = await page.$eval('#total-price', (e) => parseFloat(e.innerText))

  expect(discountedPrice).toEqual(expectedDiscountedPrice)
})
