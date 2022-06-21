const expect = require('expect')
const { chromium } = require('playwright')

async function run () {
  const browser = await chromium.launch()
  const page = await browser.newPage()

  const baseUrl = process.env.ENVIRONMENT_URL || 'https://checklyhq.com'
  const targetUrl = baseUrl + '/product/api-monitoring/'
  await page.goto(targetUrl)
  const title = await page.title()

  await page.screenshot({ path: 'api.png' })

  expect(title).toContain('API Monitoring | Checkly')
  await page.close()
  await browser.close()
}

run()
