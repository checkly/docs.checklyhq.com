---
title: Vercel
weight: 9
menu:
  docs:
    parent: "CI/CD integration"
---

If you are using Vercel to develop, preview, and ship your application, you can natively integrate with Checkly by [installing the official integration](https://vercel.com/integrations/checkly) from the Vercel Marketplace.

The Vercel integration will help you by:

1. Automatically creating a pre-scripted browser check to catch any errors and failed requests as your web page loads.
2. Enabling you to run checks against preview and production deployments on Vercel.

{{< info >}}
If the native integration described in this page does not fit your use case, you can also leverage Checkly together with Vercel through the [GitHub Deployments integration](/docs/cicd/github/).
{{< /info >}}

## Installation

To install Checkly's native Vercel integration, navigate to `Integratons`, under your account's dropdown menu.

![vercel integration step 1](/docs/images/cicd/vercel/vercel_step1a.png)

After scrolling down, click the `Vercel marketplace` button.

![vercel integration step 2](/docs/images/cicd/vercel/vercel_step2.png)

On the marketplace page for Checkly, click `Add`.

![vercel integration step 3](/docs/images/cicd/vercel/vercel_step3.png)

Next, follow the installation wizard to grant the integration access to the right Vercel scope and projects.

![vercel integration step 4](/docs/images/cicd/vercel/vercel_step4.png)

You can choose to map your Vercel projects to existing checks on your Checkly account, to have them run on production and/or preview deployments.

![vercel integration step 5](/docs/images/cicd/vercel/vercel_step5.png)

Additionally, you can have new checks automatically generated for existing Vercel projects, and set them up to automatically run on preview and/or production deployments.

![vercel integration step 6](/docs/images/cicd/vercel/vercel_step6a.png)

## Linking checks and groups

If you already have the Vercel integration set up, you might still want to connect new checks or groups. The procedure is the same for both: edit the check or group and select `Link Vercel project` in the `CI/CD triggers` tab.

![linking existing check](/docs/images/cicd/vercel/vercel_existing.png)

You will just need to select the right project to link to your check or group.

![vercel project selection](/docs/images/cicd/vercel/vercel_link.png)

Once the project and the check/group have been linked, you are able to specify whether a new preview or production deployment should trigger a new execution.

![linked check](/docs/images/cicd/vercel/vercel_linked.png)

Should you wish to unlink the Vercel project, simply click `Unlink this project`.

## Password-protected deployments

You can also use Checkly together with Vercel's [password-protected deployments](https://vercel.com/docs/platform/projects#password-protection). You can bypass the login prompt as part of a [browser check](/docs/browser-checks/login-scenarios#password-protected-websites) or using an [API request](https://vercel.com/docs/platform/frequently-asked-questions#bypassing-password-protection-programmatically).

{{< info >}}
This is a v1 integration. We are working on providing additional functionality, as well a smoother experience in v2.
{{< /info >}}