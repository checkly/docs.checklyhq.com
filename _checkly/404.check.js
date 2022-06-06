const expect = require('expect')
const { chromium } = require('playwright')

async function run () {
  const browser = await chromium.launch()
  const page = await browser.newPage()

  const baseUrl = process.env.ENVIRONMENT_URL || 'https://checklyhq.com'
  const targetUrl = baseUrl + '/broken_link-anything'
  console.log('Visiting', targetUrl)
  await page.goto(targetUrl)
  const title = await page.title()

  await page.screenshot({ path: 'checkly.png', fullPage: true })

  const titleContent = await page.$eval('h1', (el) => el.innerText)
  const subtitleContent = await page.$eval('h3', (el) => el.innerText)

  expect(title).toContain('Checkly')
  expect(titleContent).toEqual('404')
  expect(subtitleContent).toEqual('Whoops, that page does not exist!')
  await page.close({ runBeforeUnload: true })
  await browser.close()
}

run()
