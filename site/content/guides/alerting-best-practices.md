---
title: Alerting fundamentals - Making sure you know about every failure
description: >-
  This guide gives the best strategies to configure your alerts for team success.
author: Nočnica Mellifera
avatar: 'images/avatars/nica-mellifera.png'
tags:
  - FAQ
---
## Making sure you get a Checkly alert for every detected failure

It’s every ops team’s biggest anxiety: a monitoring system detects a failure, but the notification either isn’t delivered or isn’t noticed by the team. Now we have to wait for users to complain before our team knows about the problem. Checkly sends an alert every time the system detects a failure, but how can you be sure you’re getting those alerts, and that those alerts are going to the right people? This guide gives the best strategies to configure your alerts for team success. 

## Use group-level Alert Settings

Checks have individual alert settings, but if you want to make doubly sure that no important checks don’t send notifications, [use check groups](https://www.checklyhq.com/docs/groups/) to enforce a broader policy. Alert policies for groups also allow you to update multiple checks at once, so new escalation emails or other settings can be changed quickly.

## Use multiple alert channels

From my first job in observability, doing tech support for an APM vendor, I had to break the bad news to operations engineers that email alerts weren’t all they were cracked up to be. The most common issues were surprisingly slow email delivery, and email clients filtering emails with similar subjects. If email is the only way you’re getting alerts, you’re sure to get some late, and some alerts you may not see at all!

Checkly can send notifications via email, Slack, SMS and via many integrations, along with generic webhooks. For at least your most critical checks, it’s a good idea to have at least two alert channels active.

## Make sure your checks are working to begin with

One of the more common questions for any monitoring tool is ‘why didn’t I get an alert on Thursday when this service wasn’t working?’ When checking the dashboard, we see the service failed several days before and has been down ever since.

![a Checkly graph of a long-running failure](/guides/images/alerting-guide.png)
*This check has been failing for nearly 11 hours*

Checkly notifies users when the state of their check changes, either for failure or recovery. But the system doesn’t notify users that failures are continuing, you will get a weekly update if a failure is continuing, but this is more of a digest of ongoing issues. You need to make sure that checks are ‘green’ before you can expect notifications when they go ‘red.’

If there’s ever a danger that, organizationally, downtime alerts will be dismissed when they're first delivered, consider an incident management tool like [Rootly](https://www.checklyhq.com/docs/integrations/rootly/), which will create ‘incidents’ based on alerts and escalate notifications if they’re not resolved.

## Use soft assertions to reduce alert fatigue

The final common cause of missed alerts is recipients turning off or turning down notifications because they’re being notified of failures several times a day, and this alert fatigue means they’ll miss when real problems happen. Checkly lets you define what qualifies as a failure all the way from the code level, and you get decide the retry logic to verify a failure, so my primary advice is always to consider carefully what really qualifies as a failure worthy of alerting. This includes avoiding [hard waits](https://www.checklyhq.com/learn/playwright/waits-and-timeouts/), since a simple timeout on a request isn’t likely to be a widespread or long-lasting failure.

One technique you may not have used are [soft assertions](https://www.checklyhq.com/docs/browser-checks/degraded-state/) to note problems that, while concerning, don’t qualify as failures. With soft assertions you can move checks into a [degraded state](https://www.checklyhq.com/docs/browser-checks/degraded-state/) with their own notification settings.

## Conclusions

Making sure you get Checkly alerts for every failure is key to keeping your systems running smoothly. Use group-level alert settings to apply consistent policies across multiple checks. Set up multiple alert channels to avoid missing notifications. Regularly check that your checks are working properly to ensure alerts are sent when needed. Finally, use soft assertions to reduce alert fatigue and focus on real issues. By following these steps, you can stay on top of problems and keep your team informed.

To go further, look at our documentation on:

1. [Alerting and retries with Checkly](https://www.checklyhq.com/docs/alerting-and-retries/#alerting-and-retries-with-checkly---checkly-docs)
2. [How to get started with Monitoring as Code](https://www.checklyhq.com/guides/empowering-developers-with-checkly/)
3. [Documentation of the Checkly CLI](https://www.checklyhq.com/docs/cli/)