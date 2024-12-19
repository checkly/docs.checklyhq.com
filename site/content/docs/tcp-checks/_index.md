---
title: Monitoring your services with TCP checks - Checkly Docs
displayTitle: Monitoring your services with TCP checks
weight: 7
menu:
  resources:
    parent: "TCP checks"
navTitle: Overview
slug: /
cli: true
---

{{< info >}}
**Early Access Feature:** This feature is available in early access. To enable it, please reach out to our [support team](mailto:support@checklyhq.com) or connect with us via the [Checkly community Slack](https://www.checklyhq.com/slack). We’d love to hear your feedback!
{{< /info >}}

## Overview

A TCP check establishes a connection to a specified hostname or IP address and port to verify that the service is responsive. These checks are ideal for monitoring non-HTTP services, such as databases, message queues, and custom applications that rely on TCP connectivity.

## Create a TCP check

{{< tabs "TCP check creation by interface" >}}
{{< tab "UI" >}}
<br>

* **Create a check:** Click the `+` icon on the sidebar and select **TCP check** from the list. This will open the check creation page.

* **Name & tags:** On the check creation page, choose a meaningful name for the check to easily identify it. Optionally, add one or more tags to further categorize or group the check.

* **The TCP request:** Configure the TCP endpoint to monitor by specifying a **hostname or IP address** (e.g., tcpbin.com or 192.168.1.1) and a **port** (e.g., 4242).

* **Set response time limits:** Define thresholds for marking the check as degraded or failed. This allows you to specify when requests should be considered slow (degraded) or entirely unreachable (failed).

* **Scheduling strategy & locations:** Choose a [scheduling strategy](/docs/monitoring/global-locations#scheduling-strategies) and which [location](/docs/monitoring/global-locations) you would like to run your TCP check from. Please note that [private locations](/docs/private-locations) are not yet supported for TCP checks but will be available soon.

* **Scheduling:** Schedule your checks to run at intervals between 10 seconds (minimum) and 24 hours (maximum).

* **Retries & alerting:** Configure [retries & alerts](/docs/alerting-and-retries) by choosing from Checkly's retry strategies and alert channels, ensuring you’re notified through your preferred methods when an issue arises with one of your TCP checks.

{{< /tab >}}
{{< tab "CLI" >}}
<br>
Not yet supported by the CLI.
{{< /tab >}}
{{< tab "Terraform Provider" >}}
<br>
Not yet supported by the Terraform Provider.
{{< /tab >}}
{{< tab "Pulumi Provider" >}}
<br>
Not yet supported by the Pulumi Provider.
{{< /tab >}}
{{< /tabs >}}

## Update or delete a TCP check

{{< tabs "TCP check updating & deletion by interface" >}}
{{< tab "UI" >}}
<br>

* **Update a TCP check:** To update a TCP check, click the kebab menu (three dots) next to the check on your [main dashboard](https://app.checklyhq.com) and select `Edit`, or click `Edit` in the top-right corner of the check's Reporting page.

* **Delete a TCP check:** To delete a TCP check, use the kebab menu (three dots) on the [main dashboard](https://app.checklyhq.com) and select `Delete`. Alternatively click `Edit` in the top-right corner of the check's Reporting page, scroll to the bottom section, and click the `Delete` button.

{{< /tab >}}
{{< tab "CLI" >}}
<br>
Not yet supported by the CLI.
{{< /tab >}}
{{< tab "Terraform Provider" >}}
<br>
Not yet supported by the Terraform Provider.
{{< /tab >}}
{{< tab "Pulumi Provider" >}}
<br>
Not yet supported by the Pulumi Provider.
{{< /tab >}}
{{< /tabs >}}

## TCP check reporting

Learn more about analyzing your TCP check run results in our [check results documentation](/docs/monitoring/check-results#tcp-check-results).
