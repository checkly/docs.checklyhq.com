---
title: How to Test File Uploads with Playwright
subTitle: Modifying account settings with a file upload
date: 2020-07-22
author: Giovanni Rago
githubUser: ragog
tags:
  - e2e
  - file upload
weight: 2

navTitle: File uploads

menu:
  learn_playwright:
    parent: "E2E examples"
---

Most services allow users to upload files to their accounts. This can be a profile picture, a document, or any other type of file. 
Testing this functionality is crucial to ensure that users can upload files without any issues. In this example, we will 
show you how to test file uploads using Playwright.

<!-- more -->

## Steps

Account properties to verify can run the gamut from simple text to connected third party services. In this example, we 
will focus on a popular case: changing a profile image by uploading one of our own.

On our [test site](https://danube-web.shop/), such a test could look as follows:

```ts {title="file-upload.ts" hl_lines=["12-13"]}
{{% readfile filename="samples/playwright/file-upload.ts" %}}
```
{{< tabs "2">}}
{{< tab "macOS" >}}
```sh
USER_EMAIL=user@email.com USER_PASSWORD=supersecure1 FILE_PATH=file.jpg npx playwright test file-upload.ts
```
{{< /tab >}}
{{< tab "Windows" >}}
```sh
SET USER_EMAIL=user@email.com
SET USER_PASSWORD=supersecure1
SET FILE_PATH=file.jpg
npx playwright test file-upload.ts
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
