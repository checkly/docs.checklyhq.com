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

> **Early Access Feature:**
> This feature is available in early access. To enable it in the UI, go to the [Labs section](https://app.checklyhq.com/settings/account/labs) in your account settings and toggle on TCP Checks. Please note that support for Monitoring as Code (MaC) via the CLI, Terraform, and Pulumi providers is currently is still in development. We’d love to hear your feedback—connect with us via the [Checkly community Slack](https://www.checklyhq.com/slack) or reach out to our [support team](mailto:support@checklyhq.com)!

## Overview

A TCP check establishes a connection to a specified hostname or IP address and port to verify responsiveness. These checks are ideal for monitoring non-HTTP services critical to your infrastructure. Here are a few common use cases:

* **Mail servers** (e.g. `mail.example.org:993`): Ensure your mail server is available and can accept incoming IMAPS connections.

* **Databases** (e.g. `database.example.org:3306`): Verify that your database server is online and able to accept connections.

* **Messaging queues** (e.g. `mq.example.org:5672`): Monitor the availability of messaging queue services.

## Create a TCP check

* **Create a check:** Click the `+` icon on the sidebar and select **TCP check** from the list. This will open the check creation page.

* **Name & tags:** On the check creation page, choose a meaningful name for the check to easily identify it. Optionally, add one or more tags to further categorize or group the check.

* **The TCP request:** Configure the TCP endpoint to monitor by specifying a **hostname or IP address** (e.g., tcpbin.com or 192.168.1.1) and a **port** (e.g., 4242).

* **Set response time limits:** Define thresholds for marking the check as degraded or failed. This allows you to specify when requests should be considered slow (degraded) or entirely unreachable (failed).

* **Scheduling strategy & locations:** Choose a [scheduling strategy](/docs/monitoring/global-locations#scheduling-strategies) and which [location](/docs/monitoring/global-locations) you would like to run your TCP check from.

* **Scheduling:** Schedule your checks to run at intervals between 10 seconds (minimum) and 24 hours (maximum).

* **Retries & alerting:** Configure [retries & alerts](/docs/alerting-and-retries) by choosing from Checkly's retry strategies and alert channels, ensuring you’re notified through your preferred methods when an issue arises with one of your TCP checks.

## Update or delete a TCP check

* **Update a TCP check:** To update a TCP check, click the kebab menu (three dots) next to the check on your [main dashboard](https://app.checklyhq.com) and select `Edit`, or click `Edit` in the top-right corner of the check's Reporting page.

* **Delete a TCP check:** To delete a TCP check, use the kebab menu (three dots) on the [main dashboard](https://app.checklyhq.com) and select `Delete`. Alternatively click `Edit` in the top-right corner of the check's Reporting page, scroll to the bottom section, and click the `Delete` button.

## TCP check reporting

Learn more about analyzing your TCP check run results in our [check results documentation](/docs/monitoring/check-results#tcp-check-results).

## TCP check pricing

TCP checks are billed at $2 per 10k runs. For detailed pricing information, visit our [pricing & billing page](/docs/monitoring/check-pricing/#pricing--billing---checkly-docs).