---
title: How to Download Files with Playwright
subTitle: Different ways of handling downloads
date: 2020-09-09
author: Giovanni Rago
githubUser: ragog
tags:
  - e2e
  - file download
navTitle: Downloading files
weight: 4
menu:
  learn:
    parent: "E2E examples"
---

Websites might expose files for users to download and then access from their local machine. Common cases are downloading tickets, receipts and itineraries.

<!-- more -->

## Steps

This example runs against our [test webshop](https://danube-web.shop/) and proceeds to download a receipt for a previous purchase. It includes the following steps:

1. Logging in to the website
2. Navigating to the account page
3. Downloading a linked file

We will check that the downloaded file is as expected by comparing it to a [fixture file](/learn/playwright/handling-test-data/) in our final assertion.

We can approach this scenario in different ways. One possibility is to perform the first two steps, then [extract](/learn/playwright/web-scraping/) 
the `href` value and use it to retrieve the file with a `GET` request (performed with [axios](https://github.com/axios/axios), for example).

```ts {hl_lines=["14-18"]}
{{% readfile filename="samples/playwright/file-download.ts" %}}
```

We could also click the link directly and wait for the download event, then proceed with the comparison.
Note that in this case, we need to enable downloads in the browser context before proceeding.

```ts {hl_lines=["13-19"]}
{{% readfile filename="samples/playwright/file-download-alt.ts" %}}
```

Both examples can be run as follows:
{{< tabs "3" >}}
{{< tab "macOS" >}}
```bash
USER_EMAIL=user@email.com USER_PASSWORD=supersecure1 npx playwright test file-download.js
```
{{< /tab >}}
{{< tab "Windows" >}}
```bash
SET USER_EMAIL=user@email.com
SET USER_PASSWORD=supersecure1
npx playwright test file-download.js
```
{{< /tab >}}
{{< /tabs >}}

## Takeaways

1. Use environment variables to inject secrets.
2. Compare the expected file with the newly downloaded one.
3. There is more than one way to download a file within our script.

## Further reading

1. [Playwright's](https://playwright.dev/#version=v1.3.0&path=docs%2Fapi.md&q=class-download) documentation on downloading files.
