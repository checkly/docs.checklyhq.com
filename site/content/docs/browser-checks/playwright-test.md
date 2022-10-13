---
title: Playwright Test Runner (Public Beta)
description: How to use Playwright Test Runner (Public Beta) natively within browser checks at Checkly
weight: 15
menu:
  docs:
    parent: "Browser checks"
---

Checkly natively supports running browser checks using Playwright Test Runner, allowing you to write tests and use assertions using the popular testing framework.

{{<info >}}

Support for Playwright Test is currently in Public Beta. If you experience an issue or have suggestions, write to us at support@checklyhq.com or post to our Public Roadmap.

{{</info >}}

## Getting started
> Playwright Test is currently only available on the latest runtime, **2022.02.**

A simple Playwright Test script would look like this:

```js
const { test, expect } = require('@playwright/test');

test('basic test', async ({ page }) => {
  await page.goto('https://playwright.dev/');
  const name = await page.innerText('.navbar__title');
  expect(name).toBe('Playwright');
});
```

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

## Features

This is the list of Playwright Test Runner features that are currently supported. We will update it as more features become supported.

| Feature                  | Supported?              |
|--------------------------|-------------------------|
| Trace files              | Yes               |
| Video recordings         | Yes               |
| API testing              | Yes               |
| Custom fixtures          | Yes               |
| Reporters                | Only JSON, more to come |
| Typescript               | Coming soon             |
| Global configuration     | No           |
| Visual comparisons       | No ([Current feature request](https://github.com/checkly/public-roadmap/issues/179))          |
| Test retry               | No           |
| Parallelism and sharding | No           |

### Success criteria of your check
One of the key benefits of using Playwright Test, is that you can split your check into multiple independent test cases,
and group them using the `test.describe` function. 

> **Your Checkly check will fail if at least one of the test cases fails.**

### Viewing trace files
When a `@playwright/test` test case fails, Checkly will record and make its trace files available via the UI. 
This makes it very easy to inspect individual traces and debug failing tests.

You can download the trace files for manual inspection or view them directly with [trace.playwright.dev](https://trace.playwright.dev).

![checkly-pw-traces](https://user-images.githubusercontent.com/3121310/195104010-51f856c1-d2b5-46db-a45c-7411eea2eb1b.gif)

> Note: When you use the editor page, for your convenience, 
> we will always make the trace files available for download and preview, also for passing tests.

### Video recordings
When a `@playwright/test` test case fails, Checkly will record a video for each page navigation and make it available in the UI.

Here's an example of a Playwright Test script that fails, and provides a video of the test sequence.

![checkly-pw-videos](https://user-images.githubusercontent.com/3121310/195104104-79f1abd8-ac85-4453-968f-e9afa3d8f314.gif)

> Note: When you use the editor page, for your convenience, 
> we will always make the videos available for download and preview, also for passing tests.
