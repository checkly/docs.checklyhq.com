---
title: Migrating from Puppeteer to Playwright
description: >-
  How does one migrate existing scripts from Puppeteer to Playwright? How much time and effort is needed? What are the needed code-level changes, and what new features and approaches does the switch enable? Last but not least, is it advisable to invest time in migrating in the first place?
author: Giovanni Rago
avatar: 'images/avatars/giovanni-rago.png'
---

## Puppeteer and Playwright

While they share a number of similarities, {{< newtabref  href="https://pptr.dev" title="Puppeteer" >}} and {{< newtabref  href="https://playwright.dev" title="Playwright" >}} have evolved at different speeds over the last two years, with Playwright closing (if not reversing) the feature gap that had once separated the two tools. The greater momentum Playwright seems to enjoy also comes from a very encouraging community engagement on the part of the developers - try looking at the Slack channels and GitHub repositories of both tools and the difference will be immediately evident.

These developments have led many to switch from Puppeteer to Playwright. This guide aims to show what practical steps are necessary and what new possibilities this transition enables. Do not let the length of this article discourage you - in most cases the migration is quick and painless.

## What to change in existing scripts

If you have Puppeteer scripts you want to migrate over to Playwright, the following checklist will guide you through exactly what you will have to change.

> Did we forget anything? Please let us know by getting in touch, or {{< newtabref  href="https://github.com/checkly/checklyhq.com" title="submit your own PR" >}}.

## In summary - The cheat sheet

Remember to add `await` as necessary.

| Puppeteer             | Playwright                 |
| --------------------- | -------------------------- |
| `require('puppeteer')`       | `require('playwright')` |
| `puppeteer.launch(...)`       | `playwright.chromium.launch(...)` |
| `browser.createIncognitoBrowserContext(...)`       | `browser.newContext(...)` |
| `page.setViewport(...)`       | `page.setViewportSize(...)` |
| `page.waitForSelector(selector)` `page.click(selector);`       | `page.click(selector)` |
| `page.waitForXPath(XPathSelector)`       | `page.waitForSelector(XPathSelector)` |
| `page.$x(xpath_selector)`        | `page.$(xpath_selector)`   |
| `page.waitForNetworkIdle(...)`       | `page.waitForLoadState({ state: 'networkidle' }})` |
| `page.waitForFileChooser(...)`       | Removed, [different usage](https://playwright.dev/docs/input/#upload-files). |
| `page.waitFor(timeout)`       | `page.waitForTimeout(timeout)` |
| `page.type(selector, text)`       | `page.fill(selector, text)` |
| `page.cookies([...urls])`       | `browserContext.cookies([urls])` |
| `page.deleteCookie(...cookies)`       | `browserContext.clearCookies()` |
| `page.setCookie(...cookies)`       | `browserContext.addCookies(cookies)` |
| `page.on('request', ...)`       | Handled through [page.route](https://playwright.dev/docs/api/class-page#page-route). |
| `elementHandle.uploadFile(...)`       | `elementHandle.setInputFiles(...)` |
| Tricky file download.       | Better [support for downloads](https://playwright.dev/docs/downloads). |

## In depth - All needed changes

This section of our guide will dive into the changes in more detail.

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
In Puppeteer, this would have been done throught the browser's launch options:

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

* `{{< newtabref  href="https://playwright.dev/docs/api/class-page#page-wait-for-navigation" title="page.waitForNavigation" >}}` and `{{< newtabref  href="https://playwright.dev/docs/api/class-page#page-wait-for-selector" title="page.waitForSelector" >}}` remain, but in many cases will not be necessary due to auto-waiting.

* `{{< newtabref  href="https://playwright.dev/docs/api/class-page#page-wait-for-event" title="page.waitForEvent" >}}` has been added.

* Puppeteer's `{{< newtabref  href="https://pptr.dev/#?product=Puppeteer&version=v11.0.0&show=api-pagewaitforxpathxpath-options" title="page.waitForXPath" >}}` has been incorporated into `{{< newtabref  href="https://playwright.dev/docs/api/class-page#page-wait-for-selector" title="page.waitForSelector" >}}`, which recognises XPath expressions automatically.

* `{{< newtabref  href="https://pptr.dev/#?product=Puppeteer&version=v11.0.0&show=api-pagewaitforfilechooseroptionshas" title="page.waitForFileChooser" >}}` been removed removed (see the {{< newtabref  href="https://playwright.dev/docs/input#upload-files" title="official dedicated page" >}} and our [file upload example](https://www.checklyhq.com/learn/headless/e2e-account-settings/) for new usage)

* `{{< newtabref  href="https://pptr.dev/#?product=Puppeteer&version=v11.0.0&show=api-pagewaitfornetworkidleoptions" title="page.waitForNetworkIdle" >}}` has been generalised into `{{< newtabref  href="https://playwright.dev/docs/api/class-page#page-wait-for-load-state" title="page.waitForLoadState" >}}` (see the `networkidle` state to recreate previous behaviour)

* `{{< newtabref  href="https://playwright.dev/docs/api/class-page#page-wait-for-url" title="page.waitForUrl" >}}` has been added allowing you to wait until a URL has been loaded by the page's main frame.

* `{{< newtabref  href="https://pptr.dev/#?product=Puppeteer&version=v11.0.0&show=api-pagewaitforselectororfunctionortimeout-options-args" title="page.waitFor(timeout)" >}}` becomes `{{< newtabref  href="https://playwright.dev/docs/api/class-frame#frame-wait-for-timeout" title="page.waitForTimeout(timeout)" >}}`.

> This is as good a place as any to remind that this should never be used in production scripts! Hard waits/sleeps should be used only for debugging purposes.

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

Playwright brings with it added flexibility when referencing UI elements via selectors by exposing `{{< newtabref href="https://playwright.dev/docs/selectors" title="different selector engines" >}}`. Aside from CSS and XPath, it adds:

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

The {{< newtabref href="https://playwright.dev/docs/inspector" title="Playwright Inspector" >}} is a GUI tool that comes in very handy when debugging scripts, allowing you to step instruction-by-instruction through your script to more esily identify the cause of a failure.

The Inspector also comes in handy due its ability to suggest selectors for page elements and even record new scripts from scratch.

### Playwright Test

Playwright comes with its own runner, {{< newtabref href="https://playwright.dev/docs/intro" title="Playwright Test" >}}, which adds useful features around end-to-end testing, like out-of-the-box parallelisation, test fixtures, hooks and more. 

### Trace Viewer

The {{< newtabref href="https://playwright.dev/docs/trace-viewer" title="Playwright Trace Viewer" >}} allows you to explore traces recorded using Playwright Test or the BrowserContext Tracing API. Traces are where you can get the most fine-grained insights into your script's execution.

### Test Generator

You can use the {{< newtabref href="https://playwright.dev/docs/codegen" title="Playwright Test Generator" >}} to record interactions in your browser. The output will be a full-fledged script ready to review and execute.

## Switching to Playwright for Rich Browser Check Results

Checkly users switching to Playwright can take advantage of its new Rich Browser Check Results, which come with performance and error tracing, as well as web vitals and screenshots on failure.

TODO what it looks like

TODO (remember new runtime, too)