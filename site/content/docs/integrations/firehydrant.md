---
title: FireHydrant
weight: 68
menu:
  integrations:
    parent: "Integrations"
---

Checkly integrates with [FireHydrant](https://firehydrant.io/) to create and resolve incidents in your FireHydrant installation. More specifically, Checkly will:

* Alert you on Slack when a check fails, allowing you to create an incident on FireHydrant with one click.
* Close incidents automatically when a failing check recovers.

Assuming you already have [set up Slack on FireHydrant](https://support.firehydrant.io/hc/en-us/articles/360058203511), the integration can be configured as follows:

1. Log in to FireHydrant and navigate to `Integrations > Connected & available`, then select Checkly.

![firehydrant integration step 1](/docs/images/integrations/firehydrant/firehydrant_step1.png)

2. Next, copy the generated URL to your clipboard.

![firehydrant integration step 2](/docs/images/integrations/firehydrant/firehydrant_step2.png)

3. Log in to Checkly and navigate to `Alert Settings`. Click the `Add more channels` button, find FireHydrant on the list, and click `Add channel`.

![firehydrant integration step 3](/docs/images/integrations/firehydrant/firehydrant_step3.png)

4. Enter a name of your choosing for the alert channel, together with the URL you copied from FireHydrant. Make sure that the right checks are subscribing to the channel and that the `Send when` rules are correctly set, then hit `Save FireHydrant Webhook`.

![firehydrant integration step 4](/docs/images/integrations/firehydrant/firehydrant_step4.png)

You are all set! Now, when a check fails, you will see an alert in your configured Slack channel:

![firehydrant integration step 5](/docs/images/integrations/firehydrant/firehydrant_step5.png)

At this point, you can choose to either create an incident on FireHydrant or dismiss the alert. In case the related check recovers, the incident will be closed.

![firehydrant integration step 6](/docs/images/integrations/firehydrant/firehydrant_step6.png)

Congratulations, you have successfully integrated Checkly with FireHydrant!
