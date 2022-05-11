const puppeteer = require('puppeteer')
;(async () => {
  const browser = await puppeteer.launch()

  const pageOne = await browser.newPage()
  const pageTwo = await browser.newPage()

  await pageOne.goto('https://www.checklyhq.com/')
  await pageTwo.goto('https://playwright.dev/')

  await pageOne.screenshot({ path: 'screenshot-tab-one.png' })
  await pageTwo.screenshot({ path: 'screenshot-tab-two.png' })

  await browser.close()
})()
