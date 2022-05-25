---
title: HTTP Proxy
weight: 53
menu:
  docs:
    parent: "Private Locations"
---

If you are operating our [Checkly Agent](/docs/private-locations/private-locations-getting-started/) behind an HTTP proxy, for example in an enterprise environment, you can enable this directly in your browser checks via a few extra lines of code. For Playwright you can use the `proxy` option when launching a new browser instance. With Puppeteer, you can pass a CLI argument to Chromium itself.

{{< tabs "Proxy Settings" >}}
  {{< tab "Playwright" >}}
```javascript
const { chromium } = require('playwright')

(async () {
  const browser = await chromium.launch({
    proxy: {
      server: 'http://proxy.server:8080'
    }
  });
  const page = await browser.newPage()
  await page.goto('https://google.com')
})()
```
  {{< /tab >}}   
  {{< tab "Puppeteer" >}}
```javascript
const puppeteer = require('puppeteer')

(async () => {
  const browser = await puppeteer.launch({
    args: ['--proxy-server=http://proxy.server:8080']
  })
  const page = await browser.newPage()
  await page.goto('https://google.com')
  await browser.close()
})()
```
  {{< /tab >}}   
{{< /tabs >}}   

This is all that is required for a browser check to proxy all outbound network connections via your designated HTTP proxy. For more information, please check out the Playwright [networking docs](https://playwright.dev/docs/network#http-proxy) and the Chromium [network settings docs](https://www.chromium.org/developers/design-documents/network-settings/).
