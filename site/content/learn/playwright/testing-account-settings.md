---
title: How to Test Account Settings with Playwright
subTitle: Modifying account settings with a file upload
date: 2020-07-22
author: Giovanni Rago
githubUser: ragog
tags:
  - e2e
  - file upload
weight: 2

navTitle: Account settings

menu:
  learn:
    parent: "E2E examples"
---

Most services allow users to manage their account settings. These oftentimes have far-reaching implications on how the user experiences the platform. Verifying that the account settings can be viewed and modified is key in making sure we are offering a smooth service.

<!-- more -->

## Steps

Account properties to verify can run the gamut from simple text to connected third party services. In this example, we will focus on a popular case: changing a profile image by uploading one of our own.

On our [test site](https://danube-web.shop/), such a test could look as follows:

```js {hl_lines=["19-22"]}
{{% readfile filename="samples/playwright/file-upload.js" %}}
```
{{< tabs "2">}}
{{< tab "macOS" >}}
```sh
USER_EMAIL=user@email.com USER_PASSWORD=supersecure1 FILE_PATH=file.jpg node file-upload.js
```
{{< /tab >}}
{{< tab "Windows" >}}
```sh
SET USER_EMAIL=user@email.com
SET USER_PASSWORD=supersecure1
SET FILE_PATH=file.jpg
node file-upload.js
```
{{< /tab >}}
{{< /tabs >}}

Here, we are simply checking for a message giving us feedback on the status of the upload. Depending on the website we are testing, it might be possible to also download the profile image afterwards to run a comparison locally for a more robust check.

## Takeaways
1. Use environment variables to inject secrets.
2. Use `setInputFiles` (Playwright) to upload the file.
3. If possible, download the file from the platform and compare it with the one that was just uploaded.

## Further reading
1. Official documentation from [Playwright](https://playwright.dev/docs/input#upload-files)
