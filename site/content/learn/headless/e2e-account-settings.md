---
title: E2E Account Settings
subTitle: Different uses cases for file mgmt
date: 2020-07-22
author: Giovanni Rago
githubUser: ragog
tags:
  - e2e
weight: 9
menu:
  learn:
    parent: "E2E examples"
---
Key interactions within modern web applications often require users to upload and download assets between the site and their local machines. 

For upload, we will update our account settings by uploading a profile photo & for download we will download an old invoice.


<!-- more -->

## Steps

Account properties to verify can run the gamut from simple text to connected third party services. In this example, we will focus on a popular case, updating our profile settings by logging in and going to our user account page and submitting. 

On our [test site](https://danube-web.shop/), such a test could look as follows:

{{< tabs "1">}}
{{< tab "Playwright" >}}
```js {hl_lines=["20-22"]}
{{< readfile filename="samples/playwright/account-settings.js" >}}
```
{{< /tab >}}
{{< /tabs >}}

The example can be run as follows:
{{< tabs "2">}}
{{< tab "macOS" >}}
```sh
USER_EMAIL=user@email.com USER_PASSWORD=supersecure1 npx playwright test account-settings
```
{{< /tab >}}
{{< tab "Windows" >}}
```sh
SET USER_EMAIL=user@email.com
SET USER_PASSWORD=supersecure1
npx playwright test account-settings
```
{{< /tab >}}
{{< /tabs >}}

Here, we are simply checking for a message giving us feedback on the status of the update. 

## Takeaways
1. Use environment variables to inject secrets.