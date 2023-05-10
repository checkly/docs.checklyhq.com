---
title: Coralogix
weight: 69
menu:
  integrations:
    parent: "Integrations"
---

Checkly integrates with [Coralogix](https://coralogix.com/) to see your incidents in your Coralogix installation. Let's get started!

1. Log in to Coralogix and navigate to `Data Flow > API Keys`.

![coralogix integration step 1](/docs/images/integrations/coralogix/coralogix_step1.png)

2. Next, copy the generated "Send Your Data" API key to your clipboard.

![coralogix integration step 2](/docs/images/integrations/coralogix/coralogix_step2.png)

3. Log in to Checkly and navigate to `Alert Settings`. Click the `Add more channels` button, find Coralogix on the list, and click `Add channel`.

![coralogix integration step 3](/docs/images/integrations/coralogix/coralogix_step3.png)

4. Enter a name of your choosing for the alert channel, together with the Coralogix URL (ex. https://ingress.coralogix.com/logs/rest/singles, note that the API endpoint will change if the Coralogix instance is in the Europe or Asia) and the API key you copied from Coralogix. Make sure that the right checks are subscribing to the channel and that the `Send when` rules are correctly set, then hit `Save Coralogix Webhook`.

![coralogix integration step 4](/docs/images/integrations/coralogix/coralogix_step4.png)

Congratulations, you have successfully integrated Checkly with Coralogix!
