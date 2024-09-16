---
title: Setting up Playwright locally
date: 2020-06-20
author: Giovanni Rago
githubUser: ragog
tags:
  - basics
weight: 2
displayTitle: Setting up Playwright locally
navTitle: Setting up Playwright
menu:
  learn:
    parent: "Getting started"
---

Let's start by creating a new directory and navigating to it. Assuming you already have [Node.js](https://nodejs.org/) available in your local environment, installing Puppeteer or Playwright is achieved with just one instruction:

<!-- more -->

{{< tabs "1" >}}

{{< tab "Playwright" >}}
```sh
$ npm i playwright
```
{{< /tab >}}

{{< tab "Puppeteer" >}}
```sh
$ npm i puppeteer
```
{{< /tab >}}

{{< /tabs >}}

Playwright and Puppeteer come bundled with their respective browsers, so we now have all we need to run our first script. Let's create a script to navigate to our [test website](https://danube-web.shop/):

{{< tabs "2" >}}

{{< tab "Playwright" >}}
```js
{{< readfile filename="samples/playwright/basic-navigation.js" >}}
```
{{< run-in-checkly "/samples/playwright/basic-navigation.js" "playwright"  >}}
{{< /tab >}}

{{< tab "Puppeteer" >}}

```js
{{< readfile filename="samples/puppeteer/basic-navigation.js" >}}
```
{{< run-in-checkly "/samples/puppeteer/basic-navigation.js" "puppeteer"  >}}

{{< /tab >}}

{{< /tabs >}}

Run this example as follows:
```sh
$ node hello-world.js
```


Nothing much has happened, right? Remember: by default, Playwright and Puppeteer will run in headless mode! That means we won't see anything of what is happening in the browser when our script runs.

> Puppeteer/Playwright creates its own browser user profile, which it cleans up on every run. In other words: all runs will be sandboxed and not interfere with one another, as state is always fully reset at the end of a session.

When you are first writing and debugging your scripts, it is a good idea to disable headless mode, so you can have a look at what your script is doing:

{{< tabs "3" >}}

{{< tab "Playwright" >}}
```js
const browser = await chromium.launch({ headless: false })
```
{{< /tab >}}

{{< tab "Puppeteer" >}}
```js
const browser = await puppeteer.launch({ headless: false })
```
{{< /tab >}}
{{< /tabs >}}

After executing the updated file, you will see Chromium starting up, only to shut down after an instant. Everything is working as expected! Our script is just so short, it runs almost instantaneously.

## Further reading
1. Getting started guides for [Playwright](https://playwright.dev/docs/intro#installation) and [Puppeteer](https://pptr.dev)
