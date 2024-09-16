---
title: Error - Element not visible
date: 2021-08-05
author: Giovanni Rago
githubUser: ragog
tags:
  - debugging
weight: 31
menu:
  learn:
    parent: "Debugging"
---

Knowing that an element is included in the DOM might not be enough for us to properly interact with it: its state also determines whether our action will be able to go through.

Example error message: 

```js
ERROR - UserScript page.waitForSelector: Timeout 30000ms exceeded. 
waiting for selector ".contact-form > .form-control" to be visible
  selector resolved to hidden <element>
```

## Possible causes

- **Obvious possible cause:** the element is set to hidden while it shouldn't. Something is wrong with the element itself.
- **Not-so-obvious possible cause:** a different element is hiding the target element without our knowledge.

## How to avoid confusion

Either walk through the execution in headful mode or take screenshots before and after the instruction that has raised the error - this will help you verify whether the application state actually is the one you expect. 

> Note that this list neither is nor aims to be complete: additional possible causes most likely exist for this error.
