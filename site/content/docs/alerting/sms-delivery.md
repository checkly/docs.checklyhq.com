---
title: SMS delivery
weight: 34
menu:
  resources:
    parent: "Alerting"
---

The phone numbers used for SMS alerting need to be in E.164 format. Stick to the following rules and you'll be fine:

- Prepend international access codes with a + sign
- Do not use any white spaces
- Use up to 15 characters

![send monitoring alerts with SMS](/docs/images/alerting/sms.png)

You can add as many SMS channels as you like.

## Supported countries and regions

Checkly uses Amazon Web Services' SMS functionality to deliver SMS messages. If you are having trouble receiving SMS
messages, check if your country is in the list on [this AWS support page](https://docs.aws.amazon.com/sns/latest/dg/sms_supported-countries.html).

## SMS alert number and sender ID

SMS alerts will be sent with a sender ID and phone number. But not all carriers support that. For instance, the number the SMS is sent from in the US will be +18334730650. But in other countries only the sender ID will be displayed, which is "Checkly". 

{{< info >}}
For limits and other SMS-related questions, please refer to our [Pricing page](https://www.checklyhq.com/pricing#features).
{{< /info >}}
