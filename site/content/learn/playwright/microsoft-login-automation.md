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

Playwright allows us to automate logging in to a Microsoft Live account.

<!-- more -->

## Steps

1. We start at `https://login.live.com`
2. We provide the username and password, injected by using environment variables
3. We are redirected to the main account page

```js
{{% readfile filename="samples/playwright/mslive-login.js" %}}
```
Run this example as follows. Replace the username and password placeholder with your own credentials.

{{< tabs "2" >}}
{{< tab "macOS" >}}
```sh
MSLIVE_USER=username MSLIVE_PWD=password node mslive-login.js
```
{{< /tab >}}
{{< tab "Windows" >}}
```sh
SET MSLIVE_USER=username
SET MSLIVE_PWD=password
node mslive-login.js
```
{{< /tab >}}
{{< /tabs >}}


> This example does not work when you have 2-factor authentication enabled, and you might trigger a recaptcha check.

## Takeaways

1. Use environment variables to inject secrets.
2. Wait for the navigation as your are redirected to Microsoft.
3. Wait for the navigation as you are redirected back to the start site.





