---
title: Using the file system
weight: 20
menu:
  resources:
    parent: "Browser checks"
cli: true
---

Checkly creates a sandboxed directory for each check run. During the run you can use this directory to save or upload artifacts. This directory is destroyed after a check is finished.

Due to this sandbox, certain Node.js variables are adapted to our platform and have values we set for them:
* `__dirname` will have the value of `/`
* `__filename` will have the value of `/script.js`

The values these variables correspond to might change in the future. Therefore, we recommend using `__dirname`, like `path.join(__dirname, 'example.png')` or relative paths, like `./example.png` or just `example.png`, while using the file system-related operation. You can find an example code snippet below:


{{< tabs "Basic example" >}}
{{< tab "Typescript" >}}
```ts
import path from 'path'
import fs from 'fs'
import { test } from '@playwright/test'

test('save file in directory', async ({ page }) => {
  const image = await page.goto('https://picsum.photos/200/300')
  const imagePath = path.join(__dirname, 'example.jpg')
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

test('save file in directory', async ({ page }) => {
  const image = await page.goto('https://picsum.photos/200/300')
  const imagePath = path.join(__dirname, 'example.jpg')
  const buffer = await image.body()
  fs.writeFileSync(imagePath, buffer)
  const readFileFromDisk = fs.readFileSync(imagePath)
})
```
{{< /tab >}}
{{< /tabs >}}
