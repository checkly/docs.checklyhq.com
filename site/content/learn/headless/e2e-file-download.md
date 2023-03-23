---
title: E2E Upload & Download
subTitle: Different uses cases for file mgmt
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

For upload, we will update our profile by uploading a profile photo & for download we will download an old invoice.

Let's take a look!

<!-- more -->

## Steps
Both of these examples run against our [test webshop](https://danube-web.shop/). They include the following steps:

1. Logging in to the website
2. Navigating to the account page
3. Interacting with the account page 
    * Uploading a file
    * Downloading a file from an href element
## Upload example
In this example, we will focus on a popular case: changing a profile image by uploading one of our own.

On our [test site](https://danube-web.shop/), such a test could look as follows:

{{< tabs "1" >}}
{{< tab "Playwright" >}}
```js {hl_lines=["15-18"]}
{{< readfile filename="samples/playwright/file-upload.js" >}}
```
{{< /tab >}}
{{< tab "Puppeteer" >}}
```js {hl_lines=["29-35"]}
{{< readfile filename="samples/puppeteer/file-upload.js" >}}
```
{{< /tab >}}
{{< /tabs >}}

## Download example

We will check that the downloaded file is as expected by comparing it to an existing [example file](/learn/headless/test-data-intro) in our final assertion.

We can approach this scenario in different ways. One possibility is to perform the first two steps, then we could click the link directly and wait for the download event, then proceed with the comparison. Waiting for the download event is currently supported by Playwright, but not by Puppeteer.

Note: that in this first case, there is no Puppeteer example. 

{{< tabs "2" >}}
{{< tab "Playwright" >}}
```js {hl_lines=["17-20"]}
{{< readfile filename="samples/playwright/file-download-alt.js" >}}
```
{{< /tab >}}
{{< /tabs >}}

The Playwright and Puppeteer approach here is that we could [extract](/learn/headless/basics-scraping/) the `href` value and use it to retrieve the file with a `GET` request (performed with [axios](https://github.com/axios/axios), for example).


{{< tabs "3" >}}
{{< tab "Playwright" >}}
```js {hl_lines=["17-32"]}
{{< readfile filename="samples/playwright/file-download.js" >}}
```
{{< /tab >}}
{{< tab "Puppeteer" >}}
```js {hl_lines=["29-35"]}
{{< readfile filename="samples/puppeteer/file-download.js" >}}
```
{{< /tab >}}
{{< /tabs >}}

Both examples can be run as follows:
{{< tabs "4" >}}
{{< tab "macOS" >}}
```sh
USER_EMAIL=user@email.com USER_PASSWORD=supersecure1 npx playwright file-mgmt
```
{{< /tab >}}
{{< tab "Windows" >}}
```sh
SET USER_EMAIL=user@email.com
SET USER_PASSWORD=supersecure1
npx playwright file-mgmt
```
{{< /tab >}}
{{< /tabs >}}

## Takeaways

1. Playwright's code is concise & easy to maintain.
2. Use environment variables to inject secrets.
3. There is more than one way to download a file within our script.

## Further reading

1. [Playwright's](https://playwright.dev/#version=v1.3.0&path=docs%2Fapi.md&q=class-download) documentation on downloading files.
