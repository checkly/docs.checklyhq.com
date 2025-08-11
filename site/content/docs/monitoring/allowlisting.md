---
title: Allowlisting & filtering traffic - Checkly Docs
displayTitle: Allowlisting & filtering traffic  
navTitle: Allowlisting traffic
weight: 6
menu:
  platform:
    parent: "Monitoring"
aliases:
- "/docs/monitoring/whitelisting"
---

There are cases in which you might have to allowlist Checkly traffic in your firewall, load balancer or other to prevent it from being blocked or skewing analytics data. Below are some solutions to help you achieve that.

## IP range allowlisting

All of Checkly's monitoring traffic comes from a fixed source of IP addresses. Allowlisting Checkly traffic by IP address is possible by configuring your network to only allow traffic from these IPs.

To get the current list of IP addresses, you can use the following endpoints ([API spec](https://api.checklyhq.com/#/Static%20IPs)):

1. A JSON array of all IPv4s currently used

```bash
curl https://api.checklyhq.com/v1/static-ips
```

2. A JSON object with regions as keys and arrays of all IPv4s of that region as the value

```bash
curl https://api.checklyhq.com/v1/static-ips-by-region
````

3. A simple txt file. One IPv4 per line.

```bash
curl https://api.checklyhq.com/v1/static-ips.txt
```

4. A JSON array of all IPv6s currently used

```bash
curl https://api.checklyhq.com/v1/static-ipv6s
```

5. A JSON object with regions as keys and arrays of all IPv6s of that region as the value

```bash
curl https://api.checklyhq.com/v1/static-ipv6s-by-region
```

6. A simple txt file. One IPv6 per line.

```bash
curl https://api.checklyhq.com/v1/static-ipv6s.txt
```

We update this list very infrequently (6 months or less) so querying it with at reasonable frequency is recommended.

## Header/user agent allowlisting

If you are using Cloudflare or a similar provider, one or more of your automated checks might trigger a [bot detection mechanism](https://www.cloudflare.com/learning/bots/what-is-bot-traffic/).

If you want to prevent that from happening without exposing your website to any and all automated traffic, you might want to set up a new [firewall rule](https://developers.cloudflare.com/firewall/cf-firewall-rules/) allowing traffic from Checkly as long as it contains a specific header or sets a certain user agent.

You can make the header and/or user agent specific to your own Checkly user account by grabbing the first eight digits of your unique user ID (or another fixed value of your choice), which you can find below your account name on the [Account Settings page](https://app.checklyhq.com/settings/account/). Embedding this value in your checks will enable them to be allowed through by your firewall rules.

### Allowlisting API checks using headers

To allowlist API checks, allow traffic that contains a cookie in the shape of `Cookie: "checkly-account:<UUID>"`, with `<UUID>` being your shortened Checkly ID or other chosen value.

You can then [set the Cookie header](/docs/api-checks/request-settings/#headers) while editing your check.

> You can set the header at group-level using [API check defaults](/docs/groups/api-check-defaults/#headers--query-parameters) to have it applied to every API check in the group.

### Allowlisting browser checks with user agents

To allowlist browser checks, allow traffic with user agent containing `Checkly/<UUID>`, with `<UUID>` being your shortened Checkly ID or another chosen value.

You will then be able to set up the matching user agent in your browser checks using Playwright's [`userAgent`](https://playwright.dev/docs/emulation#user-agent) property.

{{< tabs "User agent example" >}}
{{< tab "Typescript" >}}
```ts {title="user-agent.spec.ts"}
import { test } from '@playwright/test'

const myUserAgent = 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.108 Safari/537.36 Checkly/abcd1234'

test.use({ userAgent: myUserAgent })

test('my user agent test', async ({ page }) => {
  // ...
})
```
{{< /tab >}}
{{< tab "JavaScript" >}}
```js {title="user-agent.spec.js"}
const { test } = require('@playwright/test')

const myUserAgent = 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.108 Safari/537.36 Checkly/abcd1234'

test.use({ userAgent: myUserAgent })

test('my user agent test', async ({ page }) => {
  // ...
})
```
{{< /tab >}}
{{< /tabs >}}

## Filtering Google Analytics

You might want to filter Checkly traffic in Google Analytics to prevent Checkly browser checks from skewing your results.

If you are using Google Analytics 4 or newer, Checkly traffic is [already being excluded](https://support.google.com/analytics/answer/9888366?hl=en) as it is recognized as coming from a known bot-traffic source.

### Older Google Analytics versions

If you want to filter Checkly traffic in older Google Analytics versions, here is one way to do it:

1. Add a UTM source tag to the URLs your requesting, i.e.:

```js
await page.goto('https://app.checklyhq.com/login?utm_source=monitoring')
 ```

2. In Google Analytics, filter on campaign source.

![filter google analytics traffic on campaign source](/docs/images/monitoring/analytics.png)

For detailed instructions, see [the Google Analytics docs on custom filters](https://support.google.com/analytics/answer/1033162#CustomFilters).
Note that this will take some hours for this to take effect.

## CloudFlare Verified Bot

Checkly is also registered with CloudFlare as a [verified bot](https://developers.cloudflare.com/bots/concepts/bot/verified-bots/). If you are using CloudFlare's Web Application Firewall (WAF) to protect your site, you can also allow traffic from Checkly by adding a [custom WAF rule](https://developers.cloudflare.com/waf/custom-rules/) to enable traffic from verified bots.

Specifically, the [Checkly verified bot](https://radar.cloudflare.com/bots/directory/checkly) is included in the [Monitoring & Analytics category](https://developers.cloudflare.com/bots/concepts/bot/verified-bots/categories/).

CloudFlare automatically syncs the latest Checkly IP addresses, so this approach can be easier to maintain than [IP range allowlisting](#ip-range-allowlisting).

![CloudFlare verified bot WAF rule](/docs/images/monitoring/cloudflare-waf.png)

## Default Checkly user agent

This is what Checkly sends as user agent:

- API & Multistep checks: `Checkly/1.0 (https://www.checklyhq.com)`.
- Browser checks: `Checkly, https://www.checklyhq.com`.

Changing the user agent of a check will not change the browser or browser version, it will simply set a new string for user agent.
