---
title: Multiple tabs
weight: 21
aliases:
- multiple-tabs
menu:
  docs:
    parent: "Browser checks"
---

Certain scenarios might requires us to handle new tab creation or multiple tabs at once. Playwright and Puppeteer both support this case and, as a consequence, Checkly does as well.

## Handling links that open a new tab

By allowing us to wait for the creation of a child tab with `page.waitForEvent`, Playwright enables us to "catch" it following a click on an element with `target="_blank"`, and then seamlessly interact with any of the currently open tabs. 

With Puppeteer we need to follow a different procedure, using `page.waitForTarget` to grab the new tab once it has been opened.

{{< tabs "2" >}}
{{< tab "Playwright" >}}
```js
{{< readfile filename="samples/playwright/multitab-flows.js" >}}
```
{{< /tab >}}
{{< tab "Puppeteer" >}}
```js
{{< readfile filename="samples/puppeteer/multitab-flows.js" >}}
```
{{< /tab >}}
{{< /tabs >}}

{{< info >}}
You can learn more about multi-tab scripts in our [Learn Headless section](/learn/headless/multitab-flows).
{{< /info >}}
