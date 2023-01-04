---
title: Playwright Test Runner (Public Beta)
description: How to use Playwright Test Runner (Public Beta) natively within browser checks at Checkly
weight: 15
menu:
  docs:
    parent: "Browser checks"
---

Checkly natively supports running browser checks using Playwright Test Runner, allowing you to write tests and use assertions using the popular testing framework. 
Read more on how to utilise Playwright Test best in the [official documentation](https://playwright.dev/docs/writing-tests).

{{<info >}}

Support for Playwright Test is currently in Public Beta. If you experience an issue or have suggestions, write to us at support@checklyhq.com or post to [our Public Roadmap](https://github.com/checkly/public-roadmap).

{{</info >}}

Playwright Test Runner elevates your monitoring and debugging experience by providing a number of neat functionalities:

- detailed trace files with step-by-step information on your test cases
- video recordings of browser sessions
- the `expect()` function comes with built-in awaiting
- lots of web-first assertions like `toContainText`, `toHaveURL`
- high-level locators like `getByTitle`, `getByRole`
- independent nested test cases that make your Checkly check even more powerful

## Getting started
> Playwright Test is available from runtime [**2022.02**](/docs/runtimes/specs/) onwards.

A simple Playwright Test script would look like this:

{{< tabs "Basic test" >}}
{{< tab "TypeScript" >}}
 ```ts
import { test, expect } from '@playwright/test';

test('basic test', async ({ page }) => {
  await page.goto('https://playwright.dev/')
  const name = await page.innerText('.navbar__title')
  expect(name).toBe('Playwright')
})
```
{{< /tab >}}
{{< tab "JavaScript" >}}
 ```js
const { test, expect } = require('@playwright/test')

test('basic test', async ({ page }) => {
  await page.goto('https://playwright.dev/')
  const name = await page.innerText('.navbar__title')
  expect(name).toBe('Playwright')
})
 ```
{{< /tab >}}
{{< /tabs >}}

Which renders the logs:
```
Sep 29 13:47:33 - DEBUG - Starting job
Sep 29 13:47:33 - DEBUG - Compiling environment variables
Sep 29 13:47:33 - DEBUG - Creating runtime using version 2022.02
Sep 29 13:47:33 - DEBUG - Running Playwright test script
Sep 29 13:47:34 - INFO - Running 1 test using 1 worker
Sep 29 13:47:34 - INFO -
Sep 29 13:47:35 - INFO - [1/1] [chromium] › ../../var/task/src/2022-02/node_modules/vm2/lib/bridge.js:479:11 › basic test
Sep 29 13:47:35 - INFO -
Sep 29 13:47:35 - INFO -
Sep 29 13:47:35 - INFO - 1 passed (2s)
Sep 29 13:47:35 - DEBUG - Run finished
Sep 29 13:47:36 - DEBUG - Uploading log file
```

### Browser check templates

We have picked a selection of handy templates that have been optimised for Playwright Test Runner and are updated regularly. [Create a new browser check](https://app.checklyhq.com/checks/browser/create) and try them out.

![checkly-browser-check-templates](/docs/images/browser-checks/browser-check-templates.png)

## Features

This is the list of Playwright Test Runner features that are currently supported. We will update it as more features become supported.

| Feature                  | Supported?              |
|--------------------------|-------------------------|
| Trace files              | Yes               |
| Video recordings         | Yes               |
| API testing              | Yes               |
| Custom fixtures          | Yes               |
| Reporters                | Only JSON, more to come |
| Typescript               | Opt-in (Currently in beta - enable it via [Labs](https://app.checklyhq.com/settings/account/labs)) <br> **Not compatible with code sync via GitHub yet.**             |
| Global configuration     | No           |
| Visual comparisons       | No ([Current feature request](https://github.com/checkly/public-roadmap/issues/179))          |
| Test retry               | No           |
| Parallelism and sharding | No           |

> Playwright Test Runner is currently not available for code sync via GitHub using TypeScript.

### Browser check with multiple test cases
One of the key benefits of using Playwright Test, is that you can split your check into multiple independent test cases, 
and group them using the `test.describe` function.

> Your Checkly check will fail if **at least one** of the test cases fails.

{{< tabs "describe" >}}
{{< tab "TypeScript" >}}
 ```ts
import { test } from '@playwright/test';

test.describe('two tests', () => {
  test('one', async ({ page }) => {
    // ...
  })

  test('two', async ({ page }) => {
    // ...
  })
})
```
{{< /tab >}}
{{< tab "JavaScript" >}}
 ```js
const { test } = require('@playwright/test')

test.describe('two tests', () => {
  test('one', async ({ page }) => {
    // ...
  })

  test('two', async ({ page }) => {
    // ...
  })
})
 ```
{{< /tab >}}
{{< /tabs >}}

### Hooks
Playwright Test Runner offers hook functions such as `test.afterEach` and `test.beforeEach` that run before or after individual test cases or `test.afterAll` and `test.beforeAll` that run before or after all tests have started/finished.

You can find more information on available methods in the [official documentation](https://playwright.dev/docs/api/class-test).

### Viewing trace files
When a `@playwright/test` test case fails, Checkly will record and make its trace files available via the UI. 
This makes it very easy to inspect individual traces and debug failing tests.

You can download the trace files for manual inspection or view them directly with [trace.playwright.dev](https://trace.playwright.dev).

![checkly-pw-traces](/docs/images/browser-checks/pwt_traces.gif)

> **Note:** When running tests from the editor page, trace files are always available for download and preview, 
> regardless of whether the check is passing or failing. For scheduled check runs videos and traces are only preserved when the check failed.

### Video recordings
When a `@playwright/test` test case fails, Checkly will record a video for each page navigation and make it available in the UI.

Here's an example of a Playwright Test script that fails, and provides a video of the test sequence.

![checkly-pw-videos](/docs/images/browser-checks/pwt_videos.gif)

> **Note:** When running tests from the editor page, video files are always available for download and preview, 
> regardless of whether the check is passing or failing. For scheduled check runs videos and traces are only preserved when the check failed.
