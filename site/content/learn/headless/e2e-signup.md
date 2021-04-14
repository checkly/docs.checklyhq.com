---
title: E2E Signup
subTitle: Handling signups flows
date: 2020-06-30
author: Giovanni Rago
githubUser: ragog
tags:
  - e2e
  - signup

menu:
  learn:
    parent: "E2E"
---

Signups are key transactions in most web platforms, and therefore prime targets for automation.

Oftentimes, registering an account is where we will find longer forms asking the user to answer a variety of questions. Luckily, Puppeteer and Playwright are quick enough to blaze through these in seconds.

<!-- more -->

## Steps

The flow will often match the following:

1. Navigate to the signup form.
2. Fill in all text fields, check all boxes etc.
3. Submit the form by clicking a button.

We will likely want to also check that some change occurred in the UI to confirm that the registration worked.

{{< tabs "1" >}}
{{< tab "Puppeteer" >}}
```js
{{< readfile filename="samples/puppeteer/signup.js" >}}
```
{{< /tab >}}
{{< tab "Playwright" >}}
```js
{{< readfile filename="samples/playwright/signup.js" >}}
```
{{< /tab >}}
{{< /tabs >}}

Run this example as follows:
{{< tabs "2" >}}
{{< tab "macOS" >}}
```sh
USER_EMAIL=user@email.com USER_PASSWORD=supersecure1 node signup.js
```
{{< /tab >}}
{{< tab "Windows" >}}
```sh
SET USER_EMAIL=user@email.com
SET USER_PASSWORD=supersecure1
node signup.js
```
{{< /tab >}}
{{< /tabs >}}

The normal signup flow might include asking the user to confirm their email address right away by navigating to a URL included in an automated email. Reliably replicating the steps needed to achieve that is not trivial. A possible solution to the issue is having the system under test distinguish between test sessions and normal user sessions, and skip the verification step for test sessions. A way to achieve this would be to check for a specific user agent ID which could be set as part of our test:

```js
await page.setUserAgent('Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 \
(KHTML, like Gecko) Chrome/78.0.3904.108 Safari/537.36 TEST_ID/<MY_SECRET>');
```

## Takeaways

1. Use environment variables to inject secrets.
2. You might need to go through additional steps in case email confirmation or similar is required.
