import { test, expect } from '@playwright/test'

test('signup flow', async ({ page }) => {
  await page.goto('https://danube-web.shop/')
  const bookList = [
    'The Foreigner',
    'The Transformation',
    'For Whom the Ball Tells',
    'Baiting for Robot'
  ]

  await page.click('.topbar > input')
  await page.type('.topbar > input', 'for')
  await page.click('#button-search')

  await page.waitForSelector(
    '.shop-content > ul > .preview:nth-child(1) > .preview-title'
  )

  // Halt immediately if results do not equal expected number
  const resultsNumber = (await page.$$('.preview-title')).length
  // assert.equal(resultsNumber, bookList.length)
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

  expect(bookList.length).toEqual(0)
})
