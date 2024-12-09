---
title: How to Use Playwright to Navigate and Interact with Web Pages
displayTitle: How to Use Playwright for Navigation and Interaction
metatags:
  title: Navigation & Waiting Strategies in Playwright
subTitle: How to ensure elements are ready for interaction
description:
  Learn how to navigate web pages and implement effective waiting mechanisms. A guide ideal for developers looking to refine their automation scripts.
date: 2020-06-15
author: Tim Nolet
githubUser: tnolet
tags:
  - basics

weight: 1
navTitle: Navigation
menu:
  learn_playwright:
    parent: "Interaction"
---

Every script that we will write will almost certainly do three key things:
1. Navigating to some web page
2. Waiting for something
3. Possibly getting a timeout 😐

<!-- more -->

## Navigating

Initial navigation to any page is pretty much the same for both frameworks and can happen in multiple ways.

- Whenever your code does a `page.goto()`, or a `page.click()` on a link, you explicitly trigger a navigation.
- The webpage you are on can also trigger a navigation by executing `location.href= 'https://example.com'` or using the
`history.pushState()` API.

In the example below we trigger two navigations:

1. The initial load of the page.
2. A navigation to the shopping cart by clicking a link

```ts {title="basic-browser-navigation.spec.ts"}
{{% readfile filename="samples/playwright/basic-browser-navigation.spec.ts" %}}
```
{{< run-in-checkly "/samples/playwright/basic-browser-navigation.spec.ts" "playwright"  >}}

Run this example as follows:
```bash
npx playwright test basic-browser-navigation.spec.ts
```

## Waiting

waiting for something to happen is a crucial part of any automation script. In most cases, this is handled automatically
by Playwright. For example, when you click a button, Playwright will wait for that button to be clickable before it actually clicks it.

In the example below, we type an email address into an input field on a login modal. Playwright's `fill` method comes with 
built-in waiting functionality.

```ts {title="basic-browser-waiting.spec.ts"}
{{% readfile filename="samples/playwright/basic-browser-waiting.spec.ts" %}}
```
Run this example as follows:

```bash
npx playwright test basic-browser-waiting.spec.ts
```

However, there are cases where you need to wait for something specific to happen. For example, you might want to wait for a specific element to appear on the page.
In this case you may want to use the `page.waitForSelector()` method.

This method waits for an element to appear in the page. This is your bread and butter and should be used whenever something
needs to be loaded after clicking, hovering, navigating etc. You can pass it an object with a `timeout` attribute
to override the default 30 seconds.

This works exactly the same for the `page.waitForXpath()` function is you are using XPath selectors instead of CSS selectors.

## Timeouts

The `page.waitForNavigation()` method — but also similar methods like `page.reload()` and `page.goBack()` — all take some
options that determine "how" it should wait and what the timeout limits are.

These options come in two flavors:

**1. Hard timeout**

The time in milliseconds passed as the `timeout` property e.g.
`page.waitForNavigation({ timeout: 2000 })`. We do not recommend
using this if you do not explicitly need to.

**2a. DOM event based**

These two options are directly related to the events your browser emits when it has reached a certain loading stage.


- `load`: This is the default and very strict: your whole page including all dependent resources, i.e. images, scripts, css etc.
- `domcontentloaded`: less strict: when your HTML has loaded.

Note: the load option is the default.

**2b. Heuristic based**

These two options are based on the heuristic that if (almost) all network connections your browser has are no longer active,
your page has probably finished loading.

- `networkidle0`: consider navigation to be finished when there are no more than 0 network connections for at least 500 ms.
- `networkidle2`: consider navigation to be finished when there are no more than 2 network connections for at least 500 ms.

Playwright has done away with the distinction between `networkidle0` and `networkidle2` and just has:

- `networkidle`: consider navigation to be finished when there are no more than 0 network connections for at least 500 ms.

Both options 2a and 2b are passed using the `waitUntil` property, e.g. `page.waitForNavigation({ waitUntil: 'networkidle2' })`

Which of these options is useful to you depends on your situation:

- Does your SPA need to be fully rendered and finish all XHR calls? Go with `load`
- You server render and load in some non-crucial element in a lazy fashion? go for one of the `networkidle` variant.


Now that we know how to start a browser and navigate to a URL, the clear next step is to learn how to [interact with a webpage](/learn/playwright/clicking-typing-hovering/).

## Further reading
1. [Waits and Timeouts](/learn/playwright/waits-and-timeouts/)
2. [Playwright general navigation docs](https://playwright.dev/docs/navigations)
3. [Playwright auto waiting](/learn/playwright/interaction/waits/)
