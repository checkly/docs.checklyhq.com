---
title: Degraded state with soft assertions
weight: 19
menu:
  resources:
    parent: "Multistep checks"
    identifier: "multistep-degraded-state-soft-asserts"
cli: true
---

If you want to monitor your API for non-critical errors or performance degradations you can use the degraded check state. This allows you to signal that parts of a Multistep check performed slower than expected, or that it triggered assertions that are of lower criticality. 

The degraded state does not affect your check's success ratio like a failed state does. You can [configure alert channels](/docs/alerting-and-retries/alert-channels/#managing-alert-channels) to notifiy you when a check has degraded. 

To catch errors that are relevant for a degraded scenario you can use soft assertions. Soft assertions keeps your Playwright test running after it has encountered an error, unlike regular assertions which terminate the test. See the [playwright docs](https://playwright.dev/docs/test-assertions#soft-assertions) for more information on soft assertions.

## Playwright-helpers library

To trigger a degraded state Multistep checks use a helper library, `@checkly/playwright-helpers`, which is included in runtime `2023.09` and later. The helper library contains two methods, `markCheckAsDegraded` and `getAPIResponseTime`. 

{{< info >}}
`@checkly/playwright-helpers` is also available for use in browser checks.
{{< /info >}}

### markCheckAsDegraded
Marks a check as degraded if:
- The check is failing with soft assertions, or
- The check has no failures

{{< info >}}
If your check is failing due to a timeout or failed non-soft assertion it will be considered failing, even if `markCheckAsDegraded` is called.
{{< /info >}}

**Usage**
```ts
    if (foo.length > 100) {
      markCheckAsDegraded('Foo is too long.')
    }
```

**Arguments**
- `reason` String *(optional)*. Logged when the method is called. Used to identify which method caused the degradation.

### getAPIResponseTime
Gets the reqeust response time.

**Usage**
```ts
    if (getAPIResponseTime(response) > 100) {
      markCheckAsDegraded('Response was too slow.')
    }
```

**Arguments**
- `response` [APIResponse](https://playwright.dev/docs/api/class-apiresponse) *(required)*. A response from a Playwright API request.

## Triggering a degraded state

A check is marked as degraded when `markCheckAsDegraded` is called and there are no regular assertions triggered.

In this example we trigger a soft assertion if the API responsetime is too slow. We can get the response time by calling `getAPIResponseTime` with the request response as the parameter. At the end of the check we mark the check as degraded if any errors have been triggered during the test.

```ts
import { test, expect } from "@playwright/test"
import { getAPIResponseTime, markCheckAsDegraded } from "@checkly/playwright-helpers"

const baseUrl = "https://api.spacexdata.com/v3"

test("SpaceX-API Dragon Capsules & Next Launch", async ({ request }) => {
  await test.step("get all capsules", async () => {
    const response = await request.get(`${baseUrl}/dragons`)

    // Check 200 status code
    expect(response).toBeOK()
    
    // Check degraded status
    expect.soft(getAPIResponseTime(response), 'GET /dragons too slow').toBeLessThanOrEqual(200)

    return response.json()
  })

  // Trigger degraded state if check failed due to soft assertion
  if (test.info().errors.length) {
    markCheckAsDegraded('Check degraded due to soft assertion failure.')
  }
})
```

Note that if the check had used `expect(getAPIResponseTime)` instead of `expect.soft` it would have been considered failing instead of degraded. Similarly, if we use a soft assertion in the test, but remove the `markCheckAsDegraded` method at the end, the check would also be considered failing.