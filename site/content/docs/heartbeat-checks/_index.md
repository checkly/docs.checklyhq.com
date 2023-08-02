---
title: Getting started
weight: 14
slug: /
menu:
  resources:
    parent: "Heartbeat checks"
    identifier: "heartbeat-checks"
aliases:
    - /docs/heartbeat-checks/quickstart/
    - /docs/heartbeat-checks/getting-started/
cli: true
---

This guide gives you all the info needed to get started with Checkly Heartbeat checks.

## What is a Heartbeat check?

A heartbeat check is a passive check type that expects pings from an external source, such as a scheduled job on a server, at a defined interval. A ping is an HTTP request to a given endpoint URL. 
When a ping is not received on time, the check will trigger any configured alerts.

Use heartbeat checks to monitor backup jobs, data imports, and other recurring jobs or scripts.

Here is an example of how to have a Heroku job send a ping to a Checkly Heartbeat check.
{{< tabs "Heroku example" >}}
{{< tab "BASH" >}}
```BASH
curl -m 5 --retry 3 https://api.checklyhq.com/heartbeats/ping/bcd964a7-6f15-49a5-bac1-4be8059670ec;
```
{{< /tab >}}
{{< /tabs >}}
Note the use of the retry option. We recommend always using retries when available to avoid false alarms due to temporary network issues or other disruptions.

## Creating a heartbeat check

To create a new Heartbeat check, click the `+` icon on the sidebar & select **Heartbeat check**.

Creating a heartbeat check is quick and easy; the check requires a name and the period and grace settings defined. These can all be changed later on. Optionally, you can customize tags or [alert settings](/docs/alerting).

Once you have created your check, the service or host you want to monitor needs to be configured to send a request to the ping URL. When creating or editing the check you can find code examples for how to send requests using Javascript, Python or in Bash in the quickstart section.

## Check breakdown

### Name and tag
The check name is used for identifying the check in the list of heartbeat checks and in alert messages. Using a clear and meaningful name will help team members identify the check and can help reduce the reaction time when alerts are triggered. 
Tags are used to create meaningful distinctions between check groups, making it easy to filter out selections of checks. 
![name and tag](/docs/images/heartbeat-checks/getting-started-name-and-tag.png)

### Ping URL
The URL on which the check is listening for pings. The job or task monitored should make an HTTP request to the ping URL once per the period configured.
![ping url](/docs/images/heartbeat-checks/getting-started-ping-url.png)

### Period and Grace
**Period** defines how often you expect a ping to the ping URL. 

**Grace** is the time Checkly will wait before triggering any alerts when a ping does not arrive within the set period. E.g., if you have a check that expects a ping every 60 minutes, with a grace of 10 minutes, no alarms would trigger until 70 minutes after the latest ping.

Use grace to compensate for variance in your jobs.
![period and grace](/docs/images/heartbeat-checks/getting-started-period-and-grace.png)

### Timer
The check timer starts when it receives its first ping and will reset after each ping. 
If you have a check that expects a ping every 60 minutes starting at 09:30, and it receives a ping at 10:00, it will reset the timer to expect a ping before 11:00. If the check does not receive a ping before 11:00 plus any configured grace period it will trigger any configured alerts.
> When a check is deactivated, and activated again the timer needs to be pinged to start it, just as when first creating a check.

### Ping now
Sends a ping to the ping URL. Use this to start the check timer when a check is first created or to silence alarms.
![ping now](/docs/images/heartbeat-checks/getting-started-ping-now.png)

### Alerting
By default Checkly uses your account default alert settings and channels. You can configure any of the provided [alert channels](/docs/alerting/alert-channels/#managing-alert-channels) for a heartbeat check. If we don’t provide your preferred alert method, use [webhooks](/docs/alerting/webhooks) to configure your alert flow. When configuring a check, you can choose if it should use the account default channels or a selection specific to the check. 

> Note that some alerting channels, like [SMS](/docs/alerting/sms-delivery/) and [Phone call](/docs/alerting/phone-calls) are only available on our [Team and Enterprise plans](https://www.checklyhq.com/pricing#features) 


## Reporting
The heartbeat overview page displays a table of all your heartbeat checks. Here you can see the results of recent pings, the configured period and grace, and the availability over the last 7 days.

Clicking any individual check will open the check overview page.
![overview](/docs/images/heartbeat-checks/getting-started-overview.png)

### Check overview
The check overview page shows the current status of the check, as well as a breakdown of recent runs and availability metrics.

The summary section at the top of the page allows for time-based filtering, and displays the availability and number of alerts triggered for the given time period.

Single check runs can be accessed by selecting them in the timeline, or by clicking an individual result in the list below the timeline.

Select ‘View all’ for a complete list of available monitoring results in a time period.

### Check results

Selecting a single check result page from the check overview page will give a detailed breakdown of the specific request. 

The `source`  value is taken from the request parameter, if available, otherwise from the request `header.origin`, lastly from `headers.referer`. If none of these are available `source` defers to `null`.

