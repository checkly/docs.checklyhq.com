---
title: Handling Multiple Tabs with Playwright
subTitle: Controlling multiple tabs
date: 2021-08-29
author: Giovanni Rago
githubUser: ragog
tags:
  - multi-tab
  - testing
weight: 135
navTitle: Multiple tabs
menu:
  learn_playwright:
    parent: "Basics"
---

Playwright enables us to control multiple browser tabs, albeit in different ways. 

## Opening tabs directly

If we are looking to open brand new tabs with which to interact, the setup is rather straightforward.

```ts {title="multitab-open.spec.ts"}
{{% readfile filename="samples/playwright/multitab-open.spec.ts" %}}
```
{{< run-in-checkly "/samples/playwright/multitab-open.spec.ts" "playwright"  >}}

## Handling links that open a new tab

Controlling tabs that are opened after a click on an element on the page can be trickier. Let's explore this through an example: 

- Navigating to `https://checklyhq.com/docs`.
- Opening a new tab by clicking the link to the Checkly YouTube channel which opens in a new tab.

By allowing us to wait for the creation of a child tab with `page.waitForEvent`, Playwright enables us to "catch" it following a click on an element with `target="_blank"`, and then seamlessly interact with any of the currently open tabs. 

```ts {title="multitab-flows.spec.ts"}
{{% readfile filename="samples/playwright/multitab-flows.spec.ts" %}}
```
{{< run-in-checkly "/samples/playwright/multitab-flows.spec.ts" "playwright"  >}}

## Further reading

1. Official documentation on [Playwright's multi-tab scenarios](https://playwright.dev/docs/multi-pages)
