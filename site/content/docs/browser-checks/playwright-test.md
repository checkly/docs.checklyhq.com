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
Playwright test is currently only available on the latest runtime, 2022.02.

All it takes from there is to create a new browser check and write a Playwright Test script:

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
| Visual comparisons       | No ([issue](https://github.com/checkly/public-roadmap/issues/179))          |
| Test retry               | No           |
| Parallelism and sharding | No           |

### Viewing trace files
When a browser check that uses Playwright Test fails, it will record and make its trace files available via UI. This makes it very easy to inspect individual traces and debug tests.

You can download the trace files for manual inspection or view them directly with [trace.playwright.dev](https://trace.playwright.dev).

![checkly-pw-traces](https://user-images.githubusercontent.com/3121310/194862081-4c5ef0db-84fa-4ac5-b63c-90853ba748a6.gif)

Note: At the moment, traces are only recorded for failing checks.

### Video recordings
When a browser check that uses Playwright Test fails, it will record a video for each page navigation and make it available in the UI.
