const { chromium } = require('playwright')

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

;(async () => {
  const browser = await chromium.launch()
  const page = await browser.newPage()

  await page.route('https://danube-web.shop//api/books', (route) =>
    route.fulfill({
      contentType: 'application/json',
      body: JSON.stringify(mockResponseObject)
    })
  )

  await page.goto('https://danube-web.shop//')

  await page.screenshot({ path: 'screenshot.png' })

  await browser.close()
})()
