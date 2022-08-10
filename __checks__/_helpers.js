const { chromium } = require('playwright')
const checklyConfig = require('../checkly.config.js')

async function goToPage (path) {
  const browser = await chromium.launch({ headless: checklyConfig.headless })
  const context = await browser.newContext()
  const page = await context.newPage()
  await page.setViewportSize(checklyConfig.defaultViewPortSize)
  await page.goto(checklyConfig.baseURL + path)
  console.log(`Visiting: ${checklyConfig.baseURL + path}`)

  return { page, browser }
}

function screenshot (page, name) {
  return page.screenshot({ path: `./__checks__/screenshots/${name}.jpg` })
}

async function cleanUp (page, browser) {
  await page.close()
  await browser.close()
}

module.exports = {
  goToPage,
  screenshot,
  cleanUp
}
