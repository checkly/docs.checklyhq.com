---
title: How to emulate mobile devices with Playwright
subTitle: Learn how to emulate mobile devices
date: 2022-07-19
author:
  - Giovanni Rago
  - Stefan Judis
githubUser:
  - ragog
  - stefanjudis
tags:
  - basics
navTitle: Emulating mobile devices
weight: 5

menu:
  learn:
    parent: "Basics"
---

Playwright controls headless desktop browsers that can also emulate mobile devices. And while device emulation can't replace testing on mobile devices entirely, it's a practical and quick-to-setup approach to testing mobile scenarios.

Device emulation is well suited to test if your site behaves correctly across multiple viewport sizes and correctly handles `user-agent` strings. But if your site relies on device-specific browser features, an iPhone emulation running in a Chromium browser might lead to false positives.

This guide explains how to define viewport sizes, device pixel ratio and  `user-agent` strings using Playwright.

## Defining the user agent string

If your site parses the user agent string to serve a different experience to mobile users, define the `userAgent` in your automation scripts.

```js
const { chromium } = require("playwright")

;(async () => {
  const browser = await chromium.launch()
  const page = await browser.newPage({
    // define the iPhone SE user agent
    userAgent:
      "Mozilla/5.0 (iPhone; CPU iPhone OS 10_3_1 like Mac OS X) AppleWebKit/603.1.30 (KHTML, like Gecko) Version/16.0 Mobile/14E304 Safari/602.1",
  })
  await page.goto("https://danube-web.shop/")

  // perform your tests

  await browser.close()
})()
```

## Defining viewport size and pixel density

If your site follows responsive web design practices and renders elements depending on device viewport size, define a mobile viewport and pixel density.

```js
const { chromium } = require("playwright")

;(async () => {
  const browser = await chromium.launch()
  const page = await browser.newPage({
    // define the iPhone SE viewport size and pixel density
    viewport: {
      width: 320,
      height: 568,
    },
    deviceScaleFactor: 2,
  })
  await page.goto("https://danube-web.shop/")

  // perform your tests

  await browser.close()
})()
```

### Use built-in device registries

Playwright includes a built-in device registry to access mobile device characteristics quickly.

- [Playwright devices](https://playwright.dev/docs/emulation#devices)

Leverage the pre-defined devices to emulate mobile devices.

```js
const { chromium, devices } = require("playwright")
const iPhone = devices['iPhone SE'];

;(async () => {
  const browser = await chromium.launch()
  const page = await browser.newPage({
    // emulate the iPhone SE
    ...iPhone
  })
  await page.goto("https://danube-web.shop/")

  // perform your tests

  await browser.close()
})()
```

## Further reading

1. [Measuring page performance](/learn/playwright/performance/)
2. [Playwright's emulation documentation](https://playwright.dev/docs/emulation)
