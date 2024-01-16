---
title: Using Playwright Test
description: How to use Playwright Test Runner natively within browser checks at Checkly
weight: 14
menu:
  resources:
    parent: "Browser checks"
cli: true
---

Checkly natively supports running browser checks using Playwright Test Runner, allowing you to write tests and use assertions using the popular testing framework.
Read more on how to utilise Playwright Test best in the [official documentation](https://playwright.dev/docs/writing-tests).

Playwright Test Runner elevates your monitoring and debugging experience by providing a number of neat functionalities:

- detailed trace files with step-by-step information on your test cases
- video recordings of browser sessions
- the `expect()` function comes with built-in awaiting
- lots of web-first assertions like `toContainText`, `toHaveURL`
- high-level locators like `getByTitle`, `getByRole`
- independent nested test cases that make your Checkly check even more powerful

Playwright Test is available from runtime [**2022.02**](/docs/runtimes/specs/) onwards.

{{< warning >}}
A check using [the Playwright Test Runner (`@playwright/test`)](https://playwright.dev/docs/intro) will currently run around 30-50% longer than [a regular Playwright check (`playwright`)](https://playwright.dev/docs/library). This is caused by the automatic creation of trace and video assets. We are aware of this and are investigating solutions. If this is significantly degrading the performance of your check, we recommend to divide longer tests into multiple checks.
{{</ warning >}}

## Features

This is the list of Playwright Test Runner features that are currently supported. We will update it as more features become supported.

| Feature                  | Supported?                                                                                                                    |
|--------------------------|-------------------------------------------------------------------------------------------------------------------------------|
| Trace files              | Yes                                                                                                                           |
| Video recordings         | Yes                                                                                                                           |
| API testing              | Yes                                                                                                                           |
| Custom fixtures          | Yes                                                                                                                           |
| Reporters                | Only JSON, more to come                                                                                                       |
| Typescript               | Yes                                                                                                                           |
| Global configuration     | No                                                                                                                            |
| Visual comparisons       | Yes, [check the docs](/docs/browser-checks/visual-comparison-snapshot-testing/)                                               |
| Test retry               | No <br> Enable Checkly's ["Double-check on failure"](/docs/alerting/#double-checking) in the check settings to retry a check. |
| Parallelism and sharding | No                                                                                                                            |
| Config                   | Yes, a subset of playwright config options                                                                                    |

### Browser check with multiple test cases
One of the key benefits of using Playwright Test is that you can split your check into multiple independent test cases,
and group them using the `test.describe` function. Your Checkly check will fail if **at least one** of the test cases fails.

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

{{< info >}}
An executed browser check that includes multiple Playwright test cases still counts as a single check run towards your pricing plan's defined limits.
{{</ info >}}

### Hooks
Playwright Test Runner offers hook functions such as `test.afterEach` and `test.beforeEach` that run before or after individual test cases or `test.afterAll` and `test.beforeAll` that run before or after all tests have started/finished.

You can find more information on available methods in the [official documentation](https://playwright.dev/docs/api/class-test).

### Viewing trace files
When a `@playwright/test` test case fails, Checkly will record and make its trace files available via the UI. You can download the trace files for manual inspection or view them directly with [trace.playwright.dev](https://trace.playwright.dev).

Using the Playwright Trace Viewer you can effortlessly view your test, skip back and forth between actions, view snapshots and metadata, and more. This makes it very easy to inspect individual traces and debug failing tests.

<video alt="Viewing a Playwright Test trace file" autoplay loop muted src="/docs/images/browser-checks/pwt_traces.mp4"></video>

When running tests from the editor page, trace files are always available for download and preview,
regardless of whether the check is passing or failing. For scheduled check runs traces are only preserved when the check failed.

### Video recordings
When a `@playwright/test` test case fails, Checkly will record a video for each page navigation and make it available in the UI. It is a great tool to get a first look of the actions and their outcome to quickly identify what failed, and to visualize regressions.

Here's an example of a Playwright Test script that fails, and provides a video of the test sequence.

<video alt="Viewing a Playwright Test video" autoplay loop muted src="/docs/images/browser-checks/pwt_videos.mp4"></video>

When running tests from the editor page, video files are always available for download and preview, regardless of whether
the check is passing or failing. For scheduled check runs videos are only preserved when the check failed.

### PageObject Model (POM)

If you are structuring your test codebase following the [PageObject pattern](https://martinfowler.com/bliki/PageObject.html), you can use the [Checkly CLI](/docs/cli) out of the box. Just make sure that:

- the folder you initialize your CLI in when building your project sits above your test spec files and their dependencies
- your `testMatch` is pointing to the path(s) where your test specs live

To see one way this can look like, see our [example repository](https://github.com/checkly/checkly-sample-pom).

### Config

{{< info >}}
This feature is in Beta
{{< /info >}}

If you have a `playwright.config.ts` or `playwright.config.js` file, you can use a subset of its config options to run your tests.
In order to get the allowed playwright config options on your checkly config file you can just simply run the [sync-playwright](/docs/cli/command-line-reference/#npx-checkly-sync-playwright)

This command will add to your current `checkly.config.ts` file your playwright config.

Once ran, the supported options of your playwright config will be added to your checkly config:

{{< tabs "project config" >}}
{{< tab "Typescript" >}}
```typescript
import { defineConfig } from 'checkly'

export default defineConfig({
  projectName: 'Website Monitoring',
  logicalId: 'website-monitoring-1',
  repoUrl: 'https://github.com/acme/website',
  checks: {
    checkMatch: '**/*.check.js',
    browserChecks: {
      testMatch: '**/*.spec.js',
      playwrightConfig: {
        timeout: 1234,
        use: {
          baseURL: 'https://www.checklyhq.com',
          isMobile: true,
        },
        expect: {
          toHaveScreenshot: {
            maxDiffPixels: 10,
          }
        }
      }
    },
  },
  cli: {
    runLocation: 'eu-west-1',
    privateRunLocation: 'private-dc1'
  }
})
```
{{< /tab >}}
{{< tab "JavaScript" >}}
```js
const { defineConfig } = require('checkly')

const config = defineConfig({
  projectName: 'Website Monitoring',
  logicalId: 'website-monitoring-1',
  repoUrl: 'https://github.com/acme/website',
  checks: {
    checkMatch: '**/*.check.js',
    browserChecks: {
      testMatch: '**/*.spec.js',
      playwrightConfig: {
        timeout: 1234,
        use: {
          baseURL: 'https://www.checklyhq.com',
          isMobile: true,
        },
        expect: {
          toHaveScreenshot: {
            maxDiffPixels: 10,
          }
        }
      }
    },
  },
  cli: {
    runLocation: 'eu-west-1',
    privateRunLocation: 'private-dc1'
  }
})

module.exports = config;
```
{{< /tab >}}
{{< /tabs  >}}

#### Config options

List of supported options of the playwright config file

{{< tabs "config" >}}

{{< tab "Global" >}}

| Option           | Supported |
|------------------|-----------|
| `timeout`        | ✅         |
| `use`            | ✅         |
| `expect`         | ✅         |
| `testDir`        | ❌         |
| `fullyParallel`  | ❌         |
| `forbidOnly`     | ❌         |
| `retries`        | ❌         |
| `workers`        | ❌         |
| `reporter`       | ❌         |
| `testMatch`      | ❌         |
| `testIgnore`     | ❌         |
| `outputDir`      | ❌         |
| `globalSetup`    | ❌         |
| `globalTeardown` | ❌         |
| `projects`       | ❌         |
| `webServer`      | ❌         |

{{< /tab >}}
{{< tab "Use" >}}

| Option               | Supported |
|----------------------|-----------|
| `baseURL`            | ✅         |
| `colorScheme`        | ✅         |
| `geolocation`        | ✅         |
| `locale`             | ✅         |
| `permissions`        | ✅         |
| `timezoneId`         | ✅         |
| `viewport`           | ✅         |
| `deviceScaleFactor`  | ✅         |
| `hasTouch `          | ✅         |
| `isMobile `          | ✅         |
| `javaScriptEnabled ` | ✅         |
| `extraHTTPHeaders`   | ✅         |
| `httpCredentials`    | ✅         |
| `ignoreHTTPSErrors`  | ✅         |
| `offline`            | ✅         |
| `actionTimeout`      | ✅         |
| `navigationTimeout ` | ✅         |
| `testIdAttribute`    | ✅         |
| `launchOptions`      | ✅         |
| `connectOptions`     | ✅         |
| `contextOptions`     | ✅         |
| `bypassCSP`          | ✅         |
| `storageState`       | ❌         |
| `browserName`        | ❌         |
| `channel`            | ❌         |
| `headless`           | ❌         |
| `proxy`              | ❌         |
| `screenshot`         | ❌         |
| `trace`              | ❌         |
| `video`              | ❌         |

{{< /tab >}}
{{< tab "Expect" >}}

| Option              | Supported |
|---------------------|-----------|
| `timeout`           | ✅         |
| `toHaveScreenshot ` | ✅         |
| `toMatchSnapshot `  | ✅         |

{{< /tab >}}
{{< /tabs >}}
