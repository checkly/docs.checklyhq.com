---
title: Error - Click not executed
date: 2021-11-18
author: Giovanni Rago
githubUser: ragog
tags:
  - debugging
weight: 29
menu:
  learn:
    parent: "Debugging"
---

In certain situations, it might look as if no click is happening in the browser even if our script specifies it. 

For example: our Playwright script is supposed to run a `page.click('#btn-login')` but seems to ignore the click and just proceed with the next instruction. This can result in an `Element not found error` or similar.

## Possible causes

- **Not-so-obvious:** the element we are trying to click is on the page, but is not the one receiving the click; there might be another element somewhere else on the page that is receiving it instead. The instruction itself does not raise any error, as it is in fact being executed correctly.

## How to avoid confusion

Try querying for the element in the browser console during inspection. If a `document.querySelectorAll('mySelector')` (or simply `$$('mySelector')`) returns more than one element, you want to come up with a more precise selector which references only the specific element you are looking to click.

Unless you know for certain, do not assume that the page you are automating follows best practices. For example: IDs are unique in valid HTML, but a page can be made up of invalid HTML and still work! So if you are struggling with a click seemingly not going through and your selector is based on an ID, check whether the page contains duplicated IDs. The Chrome DevTools console will also alert you:

![chrome devtools console showing alert for duplicated id](/samples/images/errors-ids-console.png)

If you are running Playwright 1.14 or newer, you can also enable [strict mode](https://playwright.dev/docs/release-notes#version-114) to have it throw an error in case your selector matches more than one element on the page: `await page.click('mySelector', { strict: true });`

> Note that this list neither is nor aims to be complete: additional possible causes most likely exist for this error.