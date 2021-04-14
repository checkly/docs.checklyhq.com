---
title: SMS delivery
weight: 5
menu:
  docs:
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
