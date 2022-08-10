const expect = require('expect')
const { goToPage, screenshot, cleanUp } = require('./_helpers')

async function run () {
  const { page, browser } = await goToPage('/docs')

  expect(await page.title()).toEqual('Checkly documentation | Checkly')

  await screenshot(page, 'docs')
  await cleanUp(page, browser)
}

run()
