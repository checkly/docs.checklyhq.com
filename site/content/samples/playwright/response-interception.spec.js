const { test } = require('@playwright/test')

test('intercept response', async ({ page }) => {
  const mockResponseObject = [
    {
      id: 1,
      title: 'How to Mock a Response',
      author: 'A. Friend',
      genre: 'business',
      price: '0.00',
      rating: '★★★★★',
      stock: 65535
    }
  ]

  await page.route('https://danube-web.shop/api/books', (route) =>
    route.fulfill({
      contentType: 'application/json',
      body: JSON.stringify(mockResponseObject)
    })
  )

  await page.goto('https://danube-web.shop/')
  await page.screenshot({ path: 'screenshot.png' })
})
