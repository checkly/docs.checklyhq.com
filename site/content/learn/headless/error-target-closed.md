---
title: Error - Target closed
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
UnhandledPromiseRejectionWarning: Error: Protocol error: Target closed
```

## Possible causes

- **Obvious possible cause:** the browser, context or tab is being closed at the wrong time in the script.
- **Not-so-obvious possible cause:** promises are not being handled correctly, e.g.: [wrong foreach usage](https://github.com/babel/babel/issues/909).

> Note that this list neither is nor aims to be complete: additional possible causes most likely exist for this error.