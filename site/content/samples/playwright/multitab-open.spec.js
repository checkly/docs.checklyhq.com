const { test } = require('@playwright/test')

test('open multiple tabs', async ({ browser }) => {
  const context = await browser.newContext()

  const pageOne = await context.newPage()
  const pageTwo = await context.newPage()

  await pageOne.goto('https://www.checklyhq.com/')
  await pageTwo.goto('https://playwright.dev/')

  await pageOne.screenshot({ path: 'screenshot-tab-one.png' })
  await pageTwo.screenshot({ path: 'screenshot-tab-two.png' })

  await browser.close()
})
