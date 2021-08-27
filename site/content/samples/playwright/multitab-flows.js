const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch()
  const context = await browser.newContext()
  const page = await context.newPage()

  await page.goto('https://www.checklyhq.com/')

  const [newPage] = await Promise.all([
    context.waitForEvent('page'),
    await page.click('text=Public roadmap')
  ])

  await page.screenshot({ path: 'screenshot-tab-old.png' })

  await newPage.click('#pull-requests-tab')
  await newPage.screenshot({ path: 'screenshot-tab-new.png' })

  await browser.close()
})()
