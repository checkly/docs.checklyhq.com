---
title: Incident.io
weight: 70
menu:
  integrations:
    parent: "Integrations"
---

Checkly integrates with [Incident.io](https://incident.io/) to monitor your alerts and create incidents in your Incident.io installation. Let's get started!

1. Log in to Incident.io and navigate to `Alerts > Routing` and create an HTTP alert source.

![incident.io integration step 1](/docs/images/integrations/incidentio/incidentio_step1.png)

2. Next, copy the generated "URL" and the API key from "Headers".

![incident.io integration step 2](/docs/images/integrations/incidentio/incidentio_step2.png)

3. Log in to Checkly and navigate to `Alert Settings`. Click the `Add more channels` button, find Incident.io on the list, and click `Add channel`.

![incident.io integration step 3](/docs/images/integrations/incidentio/incidentio_step3.png)

4. Enter a name of your choosing for the alert channel, together with the Incident.io URL (ex. `https://api.incident.io/v2/alert_events/http/{alert_source_config_id}`), and the API key you copied from Incident.io. Make sure that the right checks are subscribing to the channel and that the `Send when` rules are correctly set, then hit `Save Incident.io Webhook`.

![incident.io integration step 4](/docs/images/integrations/incidentio/incidentio_step4.png)

5. Once one of your selected checks triggers an alert you are going to see it on your Incident.io account.

![incident.io integration step 5](/docs/images/integrations/incidentio/incidentio_step5.png)

Congratulations, you've successfully integrated Checkly with Incident.io!
