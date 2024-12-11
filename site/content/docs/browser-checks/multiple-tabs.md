---
title: Monitoring a scenario with multiple tabs - Checkly Docs
displayTitle: Monitoring a scenario with multiple tabs
navTitle: Multiple tabs
weight: 21
aliases:
- multiple-tabs
menu:
  resources:
    parent: "Browser checks"
cli: true
---

Certain scenarios may require us to create new or multiple tabs simultaneously. Playwright Test supports this case and, as a consequence, Checkly does as well.

## Handling links that open a new tab

By allowing us to wait for the creation of a child tab with `context.waitForEvent`, Playwright Test enables us to "catch" it following a click on an element with `target="_blank"`, and then seamlessly interact with any of the currently open tabs.

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

Playwright Test will record videos for each of your tabs. You can find them in your test result for failed checks or in the check editor for passing as well as failing checks for easy debugging.

<video alt="Checkly Playwright Test UI" autoplay loop muted src="/docs/images/browser-checks/multiple-tabs-pwt-report.mp4"></video>

Playwright's Trace Viewer displays your tabs conveniently in a waterfall timeline to access all neccessary information:
![mutiple tabs - trace viewer](/docs/images/browser-checks/multiple-tabs-trace-viewer.png)

{{< info >}}
You can learn more about multi-tab scripts in our [Learn Headless section](/learn/playwright/multitab-flows/).
{{< /info >}}
