---
title: How to Set Up Playwright Locally
date: 2020-06-20
author: Giovanni Rago
githubUser: ragog
tags:
  - basics
weight: 2
displayTitle: How to Set Up Playwright Locally
navTitle: Setting up Playwright
menu:
  learn:
    parent: "Getting started"
---

Let's start by creating a new directory and navigating to it. Assuming you already have [Node.js](https://nodejs.org/) available in your local environment, installing Playwright is achieved with just one instruction:

<!-- more -->

```sh
$ npm i playwright
```


Playwright comes bundled with a connected browser, so we now have all we need to run our first script. Let's create a script to navigate to our [test website](https://danube-web.shop/):

```js
{{% readfile filename="samples/playwright/basic-navigation.js" %}}
```
{{< run-in-checkly "/samples/playwright/basic-navigation.js" "playwright"  >}}

Run this example as follows:
```sh
$ node hello-world.js
```


Nothing much has happened, right? Remember: by default, Playwright will run in headless mode! That means we won't see anything of what is happening in the browser when our script runs.

> Playwright creates its own browser user profile, which it cleans up on every run. In other words: all runs will be sandboxed and not interfere with one another, as state is always fully reset at the end of a session.

When you are first writing and debugging your scripts, it is a good idea to disable headless mode, so you can have a look at what your script is doing:


```js
const browser = await chromium.launch({ headless: false })
```

After executing the updated file, you will see Chromium starting up, only to shut down after an instant. Everything is working as expected! Our script is just so short, it runs almost instantaneously.

## Further reading
1. Getting started guides for [Playwright](https://playwright.dev/docs/intro#installation)
