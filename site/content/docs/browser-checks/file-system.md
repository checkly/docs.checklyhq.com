---
title: File uploads, downloads and the file system
weight: 20
menu:
  resources:
    parent: "Browser checks"
aliases:
  - /docs/browser-checks/file-system/
cli: true
---

You might want to use (binary) files in your browser checks. For example, you might want to upload a file to an upload 
form in your webapp. Or, you might want to validate some aspect of a file that is available for download on your
app.

## Testing uploads with the browser's File API

To test any upload features with Playwright's `.setInputFiles()` method, you need to provide a file object. Currently,
Checkly does not have a dedicated storage layer where you could upload that file, so you need to host it yourself at a (publicly)
accessible location like an AWS S3 bucket, Dropbox or any other file hosting service.

In the example below, we do not need to interact with the file system. We can just:

1. Fetch a file from a public URL using the `request` object.
2. Pass the resulting `Buffer` into the `.setInputFiles()` method.
3. Wait for the upload to finish.

{{< tabs "Basic upload test example" >}}
{{< tab "Typescript" >}}
```ts
import { test, expect } from '@playwright/test'

test('upload a file', async ({ page, request }) => {
  // fetch the file to upload  
  const fileUrl = 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf'
  const fileBuffer  = await request.get(fileUrl)
    
  // upload the file  
  await page.goto('https://filebin.net/')
  await page.getByLabel('Select files to upload').setInputFiles({
    name: 'file.pdf',
    mimeType: 'application/pdf',
    buffer: await fileBuffer.body()
  })
    
  // validate the upload was successful  
  await expect(page.getByRole('link', { name: 'Download file' })).toBeVisible()
  await page.screenshot({ path: 'filebin.png' })
})
```
{{< /tab >}}
{{< tab "Javascript" >}}
```js
const { test, expect } = require('@playwright/test')

test('upload a file', async ({ page, request }) => {
  // fetch the file to upload
  const fileUrl = 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf'
  const fileBuffer  = await request.get(fileUrl)

  // upload the file  
  await page.goto('https://filebin.net/')
  await page.getByLabel('Select files to upload').setInputFiles({
    name: 'file.pdf',
    mimeType: 'application/pdf',
    buffer: await fileBuffer.body()
  })
  
  // validate the upload was successful
  await expect(page.getByRole('link', { name: 'Download file' })).toBeVisible()
  await page.screenshot({ path: 'filebin.png' })
})
```
{{< /tab >}}
{{< /tabs >}}

Notice we don't need to interact with the file system, we can just pass buffers around.

## Testing uploads using HTTP POST requests

You can also "upload" files using a simple HTTP POST request with a (binary) body using Playwright's built-in `request` object.
You would use this when you want to test a file upload feature that is not using the browser's File API, but just an HTTP/REST endpoint
that accepts a file upload.

{{< tabs "Basic HTTP upload example" >}}
{{< tab "Typescript" >}}
```ts
import { test, expect } from '@playwright/test'

test('Upload a file using a POST request', async ({ request }) => {
  const fileUrl  = 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf'
  const fileBuffer  = await request.get(fileUrl)
  const response = await request.post('https://filebin.net/pp9on3zvwv7zq6lm/dummy.pdf', {
    data: await fileBuffer.body(),
  })
  await expect(response).toBeOK()
})
```
{{< /tab >}}
{{< tab "Javascript" >}}
```js
const { test, expect } = require('@playwright/test')

test('Upload a file using a POST request', async ({ request }) => {
  const fileUrl  = 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf'
  const fileBuffer  = await request.get(fileUrl)
  const response = await request.post('https://filebin.net/pp9on3zvwv7zq6lm/dummy.pdf', {
    data: await fileBuffer.body(),
  })
  await expect(response).toBeOK()
})
```
{{< /tab >}}
{{< /tabs >}}
  
## Using the file system

{{< markdownpartial "/_shared/using-the-file-system.md" >}}
