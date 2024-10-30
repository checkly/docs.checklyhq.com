---
title: Send Alerts to ilert with Checkly - Checkly Docs
displayTitle: Send Alerts to ilert
navTitle: ilert
weight: 70  
menu:
  integrations:
    parent: "Integrations"
---

Checkly integrates with [ilert](https://www.ilert.com/) to monitor your incidents in your ilert installation. Let's get started!

1. Log in to ilert and navigate to `Alert sources > Create a new alert source`.

![ilert integration step 1](/docs/images/integrations/ilert/ilert_step1.png)

2. Next, create a new alert source with Checkly as integration type.

![ilert integration step 2](/docs/images/integrations/ilert/ilert_step2.png)

3. Copy the generated API key to your clipboard.

![ilert integration step 3](/docs/images/integrations/ilert/ilert_step3.png)

4. Log in to Checkly and navigate to `Alert Settings`. Click the `Add more channels` button, find ilert icon on the list, and click `Add channel`.

![ilert integration step 4](/docs/images/integrations/ilert/ilert_step4.png)

5. Enter a name of your choosing for the alert channel, together with the ilert URL and your API key (`https://api.ilert.com/api/v1/events/checkly/{api-key}`). Make sure that the right checks are subscribing to the channel and that the `Send when` rules are correctly set, then hit `Save ilert Webhook`.

![ilert integration step 5](/docs/images/integrations/ilert/ilert_step5.png)

Congratulations, you've successfully integrated Checkly with ilert!
