---
title: Creating an API key
weight: 54
menu:
  resources:
    parent: "Accounts & Users"
---

The Checkly public API and CLI use API keys to authenticate requests. API keys come in two flavors: **user API keys** 
and **service API keys**.

## User API keys

User API keys are tied to one specific user in your account and inherit the access level of that user, i.e. "read only" or "admin".
When a user is removed from your account, that user's API keys are no longer able to access your account through the API.

**Steps to create an user API key:** 

1. Go to the API keys section in the [User Settings](https://app.checklyhq.com/settings/user/).
2. Click **Create new API key**.
3. Enter a name for the API key in the dialog box and confirm.
4. The new API key is shown and can be copied. Make sure to copy it immediately as it won't be shown again.

### Using a user API key

Use the API key as a Bearer token in the Authorization header when calling the Checkly API, e.g.
You also need to set your target Account ID, you can find the Checkly Account ID under your [Account Settings](https://app.checklyhq.com/settings/account/general). 
If you don’t have access to account settings, please contact your account owner/admin.


```sh
curl -H "Authorization: Bearer my_user_api_key" -H "X-Checkly-Account: my_account_ID" https://api.checklyhq.com/v1/checks
```

### Deleting a user API key

Only the user can delete an API key. To delete an API key click on the **Delete** icon in the Api Keys section of the [User Settings](https://app.checklyhq.com/settings/user/). 
If you wish to revoke access of a user to an account, remove the user from the team in the [Team section of Account Settings](https://app.checklyhq.com/settings/account/team). 

## Service API keys

Service API keys are specific to one account and are not tied to a user. This means that service API keys can be used to 
access your account even if the user that created the API key is removed from your account.

{{< info >}}
Service API keys are available on the [Enterprise plan](https://www.checklyhq.com/pricing/) only
{{< /info >}}

Service API keys allow you to set a role access level on the key itself, e.g. "read only", "admin" etc. 

Prime use cases for service API keys are:

- Background services like CI pipelines invoke the [Checkly CLI](/docs/cli).
- Any custom integrations that needs to create, update or delete resources through our public API.
- Replacing user API keys for customers using our SSO integration and cannot create "service users" in their user directories
due to compliance reasons.

**Steps to create a service API key:**

Only users with the Admin and Owner role can create service API keys.

1. Go to the API keys section in the [Account Settings](https://app.checklyhq.com/settings/account/api-keys).
2. Click **Create service API key**.
3. Enter a name for the API key in the dialog box and select the role.
4. The new API key is shown and can be copied. Make sure to copy it immediately as it won't be shown again.

### Using a service API key

Use the service API key as a Bearer token works the same as user API keys. Set the Authorization header and provide the
target Account ID, e.g.

```sh
curl -H "Authorization: Bearer my_service_api_key" -H "X-Checkly-Account: my_account_ID" https://api.checklyhq.com/v1/checks
```

### Deleting a service API key

Only Admin and Owner users can delete an API key. To delete an API key click on the **Delete** icon in the Service Api 
Keys section of the [Account Settings](https://app.checklyhq.com/settings/account/api-keys).

