---
title: How to Automate Google Login with Playwright
subTitle: Dealing with Google authentication
date: 2020-06-22
author: Tim Nolet
githubUser: tnolet
tags:
  - login
  - e2e
navTitle: Google Auth
weight: 9
menu:
  learn:
    parent: "E2E examples"
---

Social login using your personal Google or Google Gsuite account is a common use case for many login scenarios.

<!-- more -->

## Steps

1. We start at a site that offers Google as an authentication provider. In this case we use [Stack Overflow](https://stackoverflow.com/).
2. We fetch the login page and click the "Login with Google" button.
3. We are redirect to Google.
4. We provide the username and password, injected by using environment variables.
5. We are redirected back to the starting.

```js
{{% readfile filename="samples/playwright/google-login.js" %}}
```

Run this example as follows. Replace the username and password placeholder with your own credentials.

{{< tabs "2" >}}
{{< tab "macOS" >}}
```sh
GOOGLE_USER=username GOOGLE_PWD=password node google-login.js
```
{{< /tab >}}
{{< tab "Windows" >}}
```sh
SET GOOGLE_USER=username
SET GOOGLE_PWD=password
node google-login.js
```
{{< /tab >}}
{{< /tabs >}}


> This example does not work when you have 2-factor authentication enabled, and you might trigger a recaptcha check.

## Takeaways

1. Use environment variables to inject secrets.
2. Wait for the navigation as your are redirected to Google.
3. Wait for the navigation as you are redirected back to the start site.





