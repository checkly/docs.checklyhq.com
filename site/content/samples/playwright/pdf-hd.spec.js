const { test } = require('@playwright/test')
const fs = require('fs')

test('generate pdf with header and footer', async ({ page, browser }) => {
  const templateHeader = fs.readFileSync('template-header.html', 'utf-8')
  const templateFooter = fs.readFileSync('template-footer.html', 'utf-8')

  await page.goto('https://checklyhq.com/learn/headless')

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
})
