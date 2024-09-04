---
title: Environment variables and Secrets
weight: 9
menu:
  resources:
    parent: "API checks"
    identifier: variables-api-checks
cli: true
---

Multiple API checks can target the same server/service. In this case, your checks might need the same configuration item
like an authentication token, a specific user name or even just some specific part of the URL. You can use global variables to
'DRY' up your checks and store these variables in just one place.

## Variables and Secrets
There are two ways to store configuration information in Checkly: Environment variables and secrets. Both variables and secrets are encrypted at rest and in flight.
- **Environment variables** are used to store non-sensitive information. Variables are shown in plaintext when being edited, on the check result page and in logs. Variables can be accessed via the CLI and API.
- **Environment secrets** allow you to store sensitive data for use in checks. Once saved secrets are never shown in the UI or in logs. The secret value cannot be accessed via the CLI or API.

From here on, in this document, we refer to both variables and secrets as 'variables' for ease of reading, unless explicitly mentioned.

## Managing variables

You can manage environment variables for API checks at two different levels:

* Group level
* Global level
 
{{< markdownpartial "_shared/group-global-variables.md" >}}

## Accessing variables in API checks

Variables are exposed to your API checks using the common Handlebars/Moustache templating delimiters, i.e. `{{USER_API_KEY}}`. Note that Handlebars (double brackets) variables will be URI encoded. To avoid encoding, you can access your environment variables with triple brackets, i.e. `{{{USER_API_KEY}}}`.
Variables can be used in the following API checks fields:

- URL
- Body
- Header values
- Query parameters values
- Basic authentication username and password

## Using Handlebars helpers & built in variables

Next to your own variables, we've added some built-in variables and extended the [Handlebars](https://handlebarsjs.com/) templating system:

{{< markdownpartial "_shared/handlebars-helpers.md" >}}
