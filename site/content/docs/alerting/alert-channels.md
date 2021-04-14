---
title: Alert channels
weight: 2
menu:
  docs:
    parent: "Alerting"
---

You can add as many of the following alert channels as you want: 

- Email
- [Slack]({{< ref "slack.md" >}})
- [SMS]({{< ref "sms-delivery.md" >}})
- [Webhook]({{< ref "webhooks.md" >}})
- [Pagerduty]({{< ref "docs/integrations/pagerduty.md" >}})
- [Opsgenie]({{< ref "docs/integrations/opsgenie.md" >}})

When adding a channel, you can select which checks to subscribe to the channel. This way you can create specific routings
for specific checks.

![alert channels](/docs/images/alerting/alert-channels.png)

You can also select which types of alerts should be send to your channel:

- **Failure**: When a check encounters a hard error.
- **Degradation**: When a checks is just slow, but still working.
- **Recovery**: When a check recovers from either failing or being degraded.
- [**SSL certificate expirations**](/docs/alerting/ssl-expiration/)

Configuring alert channels is mostly self explanatory except for our [advanced webhook builder](/docs/alerting/webhooks)

After adding the channels, you either **edit** or **delete** them, or change which checks are subscribed to that specific channel.
