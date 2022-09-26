const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch()
  const page = await browser.newPage()
  await page.goto('https://your-page-with-an-iframe.com')

  const iframeHandle = await page.$('iframe')
  const iframe = await iframeHandle.contentFrame()
  const heading = await iframe.$('h1')

  console.log(await heading.evaluate((el) => el.innerText))

  await browser.close()
})()
