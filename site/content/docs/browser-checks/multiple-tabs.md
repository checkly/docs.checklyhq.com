---
title: Multiple tabs
weight: 21
aliases:
- multiple-tabs
menu:
  docs:
    parent: "Browser checks"
---

Certain scenarios might requires us to handle new tab creation or multiple tabs at once. Playwright supports this case and, as a consequence, Checkly does as well.

## Handling links that open a new tab

By allowing us to wait for the creation of a child tab with `context.waitForEvent`, Playwright enables us to "catch" it following a click on an element with `target="_blank"`, and then seamlessly interact with any of the currently open tabs. 

{{< tabs "Multiple tabs" >}}
{{< tab "Typescript" >}}
```ts
import { test } from '@playwright/test'

test('Open new tab', async ({ context, page }) => {
  await page.goto('https://www.checklyhq.com/')

  const [newPage] = await Promise.all([
    context.waitForEvent('page'),
    page.getByRole('link', { name: 'Public Roadmap' }).click()
  ])

  await page.screenshot({ path: 'screenshot-tab-old.png' })

  await newPage.getByText('By quarter').click()
  await newPage.screenshot({ path: 'screenshot-tab-new.png' })
})
```
{{< /tab >}}
{{< tab "Javascript" >}}
```js
const { test } = require('@playwright/test')

test('Open new tab', async ({ context, page }) => {
  await page.goto('https://www.checklyhq.com/')

  const [newPage] = await Promise.all([
    context.waitForEvent('page'),
    page.getByRole('link', { name: 'Public Roadmap' }).click()
  ])

  await page.screenshot({ path: 'screenshot-tab-old.png' })

  await newPage.getByText('By quarter').click()
  await newPage.screenshot({ path: 'screenshot-tab-new.png' })
})
```
{{< /tab >}}
{{< /tabs >}}

{{< info >}}
You can learn more about multi-tab scripts in our [Learn Headless section](/learn/headless/multitab-flows).
{{< /info >}}
