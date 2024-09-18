---
title: Dealing with waits and timesouts in Playwright
date: 2021-11-26
author: Giovanni Rago
githubUser: ragog
tags:
  - best practices
  - waiting
navTitle: Waits and timeouts
weight: 5
menu:
  learn:
    parent: "Interaction"
---

Looking to solve the issue of a page or element not being loaded, many take the shortcut of waiting for a fixed amount of time - adding a hard wait, in other words. This is regarded as an anti-pattern, as it lowers performance and increases the chances of a script breaking (possibly intermittently). Let's explore how those issues arise and what better solutions we can use to avoid them.

<!-- more -->

## The problems with hard waits

Hard waits do one thing and one thing only: wait for the specified amount of time. There is nothing more to them. This makes them dangerous: they are intuitive enough to be favoured by beginners and inflexbile enough to create serious issues.

Let's explore these issues in practical terms through an example. Imagine the following situation: our script is running using a tool without any sort of built-in smart waiting, and we need to wait until an element appears on a page and then attempt to click it. We try to solve this issue with a hard wait, like Puppeteer's `page.waitFor(timeout)`.

This could looks something like the following:

```js
await page.waitFor(1000) // hard wait for 1000ms
await page.click('#button-login')
```

In such a situation, the following can happen:

1. We can end up waiting for a shorter amount of time than the element takes to load!

![playwright hard wait time too short](/learn/images/over_assumption_01@2x.png)

In this case, our hard wait terminates and our click action is attempted too early. The script terminates with an error, possibly of the ["Element not found"](/learn/headless/error-element-not-found/) sort.

2. The element can load before our hard wait has expired.

![playwright hard wait time too long](/learn/images/under_assumption_01@2x.png)

While the element is correctly clicked once our wait expires, and our script continues executing as planned, we are wasting precious time - likely on each hard wait we perform. Across multiple scripts and suites, this can add up to noticeable drag on build time.

In general, with hard waits we are virtually always waiting too little or too long. In the worst case scenario, the fluctuations in load time between different script executions are enough to make the wait sometimes too long and sometimes too short (meaning we will switch between scenario 1 and 2 from above in an unpredictable manner), making our script fail intermittently. That will result in unpredictable, seemingly random failures, also known as flakiness.

Flakiness, a higher-than-acceptable false failure rate, can be a major problem. It is essentially a source of noise, making it harder to understand what the state of the system we are testing or monitoring really is. Not only that, but stakeholders who routinely need to investigate failures only to find out that they are script-related (instead of system-related) will rapidly lose confidence in an automation setup.

## How to fix it

To avoid these issues, we have to ditch hard waits completely outside debugging scenarios. That means that **hard waits should never appear in production scripts under any circumstance**.

Our aim should be to wait just long enough for the element to appear. We want to always be certain the element is available, and never waste any time doing that. Luckily most automation tools and frameworks today offer multiple ways to achieve this. We can call these "smart waits".

![playwright smart wait](/learn/images/smart_wait_01@2x.png)

Different tools approach the broad topic of waiting in different ways. Both Puppeteer and Playwright offer many different kinds of smart waits, but Playwright takes things one step further and introduces an auto-waiting mechanism on most page interactions.

Let's take a look at different smart waiting techniques and how they are used.

## Built-in waits

Playwright comes with built-in waiting mechanisms on {{< newtabref title="navigation" href="https://playwright.dev/docs/navigations" >}} and {{< newtabref title="page interactions" href="https://playwright.dev/docs/actionability" >}}. Since these are baked into the tool itself, it is good to get familiar with the logic behind them, as well as how to override the default behaviour when necessary.

## Explicit waits

Explicit waits are a type of smart wait we invoke explicitly as part of our script. We will want to use them more or less often depending on whether our automation tool has a built-in waiting mechanism (e.g. Playwright) or requires us to handle all the waiting (e.g. Puppeteer).

If you can rely on automatic waits, use explicit waits only when necessary. An auto-wait system failing once is no good reason for ditching the approach completely and adding explicit waits before every page load and element interaction. If the tool you are using does not do auto-waiting, you will be using explicit waits quite heavily (possibly after each navigation and before each element interaction), and that is fine - there is just less work being done behind the scenes, and you are therefore expected to take more control into your hands.

### Waiting on navigations and network conditions

On a page load, we can use the following:

1. `{{< newtabref title="page.waitForNavigation" href="https://playwright.dev/docs/api/class-page#page-wait-for-navigation" >}}` to wait until a page navigation (new URL or page reload) has completed.
2. `{{< newtabref title="page.waitForLoadState" href="https://playwright.dev/docs/api/class-page#page-wait-for-load-state" >}}` for Playwright, waits until the required load state has been reached (defaults to `load`); `{{< newtabref title="page.waitForNetworkIdle" href="https://pptr.dev/#?product=Puppeteer&show=api-pagewaitfornetworkidleoptions" >}}` with Puppeteer, a narrower method to wait until all network calls have ended.
3. `{{< newtabref title="page.waitForURL" href="https://playwright.dev/docs/api/class-page#page-wait-for-url" >}}` with Playwright, waits until a navigation to the target URL.

All the above default to waiting for the `{{< newtabref title="load" href="https://developer.mozilla.org/en-US/docs/Web/API/Window/load_event" >}}` event, but can also be set to wait for:
* the `{{< newtabref title="DOMContentLoaded" href="https://developer.mozilla.org/en-US/docs/Web/API/Window/DOMContentLoaded_event" >}}` event.
* Playwright only: `networkidle`, raised when there are no network connections for at least 500 ms.
* Playwright only: `commit`, when the network response is received and the document starts loading (Playwright only).
* Puppeteer only: `networkidle0`, raised when there are no network connections for at least 500 ms.
* Puppeteer only: `networkidle2`, raise when the there are no more than 2 network connections for at least 500 ms.

> {{< newtabref title="Lazy-loaded pages" href="https://developer.mozilla.org/en-US/docs/Web/Performance/Lazy_loading" >}} might require extra attention when waiting for the content to load, often demanding explicitly waiting for specific UI elements. See the following section.

Additionally, we can also wait until a specific request is sent out or a specific response is received with `{{< newtabref title="page.waitForRequest" href="https://playwright.dev/docs/api/class-page#page-wait-for-request" >}}` and `{{< newtabref title="page.waitForResponse" href="https://playwright.dev/docs/api/class-page#page-wait-for-response" >}}`. These two methods are key for implementing [request and response interception](/learn/headless/request-interception/).

### Waiting for an element

We can also explicitly wait for a specific element to appear on the page. This is normally done via `{{< newtabref title="page.waitForSelector" href="https://playwright.dev/docs/api/class-page#page-wait-for-selector" >}}` or a similar method, like `{{< newtabref title="page.waitForXPath" href="https://pptr.dev/#?product=Puppeteer&show=api-pagewaitforxpathxpath-options" >}}` (Puppeteer only). A good knowledge of [selectors](/learn/headless/basics-selectors/) is key to enable us to select precisely the element we need to wait for.

### Waiting on page events

With Playwright, we can also directly wait on {{< newtabref title="page events" href="https://playwright.dev/docs/events" >}} using `{{< newtabref title="page.waitForEvent" href="https://playwright.dev/docs/api/class-page#page-wait-for-event" >}}`.

### Waiting on page functions

For more advanced cases, we can pass a function to be evaluated within the browser context via `{{< newtabref title="page.waitForFunction" href="https://playwright.dev/docs/api/class-page#page-wait-for-function" >}}`.

## Takeaways

1. Never use hard waits outside of debugging
2. Use smart waits instead, choosing the best one for your situation
3. Use more or less smart waits depending on whether your tool support auto-waits
