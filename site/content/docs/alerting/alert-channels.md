---
title: Alert channels
weight: 31
menu:
  resources:
    parent: "Alerting"
cli: true
---

You can add as many of the following alert channels as you want:

- Email
- [Slack]({{< ref "../integrations/slack.md" >}})
- [Webhook]({{< ref "webhooks.md" >}})
- [SMS]({{< ref "sms-delivery.md" >}})
- [Pagerduty]({{< ref "docs/integrations/pagerduty.md" >}})
- [Opsgenie]({{< ref "docs/integrations/opsgenie.md" >}})
- [FireHydrant]({{< ref "docs/integrations/firehydrant.md" >}})
- [Coralogix]({{< ref "docs/integrations/coralogix.md" >}})
- [Discord]({{< ref "docs/integrations/discord.md" >}})
- [GitLab Alerts]({{< ref "docs/integrations/gitlab_alerts.md" >}})
- [Spike.sh]({{< ref "docs/integrations/spike.md" >}})
- [Splunk On-Call]({{< ref "docs/integrations/splunk_on_call.md" >}})

## Managing alert channels

When adding a channel, you can select which checks to subscribe to the channel. This way you can create specific routings
for specific checks.

![alert channels](/docs/images/alerting/alert-channels.png)

You can also select which types of alerts should be send to your channel:

- **Failure**: When a check encounters a hard error.
- **Degradation**: When a checks is just slow, but still working.
- **Recovery**: When a check recovers from either failing or being degraded.
- [**SSL certificate expirations**](/docs/alerting/ssl-expiration/)

Configuring alert channels is mostly self explanatory except for our [advanced webhook builder](/docs/alerting/webhooks).

After adding the channels, you either **edit** or **delete** them, or change which checks are subscribed to that specific channel.

{{<info >}}
If you are using [Terraform](/docs/integrations/terraform), you will need to specify alert channel subscriptions _explicitly_ for each check / group.
{{</info >}}
