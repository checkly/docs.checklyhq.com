---
title: SMS delivery
weight: 34
menu:
  resources:
    parent: "Alerting & retries"
---

The phone numbers used for SMS alerting need to be in [E.164 format](https://www.twilio.com/docs/glossary/what-e164) format. Stick to the following rules and you'll be fine:

- Prepend international access codes with a + sign
- Do not use any white spaces
- Use up to 15 characters

![send monitoring alerts with SMS](/docs/images/alerting/sms.png)

You can add as many SMS channels as you like.

## Supported countries and regions

Checkly uses Twilio to deliver SMS messages. If you are having trouble receiving SMS
messages, check if your country is in the list on [this Twilio support page](https://www.twilio.com/en-us/guidelines/sms).

## SMS alert number and sender ID

SMS alerts will be sent with a sender ID and phone number. The Checkly sender ID is 'Checkly'. If your carrier does not support sender ID, you will instead see the Checkly SMS alert phone number, +1(814) 250 8623.

{{< info >}}
For limits and other SMS-related questions, please refer to our [Pricing page](https://www.checklyhq.com/pricing#features).
{{< /info >}}
