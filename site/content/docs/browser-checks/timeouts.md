---
title: Timeouts - Checkly Docs
displayTitle: Timeouts
navTitle: Timeouts
weight: 24
menu:
  resources:
    parent: "Browser checks"

---

There are different kinds of timeouts you will encounter while working with Browser checks:

| Timeout name                    | Timeout origin | Default value | Can it be changed? |
|---------------------------------|----------------|---------------|--------------------|
| Browser check execution timeout | Checkly        | 240 seconds   | No                 |
| Playwright test timeout         | Playwright     | 30 seconds    | Yes                |
| Playwright navigation timeout	  | Playwright     | 30 seconds    | Yes                |
| Playwright action timeout       | Playwright     | no timeout    | Yes                |


Checkly runs your Browser check code for a maximum of **240 seconds**. Tests that exceed this time will be capped and 
time out. Everything in your Browser Check needs to happen within those 240 seconds, no matter what. 

Playwright does offer multiple [configurable timeouts](https://playwright.dev/docs/test-timeouts). Make sure you configure these in a way that prevents your 
check from hitting the general 240 seconds timeout.

> Check out our extensive writeup about Playwright timeouts in our [Learn Playwright documentation](/learn/playwright/waits-and-timeouts/).

## Timeout-related errors

Timeout-related errors are often a sticking point for many beginners. Understanding which timeout is being raised and 
which command or config option it corresponds to can save you plenty of time when debugging a failing script. Here we 
try to explain the most common timeout errors.

### Test timeout of 30000ms exceeded.

This refers to Playwright's own 30s default timeout for a single `test` fixture. While it is best to [keep your checks as short as possible](/learn/playwright/writing-tests/), you can increase a test's timeout using `test.setTimeout(milliseconds)`. For example:

{{< tabs "setTimeout example" >}}
{{< tab "TypeScript" >}}
```ts {title="timeout.spec.ts"}
import { test } from '@playwright/test'

test('add item to wishlist', async ({ page }) => {
  test.setTimeout(60000)

  // rest of your script

})
```
{{< /tab >}}
{{< tab "JavaScript" >}}
```js  {title="timeout.spec.js"}
const { test } = require('@playwright/test')

test('add item to wishlist', async ({ page }) => {
  test.setTimeout(60000)

  // rest of your script

})
```
{{< /tab >}}
{{< /tabs >}}


### Your check run has reached the maximum run time of 240000 ms.

In this case, your script is hitting Checkly's 240s total Browser check timeout. This can't be configured and is in 
place to prevent checks from running way longer than acceptable. No assets will be available for review after the check has gone over the maximum run time. If you encounter this, try to make your check shorter by following [best practices](/learn/playwright/writing-tests/). Additionally, to ensure your assets are saved, please set a test timeout lower than the browser check execution timeout.

### Timeout 20000ms exceeded

Different actions, such as clicks, explicit waits and so on, can have their own timeout. In these cases, Playwright will always state what kind of action caused the timeout just before this message. For example, you might see an error like: `page.waitForLoadState: Timeout 20000ms exceeded`. In that case, looking at the `page.waitForLoadState` commands in your script will help you find the culprit. 


> Remember that you can use Playwright Traces to help you understand exactly where in your script the error was raised. 
> Traces are populated automatically for failed Browser checks in your check results.
