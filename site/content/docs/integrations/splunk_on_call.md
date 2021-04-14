---
title: Splunk On-Call
weight: 8
menu:
  docs:
    parent: "Integrations"
---

Checkly integrates with [Splunk On-Call](https://www.splunk.com/en_us/software/splunk-on-call.html) (formerly VictorOps) and can
deliver failure, degradation, and recovery messages to any routing key in any team. More specifically, Checkly will:

- Open new alerts when a check fails.
- Close alerts automatically when a failing check recovers.
- Alert when SSL certificates are about to expire.


1. First, create an **REST integration endpoint**. Log in to your Splunk On-Call account, go to "Integrations" and search for the *REST generic* integration.

   ![setup checkly splunk_integration step 1](/docs/images/integrations/splunk/splunk_step1.png)

2. Add the **REST generic** integration and click "Enable Integration" on the next screen. Now **copy the URL**.

   ![setup checkly splunk integration step 2](/docs/images/integrations/splunk/splunk_step2.png)

    > Notice that you need to **append a routing key**. This should be the routing key you associated with a group e.g. "database" or "product team"
    > For more details, [see the Splunk  / VictorOps knowledge base](https://help.victorops.com/knowledge-base/routing-keys/) 
   

3. Log in to Checkly and navigate to [Alert Settings](https://app.checklyhq.com/alert-settings).
   Click the "Add more channels" button, find Splunk On-Call on the list, and click "Add channel".

   ![setup checkly splunk integration step 3](/docs/images/integrations/splunk/splunk_step3.png)


4. Give the alert channel a name and **paste the URL** in the dedicated URL input field. You can now also tweak
   which alerts you want to be notified of and which checks or check groups should be subscribed to this channel.

   ![setup checkly splunk integration step 4](/docs/images/integrations/splunk/splunk_step4.png)

   > Note that we provide a preconfigured message payload but you are free to edit the payload and add more or different
   > variables. Just click the "Edit payload" button and reference the "Help & variables tab".

Congratulations! You have successfully integrated Checkly with Splunk On-Call!
