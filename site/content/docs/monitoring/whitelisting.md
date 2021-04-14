---
title: Whitelisting & filtering traffic
weight: 6
menu:
  docs:
    parent: "Monitoring"
---

Whitelisting Checkly traffic in your firewall or load balancer by IP address is not possible at this moment as Checkly uses a non-static set of IP addresses in the cloud to run its checks.

This is a feature we want to implement so expect changes on this topic in the future.

You can however fetch a list of the [dynamic IP addresses](https://docs.aws.amazon.com/general/latest/gr/aws-ip-ranges.html) in use at AWS, our cloud provider.

## Filtering Google Analytics

If you want to filter Checkly traffic in Google Analytics because Checkly browser checks are skewing your 
numbers, here is one way how to do it:

1. Ad a UTM source tag to the URL's your requesting, i.e.

{{< tabs "Goto example" >}}
{{< tab "Puppeteer" >}}
```js
await page.goto('https://app.checklyhq.com/login?utm_source=monitoring')
 ```
{{< /tab >}}
{{< tab "Playwright" >}}
```js
await page.goto('https://app.checklyhq.com/login?utm_source=monitoring')
 ```
{{< /tab >}}
{{< /tabs >}}

2. In Google Analytics, filter on campaign source.

![filter google analytics traffic on campaign source](/docs/images/monitoring/analytics.png)


For detailed instructions, see [the Google Analytics docs on custom filters](https://support.google.com/analytics/answer/1033162#CustomFilters).

 > Note, it will take some hours for this to take effect.

## Cloudflare Whitelisting

If you are using Cloudflare, one or more of your automated checks might trigger its [bot detection mechanism](https://www.cloudflare.com/learning/bots/what-is-bot-traffic/). 

If you want to prevent that from happening, without exposing your website to any and all automated traffic, you might want to set up a new [firewall rule](https://developers.cloudflare.com/firewall/cf-firewall-rules/) allowing traffic from Checkly as long as it contains a specific header or sets a certain user agent.

You can make the header and/or user agent specific to your own Checkly user account by grabbing the first eight digits of your unique user ID, which you can find below your account name on the [Account Settings page](https://app.checklyhq.com/account/). Embedding this value in your checks will enable them to be allowed through by your firewall rules.

### Whitelisting API checks

To whitelist API checks, allow traffic that contains a cookie in the shape of `Cookie: "checkly-account:<UUID>"`, with `<UUID>` being your shortened Checkly ID. 

You can then [set the Cookie header](https://checklyhq.com/docs/api-checks/request-settings/#headers) while editing your check.

### Whitelisting browser checks

To whitelist browser checks, allow traffic with user agent containing `Checkly/<UUID>`, with `<UUID>` being your shortened Checkly ID. 

You will then be able to set up the matching user agent in your browser checks using 
Puppeteer's [setUserAgent method](https://pptr.dev/#?product=Puppeteer&version=v2.0.0&show=api-pagesetuseragentuseragent),
or the `{userAgent}` option passed to Playwright's [newPage method](https://playwright.dev/#version=v1.4.0&path=docs%2Fapi.md&q=browsernewpageoptions--options-useragent).  

{{< tabs "User agent example" >}}
{{< tab "Puppeteer" >}}
```js
const puppeteer = require('puppeteer')
const browser = await puppeteer.launch()
const page = await browser.newPage()

const userAgent = 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.108 Safari/537.36 Checkly/abcd1234'
await page.setUserAgent(userAgent);
```
{{< /tab >}}
{{< tab "Playwright" >}}
```js
const playwright = require('playwright')
const browser = await playwright.chromium.launch()

const userAgent = 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.108 Safari/537.36 Checkly/abcd1234'
const page = await browser.newPage({userAgent})
```
{{< /tab >}}
{{< /tabs >}}
