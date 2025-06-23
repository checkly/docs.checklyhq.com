---
title: Custom Alerts - Checkly Docs
displayTitle: Custom Alerts in Checkly
navTitle: Custom Alerts
weight: 31
menu:
  resources:
   parent: "Alerting & retries"

---

If your monitoring system generates many notifications that are non-critical and not actionable by the recipient, and then sends critical notifications on the same panel, you’ve got a recipe for disaster: an engineer tired of being notified with junk hits ‘ignore’ or starts putting his phone on ‘do not disturb’ every evening, and critical failures are only detected when the users storm your head office.

- While outside the scope of this article, it’s worth mentioning in passing that expecting engineers to sift hundreds of non-critical alerts to find serious failures is a recipe for burnout, and a team that’s no longer doing their best work.

Why does alert fatigue happen? I want to tour an exemplary Checkly account where I’ve got custom alert settings making sure that my team doesn’t suffer from alert fatigue, and updating configuration is easy.

## Account-wide notification defaults

First off, my account has some default settings for notifications. I have a baseline expectation of what counts as ‘failing’, so under ‘alerts’ in the left-hand toolbar I’ll set the defaults for all new checks. 

![alert settings account / threshold alerting](/docs/images/alerting/custom-alerts-01.png)
*default settings for all checks*

From here you can also click individual alert channels and set their notification settings, including whether this channel will get an alert if an SSL certificate is going to expire soon:

![alert settings account / threshold alerting](/docs/images/alerting/custom-alerts-02.png)
*settings for a single alert channel*

When creating or editing a check, you’ll see a prompt to use the global notification settings.

![alert settings account / threshold alerting](/docs/images/alerting/custom-alerts-03.png)
*Individual checks let the user know that global settings are available, preventing confusion*

## Edge case 1: monitoring my test environment

During deploy phases, I care a lot about whether the test environment is available, if something takes it down I want to get notified right away, so this check is set to high frequency, with all my alert channels set to notify, but I only activate this when we’re deploying code. 

![alert settings account / threshold alerting](/docs/images/alerting/custom-alerts-04.png)

These settings for being deactivated and/or muted are right at the top of each check’s edit menu, and if either or set the status is very clear from the top-level dashboard:

![alert settings account / threshold alerting](/docs/images/alerting/custom-alerts-05.png)
*A greyed-out test means it’s not active, muted tests will display a 🔕*

It wouldn’t do to wonder why a check wasn’t running without seeing right away it’s deactivated.

## Edge case 2: regular audits

One of my checks is very different from everything else: it uses the Playwright and the Axe engine to perform accessibility testing. The results of this test are more like regular design feedback rather than uptime monitoring. Since this check is so different, I’ve set everything up custom in its timing, retries, and notifications so that accessibility issues go to the right place. While individual settings make sense for this specific case, it’s generally better to use either global settings or to group our checks so that multiple checks can be updated at once.

## “Oh that always fails,” Demo and low-priority checks

I have a number of checks that are failing quite consistently. These checks help me demo what happens when a check fails (for example these  checks always have recent [video of their failed check runs](https://www.checklyhq.com/blog/playwright-video-troubleshooting/)). I don’t want these checks to bother anyone, but I also don’t want to edit each tests’ settings as I edit and add to my demonstration checks. The solution is a group: with a group I can have a scheduling strategy, escalation policy, and alert channels that overrides the settings on each individual check. If another user (or, more likely, the same user who’s forgotten about this group setting) tries to edit an individual check’s settings that are controlled by the group, there’s clear feedback in the Checkly web UI:

![alert settings account / threshold alerting](/docs/images/alerting/custom-alerts-06.png)

Groups aren’t just for shared settings, and the next category of high-priority checks will use a group for organizational convenience.

## Our most critical checks

There are a few checks I care about more than all the others. For my e-shop, if these checks are failing there’s no way that we’re making revenue. I’ve put these checks in a group I call ‘core functions’ with special notification policies:

![alert settings account / threshold alerting](/docs/images/alerting/custom-alerts-07.png)
*Groups get their own section of the dashboard with an overall status indicator*

 **I can click the menu button on a group to schedule an ad-hoc run of all the checks in a group, and go into the ‘edit’ menu to quickly activate or mute multiple checks with a checkbox.

![alert settings account / threshold alerting](/docs/images/alerting/custom-alerts-08.png)

Probably the most useful feature of groups goes beyond alerting: I can define variables that will be fed to the whole group. This unlocks some neat use cases:

![alert settings account / threshold alerting](/docs/images/alerting/custom-alerts-09.png)
*Setting environment variables that will be available for all the group’s tests at run time*

The possibilities for using group-specific variables include replicating a group for dev, staging, and prod environments and feeding in environment base URLs and other env-specific settings

## Managing alerting with monitoring-as-code

All the screenshots in this article are of Checkly’s web UI, as it’s a helpful visual tool to create and configure checks. As your use of Playwright for monitoring gets more sophisticated, you’ll want to adopt monitoring as code to manage your checks and their configuration from your code repository. For example, here’s the configuration for my high-priority checks group, rendered as a config file:

```ts
import { AlertChannel, CheckGroupV2, RetryStrategyBuilder } from 'checkly/constructs'

export const coreFunctionsGroup = new CheckGroupV2('core-functions-w1gSVvU5', {
  name: 'Core Functions',
  locations: [
    'us-west-2',
    'us-west-1',
  ],
  alertChannels: [
    AlertChannel.fromId(205899),
  ],
  alertEscalationPolicy: 'global',
  retryStrategy: RetryStrategyBuilder.linearStrategy({
    baseBackoffSeconds: 6,
    maxRetries: 2,
    maxDurationSeconds: 600,
    sameRegion: true,
  }),
  runParallel: true,
})
```

## Don’t just alert your own team, use Status Pages

Once we’ve set clear alert policies and our team are no longer suffering from alert fatigue, it’s time to start automating more parts of their workflow. During incident response, it can be a difficult decision to know when to notify users of an outage. With [Checkly’s status pages](https://www.checklyhq.com/docs/status-pages/), the process is automated, and you can link multiple checks into services to share overall status. 

Watch the video below to see how to set up a status page in just a few minutes with Checkly:

{{<youtube 9tzl2RIXJxo >}}
