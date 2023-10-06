---
title: 'Retries'
weight: 29
slug: /
menu:
  resources:
   parent: "Retries & Alerting"
cli: true
aliases:
  - /docs/alerting/
---

Sometimes the internet is flaky, or your app is just having a hiccup not worth pinging your on-call team about. Retries 
are your first line of defense against these types of false positives, leading to alert fatigue.

{{<warning>}}
The "double check" option is deprecated and will be removed in the future. Please use the retries instead.
{{</warning>}}


## Retry strategies

Each check (except for Heartbeat checks) and each check group has a **Retries** section that allows you to configure how many times
and according to which strategy a check should be retried.

![configure retry strategy](/docs/images/alerting/retries.png)

You can pick from three distinct retry strategies that each come with different retry/backoff characteristics.

- **Fixed** — a fixed time between retries, e.g. 5s, 5s, 5s etc.
- **Linear** — a linearly increasing time between retries, e.g. 5s, 10s, 15s etc.
- **Exponential** — an exponentially increasing time between retries, e.g. 5s, 25s, 125s (2m and 5s)  etc. 

You can also set a **maximum total retry duration** that controls the maximum time a check can be in a retrying state. 
This is mostly a stop-gap for not chalking up too many retries.

{{<info >}}
Note that the **maximum total retry duration** also includes the time it takes for a check to run. So if you set the maximum to 2 minutes,
your check takes 1.5 minutes, you have 30 seconds left for retries.
{{</info >}}

### How often should I retry?

**For checks that run on lower frequencies**, e.g. once per hour, it makes sense to pick a strategy that retries more often,
over longer stretches of time. Let's look at an example:

1. A check with a 1-hour frequency breaks at 13:00 CET.
2. An exponential retry strategy with 3 retries and a 5-second interval is configured.
3. This generates retries spaced apart by 5 seconds, 25 seconds, 125 seconds.
4. Your check is now retried at about 13:00:05, 13:00:30 and 13:02:35. 

If in that ~3-minute period your app / system recovers, and this was just a fluke, you will not be alerted. If the issue persists,
Checkly will alert you as per your alert settings.

**For checks that run on higher frequencies**, e.g. once per minute, it makes sense to pick a strategy that retries less often,
and spaced apart by shorter intervals.

Of course, picking the right strategy depends on your use case, tolerance for intermittent failures, SLO levels and other factors.

## Retry from the same region

You can toggle if a check should be retried from the same location or not. 

- If you enable this, a check that fails will be retried in the same location. 
- If you disable this, a check that fails will be retried in a different location, selected from the location you selected for the check.

There are some tradeoffs to consider:

- Retrying from the same location makes sense if you care strongly about the uptime of your app in one specific location, compared to other locations.
- Retrying from a different location makes sense, if you want to make sure your app is up in at least one location. 
