---
title: Variables and secrets - Checkly Docs
displayTitle: Variables and secrets
navTitle: Variables and secrets
weight: 9
menu:
  resources:
    parent: "API checks"
    identifier: variables-api-checks

---

Multiple API checks can target the same server/service. In this case, your checks might need the same configuration item
like an authentication token, a specific user name or even just some specific part of the URL. You can use variables to
'DRY' up your checks and store these variables in just one place.

{{< markdownpartial "_shared/variables-and-secrets.md" >}}

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
