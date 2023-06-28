---
title: Phone Calls
weight: 34
menu:
  resources:
    parent: "Alerting"
---

The phone numbers used for phone calls alerting need to be in E.164 format. Stick to the following rules and you'll be fine:

- Prepend international access codes with a + sign
- Do not use any white spaces
- Use up to 15 characters

![send monitoring alerts with SMS](/docs/images/alerting/phone-call.png)

You can add as many phone number channels as you like.

## Supported countries and regions

| Country |
| ------ |
| Germany |
| United States |
| France |
| United Kingdom |
| India |
| Norway |
| Brazil |
| Netherlands |
| Vietnam |
| Canada |
| Australia |

{{< warning >}}
If you country is not supported feel free to reach out our [support team](mailto:support@checklyhq.com).
{{< /warning >}}

## Phone call number and sender ID

Phone calls alerts will be sent with a sender ID and phone number. But not all carriers support that. For instance, the number the call is sent from in the US will be +18142508623. But in other countries only the sender ID will be displayed, which is "Checkly". 

{{< info >}}
For limits and other phone call related questions, please refer to our [Pricing page](https://www.checklyhq.com/pricing#features).
{{< /info >}}
