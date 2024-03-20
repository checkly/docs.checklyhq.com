---
title: Getting started
weight: 14
slug: /
menu:
  resources:
    parent: "Multistep API checks"
    identifier: "multistep-checks"
aliases:
    - /docs/multistep-checks/quickstart/
    - /docs/multistep-checks/getting-started/
cli: true
beta: true
---

This guide gives you all the info to create your first Multistep API check with Checkly. You should have some prior
knowledge of working with JavaScript and/or Node.js.

## What is a Multistep API check?

Multistep API checks enable you to write Node.js scripts that can run multiple API requests in sequence. They allow you to monitor entire API user flows with a single check. Make requests, parse response data and perform more requests to mimick and test API user behavior. Multistep API checks ensure that combined API interactions lead to the correct results.

Examples of API sequences might be:

* Users can authenticate and access restricted data
* Users can get, set and remove data from their account
* Users can add items to a shopping cart, check out and go through the payment flow.

Monitoring your API user flows instead of individual endpoints gives confidence that your product as a whole works as intended and that the expected interactions between API calls are functional.

Multistep API checks are powered by `@playwright/test`'s [API Testing](https://playwright.dev/docs/api-testing) mode. Meaning you get all of the power of our typical API checks in the form of a programmable `@playwright/test` check.

{{< info >}}
Multistep API checks are only supported on runtime 2023.09 or later. See [Runtimes](/docs/runtimes) for more details.
{{< /info >}}

The following code is a valid Multistep API check using Playwright Test. It creates and deletes an API resource in a single run.

```ts
import { test, expect } from '@playwright/test' // 1

const headers = { // 2
  Authorization: `Bearer ${process.env.API_KEY}`,
  'x-checkly-account': process.env.ACCOUNT_ID,
}

const baseUrl = process.env.API_URL ?? 'https://api.checklyhq.com/v1'

test('create and delete a check group', async ({ request }) => { // 3
  const createdGroup = await test.step('POST /check-groups', async () => { // 4
    const response = await request.post(`${baseUrl}/check-groups`, {
      data: {
        locations: ['eu-west-1'],
        name: 'exampleCheckGroup',
      },
      headers,
    })
    expect(response).toBeOK() // 5
    return response.json() // 6
  })

  await test.step('DELETE /check-group/{id}', async () => { // 7
    const response = await request.delete(`${baseUrl}/check-groups/${createdGroup.id}`, {
      headers,
    })
    expect(response).toBeOK()
  })
})
```

## Breaking down a Multistep API check

Let's look at the code above step by step.

**1. Initial declarations:** To run any multistep check, import the Playwright test framework.

**2. Define our headers:** In many cases you will have to authenticate when requesting data by providing authorization headers. Use [environment variables](/docs/browser-checks/variables/) to avoid having any confidential data in our test.

**3. Establish environment:** Create a new test and leverage the Playwright `request` fixture to make API requests in the test steps.

**4. Declare our first `test.step`:** The test step uses the `request` to perform a `get` request, using the headers we defined earlier.

{{< warning >}}
Always use `await` before `test.step`, otherwise the test will fail.
{{< /warning >}}

**5. Define our assertion:** Use the `expect(response)` method to assert if the response was successful (The response code is in the range of 200 - 299) with `toBeOK()`. Should the request return anything outside of the 'OK' range, this will cause the check to fail and in a production scenario trigger any configured alerts.

**6. Return the response for future usage:** Return the request response in JSON format, so we can use it in the next test step.

**7. Declare our second `test.step`:** In order to remove the test group we just created, and avoid cluttering our system with test data, remove it by sending a `delete` request using the group ID that was returned in our earlier test step. Use the same `toBeOK()` assertion as in the previous test step.

If you want to build on the above example, you can add additional assertions, ensuring that the data returned is correct and contains a specific check, or add a `PUT` and `GET` test step to verify more of the `/groups` functionality.

## Creating a Multistep check

A valid Multistep API check is based on a valid [Playwright API test script](https://playwright.dev/docs/api-testing). You can create these scripts either in the in-app editor, or write them in your IDE and deploy them using the [Checkly CLI](https://www.checklyhq.com/docs/cli/). For production, we recommend using the CLI so you can leverage best practices such as version control and code reviews before updating your checks.

{{< info >}}
Valid Playwright Test API scripts are the foundation of a valid Multistep API check. If the script passes, your check passes.
If the script fails, your check fails.
{{< /info >}}

### Structuring a Multistep check

To preserve test isolation and provide a structured report view of Multistep checks, Checkly relies on Playwright's [test.step](https://playwright.dev/docs/api/class-test#test-step) method. Your multistep test can have several test steps.

**API requests and assertions in the same test step will be presented under the same node in the reporting structure.**

![Multistep test results](/docs/images/multistep-api-checks/test-results.jpg)

To provide actionable and easy to read check run reports we recommend using the `test.step()` structure when writing Multistep checks.

```ts
import { test, expect } from '@playwright/test'

const baseUrl = 'https://api.checklyhq.com/v1'

test('My test', async ({request}) => {
    await test.step('First step', async () => {
        const health = await request.get(`${baseUrl}/health`)
        await expect(health).toBeOK()
    });

    await test.step('Second step', async () => {
        const response = await request.post(<your request>)
        // Assertions for the second step
        ...
    })
})
```

### Building checks in the web editor

When creating a check using the web editor, after each test run you can open up the result tree by clicking on the 'Test report' icon on the left side of the editor. Selecting an API response opens the response details. You can also view errors and any failed assertion in the report view.

![API test step assertion](/docs/images/multistep-api-checks/test-step-assertion.jpg)

## Multistep result view

When viewing a multistep check run result, you can select any API request in the result tree to view the full response details. If you have your API request and related assertions in the same `test.step`, related requests and failing assertions will be grouped under the same header.

The default request user-agent is `Checkly/1.0 (https://www.checklyhq.com)`.
If you would like to use a different user-agent, you can do so with `test.use({userAgent: 'customerUserAgent'})`.

Selecting the top node in the check report shows the full job log and the check configuration for the run.

## Built-in runtime variables

[The Multistep Check runtime](/docs/runtimes/) also exposes a set of environment variables (e.g. `process.env.CHECK_NAME`)
to figure out what check, check type etc. you are running.

{{< markdownpartial "/_shared/runtime-env-vars.md" >}}


## Pricing

During beta, a multistep check is billed based on the number of requests done per check run. Each request in a multistep check run is billed as a single regular API check run, as they are performing the same basic operation.

As an example, let's say you have 4 API checks, where each check doing one of the `GET`, `POST`, `PUT` and `DELETE` operations towards the same endpoint. If you replace these 4 checks with a single multistep API check that runs 4 requests towards the same endpoint, checking each method, and the check run frequency is the same as before, your cost stays the same

A multistep check with 0 requests is billed as if it has 1 request.

## Beta limitations

During the beta phase, multistep API checks comes with some limitations:
 - Metrics from multistep API checks are not yet available via the [Checkly analytics API](/docs/analytics).
 - Multistep checks are not included in the weekly summary email.

## Resources

- [Checkly's YouTube channel](https://www.youtube.com/@ChecklyHQ) where we regularly publish tutorials and tips.
- [playwright.dev](https://playwright.dev/) is the official API documentation site for the Playwright framework.
- [awesome-playwright](https://github.com/mxschmitt/awesome-playwright) is a great GitHub repo full of
Playwright-related libraries, tips and resources.
- Learn more about [resource limitations](/docs/runtimes/specs/#resource-limitations) for Multistep checks.
