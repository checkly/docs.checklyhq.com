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
TODO rephrase

## What to change in existing scripts

If you have Puppeteer scripts you want to migrate over to Playwright, the following checklist will guide you through exactly what you will have to change.

> Did we forget anything? Please let us know by getting in touch, or {{< newtabref  href="https://github.com/checkly/checklyhq.com" title="submit your own PR" >}}.

### Require Playwright package

In Puppeteer, the first few lines of our script would have most likely looked close to the following:

```js
const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  // ...
```

With Playwright, things still look similar:

```js
const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  // ...
```

Playwright offers cross-browser support out of the box, and we can choose which browser to run with just by changing the first line, e.g. to `const { webkit } = require('playwright');`
In Puppeteer, this would have been done throught the browser's launch options:

```js
  const browser = await puppeteer.launch({ product: 'firefox' })
```

### The browser context

Browser contexts already existed in Puppeteer:

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

Like in Puppeteer, for basic cases and single-page flows, the default context can be used.

```js
const browser = await chromium.launch();
const page = await browser.newPage();
```

### Waiting

The auto-waiting mechanism in Playwright means you will likely not need to care about explicitly waiting as often. Still, waiting being one of the trickiest bits of UI automation, you will still want to know different ways of having your script explicitly wait for one or more conditions to be met.

In this area, Playwright brings about several changes: 

* `{{< newtabref  href="https://playwright.dev/docs/api/class-page#page-wait-for-navigation" title="page.waitForNavigation" >}}` and `{{< newtabref  href="https://playwright.dev/docs/api/class-page#page-wait-for-selector" title="page.waitForSelector" >}}` remain, but in many cases will not be necessary due to auto-waiting.

* `{{< newtabref  href="https://playwright.dev/docs/api/class-page#page-wait-for-event" title="page.waitForEvent" >}}` has been added.

* Puppeteer's `{{< newtabref  href="https://pptr.dev/#?product=Puppeteer&version=v11.0.0&show=api-pagewaitforxpathxpath-options" title="page.waitForXPath" >}}` has been incorporated into `{{< newtabref  href="https://playwright.dev/docs/api/class-page#page-wait-for-selector" title="page.waitForSelector" >}}`, which recognises XPath expressions automatically.

* `{{< newtabref  href="https://pptr.dev/#?product=Puppeteer&version=v11.0.0&show=api-pagewaitforfilechooseroptionshas" title="page.waitForFileChooser" >}}` been removed removed (see the {{< newtabref  href="https://playwright.dev/docs/input#upload-files" title="official dedicated page" >}} and our [file upload example](https://www.checklyhq.com/learn/headless/e2e-account-settings/) for new usage)

* `{{< newtabref  href="https://pptr.dev/#?product=Puppeteer&version=v11.0.0&show=api-pagewaitfornetworkidleoptions" title="page.waitForNetworkIdle" >}}` has been generalised into `{{< newtabref  href="https://playwright.dev/docs/api/class-page#page-wait-for-load-state" title="page.waitForLoadState" >}}` (see the `networkidle` state to recreate previous behaviour)

* `{{< newtabref  href="https://playwright.dev/docs/api/class-page#page-wait-for-url" title="page.waitForUrl" >}}` has been added allowing you to wait until a URL has been loaded by the page's main frame.

* `{{< newtabref  href="https://pptr.dev/#?product=Puppeteer&version=v11.0.0&show=api-pagewaitforselectororfunctionortimeout-options-args" title="page.waitFor(timeout)" >}}` becomes `{{< newtabref  href="https://playwright.dev/docs/api/class-page#page-wait-for-url" title="page.waitForTimeout(timeout)" >}}`

> This is as good a place as any to remind that this should never be used in production scripts! Hard waits/sleeps should be used only for debugging purposes.

### Setting viewport

Puppeteer's `page.setViewport` becomes `page.setViewportSize` in Playwright.

### Cookies

With Puppeteer cookies are handled at the page level; with Playwright you manipulate them at the Browser Context level. 

The old...

```js
page.cookies([...urls])
page.deleteCookie(...cookies)
page.setCookie(...cookies)
```

...become:

```js
browserContext.addCookies(cookies)
browserContext.clearCookies()
browserContext.cookies([urls])
```

Note the slight differences in the methods and how the cookies are passed to them.

### XPath selectors

XPath selectors starting with `//` or `..` are automatically recognised by Playwright, whereas Puppeteer had dedicated methods for them. That means you can use e.g. `page.$(xpath_selector)` instead of `page.$x(xpath_selector)`, and `page.waitForSelector(xpath_selector)` instead of `page.waitForXPath(xpath_selector)`.

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

- file download and upload (https://www.checklyhq.com/learn/headless/e2e-account-settings/)

### File upload

- request interception:
await page.setRequestInterception(true)

  page.on('request', (request) => {
    if (request.resourceType() === 'image') request.abort()
    else request.continue()
  })

becomes

  await page.route('**/*', (route) => {
    return route.request().resourceType() === 'image'
      ? route.abort()
      : route.continue()
  })


LInk example: https://www.checklyhq.com/learn/headless/request-interception/


## New possibilities to be aware of

- added selectors engines! make sure you know what new possibilities you have! https://www.checklyhq.com/learn/headless/basics-selectors/
- also make sure you are aware of locator and the possibilities for POM https://playwright.dev/docs/api/class-locator
- playwright test "the differences in this article are about Playwright Library - for the additional benefits of the runner, which puppeteer lacks completely, check out Playwright Test."


bonus:
enable RBCR (remember new runtime, too)