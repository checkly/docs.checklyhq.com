---
title: Vercel
weight: 9
menu:
  docs:
    parent: "CI/CD integration"
---

If you are using Vercel to develop, preview, and ship your application, you can natively integrate with Checkly by [installing the official integration](https://vercel.com/integrations/checkly) from the Vercel Marketplace.

{{< info >}}
If the native integration described in this page does not fit your use case, you can also leverage Checkly together with Vercel through the [GitHub Deployments integration](/docs/cicd/github/).
{{< /info >}}

## Features

1. Automatically create a pre-scripted browser check to catch any errors and failed requests as your web page loads.
2. Run checks against preview and production deployments on Vercel

## Installation

To install Checkly's native Vercel integration, navigate to `Integratons`, under your account's dropdown menu.

![TODO](/docs/images/cicd/vercel/vercel_step1a.png)

After scrolling down, click the `Vercel marketplace` button.

![TODO](/docs/images/cicd/vercel/vercel_step2.png)

On the marketplace page for Checkly, click `Add`.

![TODO](/docs/images/cicd/vercel/vercel_step3.png)

Next, follow the installation wizard to grant the integration access to the right Vercel scope and projects.

![TODO](/docs/images/cicd/vercel/vercel_step4.png)

You can choose to map your Vercel projects to existing checks on your Checkly account, to have them run on production and/or preview deployments.

![TODO](/docs/images/cicd/vercel/vercel_step5.png)

Additionally, you can have new checks automatically generated for existing Vercel projects, and set them up to automatically run on preview and/or production deployments.

![TODO](/docs/images/cicd/vercel/vercel_step6a.png)

## Linking checks and groups

If you already have the Vercel integration set up, you might still want to connect new checks or groups. The procedure is the same for both: edit the check or group and select "Link Vercel project" in the `CI/CD triggers` tab.

![TODO](/docs/images/cicd/vercel/vercel_existing.png)

## Password-protected deployments

You can also use Checkly together with Vercel's [password-protected deployments](/docs/browser-checks/login-scenarios#password-protected-websites).
TODO add browser scenario

![TODO](/docs/images/cicd/vercel/vercel_link.png)

![TODO](/docs/images/cicd/vercel/vercel_linked.png)

{{< info >}}
This is a v1 integration. We are working on providing additional functionality, as well a smoother experience in v2.
{{< /info >}}