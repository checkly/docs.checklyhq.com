---
title: Microsoft Live login
subTitle: Logging in to a Microsoft account
date: 2020-06-22
author: Tim Nolet
githubUser: tnolet
tags:
  - login
  - e2e

menu:
  learn:
    parent: "E2E"
---

Puppeteer and Playwright also allow us to automate logging in to a Microsoft Live account.

<!-- more -->

## Steps

1. We start at `https://login.live.com`
2. We provide the username and password, injected by using environment variables
3. We are redirected to the main account page

<!-- more -->

{{< tabs "1" >}}
{{< tab "Puppeteer" >}}
```js
{{< readfile filename="samples/puppeteer/mslive-login.js" >}}
```
{{< /tab >}}

{{< tab "Playwright" >}}
```js
{{< readfile filename="samples/playwright/mslive-login.js" >}}
```
{{< /tab >}}

{{< /tab >}}:

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





