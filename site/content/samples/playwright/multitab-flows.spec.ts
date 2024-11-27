import { test } from '@playwright/test'

test('open multiple tabs', async ({ browser }) => {
  const context = await browser.newContext()
  const page = await context.newPage()

  await page.goto('https://www.checklyhq.com/docs/')

  const [newPage] = await Promise.all([
    context.waitForEvent('page'),
    await page.getByRole('link', { name: 'Checkly on Youtube' }).click()
  ])

  await page.screenshot({ path: 'screenshot-tab-old.png' })
  await newPage.screenshot({ path: 'screenshot-tab-new.png' })

  await browser.close()
})
