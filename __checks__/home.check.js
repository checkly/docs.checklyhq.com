const expect = require('expect')
const { goToPage, screenshot, cleanUp } = require('./_helpers')

async function run () {
  const { page, browser } = await goToPage('/')

  expect(await page.title()).toEqual('Delightful Active Monitoring for Developers')

  await screenshot(page, 'home')
  await cleanUp(page, browser)
}

run()
