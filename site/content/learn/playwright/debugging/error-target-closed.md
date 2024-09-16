---
title: Error - Target closed
date: 2021-08-05
author: Giovanni Rago
githubUser: ragog
tags:
  - debugging
weight: 32
menu:
  learn:
    parent: "Debugging"
---

Our script can return the sometimes cryptic "Target closed" error. Knowing that the "target" is normally our browser, the [context](https://playwright.dev/docs/core-concepts#browser-contexts) or tab that our script is controlling can help us close in on the cause of the issue.

Example error message: 
```js
UnhandledPromiseRejectionWarning: Error: Protocol error: Target closed
```

## Possible causes

- **Obvious possible cause:** the browser, context or tab is being closed at the wrong time in the script.
- **Not-so-obvious possible cause:** promises are not being handled correctly, e.g.: 
1. Forgetting an `await` so that the `browser.close()` executes before your command has terminated.
2. [Wrong foreach usage](https://github.com/babel/babel/issues/909): [forEach](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach) expects a synchronous function, so use a [for-of loop](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/for...of) if you are using `await`.

> Note that this list neither is nor aims to be complete: additional possible causes most likely exist for this error.