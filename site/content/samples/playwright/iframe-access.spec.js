const { test } = require('@playwright/test')

test('access iframe content', async ({ page }) => {
  await page.goto('https://your-page-with-an-iframe.com')
  const header = await page.frameLocator('iframe').locator('h1')
  console.log(await header.innerText())
})
