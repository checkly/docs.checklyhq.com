const { chromium } = require('playwright')

;(async () => {
  const browser = await chromium.launch()
  const context = await browser.newContext()
  const page = await context.newPage()

  await page.goto('https://your-page-with-an-iframe.com')

  const header = await page.frameLocator('iframe').locator('h1')
  console.log(await header.innerText())

  await browser.close()
})()
