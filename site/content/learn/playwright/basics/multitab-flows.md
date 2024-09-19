---
title: Handling multiple tabs with Playwright
subTitle: Controlling multiple tabs
date: 2021-08-29
author: Giovanni Rago
githubUser: ragog
tags:
  - multi-tab
  - testing
weight: 6
navTitle: Multiple tabs
menu:
  learn:
    parent: "Basics"
---

Playwright enables us to control multiple browser tabs, albeit in different ways. 

## Opening tabs directly

If we are looking to open brand new tabs with which to interact, the setup is rather straightforward.

{{< tabs "1" >}}
{{< tab "Playwright" >}}
```js
{{< readfile filename="samples/playwright/multitab-open.js" >}}
```
{{< run-in-checkly "/samples/playwright/multitab-open.js" "playwright"  >}}
{{< /tab >}}

{{< /tabs >}}

## Handling links that open a new tab

Controlling tabs that are opened after a click on an element on the page can be trickier. Let's explore this through an example: navigating to `https://checklyhq.com`, then opening a new tab by clicking the link to the GitHub-based Checkly Public Roadmap which is found on the page.

By allowing us to wait for the creation of a child tab with `page.waitForEvent`, Playwright enables us to "catch" it following a click on an element with `target="_blank"`, and then seamlessly interact with any of the currently open tabs. 


{{< tabs "2" >}}
{{< tab "Playwright" >}}
```js
{{< readfile filename="samples/playwright/multitab-flows.js" >}}
```
{{< run-in-checkly "/samples/playwright/multitab-flows.js" "playwright"  >}}
{{< /tab >}}

{{< /tabs >}}



## Further reading

1. Official documentation on [Playwright's multi-tab scenarios](https://playwright.dev/docs/multi-pages)