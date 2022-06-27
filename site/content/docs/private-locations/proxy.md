---
title: Using HTTP proxies
weight: 53
menu:
  docs:
    parent: "Private Locations"
---

If you are operating our [Checkly Agent](/docs/private-locations/private-locations-getting-started/) behind an HTTP proxy, 
for example in an enterprise environment, you can use an outgoing proxy for all check traffic. We recommend using the following
setup.

> Note you can also define a proxy for management traffic from your private location to the Checkly API where we ingest
> your telemetry and management events. See [the environment variables available to the Checkly Agent container](/docs/private-locations/checkly-agent-guide/#checkly-agent-environment-variables)

## Setting an HTTP proxy for your Private Location

We recommend storing the URL of your proxy in a [global environment variable](https://app.checklyhq.com/environment-variables)
so you can easily reuse it in your Private Location configuration and checks. In the example below we store it as `PROXY_URL`

![private location proxy url](/docs/images/private-locations/private_location_proxy_url.png)

After this, you can reference this variable using `{{PROXY_URL}}` in the Private Location configuration.

![private location proxy url](/docs/images/private-locations/private_locations_proxy_config.png)

## Using an HTTP proxy with API checks

After setting up the proxy, you can just assign API checks to your Private Location and the API check will start using it
for outgoing traffic.

## Using an HTTP proxy with Browser checks

You can enable your proxy directly in your browser checks via a few extra lines of code, using the `process.env.PROXY_URL` 
notation. For Playwright you can use the `proxy` option when launching a new browser instance. With Puppeteer, you can pass
the URL as a CLI option, but you will have to supply the username and password separately if your proxy is authenticated.

{{< tabs "Proxy Settings" >}}
  {{< tab "Playwright" >}}
```javascript
const { chromium } = require('playwright')

;(async () => {
  const browser = await chromium.launch({
    proxy: {
      server: process.env.PROXY_URL // just reference the global evironment variable.
    }
  })
  const page = await browser.newPage()
  await page.goto('https://google.com')
  await page.close()
  await browser.close()
})()
```
  {{< /tab >}}   
  {{< tab "Puppeteer" >}}
```javascript
const puppeteer = require('puppeteer')

;(async () => {
  const browser = await puppeteer.launch({
    args: ['--proxy-server=123.456.789:3128'] // provide the host and port name here
  })
  const page = await browser.newPage()
  await page.authenticate({ // provide any authentication credentials here
    username: 'username',
    password: 'password',
  })
})()
```
  {{< /tab >}}   
{{< /tabs >}}

This is all that is required for a browser check to proxy all outbound network connections via your designated HTTP proxy. 
For more information, please check out
- The Playwright [networking docs](https://playwright.dev/docs/network#http-proxy) and 
- The Chromium [network settings docs](https://www.chromium.org/developers/design-documents/network-settings/).
