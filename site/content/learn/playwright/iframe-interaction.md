---
title: How to Handle iFrames in Playwright
subTitle: Accessing and interacting with iframes
date: 2022-08-25
author: Stefan Judis
githubUser: stefanjudis
tags:
  - iframes
weight: 6
navTitle: Interacting with iframes
menu:
  learn_playwright:
    parent: "Interaction"
---

Playwright enables us to access and interact with iframes.

## Locate an iframe and its elements

To access iframe elements, locate the iframe and query the DOM elements as if you're in the page context.

```ts {title="iframe-access.spec.ts"}
{{% readfile filename="samples/playwright/iframe-access.spec.ts" %}}
```

## Further reading

1. [Playwright's "Frames documentation"](https://playwright.dev/docs/frames)
