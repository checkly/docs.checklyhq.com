const { chromium } = require('playwright')
const fs = require('fs');

(async () => {
  const browser = await chromium.launch()
  const page = await browser.newPage()

  const navigationPromise = page.waitForNavigation()

  const templateHeader = fs.readFileSync('template-header.html', 'utf-8')
  const templateFooter = fs.readFileSync('template-footer.html', 'utf-8')

  await page.goto('https://checklyhq.com/learn/headless')

  await navigationPromise

  await page.pdf({
    path: 'checkly.pdf',
    displayHeaderFooter: true,
    headerTemplate: templateHeader,
    footerTemplate: templateFooter,
    margin: {
      top: '100px',
      bottom: '40px'
    },
    printBackground: true
  })

  await browser.close()
})()
