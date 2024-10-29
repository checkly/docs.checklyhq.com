---
title: Send Alerts to Microsoft Teams with Checkly - Checkly Docs
displayTitle: Send Alerts to Microsoft Teams
navTitle: Microsoft Teams
weight: 60
menu:
  integrations:
    parent: "Integrations"
---

Checkly integrates with [Microsoft Teams](https://www.microsoft.com/en/microsoft-365/microsoft-teams/free) and can 
deliver failure, degradation, and recovery messages to any channel in any team. You can add as many Teams channels as you wish.
To enable the MS Teams alert channel, take the following steps:

1. First, create a **Workflow**. Log in to your MS Teams account, go to Apps and search for *workflows*.
   
   ![setup checkly msteams_integration step 1](/docs/images/integrations/msteams/msteams_step1.png)

2. Open the *Workflows* app, go to *Create* and select the **Post to a channel when a webhook request is received** template, name your workflow, and press "Next".

   ![setup checkly msteams integration step 2](/docs/images/integrations/msteams/msteams_step2.png)

3. Select which *Team* and *Channel* the integration should post alert notifications to, then press "Create flow".

   ![setup checkly msteams integration step 3](/docs/images/integrations/msteams/msteams_step3.png)

4.  **Copy the displayed URL**. Then close the workflow setup by clicking "Done".

   ![setup checkly msteams integration step 4](/docs/images/integrations/msteams/msteams_step4.png)

   
5. Log in to Checkly and navigate to [Alert Settings](https://app.checklyhq.com/alert-settings/). 
   Click the "Add more channels" button, find MS Teams on the list, and click "Add channel".

   ![setup checkly msteams integration step 5](/docs/images/integrations/msteams/msteams_step5.png)


6. Give the alert channel a name and **paste the URL** in the dedicated URL input field. You can now also tweak
which alerts you want to be notified of and which checks or check groups should be subscribed to this channel.

   ![setup checkly msteams integration step 6](/docs/images/integrations/msteams/msteams_step6.png)

7. Save your alert channel. The next time checks subscribed to this channel triggers an alert, the integration will post a message to the configured Channel. 
Below is an example of an alert message using the default configuration.

   ![checkly msteams integration example](/docs/images/integrations/msteams/msteams_step7.png)

   > Note that we provide a preconfigured message payload but you are free to edit the payload and add more or different
   > variables. Just click the "Edit payload" button and reference the "Help & variables tab".

Congratulations! You have successfully integrated Checkly with Microsoft Teams!
