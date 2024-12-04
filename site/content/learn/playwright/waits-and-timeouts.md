---
title: Dealing with waits and timeouts in Playwright
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

When you're trying to test your site's core user flows with Playwright and are facing an element not being loaded, many take the shortcut of waiting for a fixed amount of time by adding a hard-coded timeout. Hard timeouts are an anti-pattern, as they lower performance, increase the chances of a script breaking, and often introduce test flakiness.

Let's explore the problem, how those issues arise and how Playwright enables you to test your site user-first.

<!-- more -->

## The problem of hard waits and tools without auto-waiting

Hard waits and timeouts only do one thing: they instruct Playwright to wait for the specified time. This makes them dangerous: they are intuitive enough to be favored by beginners and inflexible enough to create serious issues. Let's explore some issues in practical terms.

Imagine a situation in which your script uses **a tool without smart automatic waiting**: then you need to wait until an element appears on a page to interact with it. To click a button **you must ensure that this button is available in the current browser session**. As a quick solution, you might consider adding a hard timeout. This could look something like the following:

```js
// a tool without built-in auto-waiting

await page.waitFor(1000) // hard wait for 1000ms
await page.click('#button-login')
```

In such a situation, the following can happen:

1. You end up waiting a shorter time than the element takes to load!

![playwright hard wait time too short](/learn/images/over_assumption_01@2x.jpg)

Your hard wait terminates and your click action is attempted too early. The script terminates with an error, possibly of the ["Element not found"](/learn/playwright/error-element-not-found/) sort.

2. The element loads before your hard wait has expired.

![playwright hard wait time too long](/learn/images/under_assumption_01@2x.jpg)

While the element is correctly clicked once your wait expires and your script continues executing as planned, you are wasting time. You'll never click the element once it's available, but always rely on a magic number to interact with your UI. This wasted time quickly adds up when your test suite grows and you're running multiple test suites. If you've ever experienced waiting for a test suite taking an hour, you know how painful it can be. Every second counts in browser automation and end-to-end testing!

**Hard waits and timeouts are always either too short or too long.** And in the worst-case scenario, the fluctating load times make the wait sometimes too long and sometimes too short, making our script fail randomly. You should avoid this situation at all cost because it will result in unpredictable, seemingly random failures, also known as test flakiness.

Flakiness, a higher-than-acceptable and unpredictable failure rate, is a major problem. It is a source of noise, making the system state you are trying to test or monitor harder to understand. If your end-to-end suite includes a high rate of test flakiness, the stakeholders who routinely need to investigate failures will rapidly lose confidence in your automation setup.

**Your tests and automation scripts must be stable and hard waits should never appear in your end-to-end testing and monitoring scripts**.

## Avoiding hard waits by relying on Playwright's auto-waiting

To avoid these issues, you should forget that hard waits exist and adopt tools like [Playwright, which provide auto-waiting mechanisms](https://playwright.dev/docs/actionability). Let's revisit the previous example and use Playwright's core functionality.

```js
// Playwright with built-in auto-waiting

// `click()` waits for the element to be visible, stable, ...
await page.getByRole('button', { name: 'Login' }).click()
```

You'll probably notice that the script above no longer includes a `wait` statement. Hard waits are unnecessary in Playwright scripts because when you call a Playwright action such as `click`, `fill` or `selectOption`, Playwright automatically waits until a set of actionability checks pass.

### Playwright's actionability steps

To ensure your automation and testing actions behave correctly, Playwright enables you to forget about timings. Your job is to define browser actions and expected UI results; Playwright will figure out the rest.

If you want to click an element, Playwright will only interact with it when the element is ready and actionable. The following checks evaluate actionability:

- Does your defined locator resolve to *exactly one element*?
- Is the resulting element *visible*?
- Is the resulting element *stable*? (it's not moving, animating or transitioning)
- Can the resulting element *receive events*? (it's not covered or obscured by other elements)
- Is the resulting element *enabled*? (it doesn't have a  `disabled` attribute)

When you instruct Playwright to perform an action, it will constantly check if an element matches your locator and is ready to be used. And only if there is an actionable element will it perform your defined action.

![playwright smart wait](/learn/images/auto-wait@2x.jpg)

This auto-waiting approach has two main advantages:

1. Your Playwright scripts will be as quick as possible because Playwright will interact with elements whenever they're ready.
2. You can focus on defining UI actions and the expected results instead of worrying about network calls and timings.

## Other waiting mechanisms

Generally, **it's recommended to rely on Playwright's auto-waiting and built-in web-first assertions**, but if you must, here are some other waiting mechanisms.

### Waiting on navigations and network conditions in Playwright

When you can't wait for an element to appear on a page and want to explicitely wait for the network use the following.

`{{< newtabref title="page.waitForLoadState" href="https://playwright.dev/docs/api/class-page#page-wait-for-load-state" >}}` waits until the required load state has been reached. It defaults to the page `load` event but can also be configured to wait for `domcontentloaded` or `networkidle` (discouraged).

```ts
// wait for a page `load` event
await page.waitForLoadState()
```

`{{< newtabref title="page.waitForURL" href="https://playwright.dev/docs/api/class-page#page-wait-for-url" >}}` waits until a navigation to the target URL. It also defaults to the page `load` event but can be configured to wait for `commit`, `domcontentloaded` or `networkidle` (discouraged).

```ts
// wait for the page `load` event of the `/login` URL
await page.waitForURL('**/login')
```

You can also wait until a request is sent or a response is received with `{{< newtabref title="page.waitForRequest" href="https://playwright.dev/docs/api/class-page#page-wait-for-request" >}}` and `{{< newtabref title="page.waitForResponse" href="https://playwright.dev/docs/api/class-page#page-wait-for-response" >}}`. These two methods are key for implementing [request and response interception](/learn/playwright/intercept-requests/).

```ts
// wait for a request being made after clicking a button
const loginRequestPromise = page.waitForRequest('/login')
await page.getByRole('button', { name: 'Login' }).click()
const loginRequest = await loginRequestPromise

// wait for a response to come back after clicking a button
const loginResponsePromise = page.waitForResponse('/login')
await page.getByRole('button', { name: 'Login' }).click()
const loginResponse = await loginResponsePromise
```

### Waiting for an element in Playwright

There are multiple ways to wait for a specific element to appear on the page. To wait for an element to be visible or reach a particular state it's recommended to use Playwright's web-first assertions. `toBeVisible`, `toBeEnabled`, `toBeChecked` and many more included assertions are asynchronous and wait for the elements to change, appear or disappear.

```ts
// wait for this button to be visible, stable, ... and click it
await page.getByRole('button', { name: 'Login' }).click()
// wait for this button to be disabled
await expect(page.getByRole('button', {name: 'Login'})).toBeDisabled()
// wait for this button to be gone
await expect(page.getByRole('button', {name: 'Login'})).toBeHidden()
```

If you pair web-first assertions with Playwright's auto-waiting actions, your scripts will be expressive, human-readable, and, most importantly, not include any hard timeouts.

If you're not using Playwright Test (web-first assertions are only available in `@playwright/test`) and you want to wait for an element to be visible, use `{{< newtabref title="locator.waitFor" href="https://playwright.dev/docs/api/class-locator#locator-wait-for" >}}`.

```ts
const button =  page.getByRole('button', { name: 'Login' }).click()
// wait for this button to be visible
await button.waitFor()
```

In any case, a good knowledge of [locators](/learn/playwright/selectors/) is key to enable you to select precisely the element we need to wait for.

### Waiting for page events

With Playwright, you can also directly wait for {{< newtabref title="page events" href="https://playwright.dev/docs/events" >}} such as `popup` or `download` using `{{< newtabref title="page.waitForEvent" href="https://playwright.dev/docs/api/class-page#page-wait-for-event" >}}`.

```ts
// wait for a new window or popup to open after clicking a button
const popupPromise = page.waitForEvent('popup')
await page.getByRole('button', { name: 'Open new window' }).click()
const popup = await popupPromise
```

### Waiting for page functions

And for more advanced cases, you can pass a function to be evaluated within the browser context via `{{< newtabref title="page.waitForFunction" href="https://playwright.dev/docs/api/class-page#page-wait-for-function" >}}`.

```ts
// wait for a specific state in the browser window after clicking a button
const secretInternalState = page.waitForFunction(
  () => window.localstorage.secretThing === 'true'
);
await page.getByRole('button', { name: 'Login' }).click()
await secretInternalState
```

## Takeaways

1. Never use hard waits or timeouts.
2. Use auto-waiting instead.
3. Combine auto-waiting actions with web-first assertions to test UI state instead of implementation details.
