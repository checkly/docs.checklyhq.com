---
title: Getting started with Multistep API Checks - Checkly Docs
displayTitle: Getting started with Multistep API Checks 
navTitle: Overview
weight: 14
slug: /
menu:
  resources:
    parent: "Multistep checks"
    identifier: "multistep-checks"
aliases:
    - /docs/multistep-checks/quickstart/
    - /docs/multistep-checks/getting-started/

---

Make multiple API calls in sequence with Multistep checks. Monitor complete API flows — like logging in, adding to cart, and checking out — to verify your combined API interactions work as expected.

![Multistep check overview page](/docs/images/multistep-api-checks/multistep-check-overview.png)

This guide gives you all the info to create your first Multistep check with Checkly. You should have some prior
knowledge of working with JavaScript/TypeScript and/or Node.js.

## What is a Multistep check?

Multistep checks enable you to write Node.js Playwright scripts that can run multiple API requests in sequence. They allow you to monitor entire API user flows with a single check. Make requests, parse response data and perform more requests to mimic and test API user behavior. Multistep checks ensure that combined API interactions lead to the correct results.

Examples of API sequences might be:

* Users can authenticate and access restricted data
* Users can get, set and remove data from their account
* Users can add items to a shopping cart, check out and go through the payment flow.

Monitoring your API user flows instead of individual endpoints gives confidence that your product as a whole works as intended and that the expected interactions between API calls are functional.

Multistep checks are powered by `@playwright/test`'s [API Testing](https://playwright.dev/docs/api-testing) mode. Meaning you get all of the power of our typical API checks in the form of a programmable `@playwright/test` check.

> Multistep checks are only supported on runtime 2023.09 or later. See [Runtimes](/docs/runtimes/) for more details.

The following code is a valid Multistep check using Playwright Test. It creates and deletes an API resource in a single run.

```ts {title="multistep.spec.ts"}
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

## Breaking down a Multistep check

Let's look at the code above step-by-step.

**1. Initial declarations:** To run any Multistep check, import the Playwright test framework.

**2. Define our headers:** In many cases, you will have to authenticate when requesting data by providing authorization headers. Use [environment variables](/docs/browser-checks/variables/) to avoid having any confidential data in your test.

**3. Establish environment:** Create a new test and leverage the Playwright `request` fixture to make API requests in the test steps.

**4. Declare our first `test.step`:** The test step uses the `request` to perform a `post` request, using the headers we defined earlier.

>[!NOTE]
> Always use `await` before `test.step`, otherwise the test will fail.

**5. Define our assertion:** Use the `expect(response)` method to assert if the response was successful (the response code is in the range of 200 - 299) with `toBeOK()`. Should the request return anything outside of the 'OK' range, the check will fail and in a production scenario, trigger any configured alerts.

**6. Return the response for future usage:** Return the request response in JSON format, so we can use it in the next test step.

**7. Declare our second `test.step`:** In order to remove the test group we just created, and avoid cluttering our system with test data, remove it by sending a `delete` request using the group ID that was returned in our earlier test step. Use the same `toBeOK()` assertion as in the previous test step.

If you want to build on the above example, you can add additional assertions, ensuring that the data returned is correct and contains a specific check, or add a `PUT` and `GET` test step to verify more of the `/check-groups` functionality.

## Creating a Multistep check

![Multistep check edit page](/docs/images/multistep-api-checks/create-multistep-check.png)

### Name and tags

A meaningful name will not only help you and others identify your checks within Checkly, but it will help provide a better alerting experience if your checks fall into an alert state.

Tags can relate your checks together. They also determine which checks are shown on your [dashboards](/docs/dashboards/).

### Playwright script

A valid Multistep check is based on a valid [Playwright API test script](https://playwright.dev/docs/api-testing). You can create these scripts either in the in-app editor, or write them in your IDE and deploy them using the [Checkly CLI](/docs/cli/). For production, we recommend using the CLI so you can leverage best practices such as version control and code reviews before updating your checks.

> Valid Playwright Test API scripts are the foundation of a valid Multistep check. If the script passes, your check passes.
> If the script fails, your check fails.

#### Structuring a Multistep check

To preserve test isolation and provide a structured report view of Multistep checks, Checkly relies on Playwright's [test.step](https://playwright.dev/docs/api/class-test#test-step) method. Your Multistep test can have several test steps.

API requests and assertions in the same test step will be presented under the same node in the reporting structure.

![Multistep test results](/docs/images/multistep-api-checks/test-results.jpg)

To provide actionable and easy-to-read [check run results](/docs/monitoring/check-results/#multistep-check-results), we recommend using the `test.step()` structure when writing Multistep checks.

```ts  {title="multisteps.spec.ts"}
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

#### Building checks in the web editor

You can edit and debug Playwright scripts straight from the web editor. Use the "Run Script" button to run your script ad-hoc, without recording it as a scheduled run. 

![Multistep check editor](/docs/images/multistep-api-checks/multistep-check-editor.png)

In the sidebar, you can view:

- File dependencies
- Your Playwright config file (if your check was created with the [Checkly CLI](/docs/cli/))
- The test report
- OpenTelemetry traces for this run (if you've enabled [Checkly Traces](/docs/traces-open-telemetry/))
- [Runtimes](/docs/runtimes/), including the packages in your current runtime

After each test run, you can view the result tree by selecting the test report in the editor sidebar. Selecting an API request shows details about that request. You can also view errors and any failed assertions in this report.

### Scheduling & locations

You can configure your checks to run from our [public](/docs/monitoring/global-locations/) locations, or use a Checkly Agent to host your own [private](/docs/private-locations/) locations. If you don't select more than one location and you've disabled retrying checks from the same location, we will pick a random location when retrying checks.

Checkly runs your Multistep checks based on an interval you set. The shortest interval you can run is every minute and the longest is every 24 hours.

### Retries & alerting

Select your preferred [retry strategy](/docs/alerting-and-retries/retries/) for failed checks.

Choose which [alert channels](/docs/alerting-and-retries/alert-channels/) to get notified through when your check runs into issues. If we don't have your preferred alert method, use [webhooks](/docs/alerting-and-retries/webhooks/) to configure your alert flow.

### Testing

You can run your check as an [E2E test](/docs/testing) locally or from your CI/CD pipeline to validate your freshly deployed application. Use the Checkly CLI, or configure integrations with Vercel and GitHub.

## Built-in runtime variables

The Multistep check [runtime](/docs/runtimes/) exposes a set of environment variables (e.g. `process.env.CHECK_NAME`) that indicate what check, check type etc. you are running.

{{< markdownpartial "/_shared/runtime-env-vars.md" >}}

## Timeouts
As with Browser checks, Checkly runs Multistep checks for a maximum of 240s. Scripts exceeding this will timeout. For more information on how to work with the timeout limits for Multistep and Browser checks, see [Timeouts](/docs/browser-checks/timeouts).

## CLI example

The [Checkly CLI](/docs/cli/) gives you a JavaScript/TypeScript-native workflow for coding, testing and deploying synthetic monitoring at scale, from your code base.

You can define a Multistep check via the CLI. Unlike Browser checks, Multistep checks always need to be defined in a construct. For example:

{{< tabs "CLI example" >}}
{{< tab "TypeScript" >}}
```ts {title="multistep.check.ts"}
import { MultiStepCheck, Frequency } from 'checkly/constructs'
import * as path from 'path'

new MultiStepCheck('multistep-check-1', {
  name: 'Multistep Check #1',
  frequency: Frequency.EVERY_10M,
  locations: ['us-east-1', 'eu-west-1'],
  code: {
    entrypoint: path.join(__dirname, 'my-api.spec.ts')
  },
})
```
{{< /tab >}}
{{< tab "JavaScript" >}}
```js {title="multistep.check.js"}
const { MultiStepCheck, Frequency } = require('checkly/constructs')
const path = require('path')

new MultiStepCheck('multistep-check-1', {
  name: 'Multistep Check #1',
  frequency: Frequency.EVERY_10M,
  locations: ['us-east-1', 'eu-west-1'],
  code: {
    entrypoint: path.join(__dirname, 'my-api.spec.ts')
  },
})
```
{{< /tab >}}
{{< /tabs >}}

The above example defines:
- The basic check properties like `name`, `frequency` etc.
- The path to the target Playwright test file, `my-api.spec.ts`.

For more options, see the [Check construct reference](/docs/cli/constructs-reference/#check).

## Next steps

- Learn about the benefits of [Monitoring as Code](/guides/monitoring-as-code/).
- See [example scripts](/docs/multistep-checks/example-checks/) for authentication, CRUD testing, and more.
- Understand [pricing and billing](/docs/monitoring/check-pricing/#multistep-checks) for Multistep checks.
- Learn more about [resource limitations](/docs/runtimes/specs/#resource-limitations) for Multistep checks.

## More Playwright resources

- [Learn Playwright](/learn/playwright/), Checkly's free and open source Playwright knowledge base.
- [Checkly's YouTube channel](https://www.youtube.com/@ChecklyHQ) where we regularly publish tutorials and tips.
- [playwright.dev](https://playwright.dev/) is the official API documentation site for the Playwright framework.
- [awesome-playwright](https://github.com/mxschmitt/awesome-playwright) is a great GitHub repo full of
Playwright-related libraries, tips and resources.