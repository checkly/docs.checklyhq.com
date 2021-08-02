---
title: Error - Wait not respected
subTitle: todo
date: 2021-07-26
author: Giovanni Rago
githubUser: ragog
tags:
  - debugging

menu:
  learn:
    parent: "Debugging"
---

For example: we are waiting for an element, e.g. with `page.waitForSelector`, but the script immediately proceeds to the next instruction. This can result in an [element not found error](#element-not-found) or similar on the following step in our script.

## Possible causes

- **Not-so-obvious possible cause:** the element we are waiting for is already in the DOM, possibly not visible in our inspection but already matching our `state` requirements. 

## How to avoid confusion:

Try querying for the element in the browser console during inspection. If the element is found, inspect its attributes (e.g. `visibility`) and ensure they match your expectations.

> Note that this list neither is nor aims to be complete: additional possible causes most likely exist for this error.