---
title: HTTP Proxy
weight: 53
menu:
  docs:
    parent: "Private Locations"
---

If you are operating our [Checkly Agent](/docs/private-locations/private-locations-getting-started/) behind an HTTP proxy, for example in an enterprise environment, you can use the `proxy` option when instantiating Playwright in your browser checks.

For example, at the start of a **Playwright-based** browser check, you can pass an options object with the proxy configuration.

```javascript
const { chromium } = require('playwright')

async function run () {
  const browser = await chromium.launch({
    proxy: {
      server: 'http://proxy.server:3128',
      username: 'usr',
      password: 'pwd'
    }
  });
  const page = await browser.newPage()
  await page.goto('https://google.com')
}

run()
```

This is all that is required for Playwright to proxy all outbound network connections via your designated HTTP proxy. For more information, please check out the [Playwright docs](https://playwright.dev/docs/network#http-proxy).
