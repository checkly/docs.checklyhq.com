---
title: Environment variables
weight: 3
menu:
  docs:
    parent: "API checks"
    identifier: variables-api-checks
---

Multiple API checks can target the same server/service. In this case, your checks might need the same configuration item
like an authentication token, a specific user name or even just some specific part of the URL. You can use global variables to
'DRY' up your checks and store these variables in just one place.

## Managing variables

You can add variables on the **Environment variables** tab. The variables stored here are globally accessible
throughout Checkly, hence the "Global environment variables" title*.  

All variables are stored as string values. You can click the lock icon to encrypt the values and hide the value from all users
that do not have write access.

![adding variables](/docs/images/api-checks/add-variables.png)

## Accessing variables in API checks

Environment variables are exposed to your API checks using the common Handlebars/Moustache templating delimiters, i.e. `{{BASIC_PWD}}`.
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
