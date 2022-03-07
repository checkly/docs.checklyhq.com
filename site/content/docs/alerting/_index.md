---
title: 'Alert settings'
weight: 1
menu:
    docs: {parent: Alerting}
lastmod: 01-06-2020
aliases:
    - /alerting/settings/
---

Alerting in Checkly is pretty flexible and should address most common needs. You can tweak exactly when and how you should
be alerted, on what channels like email, [SMS]({{< ref "sms-delivery.md" >}}), [Slack]({{< ref "slack.md" >}}) etc.
If you need more, you can integrate with [Pagerduty]({{< ref "../integrations/pagerduty.md" >}}),
[Opsgenie]({{< ref "../integrations/opsgenie.md" >}}) and many more! See [our integrations page]({{< ref "../integrations/" >}})
for all options.

## Alert settings

The alert settings tab gives you a lot of options to tailor when, how and how often you want to be alerted when
a check fails. This is also sometimes referred to as **threshold alerting**. For example:

- Get an alert on the second or third failure.
- Get an alert after 5 minutes of failures.
- Get one or more reminders after a failure is triggered.

Configuration is really simple. Just remember that you can configure your alert settings at two levels:

- **Account** level: This is the default level and applies to all of your check unless you override these settings at the check level.

![alert settings account / threshold alerting](/docs/images/alerting/alert-settings.png)

- **Check** level: You can explicitly override the alert settings per check. Very handy for debugging or other one-off cases.

![alert settings check / threshold alerting](/docs/images/alerting/alert-settings-check.png)

{{<info >}}
If you are using Groups, all the checks in the same Group will share Group-level alert settings.
{{</info >}}

{{<info >}}
Whenever possible, use the alert settings at the account level. This keeps things simple.
{{</info>}}

### Escalation

The escalation box allows you to decide when an alert should be triggered. We give you two options:

**1. Run based**

We alert you when a check has failed a number of times consecutively. We call this a *Run Based* escalation. Note that failed checks retried
from a different region are not considered "consecutive".

Here's an example. You want to be alerted after two failures, so you set the escalation to:

![escalation when a check has failed 2 time(s)](/docs/images/alerting/escalation-1.png)

Your check runs in Frankfurt and Tokio. It fails from both regions because your server is down. We consider this
one run. Five minutes later, the check fails again - assuming the check runs on a 5 minute schedule. Now we alert you.

**2. Time based**

We alert you when a check is still failing after a period of time, regardless of the amount of check runs that are failing.
This option should mostly be used when checks are run very regularly, i.e. once every minute or five minutes.

Here's an example. You want to be alerted if your check is failing for more than 10 minutes. You set escalation to:

![escalation when a check is failing for more than 10 minutes](/docs/images/alerting/escalation-2.png)

Your check runs every minute. It starts failing at 15:00. Failing check results come in and are visible in the dashboard.
After 10 minutes, the clock strikes 15:10. Any failing check results that come in now trigger an alert. If the check has
resolved, no alert are triggered.

### Reminders

People are busy, life is complex. For this reason you can set up one or more reminders. With the example below, Checkly
would send you two reminders: the first reminder five minutes after the first alert is triggered and the second five minutes
after that.

![send reminder two times over ten minutes](/docs/images/alerting/reminders-1.png)

{{<info >}}
When a check failure is resolved, we cancel any outstanding reminders so you don't get mixed signals.
{{</info>}}

## Muting alerts

Toggling the "mute" checkbox on a check stops the sending of all alerts but keeps the check running. This is useful when
your check might be flapping or showing other unpredictable behavior. Just mute the alerts but keep the check going while
you troubleshoot.

## Double checking

Checkly runs on cloud infrastructure in data centers around the world. As nothing is perfect, this infrastructure
occasionally experiences glitches and slowdowns. Enabling the  **double check** option makes sure we rerun your check
to catch false positives.

- API checks are retried after 5 seconds
- Browser checks are retried after 30 seconds.

This feature is switched on by default for all checks.

![double checks against false positives](/docs/images/alerting/double_check.png)
