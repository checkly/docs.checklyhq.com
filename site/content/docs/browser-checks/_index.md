---
title: Getting started with Browser monitoring - Checkly Docs
displayTitle: Getting started with Browser monitoring
navTitle: Overview
weight: 14
slug: /
menu:
  resources:
    parent: "Browser checks"
aliases:
    - /docs/browser-checks/quickstart/
    - /docs/browser-checks/getting-started/

---

Browser checks simulate real user actions—loading pages, clicking links, and filling forms—to ensure your site works as expected. 

![Browser check overview page](/docs/images/browser-checks/browser-check-overview.png)

This guide gives you all the info to create your first Browser check with Checkly. You should have some prior
knowledge of working with Javascript and/or Node.js.

## What is a Browser check?

A Browser check is a Node.js script that controls a headless browser to mimic user behavior.
Load a web page, click a link, fill a form input—do everything your visitors might do and check if these interactions lead to the correct results.

Your critical interactions might be:

- That users can log into my app.
- That users can add products to a shopping cart.
- That users can edit their account details.

The combination of automated interactions and assertions leads to confidence that your site works as expected. If any of these actions fail, the check will trigger your configured [alerts](/docs/alerting-and-retries/).

To power your Browser checks, Checkly uses [Playwright Test](https://playwright.dev/docs/intro)—a robust open-source test runner built around [Playwright](https://github.com/microsoft/playwright). Playwright Test enables you to easily write idiomatic and reliable end-to-end tests. Use these frameworks to control the interactions you want to happen on a web page.

While you can use plain Playwright to run your checks on Checkly, _we highly recommend using Playwright Test_. The test runner gives you powerful additional features such as built-in awaiting for `expect()`, many web-first assertions, high-level locators, and traces and videos of your failed tests to easily debug your issues. [Learn more about using Playwright Test with Checkly](/docs/browser-checks/playwright-test/).

The following code is a valid Browser check using Playwright Test.

{{< tabs "Basic example" >}}
{{< tab "TypeScript" >}}
```ts {title="basic.spec.ts"}
import { expect, test } from '@playwright/test'

test('Visit Checkly HQ page', async ({ page }) => {
  const response = await page.goto('https://checklyhq.com')

  // Test that the response did not fail
  expect(response.status()).toBeLessThan(400)
})
```
{{< /tab >}}
{{< tab "JavaScript" >}}
```js {title="basic.spec.js"}
const { expect, test } = require('@playwright/test')

test('Visit Checkly HQ page', async ({ page }) => {
  const response = await page.goto('https://checklyhq.com')

  // Test that the response did not fail
  expect(response.status()).toBeLessThan(400)
})
```
{{< /tab >}}
{{< /tabs >}}

> Checkly currently supports using Chromium or Chrome with Playwright Test and the Playwright library, with Chromium being the default browser for all checks.
> [Read more about using Chrome](/docs/browser-checks/#using-other-browsers).

## Breaking down a Browser check step-by-step

Let's look at a breakdown of a real-life scenario. The code below logs into Checkly and waits for the dashboard to fully load.

{{< tabs "Breakdown example" >}}
{{< tab "TypeScript" >}}
```ts {title="breakdown.spec.ts"}
import { expect, test } from '@playwright/test' // 1

test('Login to Checkly', async ({ page }) => { // 2
  await page.goto('https://app.checklyhq.com/login') // 3

  await page.getByLabel('Email address').fill('john@example.com') // 4
  await page.getByLabel('Password').fill('mypassword') // 4
  await page.getByRole('button', { name: 'Log In' }).click() // 5

  const homeDashboardTable = page.getByTestId('home-dashboard-table')
  await expect(homeDashboardTable).toBeVisible() // 6
})
```
{{< /tab >}}
{{< tab "JavaScript" >}}
```js {title="breakdown.spec.js"}
const { expect, test } = require('@playwright/test') // 1

test('Login to Checkly', async ({ page }) => { // 2
  await page.goto('https://app.checklyhq.com/login') // 3

  await page.getByLabel('Email address').fill('john@example.com') // 4
  await page.getByLabel('Password').fill('mypassword') // 4
  await page.getByRole('button', { name: 'Log In' }).click() // 5

  const homeDashboardTable = page.getByTestId('home-dashboard-table')
  await expect(homeDashboardTable).toBeVisible() // 6
})
```
{{< /tab >}}
{{< /tabs >}}

**1. Initial declarations:** We first import the Playwright Test framework to control the browser.

**2. Establish environment:** We use the `page` fixture without having to initialise a browser and create a new page manually. See the documentation on [fixtures](https://playwright.dev/docs/api/class-fixtures) to learn more.

**3. Initial navigation:** We use the `page.goto()` method to load the first page.

**4. Fill out input fields and submit:** Using the `page.fill()` method, we enter our email address and
password. You would normally use environment variables here to keep sensitive data
out of your scripts. Learn more about different [login scenarios](/docs/browser-checks/login-scenarios/).

**5. Click Login button:** We use Playwright's `getByRole()` locator to find the login button and also `.click()` on it right away.

**6. Wait for the dashboard:** The expected behaviour is that the dashboard loads. We assess this by checking whether the element with the test ID `home-dashboard-table` is visible. The `getByTestId()` method is looking for elements where the `data-testid` attribute matches the provided value. Playwright Test will automatically retry the assertion until it succeeds or times out (default timeout is 5s). Moreover, when the test has finished, Playwright Test will automatically tear down the `page` fixture and clean up.

## How do I create a Browser check?

A valid Browser check is based on a valid [Playwright Test](https://playwright.dev/docs/intro) or [Playwright](https://github.com/microsoft/playwright) script. You can create these scripts in two ways:

1. By using [Playwright Codegen](https://playwright.dev/docs/codegen) to record a set of actions and generate the Playwright Test or Playwright script automatically.
2. By writing the Node.js by hand.

A combination of both is also very common, i.e. you record the basic interactions with Codegen and then tweak the generated code with extra things like passwords, extra wait conditions and content checks.

In both cases, you can always run and debug the script on your local machine and tweak it to perfection before uploading it to Checkly.

> Valid Playwright Test or Playwright scripts are the foundation of a valid Browser check. If the script passes, your check passes.
> If the script fails, your check fails.

### Browser check templates

We have picked a selection of handy templates that have been optimised for Playwright Test Runner and are updated regularly. [Create a new browser check](https://app.checklyhq.com/checks/browser/create) and try them out.

![checkly-browser-check-templates](/docs/images/browser-checks/browser-check-templates.png)

### Using the editor 

You can edit and debug Playwright scripts straight from the Checkly UI. Use the "Run Script" button to run your script ad-hoc, without recording it as a scheduled run. 

![checkly-browser-check-templates](/docs/images/browser-checks/browser-check-editor.png)

In the sidebar, you can view:

* File dependencies
* Your Playwright config file (if your check was created with the [Checkly CLI](/docs/cli/))
* Golden files, for [visual regression](/docs/browser-checks/visual-regression-snapshot-testing/) testing
* The test report
* OpenTelemetry traces for this run (if you've enabled [Checkly Traces](/docs/traces-open-telemetry/))
* [Runtimes](/docs/runtimes/), including the packages in your current runtime

You can use the following keyboard shortcuts to perform routine actions within the Browser check editor.

| Command               | Keybinding                               |
|-----------------------|------------------------------------------|
| Save check            | **Mac**: `CMD`+`S` / **Windows**: `CTRL`+`S` |
| Start/pause check run | **Mac**: `CMD`+`ENTER` / **Windows**: `CTRL`+`ENTER`  |
| Toggle sidebar        | **Mac**: `CMD`+`B` / **Windows**: `CTRL`+`B` |

## How do I make assertions?

Navigating around your app or site can already give you a lot of confidence your critical business processes are working correctly.
However, many times you want to assert specific values on a page. For example:

- After login, you want the user name to be displayed.
- On a dashboard, you want certain panels to be visible and filled with data.
- Submitting a form should return a specific value.

To do this, you can:

1. Use the popular [Jest expect](https://jestjs.io/docs/expect) library (recommended). If you use Playwright Test, it is directly available.
2. Use [Node's built in `assert`](https://nodejs.org/api/assert.html) function.

You can use as many assertions in your code as you want. For example, in the code below we verify that the signup button on the Checkly homepage has the right text.


{{< tabs "Assertions example" >}}
{{< tab "TypeScript" >}}
```ts {title="assertions.spec.ts"}
import { expect, test } from '@playwright/test'

test('CTA button has "Start for free" text', async ({ page }) => {
  await page.goto('https://checklyhq.com/')

  // CTA button locator
  const button = page.locator('#nav-signup-button')

  // Assert that the button has the correct text
  await expect(button).toHaveText('Start for free')
})
```
{{< /tab >}}
{{< tab "JavaScript" >}}
```js {title="assertions.spec.js"}
const { expect, test } = require('@playwright/test')

test('CTA button has "Start for free" text', async ({ page }) => {
  await page.goto('https://checklyhq.com/')

  // CTA button locator
  const button = page.locator('#nav-signup-button')

  // Assert that the button has the correct text
  await expect(button).toHaveText('Start for free')
})
```
{{< /tab >}}
{{< /tabs >}}

Note that we are using Playwright Test's built-in expect, which is enriched with the [LocatorAssertions](https://playwright.dev/docs/api/class-locatorassertions) class. Methods of this class can be used to make assertions about `Locator` states. Here we use `toHaveText()` to check if the target element has `Start for free` text.

When an assertion fails, your check fails. Your check result will show the log output for the error.

![Viewing a failed check result](/docs/images/browser-checks/browser-check-failed-result.png)

[Learn more about asserting on page elements.](/docs/browser-checks/scraping-onpage-elements)

## Using other browsers

> We strongly recommend using the default `chromium` browser for all your checks [as per the official Playwright documentation](https://playwright.dev/docs/browsers#google-chrome--microsoft-edge).


If your application [has very specific requirements](https://playwright.dev/docs/browsers#when-to-use-google-chrome--microsoft-edge-and-when-not-to), 
Checkly enables you to use Google Chrome with Playwright in runtimes `2023.02` and later. 
In order to use Google Chrome, you need to explicitly opt-in by passing the `channel: 'chrome'` config.

Google Chrome is not available on [Private Locations](/docs/private-locations/) running on ARM64 and Apple silicon.

{{< tabs "Google Chrome with Playwright test" >}}
{{< tab "TypeScript" >}}
```ts {title="chrome.spec.ts"}
import { expect, test } from '@playwright/test'

test.use({ channel: 'chrome' }) // <-- opt-in to use Google Chrome

test('Open the page and take a screenshot', async ({ page }) => {
  await page.goto('https://checklyhq.com/')
  await page.screenshot({ path: `checkly.png` })  
})
```
{{< /tab >}}
{{< tab "JavaScript" >}}
```js {title="chrome.spec.js"}
const { expect, test } = require('@playwright/test')

test.use({ channel: 'chrome' }) // <-- opt-in to use Google Chrome

test('Open the page and take a screenshot', async ({ page }) => {
  await page.goto('https://checklyhq.com/')
  await page.screenshot({ path: `checkly.png` })
})
```
{{< /tab >}}
{{< /tabs >}}


> Checkly inspects your code to detect which browser is used. To use Chrome, include
> `channel: 'chrome'` or `channel: "chrome"` (whitespace is ignored) in your code, 
> without any intermediate variables or functions.
> For example, using a variable like `test.use({ channel: chromeChannel })` can cause Checkly to fail to detect that 
> Chrome is being used.

## CLI example

The [Checkly CLI](/docs/cli/) gives you a JavaScript/TypeScript-native workflow for coding, testing and deploying synthetic monitoring at scale, from your code base.

You can write `.spec.js|ts` files and configure the CLI to automatically convert them into Browser checks. The CLI will apply some default settings, like name, run locations, and run frequency. You can configure this at the [project](/docs/cli/constructs-reference/#project) or [group](/docs/cli/constructs-reference/#checkgroup) level.

If you want more control over the configuration, you can explicitly define a Browser check:

{{< tabs "CLI example" >}}
{{< tab "TypeScript" >}}
```ts {title="browser.check.ts"}
import { BrowserCheck, Frequency } from 'checkly/constructs'
import * as path from 'path'

new BrowserCheck('browser-check-1', {
  name: 'Browser check #1',
  frequency: Frequency.EVERY_10M,
  locations: ['us-east-1', 'eu-west-1'],
  code: {
    entrypoint: path.join(__dirname, 'home.spec.ts')
  }
})
```
{{< /tab >}}
{{< tab "JavaScript" >}}
```js {title="browser.check.js"}
const { BrowserCheck, Frequency } = require('checkly/constructs')
import * as path from 'path'

new BrowserCheck('browser-check-1', {
  name: 'Browser check #1',
  frequency: Frequency.EVERY_10M,
  locations: ['us-east-1', 'eu-west-1'],
  code: {
    entrypoint: path.join(__dirname, 'home.spec.js')
  }
})
```
{{< /tab >}}
{{< /tabs >}}

The above example defines:
- The basic check properties like `name`, `frequency` etc.
- The path to the target Playwright test file, `home.spec.ts`.

For more options, see the [Check construct reference](/docs/cli/constructs-reference/#check).

## Next steps

- Learn about the benefits of [Monitoring as Code](/guides/monitoring-as-code/).
- Capture [screenshots](/docs/browser-checks/screenshots/) in your check.
- Handle different [login scenarios](/docs/browser-checks/login-scenarios/).
- Understand [timeouts and related errors](/docs/browser-checks/timeouts/).
- Set up [visual regression & snapshot testing](/docs/browser-checks/visual-regression-snapshot-testing/).
- Learn more about [resource limitations](/docs/runtimes/specs/#resource-limitations) for browser checks.

## More Playwright resources

- [Learn Playwright](/learn/playwright/), Checkly's free and open source Playwright knowledge base 
- [Checkly's YouTube channel](https://www.youtube.com/@ChecklyHQ) where we regularly publish tutorials and tips.
- [playwright.dev](https://playwright.dev/) is the official API documentation site for the Playwright framework.
- [awesome-playwright](https://github.com/mxschmitt/awesome-playwright) is a great GitHub repo full of
Playwright-related libraries, tips and resources.
