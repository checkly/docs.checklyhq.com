---
title: SSL certificate expiration
weight: 4
menu:
  docs:
    parent: "Alerting"
aliases:
- "/whats-new/summer-update/docs/alerting/ssl-expiration/"
- "/whats-new/introducing-sms-pagerduty/docs/alerting/ssl-delivery/"
---

> On August 13, 2020, we [changed how SSL alerting is configured](/docs/alerting/). Your [old settings](https://app.checklyhq.com/alert-settings?showSslAlertingV1Notice=true) will be supported for 3 months until November 13, 2020. This page reflects the current usage.

An expired SSL certificate can cause havoc to sites and APIs. Checkly performs a daily check on your certificate and can alert you 30, 14, 7 and/or 3 days before your certificate expires. All alert channels (e-mail, SMS, OpsGenie, Webhook etc.) can be used for this alert.

Simply create or pick an existing alert channel that your check subscribes to and enable *SSL certificate expiration* and set the day threshold to your preference. If you don't have your alert channels set up yet, see [Alert Channels](/docs/alerting/alert-channels/).

![Example alert channel form](/docs/images/alerting/ssl_check_example.png)

{{<info >}}
**Tips**

- You can create specific alert channels for certificate expirations and subscribe all checks/groups to that channel.

- You can create multiple alert channels with different thresholds if you want to be alerted at multiple thresholds.
{{</info>}}

## API checks
The domain for the certificate is parsed from the `URL` in the HTTP request settings so it does not require any setup.

## Browser checks
Since browser checks can connect to multiple domains, you need to set the SSL certificate domain to receive certificate alerts for them.

![SSL checks for browser checks](/docs/images/alerting/browser_ssl_check.png)
