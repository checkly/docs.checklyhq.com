---
title: Alert notification log
weight: 36
menu:
  docs:
    parent: "Alerting"
---
 
Checkly tries to deliver all your failure, degradation and recovery notifications as reliably as possible, but sometimes
life happens. A token expires, a URL has a typo or some other unforeseen issue causes a notification to get lost.

To troubleshoot any delivery issues, browse and filter the 
**[Alert Notification Log](https://app.checklyhq.com/alerts/notifications)** for any failed messages. You can also directly
access the notifications for a specific channel by clicking the small "log" icon next to the configured channel name.

Here's an example:

![alert notification log](/docs/images/alerting/alert-notification-log.png)

What do we see here?

1. SMS and Email were correctly delivered.
2. The OpsGenie notification failed though. The notification result shows we got a `422` status code back and the error 
message states our API key was invalid.
3. We also see the configuration we used to instrument our call to the OpsGenie API.
4. We see some extra meta data about the notification: What channel was used, what check triggered the alert, when it was 
sent etc.

## Known limitations

There are some limits to what notification deliveries we can track currently.

1. SMS delivery can not be tracked up to your phone correctly receiving the SMS. We currently only track if our SMS 
provider ([AWS SNS](https://docs.aws.amazon.com/sns/latest/dg/sns-mobile-phone-number-as-subscriber.html)) has correctly 
received our request to send the SMS.
2. Email delivery is tracked up to our request to our email provider. We use [Postmark](https://postmarkapp.com/) to send our emails.
3. Many alert channels are retried transparently: we only show you the result of the last retry.
