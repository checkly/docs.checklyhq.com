---
title: Frequent debugging challenges
subTitle: Recurring non-trivial debugging situations and how to solve them
date: 2021-07-26
author: Giovanni Rago
githubUser: ragog
tags:
  - debugging

menu:
  learn:
    parent: "Miscellaneous"
---

Helping a large number of users debug a large number of automation scripts across testing tools over the years, some high-level patterns begin to emerge. The issues that come up, even though each one might be unique, start showing their similarities and begin to appear related.

This guide aims to define broader categories of errors and failures in order to show the possible underlying causes and make debugging more efficient.

## Obvious vs non-obvious root causes

Unfortunately, problems do not map one-to-one to solutions. If they did, debugging would be very easy. Rather, there can be more than one possible cause for an error.

Sometimes the cause is obvious and sometimes it isn't, and while sometimes it is the obvious one the user should be looking at, sometimes it isn't. That is enough to create some headaches, slow down debugging and potentially whole projects with it. 

More often than not, folks will be looking for a solution to the "obvious" cause, while the not-so-obvious one is actually responsible for the failure - that means they will be trying to solve the wrong problem! This is where a huge amount of time can be needlessly lost.

## Errors and possible root causes

The errors below are taken from Puppeteer and Playwright, but most of the time can be generalised to other automation tools as well.

### Element not found
For example: 
```
UnhandledPromiseRejectionWarning: Error: No node found for selector: ...
```

- **Obvious possible cause:** the selector is wrong. See [working with selectors](/learn/headless/basics-selectors/).
- **Not-so-obvious possible cause:** the click on the previous element did not actually go through. From the perspective of our automation tool, everything went fine, but from ours what happened is more similar to a silent failure. We are now looking for the right element but are on the wrong page (or the page is in the wrong state), and the target element is therefore not found.

**How to avoid confusion:** either walk through the execution in headful mode or take screenshots before and after the instruction that has raised the error - this will help you verify whether the application state actually is the one you expect. 

### Element not visible
For example: 
```
ERROR - UserScript page.waitForSelector: Timeout 30000ms exceeded. 
waiting for selector ".contact-form > .form-control" to be visible
  selector resolved to hidden <element>
```

- **Obvious possible cause:** the element is set to hidden while it shouldn't. Something is wrong with the element itself.
- **Not-so-obvious possible cause:** a different element is hiding the target element without our knowledge.

**How to avoid confusion:** either walk through the execution in headful mode or take screenshots before and after the instruction that has raised the error - this will help you verify whether the application state actually is the one you expect. 

### Wait not “respected”
For example: we are waiting for an element, e.g. with `page.waitForSelector`, but the script immediately proceeds to the next instruction. This can result in an [element not found error](#element-not-found) or similar on the following step in our script.

- **Not-so-obvious possible cause:** the element we are waiting for is already in the DOM, possibly not visible in our inspection but already matching our `state` requirements. 

**How to avoid confusion:** try querying for the element in the browser console during inspection. If the element is found, inspect its attributes (e.g. `visibility`) and ensure they match your expectations.

### Target closed

For example: 
```
UnhandledPromiseRejectionWarning: Error: Protocol error: Target closed
```

- **Obvious possible cause:** the browser, context or tab is being closed at the wrong time in the script.
- **Not-so-obvious possible cause:** promises are not being handled correctly, e.g.: [wrong foreach usage](https://github.com/babel/babel/issues/909).

> Note that this list neither is nor aims to be complete: more possible causes certainly exist for most listed errors.

## Further reading
1. [Working with selectors](/learn/headless/basics-selectors/).
2. [Navigating and waiting](/learn/headless/basics-navigation/).
