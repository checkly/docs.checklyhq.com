const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch()
  const page = await browser.newPage()
  await page.goto('https://checklyhq.com/learn/headless')
  await page.pdf({ path: 'checkly.pdf' })
  await browser.close()
})()
