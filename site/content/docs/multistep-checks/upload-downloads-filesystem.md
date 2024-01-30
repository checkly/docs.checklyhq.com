---
title: File uploads, downloads and the file system
weight: 20
menu:
  resources:
    parent: "Multistep API checks"
    identifier: "multistep-checks-uploads"
cli: true
---

You might want to use (binary) files in your Multistep checks. For example, you might want to upload a file to an API endpoint using a binary body. Or, you might want to validate some aspect of a file that is available for download on your
app.

## Testing uploads using HTTP POST requests

To test any binary uploads, you need to provide a file object. Currently, Checkly does not have a dedicated storage layer 
where you could upload that file, so you need to host it yourself at a (publicly) accessible location like an AWS S3 bucket, 
Dropbox or any other file hosting service.

Having done that, you can "upload" files using a simple HTTP POST request with a (binary) body using Playwright's built-in `request` object.

{{< tabs "Basic HTTP upload example" >}}
{{< tab "Typescript" >}}
```ts
import { test, expect } from '@playwright/test'

test('Upload a file using a POST request', async ({ request }) => {
  const fileBuffer = await test.step('Fetch file', async () => {
    const fileUrl  = 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf'
    return request.get(fileUrl)
  })

  await test.step('Upload file', async () => {
    const response = await request.post('https://filebin.net/pp9on3zvwv7zq6lm/dummy.pdf', {
      data: await fileBuffer.body(),
    })
    await expect(response).toBeOK()
  })
})
```
{{< /tab >}}
{{< tab "Javascript" >}}
```js
const { test, expect } = require('@playwright/test')

test('Upload a file using a POST request', async ({ request }) => {
  const fileBuffer = await test.step('Fetch file', async () => {
    const fileUrl  = 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf'
    return request.get(fileUrl)
  })

  await test.step('Upload file', async () => {
    const response = await request.post('https://filebin.net/pp9on3zvwv7zq6lm/dummy.pdf', {
      data: await fileBuffer.body(),
    })
    await expect(response).toBeOK()
  })
})
```
{{< /tab >}}
{{< /tabs >}}

## Using the file system

{{< markdownpartial "/_shared/using-the-file-system.md" >}}
