---
title: Migrating from Puppeteer to Playwright
description: >-
  The switch from Puppeteer to Playwright is easy. But is it worth it? And how exactly does one migrate existing scripts from one tool to another? What are the required code-level changes, and what new features and approaches does the switch enable?
author: Giovanni Rago
avatar: 'images/avatars/giovanni-rago.png'
---

> **UPDATE**: _you can use our {{< newtabref  href="https://github.com/checkly/puppeteer-to-playwright" title="puppeteer-to-playwright" >}} conversion script to quickly migrate your Puppeteer codebase to Playwright._

## Puppeteer and Playwright today

While they share a number of similarities, {{< newtabref  href="https://pptr.dev" title="Puppeteer" >}} and {{< newtabref  href="https://playwright.dev" title="Playwright" >}} have evolved at different speeds over the last two years, with Playwright gaining a lot of momentum and arguably even leaving Puppeteer behind.

These developments have led many to switch from Puppeteer to Playwright. This guide aims to show what practical steps are necessary and what new possibilities this transition enables. Do not let the length of this article discourage you - in most cases the migration is quick and painless.

### Why switch

While a comprehensive comparison of each tool's strengths and weaknesses could fill up a guide of its own (see our [previous benchmarks](https://blog.checklyhq.com/cypress-vs-selenium-vs-playwright-vs-puppeteer-speed-comparison/) for an example), the case for migrating to Playwright today is rather straightforward:

1. As of the writing of this guide, Playwright has been frequently and consistently adding game changing features (see [below](#new-possibilities-to-be-aware-of) for a partial list) for many months, with Puppeteer releasing in turn mostly smaller changes and bug fixes. This led to a reversal of the feature gap that had once separated the two tools.
2. Playwright maintains an edge in performance in real-world E2E scenarios (see benchmark linked above), resulting in lower execution times for test suites and faster monitoring checks.
3. Playwright scripts seem to run even more stable than their already reliable Puppeteer counterparts.
4. The Playwright community on {{< newtabref  href="https://github.com/microsoft/playwright/issues" title="GitHub" >}}, {{< newtabref  href="https://twitter.com/playwrightweb" title="Twitter" >}}, {{< newtabref  href="https://aka.ms/playwright-slack" title="Slack" >}} and beyond has gotten very vibrant, while Puppeteer's has gone more and more quiet. 

## What to change in your scripts - short version

Below you can find a cheat sheet with Puppeteer commands and the corresponding evolution in Playwright. Keep reading for a longer, more in-depth explanation of each change.

Remember to add `await` as necessary.

| Puppeteer                                   | Playwright                                       |
| ------------------------------------------- | ------------------------------------------------ |
| `require('puppeteer')`                      | `require('playwright')`                          |
| `puppeteer.launch(...)`                     | `playwright.chromium.launch(...)`                |
| `browser.createIncognitoBrowserContext(...)`|  `browser.newContext(...)`                       |
| `page.setViewport(...)`                     | `page.setViewportSize(...)`                      |
| `page.waitForSelector(selector)` `page.click(selector);` | `page.click(selector)`              |
| `page.waitForXPath(XPathSelector)`          | `page.waitForSelector(XPathSelector)`            |
| `page.$x(xpath_selector)`                   | `page.$(xpath_selector)`                         |
| `page.waitForNetworkIdle(...)`              | `page.waitForLoadState({ state: 'networkidle' }})` |
| `page.waitForFileChooser(...)`              | Removed, [handled differently](https://playwright.dev/docs/input/#upload-files). |
| `page.waitFor(timeout)`                     | `page.waitForTimeout(timeout)` |
| `page.type(selector, text)`                 | `page.fill(selector, text)` |
| `page.cookies([...urls])`                   | `browserContext.cookies([urls])` |
| `page.deleteCookie(...cookies)`             | `browserContext.clearCookies()` |
| `page.setCookie(...cookies)`                | `browserContext.addCookies(cookies)` |
| `page.on('request', ...)`                   | Handled through [page.route](https://playwright.dev/docs/api/class-page#page-route). |
| `elementHandle.uploadFile(...)`             | `elementHandle.setInputFiles(...)` |
| Tricky file download.                       | Better [support for downloads](https://playwright.dev/docs/downloads). |

> Did we forget anything? Please let us know by getting in touch, or {{< newtabref  href="https://github.com/checkly/checklyhq.com" title="submit your own PR" >}}.

## What to change in your scripts - in depth

### Require Playwright package

In Puppeteer, the first few lines of your script would have most likely looked close to the following:

```js
const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  // ...
```

With Playwright you do not need to change much:

```js
const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  // ...
```

Playwright offers cross-browser support out of the box, and you can choose which browser to run with just by changing the first line, e.g. to `const { webkit } = require('playwright');`
In Puppeteer, this would have been done through the browser's launch options:

```js
  const browser = await puppeteer.launch({ product: 'firefox' })
```

### The browser context

{{< newtabref  href="https://playwright.dev/docs/api/class-browsercontext" title="Browser contexts" >}} already existed in Puppeteer:

```js
const browser = await puppeteer.launch();
const context = await browser.createIncognitoBrowserContext();
const page = await context.newPage();
```

Playwright's API puts even more importance on them, and handles them a little differently:

```js
const browser = await chromium.launch();
const context = await browser.newContext();
const page = await context.newPage();
```

Like in Puppeteer, for basic cases and single-page flows, you can use the default context:

```js
const browser = await chromium.launch();
const page = await browser.newPage();
```

> When in doubt, explicitly create a new context at the beginning of your script.

### Waiting

The auto-waiting mechanism in Playwright means you will likely not need to care about explicitly waiting as often. Still, waiting being one of the trickiest bits of UI automation, you will still want to know different ways of having your script explicitly wait for one or more conditions to be met.

In this area, Playwright brings about several changes you want to be mindful of: 

1. `{{< newtabref  href="https://playwright.dev/docs/api/class-page#page-wait-for-navigation" title="page.waitForNavigation" >}}` and `{{< newtabref  href="https://playwright.dev/docs/api/class-page#page-wait-for-selector" title="page.waitForSelector" >}}` remain, but in many cases will not be necessary due to auto-waiting.

2. `{{< newtabref  href="https://playwright.dev/docs/api/class-page#page-wait-for-event" title="page.waitForEvent" >}}` has been added.

3. Puppeteer's `{{< newtabref  href="https://pptr.dev/#?product=Puppeteer&version=v11.0.0&show=api-pagewaitforxpathxpath-options" title="page.waitForXPath" >}}` has been incorporated into `{{< newtabref  href="https://playwright.dev/docs/api/class-page#page-wait-for-selector" title="page.waitForSelector" >}}`, which recognises XPath expressions automatically.

4. `{{< newtabref  href="https://pptr.dev/#?product=Puppeteer&version=v11.0.0&show=api-pagewaitforfilechooseroptions" title="page.waitForFileChooser" >}}` been removed (see the {{< newtabref  href="https://playwright.dev/docs/input#upload-files" title="official dedicated page" >}} and our [file upload example](https://www.checklyhq.com/learn/headless/e2e-account-settings/) for new usage)

5. `{{< newtabref  href="https://pptr.dev/#?product=Puppeteer&version=v11.0.0&show=api-pagewaitfornetworkidleoptions" title="page.waitForNetworkIdle" >}}` has been generalised into `{{< newtabref  href="https://playwright.dev/docs/api/class-page#page-wait-for-load-state" title="page.waitForLoadState" >}}` (see the `networkidle` state to recreate previous behaviour)

6. `{{< newtabref  href="https://playwright.dev/docs/api/class-page#page-wait-for-url" title="page.waitForUrl" >}}` has been added allowing you to wait until a URL has been loaded by the page's main frame.

7. `{{< newtabref  href="https://pptr.dev/#?product=Puppeteer&version=v11.0.0&show=api-pagewaitforselectororfunctionortimeout-options-args" title="page.waitFor(timeout)" >}}` becomes `{{< newtabref  href="https://playwright.dev/docs/api/class-frame#frame-wait-for-timeout" title="page.waitForTimeout(timeout)" >}}`.

> This is as good a place as any to remind that `page.waitForTimeout` should never be used in production scripts! Hard waits/sleeps should be used only for debugging purposes.

### Setting viewport

Puppeteer's `page.setViewport` becomes `page.setViewportSize` in Playwright.

### Typing

While puppeteer's `{{< newtabref  href="https://playwright.dev/docs/api/class-page#page-type" title="page.type" >}}` is available in Playwright and still handles fine-grained keyboard events, Playwright adds `{{< newtabref  href="https://playwright.dev/docs/api/class-page#page-fill" title="page.fill" >}}` specifically for filling and clearing forms.

### Cookies

With Puppeteer cookies are handled at the page level; with Playwright you manipulate them at the BrowserContext level. 

The old...

1. `{{< newtabref  href="https://pptr.dev/#?product=Puppeteer&version=v11.0.0&show=api-pagecookiesurls" title="page.cookies([...urls])" >}}`
2. `{{< newtabref  href="https://pptr.dev/#?product=Puppeteer&version=v11.0.0&show=api-pagedeletecookiecookies" title="page.deleteCookie(...cookies)" >}}`
3. `{{< newtabref  href="https://pptr.dev/#?product=Puppeteer&version=v11.0.0&show=api-pagesetcookiecookies" title="page.setCookie(...cookies)" >}}`

...become:

1. `{{< newtabref  href="https://playwright.dev/docs/api/class-browsercontext#browser-context-cookies" title="browserContext.cookies([urls])" >}}`
2. `{{< newtabref  href="https://playwright.dev/docs/api/class-browsercontext#browser-context-clear-cookies" title="browserContext.clearCookies()" >}}`
3. `{{< newtabref  href="https://playwright.dev/docs/api/class-browsercontext#browser-context-add-cookies" title="browserContext.addCookies(cookies)" >}}`

Note the slight differences in the methods and how the cookies are passed to them.

### XPath selectors

XPath selectors starting with `//` or `..` are automatically recognised by Playwright, whereas Puppeteer had dedicated methods for them. That means you can use e.g. `page.$(xpath_selector)` instead of `page.$x(xpath_selector)`, and `page.waitForSelector(xpath_selector)` instead of `page.waitForXPath(xpath_selector)`. The same holds true for `page.click` and `page.fill`.

### Device emulation

Playwright {{< newtabref href="https://playwright.dev/docs/emulation" title="device emulation settings" >}} are set at Browser Context level, e.g.:

```js
const pixel2 = devices['Pixel 2'];
const context = await browser.newContext({
  ...pixel2,
});
```

On top of that, permission, geolocation and other device parameters are also available for you to control.

### File download

Trying to download files in Puppeteer in headless mode can be tricky. Playwright makes this more streamlined:

```js
const [download] = await Promise.all([
  page.waitForEvent('download'),
  page.click('#orders > ul > li:nth-child(1) > a')
])

const path = await download.path();
```

See our [example on file download](/learn/headless/e2e-file-download/).

### File upload

Puppeteer's `{{< newtabref href="https://pptr.dev/#?product=Puppeteer&version=v11.0.0&show=api-elementhandleuploadfilefilepaths" title="elementHandle.uploadFile" >}}` becomes `{{< newtabref href="https://playwright.dev/docs/api/class-elementhandle#element-handle-set-input-files" title="elementHandle.setInputFiles" >}}`.

See our [example on file upload](/learn/headless/e2e-account-settings/).

### Request interception

Request interception in Puppeteer is handled via `{{< newtabref href="https://pptr.dev/#?product=Puppeteer&version=v11.0.0&show=api-event-request" title="page.on('request', ...)" >}}`:

```js
await page.setRequestInterception(true)

page.on('request', (request) => {
  if (request.resourceType() === 'image') request.abort()
  else request.continue()
})
```

In Playwright, `{{< newtabref href="https://playwright.dev/docs/api/class-page#page-route" title="page.route" >}}` can be used to intercept requests with a URL matching a specific pattern:

```js
await page.route('**/*', (route) => {
  return route.request().resourceType() === 'image'
    ? route.abort()
    : route.continue()
})
```

See our [full guide](/learn/headless/request-interception/) on request interception for more examples.

> For many of the points in the list above, variations of the same function exist at `{{< newtabref href="https://playwright.dev/docs/api/class-page/" title="Page" >}}`, `{{< newtabref href="https://playwright.dev/docs/api/class-frame/" title="Frame" >}}` and `{{< newtabref href="https://playwright.dev/docs/api/class-elementhandle/" title="ElementHandle" >}}` level. For simplicity, we reported only one. 

## New possibilities to be aware of

When moving from Puppeteer to Playwright, make sure you inform yourself about the many completely new features Playwright introduces, as they might open up new solutions and possibilities for your testing or monitoring setup.

### New selector engines

Playwright brings with it added flexibility when referencing UI elements via selectors by exposing {{< newtabref href="https://playwright.dev/docs/api/class-selectors" title="different selector engines" >}}. Aside from CSS and XPath, it adds:

1. Playwright-specific selectors, e.g.: `:nth-match(:text("Buy"), 3)`
2. Text selectors, e.g.: `text=Add to Cart`
3. Chained selectors, e.g.: `css=preview >> text=In stock`

You can even create your own {{< newtabref href="https://playwright.dev/docs/extensibility#custom-selector-engines" title="custom selector engine" >}}.

For more information on selectors and how to use them, see [our dedicated guide](/learn/headless/basics-selectors/).

### Saving and reusing state

Playwright makes it easy for you to save the authenticated state (cookies and localStorage) of a given session and reuse it for subsequent script runs. 

Reusing state can [save significant amounts of time](/learn/headless/valuable-tests/#keep-tests-independent) on larger suites by skipping the pre-authentication phase in scripts where it is not supposed to be directly tested / monitored.

### Locator API

You might be interested in checking out Playwright's {{< newtabref href="https://playwright.dev/docs/api/class-locator" title="Locator API" >}}, which encapsulates the logic necessary to retrieve a given element, allowing you to easily retrieve an up-to-date DOM element at different points in time in your script.

This is particularly helpful if you are structuring your setup according to the {{< newtabref href="https://martinfowler.com/bliki/PageObject.html" title="Page Object Model" >}}, or if you are interested to do start doing that.

### Playwright Inspector

The {{< newtabref href="https://playwright.dev/docs/codegen#generate-tests-with-the-playwright-inspector" title="Playwright Inspector" >}} is a GUI tool that comes in very handy when debugging scripts, allowing you to step instruction-by-instruction through your script to more easily identify the cause of a failure.

{{< figure src="/guides/images/guides-migration-playwright-inspector.png" alt="playwright inspector" title="Playwright Inspector" >}}

The Inspector also comes in handy due its ability to suggest selectors for page elements and even record new scripts from scratch.

### Playwright Test

Playwright comes with its own runner, {{< newtabref href="https://playwright.dev/docs/intro" title="Playwright Test" >}}, which adds useful features around end-to-end testing, like out-of-the-box parallelisation, test fixtures, hooks and more. 

### Trace Viewer

The {{< newtabref href="https://playwright.dev/docs/trace-viewer" title="Playwright Trace Viewer" >}} allows you to explore traces recorded using Playwright Test or the BrowserContext Tracing API. Traces are where you can get the most fine-grained insights into your script's execution.

{{< figure src="/guides/images/guides-migration-playwright-trace-viewer.png" alt="playwright trace inspection" title="Trace inspection with Trave Viewer" >}}

### Test Generator

You can use the {{< newtabref href="https://playwright.dev/docs/codegen" title="Playwright Test Generator" >}} to record interactions in your browser. The output will be a full-fledged script ready to review and execute.

{{< figure src="/guides/images/guides-migration-playwright-codegen.png" alt="page being inspected with playwright codegen" title="Script recording with Playwright Inspector" >}}

## Switching to Playwright for richer browser check results

Checkly users switching to Playwright can take advantage of its new Rich Browser Check Results, which come with [tracing and Web Vitals](https://www.checklyhq.com/docs/browser-checks/tracing-web-vitals/) and make it easier to isolate the root cause of a failed check and remediate faster.

{{< figure src="/docs/images/browser-checks/tracing_web_vitals.png" alt="performance and error tracing check results on checkly" title="A browser check result with performance and error tracing" >}}

This reveals additional information about the check execution, including:
1. Overview of all errors raised (console, network and script errors)
2. A timeline summarising the execution across page navigations
3. For each page visited, a network & timing timeline, Web Vitals, console and network tabs.
4. In case of a failing check, a screenshot on failure.

> Aside from running a Playwright script, performance and error tracing also require the use of [Runtime](https://www.checklyhq.com/docs/runtimes/) `2021.06` or newer.

> Note that cross-browser support is not available on Checkly - [our Browser checks run on Chromium](https://www.checklyhq.com/docs/browser-checks/) only.

## Read More

<div class="cards-list">
{{< doc-card class="three-column-card" title="Checkly CLI" description="Understand monitoring as code (MaC) via our Checkly CLI." link="/guides/monitoring-as-code-cli/" >}}

{{< doc-card class="three-column-card" title="End to end monitoring" description="Learn end-to-end monitoring with puppeteer and playwright to test key website flows." link="/guides/end-to-end-monitoring/" >}}

{{< doc-card class="three-column-card" title="OpenAPI/Swagger Monitoring" description="OpenAPI and Swagger help users design and document APIs in a way that is readable from both humans and machines." link="/guides/openapi-swagger/" >}}
</div>