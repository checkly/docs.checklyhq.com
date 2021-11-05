---
title: Migrating from Puppeteer to Playwright
description: >-
  How does one migrate existing scripts from Puppeteer to Playwright? How much time and effort is needed? What are the needed code-level changes, and what new features and approaches does the switch enable? Last but not least, is it advisable to invest time in migrating in the first place?
author: Giovanni Rago
avatar: 'images/avatars/giovanni-rago.png'
---

## Puppeteer and Playwright

While they share a number of similarities, Puppeteer and Playwright have evolved at different speeds over the last two years, with Playwright closing (if not reversing) the feature gap that had once separated the two tools. The greater momentum Playwright seems to enjoy also comes from a very encouraging community engagement on the part of the developers - try looking at the Slack channels and GitHub repositories of both tools and the difference will be immediately evident.

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

- browser context explicitly created
should use default only in very basic cases

### explicit vs auto-waiting

- explicit waits not necessary _in most cases_

### setting viewport

- page.setViewport -> page.setViewportSize

### hard waits (sleeps)

- waitFor becomes waitForTimeout (but if you are using it you are doing things wrong)

### Setting cookies

TODO check other cookie methods
- page.setCookies(...cookies), and similar, become simpler and move to context level: browserContext.addCookies

### XPath selectors

- page.$x(expression) to just normal page.$ (verify this works)

### Device emulation

- page.emulate -> all shown in here https://playwright.dev/docs/emulation#devices

### File download

- file download (need to find out) and upload (https://www.checklyhq.com/learn/headless/e2e-account-settings/)

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