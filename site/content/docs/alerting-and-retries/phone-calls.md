---
title: Alerting with phone calls in Checkly - Checkly Docs
displayTitle: Alerting with phone calls in Checkly
navTitle: Phone Calls
weight: 35
menu:
  resources:
    parent: "Alerting & retries"
---

The phone numbers used for phone call alerting need to be in [E.164 format](https://www.twilio.com/docs/glossary/what-e164). Stick to the following rules, and you'll be fine:

- Prepend international access codes with a + sign
- Do not use any white spaces
- Use up to 15 characters

![send monitoring alerts with phone calls](/docs/images/alerting/phone-call.png)

You can add as many phone number channels as you like.

## Supported countries and regions

| Country |
| ------ |
| Australia (+61)             |
| Belgium (+32)               |
| Brazil (+55)                |
| Canada (+1)                 |
| France (+33)                |
| Germany (+49)               |
| India (+91)                 |
| Israel (+972)               |
| Lithuania (+370)            |
| Malta (+356)                |
| Netherlands (+31)           |
| Norway (+47)                |
| Vietnam (+84)               |
| United Arab Emirates (+971) |
| United Kingdom (+44)        |
| United States (+1)          |

>[!NOTE]
If your country is not supported feel free to reach out to our [support team](mailto:support@checklyhq.com).

## Phone call number and sender ID

Phone call alerts always use the following number: +18142508623. You can save the number as a contact to allow alerts bypassing any do-not-disturb settings.

> For limits and other phone call related questions, please refer to our [Pricing page](https://www.checklyhq.com/pricing/#features).
