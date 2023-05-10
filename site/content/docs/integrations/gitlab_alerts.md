---
title: GitLab Alerts
weight: 60
menu:
  integrations:
    parent: "Integrations"
---

Checkly integrates with [GitLab Alerts](https://docs.gitlab.com/ee/operations/incident_management/alerts.html) and can
deliver failure, degradation, and recovery messages to any project in your GitLab installation. More specifically, Checkly will:

- Open new alerts when a check fails.
- Close alerts automatically when a failing check recovers.
- Alert when SSL certificates are about to expire.

1. First, create an **Incoming Webhook**. Log in to GitLab and go to "Settings" > "Operations" and expand the "Alerts" tab
and select the **HTTP Endpoint** integration type 

   ![setup checkly gitlab_integration step 1](/docs/images/integrations/gitlab/gitlab_step1.png)

2. **Choose a name** for your integration like "Checkly".

   ![setup checkly gitlab integration step 2](/docs/images/integrations/gitlab/gitlab_step2.png)

3. Save the integration **copy the displayed Webhook URL and Authorization Key**. It should start with something like `https://gitlab.com/...`

   ![setup checkly gitlab integration step 3](/docs/images/integrations/gitlab/gitlab_step3.png)


4. Log in to Checkly and navigate to [Alert Settings](https://app.checklyhq.com/alert-settings).
   Click the "Add more channels" button, find GitLab Alerts on the list, and click "Add channel".

   ![setup checkly gitlab_integration step 5](/docs/images/integrations/gitlab/gitlab_step4.png)


6. Give the alert channel a name and **paste the Webhook URL and Authorization Key** in their respective input fields. You can now also tweak
   which alerts you want to be notified of and which checks or check groups should be subscribed to this channel.

   ![setup checkly gitlab integration step 5](/docs/images/integrations/gitlab/gitlab_step5.png)

   > Note that we provide a preconfigured message payload but you are free to edit the payload and add more or different
   > variables. Just click the "Edit payload" button and reference the "Help & variables tab".

Congratulations! You have successfully integrated Checkly with GitLab Alerts!
