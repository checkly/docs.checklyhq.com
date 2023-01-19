---
title: Getting started
weight: 14
slug: /
menu:
  docs:
    parent: "Browser checks"
aliases:
    - /docs/browser-checks/quickstart/
    - /docs/browser-checks/getting-started/
---

This guide gives you all the info to create your first Browser check with Checkly. You should have some prior
knowledge of working with Javascript and/or Node.js.

## What is a Browser check?

A Browser check is a Node.js script that controls a headless Chromium browser to mimic user behavior.
Load a web page, click a link, fill a form input – do everything your visitors might do and check if these interactions lead to the correct results.

Your critical interactions might be:

- That users can log into my app.
- That users can add products to a shopping cart.
- That users can edit their account details.

The combination of automated interactions and assertions leads to confidence that your site works as expected.

To power your Browser checks, Checkly uses the **[Playwright](https://github.com/microsoft/playwright)** framework as well as **[Playwright Test](https://playwright.dev/docs/intro)**, a test-runner utilising Playwright to easily write idiomatic and reliable end-to-end tests. Use these frameworks to control the interactions you want to happen on a web page.

{{< info >}}
We have stopped support for Puppeeteer with runtime 2022.10. [Read more about why](/docs/browser-checks/#what-about-puppeteer).
{{< /info >}}

The following code is a valid Browser check.

{{< tabs "Basic example" >}}
{{< tab "Playwright" >}}
 ```js
const playwright = require('playwright')
const browser = await playwright.chromium.launch()
const page = await browser.newPage()
const response = await page.goto('https://checklyhq.com/')

if (response.status() > 399) {
  throw new Error(`Failed with response code ${response.status()}`)
}

await browser.close()
 ```
{{< /tab >}}
{{< tab "Puppeteer" >}}
 ```js
const puppeteer = require('puppeteer')
const browser = await puppeteer.launch()
const page = await browser.newPage()
const response = await page.goto('https://checklyhq.com/')

if (response.status() > 399) {
  throw new Error(`Failed with response code ${response.status()}`)
}

await browser.close()
 ```
{{< /tab >}}
{{< /tabs >}}

{{< info >}}
While you can use plain Playwright to write your checks, we highly recommned using the Playwright Test Runner. The test-runner gives you powerful additional features such as traces and videos of your tests, built-in `expect()` function and web-first assertions. [Learn more](/docs/browser-checks/playwright-test/).
{{< /info >}}

{{< info >}}
Checkly currently supports only using **Chromium** with Playwright Test and Playwright.
{{< /info >}}

## Breaking down a Browser check step-by-step

Let's look at a more real life example and break down each step. The code below logs into Checkly, waits for the dashboard
to fully load and then snaps a screenshot.

{{< tabs "Breakdown example" >}}
{{< tab "Playwright" >}}
```js
const playwright = require('playwright') // 1
const browser = await playwright.chromium.launch()
const page = await browser.newPage()

await page.goto('https://app.checklyhq.com/login') // 2

await page.type('input[type="email"]', 'john@example.com') // 3
await page.type('input[type="password"]','mypassword')
await page.click('.btn.btn-success.btn-block')

await page.waitForSelector('.status-table') // 4
await page.screenshot({ path: 'checkly_dashboard.png' })
await browser.close()
 ```
{{< /tab >}}
{{< tab "Puppeteer" >}}
```js
const puppeteer = require('puppeteer') // 1
const browser = await puppeteer.launch()
const page = await browser.newPage()

await page.goto('https://app.checklyhq.com/login') // 2

await page.type('input[type="email"]', 'john@example.com') // 3
await page.type('input[type="password"]','mypassword')
await page.click('.btn.btn-success.btn-block')

await page.waitForSelector('.status-table') // 4
await page.screenshot({ path: 'checkly_dashboard.png' })
await browser.close()
```
{{< /tab >}}
{{< /tabs >}}

**1. Initial declarations:** We first import a framework (Playwright Test Runner or Playwright) to control a browser.
We also declare a `browser` and a `page` variable.

**2. Initial navigation:** We use the `page.goto()` method to load the first page.

**3. Fill out input fields and submit:** Using the `page.type()` and `page.click()` methods we enter our email address and
password and click the login button. You would normally use environment variables here to keep sensitive data
out of your scripts. See [Login scenarios and secrets](/docs/browser-checks/login-and-secrets/) for more info.

**4. Wait for dashboard and close:** The expected behaviour is that the dashboard loads. In our case we can recognise this
by the correct loading of the `.status-table` element in the page. For a visual reference, we also take a screenshot.
We then close the browser. Our check is done.

## How do I create a Browser check?

Every valid **[Playwright Test](https://playwright.dev/docs/intro)** or **[Playwright](https://github.com/microsoft/playwright)** script is a valid Browser check. You can create these scripts in two ways:

1. By using [Playwright Codegen](https://playwright.dev/docs/codegen) to record a set of actions and generate the Playwright Test or Playwright script automatically.
2. By writing the Node.js by hand.

A combination of both is also very common, i.e. you record the basic interactions with Codegen and then tweak the generated code with extra things like passwords, extra wait conditions and content checks.

In both cases, you can always **run and debug the script on your local machine** and tweak it to perfection before uploading it to Checkly.


{{< info >}}
Every valid Playwright or Playwright Test script is a valid Browser check. If the script passes, your check passes.
If the script fails, your check fails.
{{< /info >}}


## How do I assert assumptions?

Navigating around your app or site can already give you a lot of confidence your critical business processes are working correctly.
However, many times you want to assert specific values on a page.

- After login, you want the user name to be displayed.
- On a dashboard, you want certain panels to be visible and filled with data.
- Submitting a form should return a specific value.

To do this, you can:

1. Use the popular [Jest expect](https://jestjs.io/docs/expect) library (Recommended). If you use Playwright Test it is directly available.
2. Use [Node's built in `assert`](https://nodejs.org/api/assert.html) function.
3. Use the [Chai.js](https://www.chaijs.com/) library of TDD and BDD assertions.

You can use as many assertions in your code as you want. For example, in the code below we scrape the text from the
large button on the Checkly homepage and assert it in two ways.


{{< tabs "Assertions example" >}}
{{< tab "Playwright" >}}
```js
const playwright = require('playwright')
const expect = require('expect')

const browser = await playwright.chromium.launch()
const page = await browser.newPage()
await page.goto('https://checklyhq.com/')

// get the text of the button
const buttonText = await page.$eval('a.btn-lg', el => el.innerText)

// assert using Jest's expect function
expect(buttonText).toEqual('Start for free')

await browser.close()
 ```
{{< /tab >}}
{{< tab "Puppeteer" >}}
```js
const puppeteer = require('puppeteer')
const expect = require('expect')

const browser = await puppeteer.launch()
const page = await browser.newPage()
await page.goto('https://checklyhq.com/')

// get the text of the button
const buttonText = await page.$eval('a.btn-lg', el => el.innerText)

// assert using Jest's expect function
expect(buttonText).toEqual('Start for free')

await browser.close()
 ```
{{< /tab >}}
{{< /tabs >}}

Note the following:

- We use the `page.$eval()` method to grab the button element and get its innerText property.
- We use a basic Jest `expect().toEqual()` statement to verify the text is correct.

When an assertion fails, your check fails. Your check's result will show the log output for the error. Any configured
alerting channels will be triggered, notifying your team that something is up.

![failed api monitoring assertion](/docs/images/browser-checks/failed_assertion.png)

## What about Puppeteer?
While Playwright and Puppeteer share many similarities, they have evolved at different speeds over the last two years. Playwright's rapid release cycle and new features such as [auto-waiting](https://playwright.dev/docs/actionability) and [the built-in inspector](https://playwright.dev/docs/debug#playwright-inspector) made it gain momentum in the developer community. Playwright and Playwright Test Runner have become superior solutions and we have stopped support for Puppeeteer. The last available runtime is [2022.02](/docs/runtimes/specs/).

We recommend using Playwright Test Runner if you are just starting out or [migrating from Puppeteer to Playwright using `puppeteer-to-playwright`](https://github.com/checkly/puppeteer-to-playwright).

## Next Steps
- Learn more about [built-in functionalities of Playwright Test](/docs/browser-checks/playwright-test/).
- Learn how to deal with [login scenarios and private data](/docs/browser-checks/login-and-secrets/).
- Use [Playwright Codegen](https://playwright.dev/docs/codegen) to record scripts without coding.
- Learn more about [taking screenshots](/docs/browser-checks/screenshots/).
- Learn more about [creating reusable code snippets](/docs/browser-checks/partials-code-snippets/).
- Run checks behind an [HTTP proxy](/docs/private-locations/proxy).

## More Playwright resources

- [Headless Automation guides](/learn/headless), a free & open source knowledge base for Playwright and Puppeteer
(maintained by Checkly).
- [playwright.dev](https://playwright.dev/) is the official API documentation site for the Playwright framework.
- [awesome-playwright](https://github.com/mxschmitt/awesome-playwright) is a great GitHub repo full of
Playwright-related libraries, tips and resources.
