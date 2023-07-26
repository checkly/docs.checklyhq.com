---
title: Using HTTP proxies
weight: 56
menu:
  resources:
    parent: "Private Locations"
cli: true
---

If you are operating our [Checkly Agent](/docs/private-locations/private-locations-getting-started/) behind an HTTP proxy, 
for example in an enterprise environment, you can use an outgoing proxy for all check traffic. We recommend using the following
setup.

{{< info >}}
Note you can also define a proxy for management traffic from your private location to the Checkly API where we ingest
your telemetry and management events. See [the environment variables available to the Checkly Agent container](/docs/private-locations/checkly-agent-guide/#checkly-agent-environment-variables)
{{< /info >}}

## Setting an HTTP proxy for your Private Location

We recommend storing the URL of your proxy in a [global environment variable](https://app.checklyhq.com/environment-variables)
so you can easily reuse it in your Private Location configuration and checks. In the example below we store it as `PROXY_URL`

![private location proxy url](/docs/images/private-locations/private_location_proxy_url.png)

After this, you can reference this variable using `{{PROXY_URL}}` in the Private Location configuration.

![private location proxy url](/docs/images/private-locations/private_locations_proxy_config.png)

## Using an HTTP proxy with API checks

With the setup complete, any API check which uses that Private Location will automatically inherit the proxy configuration
for outgoing traffic.

## Using an HTTP proxy with Browser checks

You can enable your proxy directly in your browser checks via a few extra lines of code, using the `process.env.PROXY_URL` 
notation and Playwright Test's `test.use()` method:

{{< tabs "Proxy Settings" >}}
  {{< tab "TypeScript" >}}
```typescript
import { test } from '@playwright/test'

test.use({
  proxy: {
    server: process.env.PROXY_URL
  }
})

test('Go to google.com', async ({ page }) => {
  await page.goto('https://google.com')
})
```
  {{< /tab >}}   
  {{< tab "JavaScript" >}}
```javascript
const { test } = require('@playwright/test')

test.use({
  proxy: {
    server: process.env.PROXY_URL
  }
})

test('Go to google.com', async ({ page }) => {
  await page.goto('https://google.com')
})
```
  {{< /tab >}}   
{{< /tabs >}}

This is all that is required for a browser check to proxy all outbound network connections via your designated HTTP proxy. 
Check out both the Playwright [networking docs](https://playwright.dev/docs/network#http-proxy) and the Chromium [network settings docs](https://www.chromium.org/developers/design-documents/network-settings/) for some more information.
