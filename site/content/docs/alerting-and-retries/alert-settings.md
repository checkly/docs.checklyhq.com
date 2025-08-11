---
title: Alert settings in Checkly - Checkly Docs
displayTitle: Alert settings in Checkly
navTitle: Alert settings
weight: 30
menu:
  resources:
   parent: "Alerting & retries"
aliases:
- /alerting/settings/
- /alerting/

---

Alert settings allow you to control when and how often you will be notified when a check starts failing, degrades or recovers.

## Alert settings

The [alert settings screen](https://app.checklyhq.com/alerts/settings) gives you the options to tailor when, how and how
often you want to be alerted when a check fails. This is also sometimes referred to as **threshold alerting**. For example:

- Get an alert on the second or third failure.
- Get an alert after 5 minutes of failures.
- Get one or more reminders after a failure is triggered.

Your alert notifications can be configured at three levels:

1. **Account** level: This is the default level and applies to all of your check unless you override these settings at the check level.

![alert settings account / threshold alerting](/docs/images/alerting/alert-settings.png)

2. **Group** level: You can explicitly override the alert settings at the group level.

![alert settings group / threshold alerting](/docs/images/alerting/alert-settings-group.png)

3. **Check** level: You can explicitly override the account alert settings per check. Very handy for debugging or other one-off cases.

> You can select whether group settings will override individual check settings for alerts, retries, scheduling, and location

![alert settings check / threshold alerting](/docs/images/alerting/alert-settings-check.png)



### Escalation

The escalation box allows you to decide when an alert should be triggered. We give you two options that are applied to all checks:

**1. Run based**

We alert you when a check has failed a number of times consecutively. We call this a *Run Based* escalation. Note that failed checks retried
from a different region are not considered "consecutive".

Here's an example. You want to be alerted after two failures, so you set the escalation to:

![escalation when a check has failed 2 time(s)](/docs/images/alerting/escalation-1.png)

Your check runs in Frankfurt and Tokyo. It fails from both regions because your server is down. We consider this
one run. Five minutes later, the check fails again - assuming the check runs on a 5 minute schedule. Now we alert you.

> The underlying alert state transtions may trigger alerts **regardless of your escalation thresholds**. For full details on how these state transitions override your alert escalation settings, see [Alert states & transitions](/docs/alerting-and-retries/alert-states/#alert-states--transitions).


**2. Time based**

We alert you when a check is still failing after a period of time, regardless of the amount of check runs that are failing.
This option should mostly be used when checks are run very regularly, i.e. once every minute or five minutes.

Here's an example. You want to be alerted if your check is failing for more than 10 minutes. You set escalation to:

![escalation when a check is failing for more than 10 minutes](/docs/images/alerting/escalation-2.png)

Your check runs every minute. It starts failing at 15:00. Failing check results come in and are visible in the dashboard.
After 10 minutes, the clock strikes 15:10. Any failing check results that come in now trigger an alert. If the check has
resolved, no alert are triggered.

**Location failure threshold**

This option can be selected in addition to the run or time-based escalation settings and only affect checks running in [parallel](/docs/monitoring/global-locations/#parallel) with two or more locations selected. 

When enabled, alerts will only be sent when the specified percentage of locations are failing. Use this setting to reduce alert noise and fatigue for services that can handle being unavailable from some locations before action is required. 

![escalation when a check is failing at more than 50% of locations](/docs/images/alerting/escalation-3.png)

In the example above, an alert will only be sent when the check has failed once, and at least 50% of the locations the check is running from are failing during a check run. If the check is set to run from 10 locations, and it fails in 3, no alert will be sent. If it later fails in 7 of the 10 locations an alert will be sent.

### Reminders

People are busy, life is complex. For this reason you can set up one or more reminders. With the example below, Checkly
would send you two reminders: the first reminder five minutes after the first alert is triggered and the second five minutes
after that.

![send reminder two times over ten minutes](/docs/images/alerting/reminders-1.png)

> When a check failure is resolved, we cancel any outstanding reminders so you don't get mixed signals.

## Muting alerts

Toggling the "mute" checkbox on a check stops the sending of all alerts but keeps the check running. This is useful when
your check might be flapping or showing other unpredictable behavior. Just mute the alerts but keep the check going while
you troubleshoot.
