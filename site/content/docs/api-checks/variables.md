---
title: Environment variables
weight: 9
menu:
  docs:
    parent: "API checks"
    identifier: variables-api-checks
---

Multiple API checks can target the same server/service. In this case, your checks might need the same configuration item
like an authentication token, a specific user name or even just some specific part of the URL. You can use global variables to
'DRY' up your checks and store these variables in just one place.

## Managing variables

You can manage environment variables for API checks at two different levels:

* Group level
* Global level
 
Group variables are added on the Variables tab in a group. The variables stored here are accessible only in the group context.

![set group environment variable](/docs/images/api-checks/add-group-variable.png)

Global variables are added on the Variables tab. The variables stored here are globally accessible throughout Checkly, hence the “Global environment variables” title.

![set global environment variable](/docs/images/api-checks/add-global-variable.png)

All variables are stored as string values. You can click the lock icon to encrypt the values and hide the value from all users that do not have write access. Any data you “lock” is encrypted at rest and in flight on our back end and is only decrypted when needed.

## Accessing variables in API checks

Environment variables are exposed to your API checks using the common Handlebars/Moustache templating delimiters, i.e. `{{BASIC_PWD}}`. Note that Handlebars (double brackets) variables will be URI encoded. To avoid encoding, you can access your environment variables with triple brackets, i.e. `{{{BASIC_PWD}}}`.
Variables can be used in the following API checks fields:

- URL
- Body
- Header values
- Query parameters values
- Basic authentication username and password

When typing in most of the variable-enabled fields we show a small helper popup to help select the right variable.

![access variables](/docs/images/api-checks/access-variables.png)

Note, just the Body input field does not show this helper popup.

## Using Handlebars helpers & built in variables

Next to your own variables, we've added some built-in variables and extended the [Handlebars](https://handlebarsjs.com/) templating system:

{{< markdownpartial "_shared/handlebars-helpers.md" >}}

## Variable hierarchy
As API checks are scheduled, Checkly merges the check, group and global environment variables into one data set and exposes them to the runtime environment. During merging, any check variable with the same name as a global or group variable overrides that variable.

Or in another words:

> check variables trump group variables trump global variables.

You can make use of this by providing a default value for a specific variable at the global or group level, but allow that variable to be overridden at the check level.
