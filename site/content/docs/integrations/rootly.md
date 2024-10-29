---
title: Send Alerts to Rootly with Checkly - Checkly Docs
displayTitle: Send Alerts to Rootly
navTitle: Rootly
weight: 59
menu:
  integrations:
    parent: "Integrations"
---

Checkly integrates with [Rootly](https://rootly.com/) to monitor your alerts and create incidents in your Rootly account. Let's get started!

1. Log in to Rootly and navigate to **Alerts > Alert Sources**, click **Add Alert Source** and select "Checkly"."

2. Take note of the following:
   - The **API key** that Rootly.io provides you with.
   - The **type** you want to target: either **Service**, **Group** or **Escalation Policy**.
   - The **ID** of the target.
  Now head over to [Checkly > Alerts](https://app.checklyhq.com/alerts/settings), click **Add more channels** and select **Rootly**.

3. Copy and paste in the API key, select the type and paste in the ID.
4. Hit **Test Rootly alert** to verify the connection. On the Incident.io side, you should now see a test alert pop up!
5. Now you are all set up! When an alert is triggered, an incident will be created in Rootly.

