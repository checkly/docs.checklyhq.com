---
title: Telegram
weight: 58
menu:
  integrations:
    parent: "Integrations"
---

Checkly integrates with [Telegram](https://telegram.org/) and can 
deliver failure, degradation, and recovery messages to any chat (direct or groups). You can add as many Telegram chats as you wish.
To enable the Telegram alert channel, you'll need two things:

1. Your own Telegram bot and it's associated HTTP API Token
2. Your own Telegram user's Chat ID

## Telegram Bot

1. Create a **Telegram Bot** using the [@BotFather](https://t.me/botfather) (detailed instruction [here](https://core.telegram.org/bots)).
   
   ![setup checkly telegram_bot step 1](/docs/images/integrations/telegram/telegram_step1.png)


2. As the last step of creating your new bot, the BotFather should reply with a message congratulating you that everything is complete and include a new HTTP API Token for you to use. Alternatively, if you want to reuse an existing Telegram bot you can message the BotFather with `/token` and they will generate a new token for you. **Make sure to copy this token value out as we'll be using it in the Checkly setup later.**

3. Start your new Telegram bot by opening a chat with it. You can use the **START** button in the UI or type the `/start` command message.

   ![setup checkly telegram_bot step 2](/docs/images/integrations/telegram/telegram_step2.png)

## Chat ID

There are multiple methods for getting your own users `chatId` in Telegram and we'll cover two of them. First, we can talk to another Telegram bot and they'll simply reply to us with our own ID. Second, we can use the newly created HTTP API Token to query the Telegram API.

#### ID Bot

You can retrieve your own Telegram Chat ID by starting a new chat with another bot. This Telegram user can be found under `@get_id_bot`. 

1. Send this `@get_id_bot` bot the command message `/my_id` and they will reply with a 9 digit number which identifies you in Telegram. **This is the second and last piece of information we need for the Telegram integration**.

#### API Query

1. To obtain the **Chat ID** you have to create a Telegram chat group chat with your new bot and yourself. Send a message with any content to the group chat.

   ![setup checkly telegram_bot step 4](/docs/images/integrations/telegram/telegram_step4.png)

   Then, you can use the previously obtained bot's HTTP API token to get your Chat ID from the Telegram API. 

2. In a browser, enter the the following URL: `https://api.telegram.org/bot<API_TOKEN>/getUpdates` of course replacing the `<API_TOKEN>` part with the actual token we obtained previously. That should return with some data which looks like the following:

   ![setup checkly telegram_bot step 5](/docs/images/integrations/telegram/telegram_step5.png)

   In the `result` array, you will see the message you sent to the group chat previously, including the `id` of the user who sent it - yourself. **This is the second and last piece of information we need for the Telegram integration**.

## Checkly Integration

With the HTTP API Token and Chat ID in hand, we can go back to Checkly and create a new Telegram alert channel.

1. Log in to Checkly and navigate to [Alert Settings](https://app.checklyhq.com/alert-settings). 
   Click the "Add more channels" button, find Telegram on the list, and click "Add channel".

   ![setup checkly telegram_bot step 6](/docs/images/integrations/telegram/telegram_step6.png)


2. Give the alert channel a name and **paste the API Token and Chat ID** in the dedicated input fields. Here you can also tweak
which alerts you want to be notified of and which checks or check groups should be subscribed to this channel.

   ![setup checkly telegram_bot step 7](/docs/images/integrations/telegram/telegram_step7.png)

   > Note that we provide a preconfigured message payload but you may want to edit the payload to add more or change
   > existing variables. Click the "Edit payload" button and reference the "Help & variables" tab.


Congratulations! You have successfully integrated Checkly with Telegram!

## Alternatives

Telegram also accepts messages via an HTTP `GET` request. So you can use the API Token and Chat ID to create a custom Telegram alert channel by leveraging our [**Webhook alert channel**](/docs/alerting/webhooks). The request should be a `GET` request with the URL `https://api.telegram.org/bot<API_TOKEN>/sendMessage?chat_id=<CHAT_ID>&text=Your%20Alert%20Title`. More information about sending messages via Telegram bots can be found [here](https://core.telegram.org/bots/api#sendmessage).
