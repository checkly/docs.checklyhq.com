---
title: Ilert
weight: 70
menu:
  integrations:
    parent: "Integrations"
---

Checkly integrates with [ilert](https://www.ilert.com/) to monitor your incidents in your ilert installation. Let's get started!

1. Log in to ilert and navigate to `Profile > Manage API Keys`.

![ilert integration step 1](/docs/images/integrations/ilert/ilert_step1.png)

2. Next, create and copy the generated API key to your clipboard.

![ilert integration step 2](/docs/images/integrations/ilert/ilert_step2.png)

3. Log in to Checkly and navigate to `Alert Settings`. Click the `Add more channels` button, find ilert icon on the list, and click `Add channel`.

![ilert integration step 3](/docs/images/integrations/ilert/ilert_step3.png)

4. Enter a name of your choosing for the alert channel, together with the ilert URL (`https://api.ilert.com/api/v1/events/checkly/{api-key}`). Make sure that the right checks are subscribing to the channel and that the `Send when` rules are correctly set, then hit `Save ilert Webhook`.

![ilert integration step 4](/docs/images/integrations/ilert/ilert_step4.png)

Congratulations, you've successfully integrated Checkly with ilert!
