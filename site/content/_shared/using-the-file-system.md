---
sitemapExclude: true
---
Sometimes, you do want to explicitly save a file to disk. This is what you need to know.

Checkly creates a sandboxed directory for each check run. During the run you can use this directory to save or upload
artifacts. This directory is destroyed after a check is finished.

{{< tabs "Basic example" >}}
{{< tab "Typescript" >}}
```ts
import path from 'path'
import fs from 'fs'
import { test } from '@playwright/test'

test('Save file in directory', async ({ page }) => {
  const image = await page.goto('https://picsum.photos/200/300')
  const imagePath = path.join('example.jpg')
  const buffer = await image.body()
  fs.writeFileSync(imagePath, buffer)
  const readFileFromDisk = fs.readFileSync(imagePath)
})
```
{{< /tab >}}
{{< tab "Javascript" >}}
```js
const path = require('path')
const fs = require('fs')
const { test } = require('@playwright/test')

test('Save file in directory', async ({ page }) => {
  const image = await page.goto('https://picsum.photos/200/300')
  const imagePath = path.join('example.jpg')
  const buffer = await image.body()
  fs.writeFileSync(imagePath, buffer)
  const readFileFromDisk = fs.readFileSync(imagePath)
})
```
{{< /tab >}}
{{< /tabs >}}

Due to this sandbox, certain Node.js variables are adapted to our platform and have values we set for them. The behaviour
is slightly different when creating a browser check in the Web UI or using the Checkly CLI.

When creating a browser check in the Web UI, the variables are:

* `__dirname` will have the value of `/`
* `__filename` will have the value of `/script.js`

When creating a browser check using the Checkly CLI the variables are:

* `__dirname` will have the value of `/`
* `__filename` will have the value of the actual file in your code base, relative to the project root.
