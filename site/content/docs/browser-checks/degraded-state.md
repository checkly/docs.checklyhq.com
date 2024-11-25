---
title: Degraded state with soft assertions - Checkly Docs
displayTitle: Degraded state with soft assertions
navTitle: Degraded state
weight: 26
menu:
  resources:
    parent: "Browser checks"
    identifier: "browser-degraded-state-soft-asserts"
cli: true
---

If you want to monitor your service for non-critical errors or performance degradations you can use the degraded check state. This allows you to signal that parts of a Browser check performed slower than expected, or that it triggered assertions that are of lower criticality. 

The degraded state does not affect your check's success ratio like a failed state does. You can [configure alert channels](/docs/alerting-and-retries/alert-channels/#managing-alert-channels) to notifiy you when a check has degraded. 

To catch errors that are relevant for a degraded scenario you can use soft assertions. Soft assertions keeps your Playwright test running after it has encountered an error, unlike regular assertions which terminate the test. See the [playwright docs](https://playwright.dev/docs/test-assertions#soft-assertions) for more information on soft assertions.

## Playwright-helpers library

{{< markdownpartial "/_shared/checkly-playwright-helpers.md" >}}

## Triggering a degraded state

A check is marked as degraded when `markCheckAsDegraded` is called and there are no regular assertions triggered.

In this example we do a simple site navigation and measure the time the test takes. At the end of the check we mark the check as degraded if the duration of the test is too long, or if the site header has changed.

```ts
import { expect, test, Page } from '@playwright/test';
import { markCheckAsDegraded } from "@checkly/playwright-helpers"; // Import the necessary method from the Checkly helpers library.

test.setTimeout(30000);

const TEST_DEGRADATION_LIMIT = 400; // The limit for how long the test can run before it is considered degraded.

test("Visit Checkly and go to the docs", async ({ page }) => {
  const startTime = Date.now(); // Note the time when the test starts

  const response = await page.goto('https://www.checklyhq.com/welcome/');
  expect(response.status(), 'should respond with correct status code').toBeLessThan(400) // Ensure that the welcome page loaded successfully
  await page.getByRole('link', { name: '/docs' }).click(); // Navigate to the documentation page

  const header = await page.getByText('Get Started');
  expect.soft(header).toBeTruthy(); // A soft assert example

  const endTime = Date.now(); // Note the time when the test completes
  const duration = endTime - startTime; // Calculate the test duration

  if (duration > TEST_DEGRADATION_LIMIT || test.info().errors.length) { // Trigger the degradation if the duration is longer than our set limit, or if the soft assert is triggered.
    markCheckAsDegraded(`Test duration took longer than ${TEST_DEGRADATION_LIMIT}`);
  }
})
```

Triggering a soft assertion in a check but not calling `markCheckAsDegraded` will fail the check at the end instead of marking as degraded.