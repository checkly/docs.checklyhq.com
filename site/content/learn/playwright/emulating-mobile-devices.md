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

```ts {title="emulate-mobile.spec.ts"}
import { test } from '@playwright/test'

test.use({
  userAgent:
    'Mozilla/5.0 (iPhone; CPU iPhone OS 10_3_1 like Mac OS X) AppleWebKit/603.1.30 (KHTML, like Gecko) Version/16.0 Mobile/14E304 Safari/602.1',
})

test('emulate iPhone SE', async ({ page }) => {
  await page.goto("https://danube-web.shop/")

  // perform your tests
})
```

## Defining viewport size and pixel density

If your site follows responsive web design practices and renders elements depending on device viewport size, define a mobile viewport and pixel density.

```ts {title="emulate-mobile-viewport.spec.ts"}
const { test } = require('@playwright/test')

test.use({ 
  viewport: { 
    width: 320, 
    height: 568 
  }, 
  deviceScaleFactor: 2 
})

test('emulate iPhone SE', async ({ page }) => {
  await page.goto('https://danube-web.shop/')

  // perform your tests
})
```

### Use built-in device registries

Playwright includes a built-in device registry to access mobile device characteristics quickly.

- [Playwright devices](https://playwright.dev/docs/emulation#devices)

Leverage the pre-defined devices to emulate mobile devices.

```ts {title="emulate-mobile-builtin.spec.ts"}
import { test, devices } from '@playwright/test'
const iPhone = devices['iPhone SE']

test.use({ 
  ...iPhone,
})

test('emulate iPhone SE', async ({ page }) => {
  await page.goto('https://danube-web.shop/')

  // perform your tests
})
```

## Further reading

1. [Measuring page performance](/learn/playwright/performance/)
2. [Playwright's emulation documentation](https://playwright.dev/docs/emulation)
