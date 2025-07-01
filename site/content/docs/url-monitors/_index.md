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

Use URL monitors to monitor the uptime and availability of your HTTP-based services. URL monitors send a simple GET request to a given URL and validate the speed and correctness of the response.

As an example, use these monitors to verify that:

* Your marketing site returns a `200` status code.
* Your docs site loads within an acceptable time window.
* Your SSL certificate hasn’t expired.

![Screenshot of the URL monitor overview page](/docs/images/http-checks/http-check-overview.png)

URL monitors are ideal for lightweight uptime monitoring e.g. to check if your websites, public docs, or API endpoints are available and responsive. If a URL goes down, returns the wrong status, or is too slow, any configured [alerts](/docs/alerting-and-retries/) will be triggered.

## Creating a URL monitor

![Screenshot of the URL monitor creation page](/docs/images/http-checks/create-http-check.png)

Each URL monitor is defined by its request configuration, which includes the target URL and how its availability and response should be validated.

* **Request method:** Always `GET`.
* **URL:** The full HTTP or HTTPS URL to monitor (e.g. `https://api.example.com/health`).
* **IP family:** The default is IPv4. If needed, change the [IP family](/docs/monitoring/ip-info/#ipv4-and-ipv6-support) setting to IPv6.

To validate the response further, you can configure:

* **Response time limits:** Define thresholds for degraded and failed states based on latency.
* **Assertions:** Validate the response status code (e.g. expect `200`).

Additional settings for URL monitors include:

* **Name:** Give your monitor a clear name to identify it in dashboards and alerts.
* **Tags:** Organize and filter checks & monitors across dashboards and [maintenance windows](/docs/maintenance-windows/).
* **Scheduling strategy:** Choose whether to run your monitors in parallel or round-robin. Learn more about [scheduling strategies](/docs/monitoring/global-locations#scheduling-strategies).
* **Locations:**  Where your monitors run from. Select from [public locations](/docs/monitoring/global-locations/) or configure your own [private locations](/docs/private-locations/).
* **Scheduling:** How often your monitors run (intervals range from 10 seconds to 24 hours).
* **Retries:** How failed runs are retried. See [retry strategies](/docs/alerting-and-retries/retries/).
* **Alerting:** Configure [alert settings](/docs/alerting-and-retries/alert-settings/) and [alert channels](/docs/alerting-and-retries/alert-channels/), or use [webhooks](/docs/alerting-and-retries/webhooks/) for custom integrations.

## CLI example

With the [Checkly CLI](/docs/cli/), you can define URL monitors in TypeScript or JavaScript and manage them as code.

{{< tabs "CLI example" >}}
{{< tab "TypeScript" >}}

```ts {title="hello-url.monitor.ts"}
import { UrlMonitor, AssertionBuilder } from 'checkly/constructs'

new UrlMonitor('hello-url-1', {
  name: 'Hello URL',
  activated: true,
  request: {
    method: 'GET',
    url: 'https://api.checklyhq.com/v1/echo/get',
    assertions: [
      AssertionBuilder.statusCode().equals(200),
    ]
  }
})
```

{{< /tab >}}
{{< tab "JavaScript" >}}

```js {title="hello-url.monitor.js"}
const { UrlMonitor, AssertionBuilder } = require('checkly/constructs')

new UrlMonitor('hello-url-1', {
  name: 'Hello URL',
  activated: true,
  request: {
    method: 'GET',
    url: 'https://api.checklyhq.com/v1/echo/get',
    assertions: [
      AssertionBuilder.statusCode().equals(200),
    ]
  }
})
```

{{< /tab >}}
{{< /tabs >}}

See the full [Check construct reference](/docs/cli/constructs-reference/#urlmonitor) for more options.