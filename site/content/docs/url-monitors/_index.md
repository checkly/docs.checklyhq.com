---
title: Verify uptime with URL monitors - Checkly Docs
displayTitle: Run HTTP health checks with URL monitors
weight: 7
menu:
  resources:
    parent: "URL monitors"
navTitle: Overview
slug: /

---

Use URL monitors to track the availability of your HTTP-based services. They send a GET request to a specified URL and check for a successful response and acceptable response time.

Typical use cases include:

* Ensuring your marketing site returns a 200 OK
* Verifying your documentation site loads quickly
* Checking that your SSL certificate is still valid
* Confirming that a public pricing endpoint is reachable for customers

URL monitors are ideal for lightweight uptime monitoring. If a URL goes down, returns an unexpected status code, or responds too slowly, any configured [alerts](/docs/alerting-and-retries/) will be triggered.

## Creating a URL monitor

Each URL monitor is defined by its request configuration, which includes the target URL and how its availability and performance should be validated.

* **Request method:** Always `GET`.
* **URL:** The HTTP(S) URL to monitor (e.g. `https://api.example.com`).
* **IP family:** Defaults to IPv4.
* **Follow redirects:** Automatically follow 30x redirects.
* **Skip SSL:** Skip SSL certificate validation.
* **This request should fail:** Treat HTTP error codes (4xx and 5xx) as passed. Please note that successful responses still pass. Only failed assertions will cause the check to fail.

To validate the response further, you can configure:

* **Response time limits:** Define latency thresholds for degraded or failed states.
* **Assertions:** Validate the returned response status code (e.g. expect `200`).

Additional settings for URL monitors include:

* **Name:** Give your monitor a clear name to identify it in dashboards and alerts.
* **Tags:** Use tags to organize monitors across dashboards and [maintenance windows](/docs/maintenance-windows/).
* **Scheduling strategy:** Choose between parallel or round-robin execution. Learn more about [scheduling strategies](/docs/monitoring/global-locations#scheduling-strategies).
* **Locations:** Select one or more [public](/docs/monitoring/global-locations/) or [private](/docs/private-locations/) locations to run the monitor from.
* **Scheduling:** Set how frequently the monitor runs (from every 10 seconds up to once every 24 hours).
* **Retries:** Define how failed runs should be retried. See [retry strategies](/docs/alerting-and-retries/retries/).
* **Alerting:** Configure your [alert settings](/docs/alerting-and-retries/alert-settings/), [alert channels](/docs/alerting-and-retries/alert-channels/), or set up [webhooks](/docs/alerting-and-retries/webhooks/) for custom integrations.

## CLI example

With the [Checkly CLI](/docs/cli/), you can define URL monitors in TypeScript or JavaScript and manage them as code.

{{< tabs "CLI example" >}}
{{< tab "TypeScript" >}}

```ts {title="hello-url.check.ts"}
import { UrlMonitor, UrlAssertionBuilder } from 'checkly/constructs'

new UrlMonitor('hello-url-1', {
  name: 'Hello URL',
  activated: true,
  request: {
    url: 'https://api.checklyhq.com/v1/echo/get',
    assertions: [
      UrlAssertionBuilder.statusCode().equals(200),
    ]
  }
})
```

{{< /tab >}}
{{< tab "JavaScript" >}}

```js {title="hello-url.check.js"}
const { UrlMonitor, UrlAssertionBuilder } = require('checkly/constructs')

new UrlMonitor('hello-url-1', {
  name: 'Hello URL',
  activated: true,
  request: {
    url: 'https://api.checklyhq.com/v1/echo/get',
    assertions: [
      UrlAssertionBuilder.statusCode().equals(200),
    ]
  }
})
```

{{< /tab >}}
{{< /tabs >}}

See the full [Url monitor construct reference](/docs/cli/constructs-reference/#urlmonitor) for more context.
