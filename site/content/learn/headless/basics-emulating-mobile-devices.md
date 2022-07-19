---
title: Emulating mobile devices
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

weight: 8

menu:
  learn:
    parent: "Getting started"
---

Puppeteer and Playwright control headless desktop browsers but can also emulate mobile devices. And while mobile device emulation can't replace testing on mobile devices, it's a practical and quick-to-setup approach to test your site in a mobile scenario.

## Defining the user agent string

If your site parses the user agent string to serve a different experience to mobile users, define the `userAgent` in your automation scripts.

{{< tabs "1" >}}
{{< tab "Playwright" >}}
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
{{< /tab >}}
{{< tab "Puppeteer" >}}
```js
const puppeteer = require("puppeteer")

;(async () => {
  const browser = await puppeteer.launch()
  const page = await browser.newPage()
  // define the iPhone SE user agent
  await page.setUserAgent(
    "Mozilla/5.0 (iPhone; CPU iPhone OS 10_3_1 like Mac OS X) AppleWebKit/603.1.30 (KHTML, like Gecko) Version/16.0 Mobile/14E304 Safari/602.1"
  )
  await page.goto("https://danube-web.shop/")

  // perform your tests

  await browser.close()
})()
```
{{< /tab >}}
{{< /tabs >}}

## Defining viewport size and pixel density

If your site follows responsive web design practices and renders elements depending on device viewport size, define a mobile viewport size using `viewport` and `deviceScaleFactor`.

{{< tabs "2" >}}
{{< tab "Playwright" >}}
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
{{< /tab >}}
{{< tab "Puppeteer" >}}
```js
const puppeteer = require("puppeteer")

;(async () => {
  const browser = await puppeteer.launch()
  const page = await browser.newPage()
  // define the iPhone SE viewport size and pixel density
  await page.setViewport({
    width: 320,
    height: 568,
    deviceScaleFactor: 2,
  })
  await page.goto("https://danube-web.shop/")

  // perform your tests

  await browser.close()
})()
```
{{< /tab >}}
{{< /tabs >}}

### Use built-in device registries

Playwright and Puppeteer include a built-in device registry to access mobile device characteristics quickly.

- [Playwright devices](https://playwright.dev/docs/emulation#devices)
- [Puppeteer devices](https://pptr.dev/api/puppeteer.devices)

Leverage the pre-defined devices to emulate mobile devices.

{{< tabs "3" >}}
{{< tab "Playwright" >}}
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
{{< /tab >}}
{{< tab "Puppeteer" >}}
```js
const puppeteer = require("puppeteer")
const iPhone = puppeteer.devices['iPhone SE'];

;(async () => {
  const browser = await puppeteer.launch()
  const page = await browser.newPage()
  // emulate the iPhone SE
  await page.emulate(iPhone);
  await page.goto("https://danube-web.shop/")

  // perform your tests

  await browser.close()
})()
```
{{< /tab >}}
{{< /tabs >}}

## Further reading

1. [Measuring page performance](/learn/headless/basics-performance/)
2. [Playwright's emulation documentation](https://playwright.dev/docs/emulation)
