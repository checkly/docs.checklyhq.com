---
title: Microsoft Teams
weight: 5
menu:
  docs:
    parent: "Integrations"
---

Checkly integrates with [Microsoft Teams](https://www.microsoft.com/en/microsoft-365/microsoft-teams/free) and can 
deliver failure, degradation, and recovery messages to any channel in any team. You can add as many Teams channels as you wish.
To enable the MS Teams alert channel, take the following steps:

1. First, create an **Incoming Webhook**. Log in to your MS Teams account, go to Apps and search for *incoming webhook*.
   
   ![setup checkly msteams_integration step 1](/docs/images/integrations/msteams/msteams_step1.png)

2. Select the **team or channel** where the Checkly alert notifications should go.

   ![setup checkly msteams integration step 2](/docs/images/integrations/msteams/msteams_step2.png)

3. **Choose a name** for your integration like "Checkly" and [add this Checkly icon](https://s3.eu-central-1.amazonaws.com/cdn.checklyhq.com/logos/fat_racoon_square.png)
   
   ![setup checkly msteams integration step 3](/docs/images/integrations/msteams/msteams_step3.png)

4. **Copy the displayed URL**. It should start with something like `https://outlook.office.com/webhook/...`. Don't forget to
    save the integration by clicking "Done".

   ![setup checkly msteams integration step 4](/docs/images/integrations/msteams/msteams_step4.png)

   
5. Log in to Checkly and navigate to [Alert Settings](https://app.checklyhq.com/alert-settings). 
   Click the "Add more channels" button, find MS Teams on the list, and click "Add channel".

   ![setup checkly msteams integration step 5](/docs/images/integrations/msteams/msteams_step5.png)


6. Give the alert channel a name and **paste the URL** in the dedicated URL input field. You can now also tweak
which alerts you want to be notified of and which checks or check groups should be subscribed to this channel.

   ![setup checkly msteams integration step 6](/docs/images/integrations/msteams/msteams_step6.png)

   > Note that we provide a preconfigured message payload but you are free to edit the payload and add more or different
   > variables. Just click the "Edit payload" button and reference the "Help & variables tab".

Congratulations! You have successfully integrated Checkly with Microsoft Teams!
