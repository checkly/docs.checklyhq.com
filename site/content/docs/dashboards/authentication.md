---
title: Private Dashboards
weight: 48
menu:
  resources:
    parent: "Dashboards"
---

## Enabling Authentication

By default Checkly dashboards are public and visible to anyone who knows the URL. You can set a dashboard to private, limiting access to users with a password, or Checkly account.

To enable authentication on a dashboard, first navigate to the settings of the dashboard you wish to modify. Here you can toggle on password protection.

After enabling password protection, you will need to do the following.

1. Click "Save" to apply the changes.
2. Next, the "Generate Password" button will appear, click this.
3. It will open a modal which shows you your new private dashboard password.

Be careful, **this is the only time you will see this password in plaintext**. We do not store the password in plaintext, so if it is ever lost, you will need to regenerate a new one and inform any users of the new credentials.

{{< info >}}
Private Dashboards are available on the Team and Enterprise plans.
{{< /info >}}

## Access

After enabling password protection for your dashboard, you can continue to visit it via any custom domain you may have enabled. As well as the default `https://[dashboardId].checkly-dashboards.com` domain. The password authentication will continue to work via both channels. 

{{< info >}}
Checkly account login is only available to Enterprise customers.
{{< /info >}}

If visiting via the `https://[dashboardId].checkly-dashboards.com` domain, you can also select "Login with Checkly" and signin with your existing Checkly account via any of the supported methods (i.e. Google, Github, Username and Password). This is an enterprise only feature.
