---
title: Verify your endpoints with HTTP checks - Checkly Docs
displayTitle: Verify your endpoints with HTTP checks
weight: 7
menu:
  resources:
    parent: "HTTP checks"
navTitle: Overview
slug: /

---

Use HTTP checks to verify that your HTTP-based endpoints are working as expected. HTTP checks work by sending a request to a URL endpoint, then verifying the speed and correctness of the response.

As an example, use these checks to verify that:

* Your public API returns a `200` status code and expected JSON structure.
* Your marketing landing page loads successfully within 500ms.
* A webhook endpoint correctly accepts `POST` requests and returns a `2xx` response.

![Screenshot of the HTTP check overview page](/docs/images/http-checks/http-check-overview.png)

HTTP checks are ideal for monitoring REST APIs, websites, microservices, and any web-accessible resource. If a request fails, responds too slowly, or returns an unexpected result, any configured [alerts](/docs/alerting-and-retries/) will be triggered.

## Creating an HTTP check

![Screenshot of the HTTP check create page](/docs/images/http-checks/create-http-check.png)

The core of an HTTP check is the request configuration, which defines the target URL and how it should be validated.

* **Request method:** Choose between `GET`, `POST`, `PUT`, `DELETE`, or other supported HTTP methods.
* **URL:** The full HTTP or HTTPS URL to monitor (e.g. `https://api.example.com/health`).
* **Headers & Body:** Add custom headers and body content as needed.
* **Authentication:** Configure authentication methods like Basic Auth, Bearer Tokens, or API Keys if required by the endpoint.

To validate the response further, you can configure:

* **Response time limits:** Define thresholds for degraded and failed states based on latency.
* **Assertions:** Validate parts of the response, such as body content, headers, or JSON fields. For example, you can assert that a JSON field `status` equals `ok`.

Additional settings for HTTP checks include:

* **Name:** Give your check a clear name to identify it in dashboards and alerts.
* **Tags:** Organize and filter checks across dashboards and [maintenance windows](/docs/maintenance-windows/).
* **Scheduling strategy:** Choose how checks run from multiple locations—parallel or round-robin. Learn more about these [scheduling strategies](/docs/monitoring/global-locations#scheduling-strategies).
* **Locations:**  Where your checks run from. Select from [public locations](/docs/monitoring/global-locations/) or configure your own [private locations](/docs/private-locations/).
* **Scheduling:** How often your checks run. Run your check at intervals ranging from 10 seconds to 24 hours.
* **Retries:** How failed runs are retried. See [retry strategies](/docs/alerting-and-retries/retries/).
* **Alerting:** Configure [alert settings](/docs/alerting-and-retries/alert-settings/) and [alert channels](/docs/alerting-and-retries/alert-channels/), or use [webhooks](/docs/alerting-and-retries/webhooks/) for custom integrations.

## CLI example

With the [Checkly CLI](/docs/cli/), you can define HTTP checks in TypeScript or JavaScript and manage them as code.

{{< tabs "CLI example" >}}
{{< tab "TypeScript" >}}

```ts {title="hello-http.check.ts"}
import { HttpCheck, AssertionBuilder } from 'checkly/constructs'

new HttpCheck('hello-http-1', {
  name: 'Hello HTTP',
  activated: true,
  request: {
    method: 'GET',
    url: 'https://api.checklyhq.com/v1/echo/get',
    headers: {
      'Accept': 'application/json'
    },
    assertions: [
      AssertionBuilder.statusCode().equals(200),
      AssertionBuilder.responseTime().lessThan(1000)
    ]
  }
})
```

{{< /tab >}}
{{< tab "JavaScript" >}}

```js {title="hello-http.check.js"}
const { HttpCheck, AssertionBuilder } = require('checkly/constructs')

new HttpCheck('hello-http-1', {
  name: 'Hello HTTP',
  activated: true,
  request: {
    method: 'GET',
    url: 'https://api.checklyhq.com/v1/echo/get',
    headers: {
      'Accept': 'application/json'
    },
    assertions: [
      AssertionBuilder.statusCode().equals(200),
      AssertionBuilder.responseTime().lessThan(1000)
    ]
  }
})
```

{{< /tab >}}
{{< /tabs >}}

This example defines:

* Basic properties like `name` and `activated`.
* The HTTP `method` and `url`.
* Custom `headers` and response `assertions`.

See the full [Check construct reference](/docs/cli/constructs-reference/#check) for more options.

* Learn about the benefits of [Monitoring as Code](/guides/monitoring-as-code/).
* Analyze your [HTTP check run results](/docs/monitoring/check-results#http-check-results).