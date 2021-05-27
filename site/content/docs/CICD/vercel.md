---
title: Vercel
weight: 9
menu:
  docs:
    parent: "CI/CD integration"
---

If you are using Vercel to develop, preview, and ship your application you can natively integrate with Checkly by [installing the official integration from the Vercel Marketplace](https://vercel.com/integrations/checkly).

{{< info >}}
If the native integration described in this page does not fit your use case, you can also leverage Checkly together with Vercel through the [GitHub Deployments integration](/docs/cicd/github/).
{{< /info >}}

## Features

1. Automatically create a pre-scripted browser check to TODO list all the check does
2. TODO run against preprod and prod on vercel

{{< info >}}
This is a v1 integration. We are working on providing additional functionality, as well a smoother experience in v2.
{{< /info >}}

## Installation

To install Checkly's native Vercel integration, navigate to `Integratons`, under your account's dropdown menu.

![TODO](/docs/images/integrations/vercel/vercel_step1a.png)

After scrolling down, click the `Vercel marketplace` button.

![TODO](/docs/images/integrations/vercel/vercel_step2.png)

On the marketplace page for Checkly, click on `Add`.

![TODO](/docs/images/integrations/vercel/vercel_step3.png)

Next, follow the installation wizard to grant the integration access to the right Vercel scope and projects.

![TODO](/docs/images/integrations/vercel/vercel_step4.png)

You can choose to map your Vercel projects to existing checks on your Checkly account, to have them run on production and/or preview deployments.

![TODO](/docs/images/integrations/vercel/vercel_step5.png)

![TODO](/docs/images/integrations/vercel/vercel_step6a.png)

>sc

## Linking checks and groups

connect to actual check or group

## Password-protected deployments

TODO add browser scenario

> You can also use Checkly together with Vercel's [password-protected deployments](/docs/browser-checks/login-scenarios#password-protected-websites).
