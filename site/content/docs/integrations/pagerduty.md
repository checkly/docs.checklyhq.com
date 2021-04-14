---
title: Pagerduty
weight: 3
menu:
  docs:
    parent: "Integrations"
aliases:
- "/whats-new/introducing-sms-pagerduty/docs/alerting/pagerduty/"
---

Checkly integrates with [Pagerduty](https://pagerduty.com) and can deliver all failure and recovery events
to your Pagerduty account. After setting up the integration, Checkly will:

1. Trigger alerts in Pagerduty when a check fails.
2. Resolve alerts when a check recovers.

Setup is as simple as following the three-step Pagerduty connect process. You can add as many Pagerduty channels as
you wish.

1. Navigate to the **alert settings** tab on the account screen and click the 'Add channels' button.
![setup checkly pagerduty integration step 1](/docs/images/integrations/pagerduty_step1.png)

2. Clicking the **Alert with Pagerduty** button will take you to a Pagerduty login screen. Provide your credentials and click
**Authorize integration** to allow Checkly to integrate with Pagerduty.
![set up checkly pagerduty integration step 2](/docs/images/integrations/pagerduty_step2.png)

3. On the next screen you can either hook up Checkly to an existing service, or create a brand new service.
Click **Finish integration** to save your settings and redirect you back to Checkly.
![set up checkly pagerduty integration step 3](/docs/images/integrations/pagerduty_step3.png)

4. Back in Checkly, you should see your Pagerduty **integration credentials** reflected in the alert settings. Don't forget
to hit **Save Pagerduty channel**.

![set up checkly pagerduty integration step 4](/docs/images/integrations/pagerduty_step4.png)

5. Checkly will trigger an incident in Pagerduty when checks fail and also mark them as resolved when the checks are passing again.
![set up checkly pagerduty integration step 5](/docs/images/integrations/pagerduty_step5.png)
