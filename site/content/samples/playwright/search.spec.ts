import { test, expect } from '@playwright/test'

test('search', async ({ page }) => {
  const bookList = [
    'The Foreigner',
    'The Transformation',
    'For Whom the Ball Tells',
    'Baiting for Robot'
  ]

  await page.goto('https://danube-web.shop/')

  await page.getByRole('textbox').click()
  await page.getByRole('textbox').fill('for')
  await page.getByRole('button', { name: 'Search' }).click()

  await page.waitForSelector(
    '.shop-content > ul > .preview:nth-child(1) > .preview-title'
  )

  // Halt immediately if results do not equal expected number
  const resultsNumber = (await page.$$('.preview-title')).length
  expect(resultsNumber).toEqual(bookList.length)

  // Remove every element found from the original array...
  for (let i = 0; i < resultsNumber; i++) {
    const resultTitle = await page.$eval(
      `.preview:nth-child(${i + 1}) > .preview-title`,
      (e) => e.innerText
    )

    const index = bookList.indexOf(resultTitle)
    bookList.splice(index, 1)
  }

  // ...then assert that the original array is now empty
  expect(bookList.length).toEqual(0)
})
