const puppeteer = require('puppeteer');
(async () => {
  const browser = await puppeteer.launch()
  const page = await browser.newPage()

  await page.setViewport({ width: 1440, height: 800 })

  await page.goto('https://www.checklyhq.com/')

  const pageTarget = page.target()

  await page.waitForSelector('#menu_5_drop > li:nth-child(3) > a')
  await page.click('#menu_5_drop > li:nth-child(3) > a')

  await page.screenshot({ path: 'screenshot-tab-old.png' })

  const newTarget = await browser.waitForTarget(target => target.opener() === pageTarget)

  const newPage = await newTarget.page()

  await newPage.waitForSelector('#pull-requests-tab')
  await newPage.click('#pull-requests-tab')
  await newPage.screenshot({ path: 'screenshot-tab-new.png' })

  await browser.close()
})()
