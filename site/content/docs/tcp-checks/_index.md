---
title: Monitoring your services with TCP checks - Checkly Docs
displayTitle: Monitoring Your Services with TCP checks
weight: 7
menu:
  resources:
    parent: "TCP checks"
navTitle: Overview
slug: /
cli: true
---

A TCP check establishes a connection to a specified hostname or IP address and port to verify that the service is responsive. These checks are ideal for monitoring non-HTTP services, such as databases, message queues, and custom applications that rely on TCP connectivity.

## Create a TCP check

{{< tabs "TCP check creation by interface" >}}
{{< tab "UI" >}}
<br>

* **Create a check:** Click the `+` icon on the sidebar and select **TCP check** from the list.

* **Name & tags:** Choose a meaningful name for the check to easily identify it. Optionally, add one or more tags to further categorize or group the check.

* **The TCP request:** Configure the TCP endpoint to monitor by specifying a **hostname or IP address** (e.g., tcpbin.com or 192.168.1.1) and a **port** (e.g., 4242).

* **Set response time limits:** Define thresholds for marking the check as degraded or failed. This allows you to handle cases where requests are slow (degraded) but not entirely broken (failed).

* **Scheduling strategy & locations:** Choose a [scheduling strategy](/docs/monitoring/global-locations#scheduling-strategies) and which [location](/docs/monitoring/global-locations) you would like to run your TCP check from. Please note that [private locations](/docs/private-locations) are not yet supported for TCP checks but will be available soon.

* **Scheduling:** Schedule your checks to run at intervals between 10 seconds (minimum) and 24 hours (maximum).

* **Retries & alerting:** Configure [retries & alerts](/docs/alerting-and-retries) by choosing from Checkly's retry strategies and alert channels, ensuring you’re notified through your preferred methods when an issue arises with one of your checks.

{{< /tab >}}
<!-- {{< tab "CLI" >}}
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
{{< /tab >}} -->
{{< /tabs >}}

## Update or delete a TCP check

{{< tabs "TCP check updating & deletion by interface" >}}
{{< tab "UI" >}}
<br>

* **Update a TCP check:** To update a TCP check, click the kebab menu (three dots) next to the check on your [main dashboard](https://app.checklyhq.com) and select `Edit`, or click `Edit` in the top-right corner of the check's Reporting page.

* **Delete a TCP check:** To delete a TCP check, use the kebab menu (three dots) on the [main dashboard](https://app.checklyhq.com) and select `Delete`.

{{< /tab >}}
<!-- {{< tab "CLI" >}}
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
{{< /tab >}} -->
{{< /tabs >}}

## TCP check reporting

The [main dashboard](https://app.checklyhq.com/) provides an overview of all your checks, including TCP checks. Here, you can view recent check results and key metrics like availability and average response time over the last 24 hours.

Clicking on an individual check opens the check overview page, where you can find detailed monitoring results, alert history, and performance trends. For deeper insights, you can also view specific run results by clicking on any run. The run result page includes:

* **Summary:** Displays the check target (URL and port), the check state (success for passed and degraded runs, or error for failed runs), and the total check run duration.

* **Error details:** If the check failed, the error message log will be shown.

* **Timing phases:** For each request, we capture the following timing metrics:
  * DNS: Time taken to resolve the hostname to an IP address (if a hostname was provided).
  * Connect: Time taken to establish the TCP connection (SYN, SYN-ACK, ACK).

## Pricing

A TCP check is billed the same way as API checks. For more details, refer to our [pricing and billing documentation](/docs/monitoring/check-pricing).