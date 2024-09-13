---
title: Getting started
weight: 14
slug: /
menu:
  resources:
    parent: "Browser checks"
aliases:
    - /docs/browser-checks/quickstart/
    - /docs/browser-checks/getting-started/
cli: true
---

This guide gives you all the info to create your first Browser check with Checkly. You should have some prior
knowledge of working with Javascript and/or Node.js.

## What is a Browser check?

A Browser check is a Node.js script that controls a headless browser to mimic user behavior.
Load a web page, click a link, fill a form input – do everything your visitors might do and check if these interactions lead to the correct results.

Your critical interactions might be:

- That users can log into my app.
- That users can add products to a shopping cart.
- That users can edit their account details.

The combination of automated interactions and assertions leads to confidence that your site works as expected.

To power your Browser checks, Checkly uses **[Playwright Test](https://playwright.dev/docs/intro)** - a robust open-source test-runner build around **[Playwright](https://github.com/microsoft/playwright)**. Playwright test enables you to easily write idiomatic and reliable end-to-end tests. Use these frameworks to control the interactions you want to happen on a web page.

While you can use plain Playwright to run your checks on Checkly, **we highly recommend using Playwright Test**. The test-runner gives you powerful additional features such as built-in awaiting for `expect()`, many web-first assertions, high-level locators, and traces and videos of your failed tests to easily debug your issues, [learn more about Playwright Test features](/docs/browser-checks/playwright-test/).


{{< warning >}}
We have stopped support for Puppeteer with runtime 2022.10. [Read more about our reasons](/docs/browser-checks/#what-about-puppeteer).
{{< /warning >}}

The following code is a valid Browser check using Playwright Test.

{{< tabs "Basic example" >}}
{{< tab "TypeScript" >}}
```ts
import { expect, test } from '@playwright/test'

test('Visit Checkly HQ page', async ({ page }) => {
  const response = await page.goto('https://checklyhq.com')

  // Test that the response did not fail
  expect(response.status()).toBeLessThan(400)
})
```
{{< /tab >}}
{{< tab "JavaScript" >}}
```js
const { expect, test } = require('@playwright/test')

test('Visit Checkly HQ page', async ({ page }) => {
  const response = await page.goto('https://checklyhq.com')

  // Test that the response did not fail
  expect(response.status()).toBeLessThan(400)
})
```
{{< /tab >}}
{{< /tabs >}}

{{< info >}}
Checkly currently supports using **Chromium** or **Chrome** with Playwright Test and Playwright library, with Chromium being the default browser for all checks.
[Read more about using Chrome](/docs/browser-checks/#using-other-browsers). 
{{< /info >}}

## Breaking down a Browser check step-by-step

Let's look at a breakdown of a real-life scenario. The code below logs into Checkly, and waits for the dashboard to fully load.

{{< tabs "Breakdown example" >}}
{{< tab "TypeScript" >}}
```ts
import { expect, test } from '@playwright/test' // 1

test('Login to Checkly', async ({ page }) => { // 2
  await page.goto('https://app.checklyhq.com/login') // 3

  await page.locator('input[type="email"]').type('john@example.com') // 4
  await page.locator('input[type="password"]').type('mypassword') // 4
  await page.getByRole('button', { name: 'Log In' }).click() // 5

  const homeDashboardTable = page.getByTestId('home-dashboard-table')
  await expect(homeDashboardTable).toBeVisible() // 6
})
```
{{< /tab >}}
{{< tab "JavaScript" >}}
```js
const { expect, test } = require('@playwright/test') // 1

test('Login to Checkly', async ({ page }) => { // 2
  await page.goto('https://app.checklyhq.com/login') // 3

  await page.locator('input[type="email"]').type('john@example.com') // 4
  await page.locator('input[type="password"]').type('mypassword') // 4
  await page.getByRole('button', { name: 'Log In' }).click() // 5

  const homeDashboardTable = page.getByTestId('home-dashboard-table')
  await expect(homeDashboardTable).toBeVisible() // 6
})
```
{{< /tab >}}
{{< /tabs >}}

**1. Initial declarations:** We first import the Playwright Test framework to control the browser.

**2. Establish environment:** We use the `page` fixture without having to initialise a browser and create a new page manually. See the documentation on [Fixtures](https://playwright.dev/docs/api/class-fixtures) to learn more.

**3. Initial navigation:** We use the `page.goto()` method to load the first page.

**4. Fill out input fields and submit:** Using the `page.type()` method we enter our email address and
password. You would normally use environment variables here to keep sensitive data
out of your scripts. See [Login scenarios and secrets](/docs/browser-checks/login-scenarios/) for more info.

**5. Click Login button:** We use Playwright's `getByRole()` locator to find the login button and also `.click()` on it right away.

**6. Wait for the dashboard:** The expected behaviour is that the dashboard loads. We assess this by checking whether the element with the test ID `home-dashboard-table` is visible. The `getByTestId()` method is looking for elements where the `data-testid` attribute matches the provided value. Playwright Test will automatically retry the assertion until it succeeds or times out (default timeout is 5s). Moreover, when the test has finished, Playwright Test will automatically tear down the `page` fixture and clean up.

## How do I create a Browser check?

A valid Browser check is based on a valid **[Playwright Test](https://playwright.dev/docs/intro)** or **[Playwright](https://github.com/microsoft/playwright)** script. We are constantly updating Checkly to integrate their newest features ([view currently supported features](/docs/browser-checks/playwright-test/#features])).
You can create these scripts in two ways:

1. By using [Playwright Codegen](https://playwright.dev/docs/codegen) to record a set of actions and generate the Playwright Test or Playwright script automatically.
2. By writing the Node.js by hand.

A combination of both is also very common, i.e. you record the basic interactions with Codegen and then tweak the generated code with extra things like passwords, extra wait conditions and content checks.

In both cases, you can always **run and debug the script on your local machine** and tweak it to perfection before uploading it to Checkly.


{{< info >}}
Valid Playwright Test or Playwright scripts are the foundation of a valid Browser check. If the script passes, your check passes.
If the script fails, your check fails.
{{< /info >}}

### Browser check templates

We have picked a selection of handy templates that have been optimised for Playwright Test Runner and are updated regularly. [Create a new browser check](https://app.checklyhq.com/checks/browser/create) and try them out.

![checkly-browser-check-templates](/docs/images/browser-checks/browser-check-templates.png)

### Editor tips

You can use the following keyboard shortcuts to perform routine actions within the browser check editor.

| Command               | Keybinding                               |
|-----------------------|------------------------------------------|
| Save check            | **Mac**: `CMD`+`S` / **Windows**: `CTRL`+`S` |
| Start/pause check run | **Mac**: `CMD`+`ENTER` / **Windows**: `CTRL`+`ENTER`  |
| Toggle sidebar        | **Mac**: `CMD`+`B` / **Windows**: `CTRL`+`B` |

## How do I make assertions?

Navigating around your app or site can already give you a lot of confidence your critical business processes are working correctly.
However, many times you want to assert specific values on a page.

- After login, you want the user name to be displayed.
- On a dashboard, you want certain panels to be visible and filled with data.
- Submitting a form should return a specific value.

To do this, you can:

1. Use the popular [Jest expect](https://jestjs.io/docs/expect) library (Recommended). If you use Playwright Test it is directly available.
2. Use [Node's built in `assert`](https://nodejs.org/api/assert.html) function.
3. Use the [Chai.js](https://www.chaijs.com/) library of TDD and BDD assertions.

You can use as many assertions in your code as you want. For example, in the code below we verify that the signup button on Checkly homepage has the right text.


{{< tabs "Assertions example" >}}
{{< tab "TypeScript" >}}
```ts
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
```js
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

Note that we are using Playwright Tests's built-in expect, which is enriched with a convenient [LocatorAssertions](https://playwright.dev/docs/api/class-locatorassertions) class. Methods of this class can be used to make assertions about `Locators` state. Here we use `toHaveText()` to check if the target element has `Start for free` text.

When an assertion fails, your check fails. Your check's result will show the log output for the error. Any configured
alerting channels will be triggered, notifying your team that something is up.

<video alt="Viewing a failed check" autoplay loop muted src="/docs/images/browser-checks/getting-started_pwt.mp4"></video>

## What about Puppeteer?
While Playwright and Puppeteer share many similarities, they have evolved at different speeds over time. Playwright's rapid release cycle and new features such as [auto-waiting](https://playwright.dev/docs/actionability) and [the built-in inspector](https://playwright.dev/docs/debug#playwright-inspector) made it gain momentum in the developer community. Playwright and Playwright Test Runner have become superior solutions and we have stopped support for Puppeteer in newer [runtimes](/docs/runtimes/). The latest runtime that supports Puppeteer is [2022.02](/docs/runtimes/specs/).

We recommend using Playwright Test if you are just starting out or [migrating from Puppeteer to Playwright using `puppeteer-to-playwright`](https://github.com/checkly/puppeteer-to-playwright).

## Using other browsers
{{< info >}}
We strongly recommend using the default `chromium` browser for all your checks [as per the offcial Playwright documentation](https://playwright.dev/docs/browsers#google-chrome--microsoft-edge).
{{< /info >}}

If your application [has very specific requirements](https://playwright.dev/docs/browsers#when-to-use-google-chrome--microsoft-edge-and-when-not-to), 
Checkly enables you to use `Google Chrome` with Playwright in runtimes `2023.02` and later. 
In order to use Google Chrome you need to explicitly opt-in by passing the `channel: 'chrome'` config.

Google Chrome is not available on [Private Locations](/docs/private-locations/) running on ARM64 and Apple silicon.

{{< tabs "Google Chrome with Playwright test" >}}
{{< tab "TypeScript" >}}
```ts
import { expect, test } from '@playwright/test'

test.use({ channel: 'chrome' }) // <-- opt-in to use Google Chrome

test('Open the page and take a screenshot', async ({ page }) => {
  await page.goto('https://checklyhq.com/')
  await page.screenshot({ path: `checkly.png` })  
})
```
{{< /tab >}}
{{< tab "JavaScript" >}}
```js
const { expect, test } = require('@playwright/test')

test.use({ channel: 'chrome' }) // <-- opt-in to use Google Chrome

test('Open the page and take a screenshot', async ({ page }) => {
  await page.goto('https://checklyhq.com/')
  await page.screenshot({ path: `checkly.png` })
})
```
{{< /tab >}}
{{< /tabs >}}

{{< info >}}
Checkly inspects your code to detect which browser is used. To use Chrome please include
`channel: 'chrome'` or `channel: "chrome"` (whitespace is ignored) in your code, 
without any intermediate variables or functions.
For example, using a variable like `test.use({ channel: chromeChannel })` can cause Checkly to fail to detect that 
Chrome is being used.
{{< /info >}}

## Next Steps
- Learn more about [built-in functionalities of Playwright Test](/docs/browser-checks/playwright-test/).
- Learn how to deal with [login scenarios and private data](/docs/browser-checks/login-scenarios/).
- Use [Playwright Codegen](https://playwright.dev/docs/codegen) to record scripts without coding.
- Learn more about [taking screenshots](/docs/browser-checks/screenshots/).
- Learn more about [visual regression & snapshot testing](/docs/browser-checks/visual-regression-snapshot-testing/).
- Run checks behind an [HTTP proxy](/docs/private-locations/proxy/).
- Learn more about [resource limitations](/docs/runtimes/specs/#resource-limitations) for browser checks.

## More Playwright resources

- [Headless Automation guides](/learn/headless/), a free & open source knowledge base for Playwright and Puppeteer
(maintained by Checkly).
- [Checkly's YouTube channel](https://www.youtube.com/@ChecklyHQ) where we regularly publish tutorials and tips.
- [playwright.dev](https://playwright.dev/) is the official API documentation site for the Playwright framework.
- [awesome-playwright](https://github.com/mxschmitt/awesome-playwright) is a great GitHub repo full of
Playwright-related libraries, tips and resources.
