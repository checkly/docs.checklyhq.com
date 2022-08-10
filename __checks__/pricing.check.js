const expect = require('expect')
const { goToPage, cleanUp } = require('./_helpers')

async function run () {
  const { page, browser } = await goToPage('/pricing')

  expect(await page.title()).toEqual('Pricing | Checkly')
  await Promise.all([
    page.waitForNavigation({ url: 'https://auth.checklyhq.com/**' }),
    page.locator('[data-test="pricing-free-signup"]').click()
  ])

  await cleanUp(page, browser)
}

run()
