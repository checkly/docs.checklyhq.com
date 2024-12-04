---
title: How to Automate Microsoft Live Login with Playwright
subTitle: Dealing with Microsoft authentication
date: 2020-06-22
author: Tim Nolet
githubUser: tnolet
tags:
  - login
  - e2e
navTitle: Microsoft Live Auth
weight: 8
menu:
  learn:
    parent: "E2E examples"
---

Playwright allows us to automate logging in to a Microsoft Online account.

<!-- more -->

## Steps

1. We start at `https://login.microsoftonline.com/`
2. We provide the username and password, injected by using environment variables
3. We are redirected to the main account page

```ts {title="ms-account-login.spec.ts"}
{{% readfile filename="samples/playwright/ms-account-login.spec.ts" %}}
```
Run this example as follows. Replace the username and password placeholder with your own credentials.

{{< tabs "2" >}}
{{< tab "macOS" >}}
```sh
MS_USER=username MS_PWD=password npx playwright test ms-account-login.spec.ts
```
{{< /tab >}}
{{< tab "Windows" >}}
```sh
SET MS_USER=username
SET MS_PWD=password
npx playwright test ms-account-login.spec.ts
```
{{< /tab >}}
{{< /tabs >}}


> This example does not work when you have 2-factor authentication enabled, and you might trigger a recaptcha check.

## Takeaways

1. Use environment variables to inject secrets.
2. Wait for the navigation as your are redirected to Microsoft.
3. Wait for the navigation as you are redirected back to the start site.





