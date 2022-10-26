const checklyConfig = require('../checkly.config')

class ChecklySitePage {
  constructor (page) {
    this.page = page
  }

  async goto (uri = '/') {
    await this.page.setViewportSize(checklyConfig.defaultViewPortSize)
    await this.page.goto(checklyConfig.baseURL + uri)
  }

  async screenshot (name) {
    await this.page.screenshot({ path: `./__checks__/screenshots/${name}.jpg` })
  }
}

module.exports = ChecklySitePage
