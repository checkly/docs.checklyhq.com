const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch()
  const page = await browser.newPage()
  await page.goto('https://checklyhq.com/learn/headless')
  await page.pdf({ path: 'checkly.pdf' })
  await browser.close()
})()
