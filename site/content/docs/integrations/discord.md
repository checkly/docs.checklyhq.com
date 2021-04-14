---
title: Discord
weight: 8
menu:
  docs:
    parent: "Integrations"
---

Checkly integrates with [Discord](https://discord.com/) and can
deliver failure, degradation, and recovery messages to any project in your Discord server / channel.

1. First, create a **Webhook**. Log in to Discord and go to "Server Settings" > "Integrations" and click "Create Webhook".

   ![setup checkly discord step 1](/docs/images/integrations/discord/discord_step1.png)

2. **Choose a name** for your integration like "Checkly" and [add this Checkly icon](https://s3.eu-central-1.amazonaws.com/cdn.checklyhq.com/logos/fat_racoon_square.png).
    Click the "Copy the Webhook URL" to...well...copy the Webhook URL 

   ![setup checkly discord integration step 2](/docs/images/integrations/discord/discord_step2.png)


3. Log in to Checkly and navigate to [Alert Settings](https://app.checklyhq.com/alert-settings).
   Click the "Add more channels" button, find Discord on the list, and click "Add channel".

   ![setup checkly discord integration step 3](/docs/images/integrations/discord/discord_step3.png)


4. Give the alert channel a name and **paste the Webhook URL** in their respective input fields. You can now also tweak
   which alerts you want to be notified of and which checks or check groups should be subscribed to this channel.

   ![setup checkly discord integration step 4](/docs/images/integrations/discord/discord_step4.png)

   > Note that we provide a preconfigured message payload but you are free to edit the payload and add more or different
   > variables. Just click the "Edit payload" button and reference the "Help & variables tab".

Congratulations! You have successfully integrated Checkly with Discord!
