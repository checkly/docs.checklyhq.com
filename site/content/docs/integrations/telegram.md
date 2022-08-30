---
title: Telegram
weight: 58
menu:
  docs:
    parent: "Integrations"
---

Checkly integrates with [Telegram](https://telegram.org/) and can 
deliver failure, degradation, and recovery messages to any chat (direct or groups). You can add as many Telegram chats as you wish.
To enable the Telegram alert channel, take the following steps:

1. First, create an **Telegram Bot** using the [@BotFather](https://t.me/botfather) (detailed instruction [here](https://core.telegram.org/bots)).
   
   ![setup checkly telegram_bot step 1](/docs/images/integrations/telegram/telegram_step1.png)

2. Start your new Telegram bot by adding it to your contacts list. You can use the **START** button at the bottom or the `/start` message command.

   ![setup checkly telegram_bot step 2](/docs/images/integrations/telegram/telegram_step2.png)

3. Create a new **Group** and add your bot as member. You can add the bot to any Telegram group.
   
   ![setup checkly telegram_bot step 3](/docs/images/integrations/telegram/telegram_step3.png)

4. To obtain the **Chat ID** you have to send a message to the group...

   ![setup checkly telegram_bot step 4](/docs/images/integrations/telegram/telegram_step4.png)

   Then, you can enter the `https://api.telegram.org/bot<API_TOKEN>/getUpdates` endpoint: you should see something like...

   ![setup checkly telegram_bot step 5](/docs/images/integrations/telegram/telegram_step5.png)

5. Log in to Checkly and navigate to [Alert Settings](https://app.checklyhq.com/alert-settings). 
   Click the "Add more channels" button, find Telegram on the list, and click "Add channel".

   ![setup checkly telegram_bot step 6](/docs/images/integrations/telegram/telegram_step6.png)


6. Give the alert channel a name and **paste the API Token and Chat ID** in the dedicated input fields. You can now also tweak
which alerts you want to be notified of and which checks or check groups should be subscribed to this channel.

   ![setup checkly telegram_bot step 7](/docs/images/integrations/telegram/telegram_step7.png)

   > Note that we provide a preconfigured message payload but you are free to edit the payload and add more or different
   > variables. Just click the "Edit payload" button and reference the "Help & variables tab".


> You can also use your `<API_TOKEN>` and `<CHAT_ID>` with a [Webhook alert channel](/docs/alerting/webhooks) by using a `GET` with `https://api.telegram.org/bot<API_TOKEN>/sendMessage?chat_id=<CHAT_ID>&text=Your%20Alert%20Title` to send a message with the bot (more information [here](https://core.telegram.org/bots/api#sendmessage))

Congratulations! You have successfully integrated Checkly with Telegram!
