const expect = require('expect')
const { goToPage, cleanUp } = require('./_helpers')

async function run () {
  const { page, browser } = await goToPage('/pricing')

  expect(await page.title()).toEqual('Pricing | Checkly')
  await Promise.all([
    page.waitForNavigation(),
    page.locator('[data-test="pricing-free-signup"]').click()
  ])

  expect(page.url()).toContain('https://auth.checklyhq.com/login')

  await cleanUp(page, browser)
}

run()
