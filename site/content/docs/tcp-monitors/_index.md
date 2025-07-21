---
title: Monitoring your services with TCP monitors - Checkly Docs
displayTitle: Monitoring your services with TCP monitors
weight: 7
menu:
  resources:
    parent: "TCP monitors"
navTitle: Overview
slug: /
aliases:
    - /docs/tcp-checks/

---

Use TCP monitors to verify that your critical non-HTTP services are working properly. TCP monitors work by establishing a connection to a host and port, then checking the speed and validity of the response.

For example, use these checks to verify that:

* Your mail server is online and responds to IMAPS requests quickly.
* Your FTP server responds correctly to commands.
* Your custom TCP-based service returns the expected response when sent a health check message.

![Screenshot of the TCP monitor overview page](/docs/images/tcp-monitors/tcp-check-overview.png)

You can also monitor services like databases, message queues, custom applications, and more. If your service is unresponsive or fails assertions, the check will trigger any configured [alerts](/docs/alerting-and-retries/).

## Configuring a TCP monitor

![Screenshot of the TCP monitor create page](/docs/images/tcp-monitors/create-tcp-check.png)

The main part of your check is the TCP request, which defines the endpoint to monitor.

* **Target:** The TCP endpoint to monitor, as defined by a hostname or IP address (e.g. `tcpbin.com` or `192.168.1.1`) and a port (e.g. `4242`).
* **IP family:** The default is IPv4. If needed, change the [IP family](/docs/monitoring/ip-info/#ipv4-and-ipv6-support) setting to IPv6.
* **This request should fail:** Enable this option to treat connection failures (e.g. timeouts or refused ports) as passed. Please note that successful connections will continue to pass. Only failed assertions will cause the check to fail.
* **Data to send:** The content included in the TCP request. For example, this could be text or protocol-specific commands expected by the target service.

To validate the response, you can set:

* **Response time limits**: The thresholds for marking the check as degraded or failed. This allows you to specify when responses should be considered slow (degraded) or entirely unreachable (failed).
* **Assertions:** Additional conditions for a passing check, beyond just a successful connection. You can set a ‘response time‘ for the TCP request or specify the expected ‘response data‘ for the server’s reply. For example, you can assert that the response time is less than 200 ms. Or, given the command `USER anonymous\r\n`, you can assert that the response contains `331 Please specify the password`.

Finally, here are generic check properties that apply to TCP monitors:

* **Name**: A meaningful name will not only help you and others identify your monitors within Checkly, but it will help provide a better alerting experience if your monitors fall into an alert state.
* **Tags**: Useful for organizing and filtering your monitors. They also determine which monitors are included in your [dashboards](/docs/dashboards/) and [maintenance windows](/docs/maintenance-windows/).
* **Scheduling strategy**: How monitors with multiple locations are executed, i.e. parallel or round-robin. Learn more about these [scheduling strategies](/docs/monitoring/global-locations#scheduling-strategies).
* **Locations**: Where your monitors run from. Choose from our [public locations](/docs/monitoring/global-locations/), or use a Checkly Agent to host your own [private locations](/docs/private-locations/).
* **Scheduling**: How often your monitors run. Schedule your TCP monitors to run at intervals between 10 seconds (minimum) and 24 hours (maximum).
* **Retries**: How failed runs are retried. Learn more about the different [retry strategies](/docs/alerting-and-retries/retries/).
* **Alerting**: This includes general [alert settings](/docs/alerting-and-retries/alert-settings/), like when and how often you're alerted, and the [alert channels](/docs/alerting-and-retries/alert-channels/) we use to notify you. If we don't have your preferred alert channel, use [webhooks](/docs/alerting-and-retries/webhooks/) to configure your alert flow.

## CLI example

The [Checkly CLI](/docs/cli/) gives you a JavaScript/TypeScript-native workflow for coding, testing and deploying synthetic monitoring at scale, from your code base.

You can define a TCP monitor via the CLI. For example:

{{< tabs "CLI example" >}}
{{< tab "TypeScript" >}}

```ts {title="hello-tcp.check.ts"}
import { TcpMonitor, TcpAssertionBuilder } from 'checkly/constructs'

new TcpMonitor('hello-tcp-1', {
  name: 'Hello TCP',
  activated: true,
  request: {
    hostname: 'tcpbin.com',
    port: 4242,
    data: 'ping\n',
    ipFamily: 'IPv6',
    assertions: [
        TcpAssertionBuilder.responseData().contains('ping')
    ]
  }
})
```

{{< /tab >}}
{{< tab "JavaScript" >}}

```js {title="hello-tcp.check.js"}
const { TcpMonitor, TcpAssertionBuilder } = require('checkly/constructs')

new TcpMonitor('hello-tcp-1', {
  name: 'Hello TCP',
  activated: true,
  request: {
    hostname: 'tcpbin.com',
    port: 4242,
    data: 'ping\n',
    ipFamily: 'IPv6',
    assertions: [
        TcpAssertionBuilder.responseData().contains('ping')
    ]
  }
})
```

{{< /tab >}}
{{< /tabs >}}

The above example defines:

* The basic monitor properties like `name`, `activated` etc.
* The `hostname` and `port` of the request, and the `data` to send.
* An array of assertions to assert the response is correct.

For more options, see the [Monitor construct reference](/docs/cli/constructs-reference/#tcpmonitor).

## Next steps

* Learn about the benefits of [Monitoring as Code](/guides/monitoring-as-code/).
* Analyze your [TCP monitor run results](/docs/monitoring/check-results#tcp-monitor-results).
* Understand [pricing and billing](https://www.checklyhq.com/pricing/) for TCP monitors.
