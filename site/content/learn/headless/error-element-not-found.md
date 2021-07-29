---
title: Error - Element not found
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

Example error message: 
```
UnhandledPromiseRejectionWarning: Error: No node found for selector: ...
```

## Possible causes

- **Obvious possible cause:** the selector is wrong. See [working with selectors](/learn/headless/basics-selectors/).
- **Not-so-obvious possible cause:** the click on the previous element did not actually go through. From the perspective of our automation tool, everything went fine, but from ours what happened is more similar to a silent failure. We are now looking for the right element but are on the wrong page (or the page is in the wrong state), and the target element is therefore not found.

## How to avoid confusion:

Either walk through the execution in headful mode or take screenshots before and after the instruction that has raised the error - this will help you verify whether the application state actually is the one you expect. 

> Note that this list neither is nor aims to be complete: additional possible causes most likely exist for this error.