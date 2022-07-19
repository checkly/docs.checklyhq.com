const puppeteer = require('puppeteer')

;(async () => {
  const browser = await puppeteer.launch()
  const page = await browser.newPage()
  await page.goto('https://danube-web.shop/')
  await page.click('#cart')
  await browser.close()
})()
