---
title: Monitoring your services with TCP checks - Checkly Docs
displayTitle: Monitoring your services with TCP checks
weight: 7
menu:
  resources:
    parent: "TCP checks"
navTitle: Overview
slug: /

---

## Overview

A TCP check establishes a connection to a specified hostname or IP address and port to verify responsiveness. These checks are ideal for monitoring non-HTTP services critical to your infrastructure. Here are a few example use cases:

* **Mail servers** (e.g. `mail.example.org:993`): Use TCP checks to ensure your mail server is online and processing requests efficiently. For example, set an assertion on the response time to confirm the server accepts IMAPS connections without delays. This helps you spot slowdowns and provide reliable email services for your users.

* **FTP servers** (e.g. `ftp.example.org:21`): Check that your server is online and accepting connections. To confirm that protocol commands are processed as expected, you can include a command like `USER anonymous\r\n` as part of your TCP request and confirm the response matches what you'd expect, such as `331 Please specify the password`, using assertions.

There are plenty of other scenarios where TCP checks are helpful, such as monitoring messaging queues or custom applications on proprietary ports. If you’re unsure whether your use case is supported or need assistance getting started, feel free to [reach out](mailto:support@checklyhq.com)!

## Create a TCP check

* **Create a check:** Click the `+` icon on the sidebar and select **TCP check** from the list. This will open the check creation page.

* **Name & tags:** On the check creation page, choose a meaningful name for the check to easily identify it. Optionally, add one or more tags to further categorize or group the check.

* **The TCP request:**
  * **Target:** Specify the TCP endpoint to monitor by entering a hostname or IP address (e.g. tcpbin.com or 192.168.1.1) and a port (e.g. 4242).
  * **IP family:** Change the [IP family](/docs/monitoring/ip-info/#ipv4-and-ipv6-support) setting to IPv6 if needed; the default is IPv4.
  * **This request should fail:** Enable this option to treat connection failures (e.g. timeouts or refused ports) as successful. Please note that successful connections will still pass. Only failed assertions will cause the check to fail.
  * **Data to send:** Use the text editor to specify data that will be sent to the port as part of the TCP request. This can include text or protocol-specific commands expected by the target service. To configure the expected response, see ‘Assertions‘ for more details.

* **Set response time limits:** Define thresholds for marking the check as degraded or failed. This allows you to specify when requests should be considered slow (degraded) or entirely unreachable (failed).

* **Assertions:** Set conditions for a successful check. You can set a ‘response time‘ for the TCP request or specify the expected ‘response data‘ in the server’s reply.

* **Scheduling strategy & locations:** Choose a [scheduling strategy](/docs/monitoring/global-locations#scheduling-strategies) and which [location](/docs/monitoring/global-locations) you would like to run your TCP check from.

* **Scheduling:** Schedule your checks to run at intervals between 10 seconds (minimum) and 24 hours (maximum).

* **Retries & alerting:** Configure [retries & alerts](/docs/alerting-and-retries) by choosing from Checkly's retry strategies and alert channels, ensuring you’re notified through your preferred methods when an issue arises with one of your TCP checks.

## Update or delete a TCP check

* **Update a TCP check:** To update a TCP check, click the kebab menu (three dots) next to the check on your [main dashboard](https://app.checklyhq.com) and select `Edit`, or click `Edit` in the top-right corner of the check's Reporting page.

* **Delete a TCP check:** To delete a TCP check, use the kebab menu (three dots) on the [main dashboard](https://app.checklyhq.com) and select `Delete`. Alternatively click `Edit` in the top-right corner of the check's Reporting page, scroll to the bottom section, and click the `Delete` button.

## TCP check reporting

Learn more about analyzing your TCP check run results in our [check results documentation](/docs/monitoring/check-results#tcp-check-results).

## TCP check pricing

TCP checks are billed at $2 per 10k runs. They share a quota with API checks, allowing you to allocate your budget flexibly between both types. For detailed pricing information, see ‘API & network checks’ on our [pricing & billing page](/docs/monitoring/check-pricing/#pricing--billing---checkly-docs).
