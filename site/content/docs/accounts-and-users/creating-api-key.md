---
title: Creating an API key
weight: 2
menu:
  docs:
    parent: "Accounts & Users"
---

The Checkly public API uses API keys to authenticate requests. API keys are unique to the user and not tied to an account. 

>Be aware that account-scoped API keys will be deprecated soon. Please create an API key for your user account in [User Settings](https://app.checklyhq.com/settings/user/).


**Steps to create an API key:** 

1. Go to the API keys section in the [User Settings](https://app.checklyhq.com/settings/user/).
2. Click **Create new API key**.
3. Enter a name for the API key in the dialog box.
4. Click **Create new API key**.
5. The new API key is shown and can be copied. Make sure to copy it immediately as it won't be shown again.

## Using an API key

Use the API key as a Bearer token in the Authorization header when calling the Checkly API, e.g.

You also need to set your target Account ID, you can find the Checkly Account ID under your [Account Settings](https://app.checklyhq.com/settings/account/general). If you don’t have access to account settings, please contact your account owner/admin.


```sh
curl -H "Authorization: Bearer my_token" -H "X-Checkly-Account: my_account_ID" https://api.checklyhq.com/v1/checks
```

## Deleting an API key

Only the user can delete an API key. To delete an API key click on the **Delete** icon in the Api Keys section of the [User Settings](https://app.checklyhq.com/settings/user/). 

If you wish to revoke access of a user to an account, remove the user from the team in the [Team section of Account Settings](https://app.checklyhq.com/settings/account/team). 

##
||
| ------------- |
<div class="contribute-doc">
<p><img src="/docs/images/icons/edit.png" width="14px" height="14px">
You can contribute to this documentation by 
<a href="https://github.com/checkly/checklyhq.com/tree/main/site/content/docs" target="_blank"> editing this page on Github </a></p>
</div>