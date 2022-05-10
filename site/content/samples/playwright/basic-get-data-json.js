const { chromium } = require('playwright')
const fs = require('fs')

;(async () => {
  const browser = await chromium.launch()
  const page = await browser.newPage()
  await page.goto('https://danube-webshop.herokuapp.com')
  const content = await page.evaluate(() => {
    const data = []

    const books = document.querySelectorAll('.preview')
    books.forEach((book) => {
      const title = book.querySelector('.preview-title').innerText
      const author = book.querySelector('.preview-author').innerText
      const price = book.querySelector('.preview-price').innerText
      data.push({
        title,
        author,
        price
      })
    })
    return data
  })

  const jsonData = JSON.stringify(content)
  fs.writeFileSync('books.json', jsonData)
  await browser.close()
})()
