---
title: E2E Upload & Download
subTitle: Different ways of handling downloads
date: 2020-09-09
author: Giovanni Rago
githubUser: ragog
tags:
  - e2e
  - file download
  - file upload
  - beforeEach hooks
weight: 12
menu:
  learn:
    parent: "E2E examples"
---
Key interactions within modern web applications often require users to upload and download assets between the site and their local machines. 

In the two examples below we will walk through an account setting update where we upload a profile photo &  downloading an old invoice.

For these examples, we'll have two tests with our individual spec files. Within the Playwright examples, we'll be using a beforeEach hook to reduce duplicated code between our tests. 

<!-- more -->

## Steps
This example runs against our [test webshop](https://danube-web.shop/) and proceeds to download a receipt for a previous purchase. It includes the following steps:

1. Logging in to the website
2. Navigating to the account page
3. Interacting with the account page 
    * Uploading a file
    * Downloading a linked file

### 3 Using the beforeEach hook

To accomplish steps 1 & 2, we'll be using a beforeEach hook to keep our code lean in our approach. 

before & after hooks let us setup and tear down state for our tests. We'll have to login and navigate to the account page for each of our tests, so our beforeHooks handle that for us.
### 3a Steps for Upload
In this example, we will focus on a popular case: changing a profile image by uploading one of our own.

On our [test site](https://danube-web.shop/), such a test could look as follows:

{{< tabs "1" >}}
{{< tab "Playwright" >}}
```js {hl_lines=["23-28"]}
{{< readfile filename="samples/playwright/file-upload.js" >}}
```
{{< /tab >}}
{{< tab "Puppeteer" >}}
```js {hl_lines=["29-35"]}
{{< readfile filename="samples/puppeteer/file-upload.js" >}}
```
{{< /tab >}}
{{< /tabs >}}

### 3b Steps for Download

We will check that the downloaded file is as expected by comparing it to a [fixture file](/learn/headless/test-data-intro) in our final assertion.

We can approach this scenario in different ways. One possibility is to perform the first two steps, then [extract](/learn/headless/basics-scraping/) the `href` value and use it to retrieve the file with a `GET` request (performed with [axios](https://github.com/axios/axios), for example).

{{< tabs "2" >}}
{{< tab "Playwright" >}}
```js {hl_lines=["23-28"]}
{{< readfile filename="samples/playwright/file-download.js" >}}
```
{{< /tab >}}
{{< tab "Puppeteer" >}}
```js {hl_lines=["29-35"]}
{{< readfile filename="samples/puppeteer/file-download.js" >}}
```
{{< /tab >}}
{{< /tabs >}}

We could also click the link directly and wait for the download event, then proceed with the comparison. Waiting for the download event is currently supported by Playwright, but not by Puppeteer.

Note that in this case, we need to enable downloads in the browser context before proceeding.

{{< tabs "3" >}}
{{< tab "Playwright" >}}
```js {hl_lines=["8", "23-26"]}
{{< readfile filename="samples/playwright/file-download-alt.js" >}}
```
{{< /tab >}}
{{< /tabs >}}

Both examples can be run as follows:
{{< tabs "4" >}}
{{< tab "macOS" >}}
```sh
USER_EMAIL=user@email.com USER_PASSWORD=supersecure1 node file-download.js
```
{{< /tab >}}
{{< tab "Windows" >}}
```sh
SET USER_EMAIL=user@email.com
SET USER_PASSWORD=supersecure1
node file-download.js
```
{{< /tab >}}
{{< /tabs >}}

## Takeaways

1. Use environment variables to inject secrets.
2. Compare the expected file with the newly downloaded one.
3. There is more than one way to download a file within our script.

## Further reading

1. [Playwright's](https://playwright.dev/#version=v1.3.0&path=docs%2Fapi.md&q=class-download) documentation on downloading files.
