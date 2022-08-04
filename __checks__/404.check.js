const expect = require('expect')
const { goToPage, screenshot, cleanUp } = require('./_helpers')

async function run () {
  const { page, browser } = await goToPage('/does-not-exist')

  expect(await page.title()).toEqual('404 Page not found | Checkly')
  expect(await page.locator('.main h1').innerText()).toContain('404')
  expect(await page.locator('.main h3').innerText()).toContain('Whoops, that page does not exist!')

  await screenshot(page, '404')
  await cleanUp(page, browser)
}

run()
