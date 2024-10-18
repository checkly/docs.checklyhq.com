---
title: Send Alerts to Incident.io with Checkly
navTitle: Incident.io
weight: 58
menu:
  integrations:
    parent: "Integrations"
---

Checkly integrates with [Incident.io](https://incident.io/) to monitor your alerts and create / resolve incidents in your Incident.io account. Let's get started!

1. Log in to Incident.io and navigate to **Alerts > Sources**, click **New Alert Source** and select "Checkly"."

![incident.io integration step 1](/docs/images/integrations/incidentio/incident_io_step1.png)

2. Take note of the URL and API key that Incident.io provides you with, and head over to [Checkly > Alerts](https://app.checklyhq.com/alerts/settings), click **Add more channels** and select **Incident.io**.

![incident.io integration step 2](/docs/images/integrations/incidentio/incident_io_step2.png)

3. Copy and paste in the URL and API key and hit **Test Incident.io alert** to verify the connection. On the Incident.io side, you should now see a test alert pop up!

![incident.io integration step 3](/docs/images/integrations/incidentio/incident_io_step3.png)

4. We recommend one last step. Create a new custom attribute on the Incident.io side to grab the Checkly result link from the JSON payload. This will help reference what check result triggered an alert.

![incident.io integration step 4](/docs/images/integrations/incidentio/incident_io_step4.png)

5. Now you are all set up! When an alert is triggered, an incident will be created in Incident.io with the Checkly check result link attached.

![incident.io integration step 5](/docs/images/integrations/incidentio/incident_io_step5.png)

