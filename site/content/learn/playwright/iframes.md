---
title: Interacting with iframes using Playwright
subTitle: Accessing and interacting with iframes
date: 2022-08-25
author: Stefan Judis
githubUser: stefanjudis
tags:
  - iframes
weight: 6
navTitle: Interacting with iframes
menu:
  learn:
    parent: "Interaction"
---

Playwright enables us to access and interact with iframes.

## Locate an iframe and its elements

To access iframe elements, locate the iframe and query the DOM elements as if you're in the page context.

{{< tabs "1" >}}
{{< tab "Playwright" >}}
```js
{{< readfile filename="samples/playwright/iframe-access.js" >}}
```
{{< /tab >}}

{{< /tabs >}}

## Further reading

1. [Playwright's "Frames documentation"](https://playwright.dev/docs/frames)
