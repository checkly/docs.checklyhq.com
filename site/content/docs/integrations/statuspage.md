---
title: StatusPage
weight: 64
menu:
  integrations:
    parent: "Integrations"
---

Checkly's webhooks can be used to automatically open incidents with [StatusPage](https://www.atlassian.com/software/statuspage). Assuming you already have your status page set up, the setup is as follows:

1. First of all, ensure you have an API key available for your status page. In case you don't, [create a new one](https://support.atlassian.com/statuspage/docs/create-and-manage-api-keys/). You will also need to make a note of your status page's id.

![status page api details page](/docs/images/integrations/statuspage/statuspage-api-page.png)

2. Next up, navigate to the Alert Settings tab on Checkly and add a new channel.

![checkly create alert](/docs/images/integrations/statuspage/statuspage_add_alert.png)

3. Select `Webhook`.

![checkly create webhook for statuspage](/docs/images/integrations/statuspage/statuspage_alert_channels.png)

4. Configuring the webhook, enter `POST` as method and `https://api.statuspage.io/v1/pages/<YOUR_PAGE_ID>/incidents` as URL. The body needs to be configured as shown in StatusPage's [official documentation](https://developer.statuspage.io/#operation/postPagesPageIdIncidents).

An example could be:

```json
{
  "incident": {
    "name": "{{ALERT_TITLE}}",
    "status": "investigating",
    "impact_override": "critical",
    "metadata": {},
    "deliver_notifications": true,
    "auto_tweet_at_beginning": false,
    "auto_tweet_on_completion": false,
    "auto_tweet_on_creation": false,
    "auto_tweet_one_hour_before": false,
    "backfill_date": "string",
    "backfilled": false,
    "body": "Something broke :(",
    "components": {},
    "component_ids": [],
    "scheduled_auto_transition": false
  }
}
```

Where the `name` field will be set to the title of the Checkly alert. See all [available alert variables](/docs/alerting/webhooks/#using-variables).

![checkly statuspage webhook body and url](/docs/images/integrations/statuspage/statuspage_body_url.png)

5. You will also need to provide your StatusPage API key in the `Authorization` header in the Headers tab, as well as select on which status the webhook should fire ("when a check fails", in this case), and which checks/groups should subscribe to the webhook. Subscribed checks and groups will trigger the webhook and open an incident.

![checkly webhook authorization header for statuspage](/docs/images/integrations/statuspage/statuspage_header_auth.png)

You are done! When a subscribed check fails, an incident will be opened on StatusPage:

![checkly statuspage integration end result](/docs/images/integrations/statuspage/statuspage_end_result.png)

> Note that currently, automatically resolving existing incidents on check recovery is not supported.

Congratulations! You have successfully integrated Checkly with StatusPage! 
