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

## Installation

To install Checkly's native Vercel integration, navigate to `Integratons`, under your account's dropdown menu.

![vercel integration step 1](/docs/images/cicd/vercel/vercel_step1a.png)

After scrolling down, click the `Vercel marketplace` button.

![vercel integration step 2](/docs/images/cicd/vercel/vercel_step2.png)

On the marketplace page for Checkly, click `Add Integration`.

![vercel integration step 3](/docs/images/cicd/vercel/vercel_step3.png)

Next, follow the installation wizard to grant the integration access to the right Vercel scope and projects.

![vercel integration step 4](/docs/images/cicd/vercel/vercel_step4.png)

You can choose to map your Vercel projects to existing checks on your Checkly account, to have them run on production and/or preview deployments.

![vercel integration step 5](/docs/images/cicd/vercel/vercel_step5.png)

Additionally, you can have new checks automatically generated for existing Vercel projects, and set them up to automatically run on preview and/or production deployments.

![vercel integration step 6](/docs/images/cicd/vercel/vercel_step6.png)

## Linking checks and groups

If you already have the Vercel integration set up, you might still want to connect new checks or groups. The procedure is the same for both: edit the check or group and select `Link Vercel project` in the `CI/CD triggers` tab.

![linking existing check](/docs/images/cicd/vercel/vercel_existing.png)

You will just need to select the right project to link to your check or group.

![vercel project selection](/docs/images/cicd/vercel/vercel_link.png)

Once the project and the check/group have been linked, you are able to specify whether a new preview or production deployment should trigger a new execution. You will also have the chance to choose from which location this check will run.

![linked check](/docs/images/cicd/vercel/vercel_linked.png)

Should you wish to unlink the Vercel project, simply click `Unlink this project`.

## How Checkly checks maps to Vercel checks

Vercel recently released their [Checks functionality](https://vercel.com/docs/concepts/deployments/checks) and Checkly integrates deeply into this new API.
Vercel uses a slightly different way in representing checks than Checkly does, specifically splitting individual check results into either:

1. **Reliability checks**
2. **Performance checks**

This is how a Checkly check maps to a Vercel check:

- **API checks** are always mapped 1:1 and marked as a **Reliability** check.
- **Browser checks** are split into a **Performance** and **Reliability** check, where the Performance part is populated with Web Vitals data*.
- **Groups** of checks are "unfolded" in the Vercel user interface and all checks are shown individually.

&ast; *Web Vitals are only recorded for [Playwright-based Browser checks](/docs/browser-checks/tracing-web-vitals/#performance-tracing-with-web-vitals)*

## Blocking Vercel deployments

If you have the `Block my deployment when a check fails` checkbox enabled, Checkly informs Vercel whether a Vercel deployment should be "blocked" based on the following rules, per check type:

### API checks
For **API checks** any failing check results in a blocked Vercel deployment. This is a simple, binary state: it either fails or doesn't.

### Browser checks

For **Browser checks**, there are different ways a check can fail a Vercel deployment because the Reliability part and Performance part are evaluated separately.

**Browser Reliability check**

1. When the script has **syntax** errors, e.g `await pag.goto()`— note the missing `e`.
2. When the script **throws an error**. The `Error` can come from Playwright, a user supplied assertion using `expect` or any other user supplied code.
3. When a **script times out**. This can be anything from a domain not existing to a selector not being in the page. The default timeout is 30 seconds. This is essentially the same as throwing an `Error`.

**Browser Performance check**

A Browser check — when using the Playwright library — automatically [collects and reports Web Vital metrics](/docs/browser-checks/tracing-web-vitals/#performance-tracing-with-web-vitals). 
These Web Vitals are reported to Vercel as the separate Performance check.

Together with the team at Vercel, we developed some custom logic to **block** deployments if any Web Vitals on your project
degrade and cross from a "superior" range to a "inferior". For example, this could be going from **good** to **needs improvement**. 
These ranges are listed in the table below and are based on the guidelines developed by the [Web Vitals maintainers at Google.](https://web.dev/learn-web-vitals/)

| KPI | good       | needs improvement  | poor     |
|-----|------------|--------------------|----------|
| FCP | <= 1.8 sec | > 1.8 sec <= 3 sec | > 3 sec  |
| LCP | <= 2.5 sec | > 2.5 sec <= 4 sec | > 4 sec  |
| CLS | <= 0.1     | > 0.1  <= 0.25     | > 0.25   |
| TBT | <= 200 ms  | > 200 ms <= 600 ms | > 600 ms |


We will report a Browser Performance check as **passing** when:

1. The Web Vitals measurement on a previous deploy is missing, but the current deployment does have measurements; we assume the new score is better.
2. The Web Vitals measurements are within the target range.

We will report it as **blocking** when:

1. A check reports web vitals, and...
2. The web vitals have degraded in relation to the last available **Production** deploy. Degraded means they passed the range threshold, i.e from **poor** to **needs improvement**.

We will report it as **skipped** when:

1. A check doesn't report any Web Vitals. They are all `null`. This happens when for example when using Puppeteer based checks.
2. Or, the domain of the visited URL in the script does not match the domain of the **deployment URL**. In 9 out of 10 cases this should be the URL for your Preview and Production deployments.


## Vercel-linked check results 

When selecting a check which is linked to a Vercel project, any results triggered by a deployment on that project will show at the bottom of the check page, under the tab `CI/CD triggered check results`.

![cicd triggered check results tab](/docs/images/cicd/vercel/vercel_result.png)

On Vercel, you will also see a breakdown of checks that were executed on a given deployment, together with a breakdown of various key web vitals.

![vercel checks vitals](/docs/images/cicd/vercel/vercel_vitals.png)

{{< info >}}
Web vitals are available for Playwright-based browser checks using [runtime](/docs/runtimes/) 2021.06 or newer.
{{< /info >}}

### Deployments tab

The Deployments tab lists all deployments on linked projects, including Vercel-based ones, together with the check executions they triggered.

![deployments tab overview](/docs/images/cicd/vercel/vercel_deployments.png)

Selecting a deployment enables you to quickly determine whether it caused any check failures, and to drill into the relevant information in case it did.

![deployment detail](/docs/images/cicd/vercel/vercel_deployment.png)

## Password-protected deployments

You can also use Checkly together with Vercel's [password-protected deployments](https://vercel.com/docs/platform/projects#password-protection). You can bypass the login prompt as part of a [browser check](/docs/browser-checks/login-scenarios#password-protected-websites) or using an [API request](https://vercel.com/docs/platform/frequently-asked-questions#bypassing-password-protection-programmatically).
