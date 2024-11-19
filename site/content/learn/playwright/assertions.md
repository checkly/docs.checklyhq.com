---
title: Playwright Assertions - Types & Best Practices
displayTitle: Playwright Assertions - Types & Best Practices
metatags:
  title: Playwright Assertions - Types & Best Practices
subTitle: How to ensure elements are ready for interaction
description:
  Learn more about Playwright Assertions. Explore different types, common errors, best practices, and how to get started.
date: 2024-11-12
author: Nocnica Mellifera
githubUser: serverless-mom
tags:
  - basics

weight: 5
navTitle: Assertions
menu:
  learn:
    parent: "Interaction"
---

### What are Playwright Assertions?

Playwright is more than a testing framework. With its generalized tool at simulating user behavior in a browser (or via an API), playwright is better defined as a web automation framework. You can use Playwright to scrape websites, automate form submissions, or any other time it would be helpful to replace a human web user with a robot. For most users, Playwright is intimately associated with end-to-end tests, and for these we must stop our automated actions and check to see if everything is working right. 

To make an automation into a test, we have assertions. When a hard assertion fails, the execution of a Playwright test stops, and following steps are not run.

### Types of Playwright Assertions

Playwright offers a variety of assertion types to accommodate different testing scenarios, and there are two broad categories for flexible, Web-first assertions and rigid, brittle, non-retrying assertions. Web-first assertions return promises, since they will return when they are succesful or time out, where as non-retrying assertions throw their response immediately.

### Auto-retrying, Web-first Assertions

Auto-retrying assertions automatically recheck conditions until they pass or a timeout is reached. They both make a test more stable, and can make tests execute more quickly, and in the language of game theory should be ‘strictly better’ than non-retrying assertions.

| **Assertion** | **Description** |
| --- | --- |
| `expect(locator).toBeChecked()` | element is checked (e.g., for checkboxes or radio buttons). |
| `expect(locator).not.toBeChecked()` | element is not checked. |
| `expect(locator).toBeDisabled()` | element is disabled. |
| `expect(locator).not.toBeDisabled()` | element is not disabled. |
| `expect(locator).toBeEditable()` | element is editable. |
| `expect(locator).not.toBeEditable()` | element is not editable. |
| `expect(locator).toBeEmpty()` | element has no text content. |
| `expect(locator).not.toBeEmpty()` | element has text content. |
| `expect(locator).toBeEnabled()` | element is enabled. |
| `expect(locator).not.toBeEnabled()` | element is not enabled. |
| `expect(locator).toBeHidden()` | element is hidden or does not exist in the DOM. |
| `expect(locator).not.toBeHidden()` | element is visible. |
| `expect(locator).toBeVisible()` | element is visible. |
| `expect(locator).not.toBeVisible()` | element is hidden or does not exist in the DOM. |
| `expect(locator).toContainText()` | element contains the expected text. |
| `expect(locator).not.toContainText()` | element does not contain the expected text. |
| `expect(locator).toHaveAttribute()` | element has the expected attribute value. |
| `expect(locator).not.toHaveAttribute()` | element does not have the expected attribute value. |
| `expect(locator).toHaveClass()` | element has the expected class. |
| `expect(locator).not.toHaveClass()` | element does not have the expected class. |
| `expect(locator).toHaveCount()` | locator has the expected number of elements. |
| `expect(locator).toHaveCSS()` | element has the expected CSS property value. |
| `expect(locator).toHaveId()` | element has the expected ID attribute value. |
| `expect(locator).toHaveJSProperty()` | element has the expected JavaScript property value. |
| `expect(locator).toHaveText()` | element has the expected text content. |
| `expect(locator).not.toHaveText()` | element does not have the expected text content. |
| `expect(locator).toHaveValue()` | element has the expected input value. |
| `expect(locator).not.toHaveValue()` | element does not have the expected input value. |
| `expect(locator).toBeFocused()` | element is focused. |
| `expect(locator).not.toBeFocused()` | element is not focused. |

### Non-retrying Assertions

Non-retrying assertions evaluate conditions only once. They are used when you expect a condition to be deterministic and want to avoid any retry logic. 

| **Assertion** | **Description** |
| --- | --- |
| `expect(value).toBe()` | value is strictly equal to the expected value. |
| `expect(value).not.toBe()` | value is not strictly equal to the expected value. |
| `expect(value).toEqual()` | value is deeply equal to the expected value. |
| `expect(value).not.toEqual()` | value is not deeply equal to the expected value. |
| `expect(value).toBeTruthy()` | value is truthy. |
| `expect(value).toBeFalsy()` | value is falsy. |
| `expect(value).toBeGreaterThan()` | value is greater than the expected value. |
| `expect(value).toBeGreaterThanOrEqual()` | value is greater than or equal to the expected value. |
| `expect(value).toBeLessThan()` | value is less than the expected value. |
| `expect(value).toBeLessThanOrEqual()` | value is less than or equal to the expected value. |
| `expect(value).toMatch()` | value matches the expected regular expression. |
| `expect(value).not.toMatch()` | value does not match the expected regular expression. |
| `expect(value).toContain()` | Checks if an array or string contains the expected element or substring. |
| `expect(value).not.toContain()` | Checks if an array or string does not contain the expected element or substring. |
| `expect(value).toHaveLength()` | Checks if an array or string has the expected length. |
| `expect(value).toBeNull()` | value is `null`. |
| `expect(value).toBeUndefined()` | value is `undefined`. |
| `expect(value).toBeDefined()` | value is defined (not `undefined`). |
| `expect(value).toBeNaN()` | value is `NaN`. |

This makes the most sense when using Playwright to run single end-to-end tests in a controlled environment. If you’re using Playwright to run on a cadence and monitor a production system, for example, with [Checkly](https://www.checklyhq.com/docs/browser-checks/playwright-test/), you generally want to stick with the auto-retrying assertions.

### Negating Assertions

Negating matchers allow you to assert that a condition does not hold. For example, you can use `toBeFalsy` or `not.toContain` to make negative assertions (as will be explained later, if you’re checking an element directly, probably the latter of these two options will work better as it implements Playwright’s auto-retries).

### Soft Assertions

Soft assertions collect all failures within a block before failing the test, rather than stopping at the first failure. This approach is useful for gathering more complete information during test runs. Soft assertions are a critical component of production monitoring, as when measuring things like load times, a failing response time may not mean that we want to stop the check entirely. Any Playwright test with failing soft assertions will be listed as failed, but the test will still run to completion (or the next hard assertion that fails).

### Checkly, soft assertions, and degraded check states

Checkly can use soft assertions as part of a ‘degraded’ state for checks. If a check fails soft assertions and there is a call to `markCheckAsDegraded`, the check will be placed in a ‘yellow light’ category of degraded rather than failing. Instead of categorizing the check as a total failure the 'degraded' state signals that the check encountered issues but still completed execution. Degraded checks have different notification policies. For example: you might have degraded checks report to Slack rather than sending a notification that wakes people up. 

This is useful for distinguishing between partial service disruptions and complete outages, offering teams a more precise understanding of performance and reliability. If your Playwright test is running on Checkly, the check will enter a ‘degraded’ state when some soft assertions fail, or if you call `markCheckAsDegraded` in its execution.

```jsx
import { test, expect } from "@playwright/test"
import { getAPIResponseTime, markCheckAsDegraded } from "@checkly/playwright-helpers"

const baseUrl = "https://api.spacexdata.com/v3"

test("SpaceX-API Dragon Capsules & Next Launch", async ({ request }) => {
  await test.step("get all capsules", async () => {
    const response = await request.get(`${baseUrl}/dragons`)

    // Hard assertion for a 200 status code, this passes!
    expect(response).toBeOK()
    
    // Soft assertion of a very fast response time
    expect.soft(getAPIResponseTime(response), 'GET /dragons too slow').toBeLessThanOrEqual(200)

    return response.json()
  })

  // Mark as degraded if we got any errors. 
  if (test.info().errors.length) {
    markCheckAsDegraded('Check degraded due to soft assertion failure.')
  }
})
```

In this case if the response has a 200 status code but the API response time is more than 200 seconds, the status of this check will be degraded and the slow api response time will be included as a failed step. If the response came back as a non-200 status (indicating an error) then the check would be ‘failed,’ whether or not `markCheckAsDegraded` was called. You can [configure alert channels](https://www.checklyhq.com/docs/alerting-and-retries/alert-channels/#managing-alert-channels) to notify you when a check has degraded.

### Custom Assertions

While Playwright has almost every scenario for testing supported in its core methods, it remains quite customizable, even [allowing custom assertions](https://www.youtube.com/watch?v=Fs-nM747TY4). 

- `expect.configure`: Configures custom options for assertions.
- `expect.poll`: Polls a condition until it passes or a timeout is reached, useful for dynamic content.
- `expect.toPass`: Runs a block of assertions until all pass, [often used for testing flaky or complex scenarios.](https://www.youtube.com/watch?v=8g7FvoRToGo)

### When to Use Soft vs Hard Assertions

Soft assertions are helpful for tests where understanding multiple failures is beneficial, such as end-to-end tests with a wide range of checks. Hard assertions are more suitable for critical conditions where a single failure should immediately terminate the test.

| **Scenario** | **Use Soft Assertion** | **Use Hard Assertion** |
| --- | --- | --- |
| **End-to-end testing with multiple checks** | Yes. Useful for gathering comprehensive failure data and understanding multiple points of failure. | No. Would stop execution on the first failure, which is not ideal when you want to diagnose multiple issues. |
| **Critical conditions where failure must stop execution immediately** | No. Collecting multiple errors is unnecessary and may lead to misleading results. | Yes. Essential for scenarios where a single failure invalidates the entire test. |
| **Monitoring a production system (e.g., API response times)** | Yes. Enables the test to continue running, gathering more data while signaling performance degradation. | Also yes! If components like login buttons, critical notifications, or essential UI elements are missing, we should stop the test and notify the team, rather than waiting for all test steps to be attempted. |
| **Testing load times or performance benchmarks** | Yes. Helps measure performance without halting the test, giving more insight into overall behavior. | No. Use hard assertions sparingly here; usually not necessary unless a single metric is critical. |
| **Asserting non-deterministic or flaky conditions (for example images loading in X seconds)** | Yes. Can handle variations more gracefully, allowing the test to proceed for better overall coverage. | No. Would stop execution unnecessarily and increase the risk of flaky tests. |
| **Pre-check for test prerequisites** | No. If a condition must be true for the rest of the test to proceed, use a hard assertion. | Yes. If a pre-requisite check kicks off further steps, all further steps should stop if the rerequisite fails. |
| **Validating UI elements during navigation** | Yes. When testing multiple UI states, soft assertions can log failures without interrupting the flow. | Only if the missing UI element would block further navigation. |
| **Critical database operation validations** | No. If a data inconsistency occurs, it’s usually vital to stop further operations. | Yes. Data integrity should be enforced strictly with hard assertions. |
| **Form field validations** | Yes. Allows collecting errors on multiple fields at once, providing more detailed feedback. | No. Stopping at the first validation failure can hinder broader test coverage. |
| **Verifying the presence of essential elements before action** | No. If the element must exist for the test to continue, a hard assertion ensures reliability. | Yes, if the element’s presence is not critical and you want the test to proceed. |

### How to Get Started with Playwright Assertions in Simple Steps

Follow these steps to get up and running with Playwright Assertions:

1. Install Playwright:`npm init playwright@latest`.
2. Start writing tests with various assertion types to validate application behavior.

### How to Add Custom Matchers Using `expect.extend`

Custom matchers can be added using `expect.extend`, allowing developers to define more readable or application-specific assertions.

### Playwright Custom Matchers with Example

Here's a quick example of how to create a custom matcher for checking specific conditions:

```jsx
expect.extend({
  toBeWithinRange(received, floor, ceiling) {
    const pass = received >= floor && received <= ceiling;
    if (pass) {
      return {
        message: () => `expected ${received} not to be within range ${floor} - ${ceiling}`,
        pass: true,
      };
    } else {
      return {
        message: () => `expected ${received} to be within range ${floor} - ${ceiling}`,
        pass: false,
      };
    }
  },
});

// Usage
expect(100).toBeWithinRange(90, 110);
```

This can be especially useful if we’re doing complex assertions, or specialized parsing of responses.

## Common Assertion Errors and How to Debug Them

Understanding how to diagnose assertion failures can save significant debugging time.

### Hard waits

*Hard waits should be avoided.* A ‘hard wait’ refers to giving an exact period of time before going on to the next step of a test. Generally using code like:

```yaml
await page.waitForTimeout(3000);
```

When you have page components you want to ensure are loading quickly, or you have page components that you know take some time to load, it’s tempting to reach for a hard wait, however, there are better ways to accomplish this functionality, like the soft assertions and auto-retry assertions listed above. 

After that fixed period, if the next step doesn’t work, the test will fail. Hard waits are the most common cause of unreliable or ‘flaky’ tests with Playwright. They’re also inefficient, if the element we’re checking for becomes available *before* the hard wait time has elapsed, the test runner still has to wait to the end of the wait time. Read more about this in our page on [waiting in Playwright](https://www.checklyhq.com/learn/playwright/waits-and-timeouts/). 

### Manual Assertions

While a hard wait is problematic since it doesn’t benefit from Playwright’s auto-waiting, an improperly structured assertion doesn’t include waiting at all. By wrapping the `await` inside the `expect()` instead of vice versa, and by using a non-web-first assertion, we get no waiting. In this case we’re checking that there is some text inside an element.

```
// expects the text to be visible instantly
expect(await targetPage.locatorToSomeElement.innerText()).toBeTruthy();
```

Use web-first assertions such as `toBeEmpty()` instead.

```
// uses auto-waiting, defaulting to five seconds max
await expect(targetPage.locatorToSomeElement).not.toBeEmpty();
```

### Debugging Assertion Errors

Playwright provides debug tools such as `page.pause()` and verbose logging to inspect what happens when a test fails. You might also consider a visual like the Playwright VS Code extension to add a visual debugger when writing or debugging tests. [Read more about debugging Playwright scripts](https://www.checklyhq.com/learn/playwright/debugging/).

### Identifying Flaky Tests

Flaky tests are those that fail intermittently, often due to timing issues or unpredictable environment factors. You can use `expect.poll` and `.toPass` adjust timeouts to [stabilize flaky tests](https://www.youtube.com/watch?v=8g7FvoRToGo). To identify flaky tests you can use `--repeat-each=100` to really hammer a test and see if it passes constantly.

### Best Practices for Using Playwright Assertions

Implementing best practices can make your tests more reliable and easier to maintain.

- **Test Granularity**: Structure tests to cover distinct, isolated behaviors, making debugging easier. The choice between one ‘super test’ and 5 or 10 smaller tests should always go with the more granular option. Since [tests can be run in parallel](https://www.checklyhq.com/blog/running-your-playwright-tests-in-parallel-or-in-se/), it’s likely that better test granularity will also improve test execution time.
- **Create Concise Statements**: Keep assertions simple and focused. Asserting that five different page components is an indicator that you’re testing multiple ideas with one test, and want to consider either breaking up your test or should at least have multiple steps.
- **Use Descriptive Messages**: Adding clear messages to assertions helps identify failures quickly. It’s also good to use [test steps](https://www.checklyhq.com/blog/improve-your-playwright-documentation-with-steps/) to add more description to the exact phase where the test failed. Read further to see how to [add test steps programatically with Typescript decorators](https://www.checklyhq.com/blog/playwright-test-steps-with-typescript-decorators/).
- **Parameterize Assertions**: Use variables for assertion parameters to improve test readability and maintainability.
- **Leverage Libraries**: Utilize existing libraries for common assertions where possible. Note that if you’re running tests on a cadence, a full set of libraries may not be available in your execution environment.
- **Be Specific**: Make sure your assertions are as targeted as possible to avoid false positives. Bet on auto-waiting and web-first assertions. Even a change from checking if a text label has the needed text with [`.toContain()`](https://playwright.dev/docs/api/class-genericassertions#generic-assertions-to-contain-1) rather than `toBe()` can improve the reliability of a page monitor.
- **Leverage Built-in Timeout**: Use Playwright’s built-in timeout features to handle flaky conditions gracefully. Avoid hard waits whenever possible.

### How can Checkly Help with Playwright Assertions

Checkly offers tools for continuous monitoring using Playwright scripts. With Checkly, you use the power of Playwright to effectively simulate a real user’s behavior with your site or service, and a can get alerts of problems before your users have noticed.

### Conclusion

By using the right types of assertions, debugging tools, and best practices, you can ensure your tests are robust and efficient. In general, my direct experience has served to emphasize the wisdom of the Playwright project’s recommendations: web first assertions, dependent on web-first selectors. 

For assertions, web-first, auto-retrying assertions are the preferred choice for most scenarios, as they leverage Playwright’s built-in waiting mechanisms, making tests more resilient and less prone to flakiness. These assertions continuously check conditions until they pass or reach a timeout, which can help streamline test execution. Examples like `toBeVisible` or `toContainText` illustrate how these assertions can improve test stability. On the other hand, non-retrying assertions evaluate conditions just once and should be reserved for scenarios where retries are unnecessary or could introduce ambiguity. Anything other than web-first assertions will lead to brittle tests with more false positives.

Soft assertions also add value by collecting all failures within a block before stopping the test, offering a complete picture of what went wrong. They are especially useful in production monitoring scenarios where partial failures should not disrupt the entire check, as seen in the Checkly example using `markCheckAsDegraded`. The ability to use soft assertions alongside the concept of a degraded state provides a nuanced way to monitor service health without causing false alarms.

I’ll again recommend avoiding some common pitfalls, such as relying on hard waits, which can introduce flakiness and inefficiency into your tests. Using auto-waiting mechanisms and structuring assertions properly can make a significant difference. Debugging tools like `page.pause()` and verbose logging, combined with visual debugging options, can be valuable in diagnosing test failures.

Follow best practices now for a better testing and monitoring experience later. These include using concise, focused assertions, adding descriptive messages for better debugging, and leveraging built-in timeouts and parameterization for clarity and maintainability. Granular test design also matters as a way to improve both parallel execution efficiency and debugging ease. Avoiding complex, monolithic tests in favor of smaller, well-defined ones can make your testing framework more manageable and robust.