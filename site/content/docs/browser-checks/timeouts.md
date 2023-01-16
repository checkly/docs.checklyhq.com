---
title: Timeouts
weight: 24
menu:
  docs:
    parent: "Browser checks"
---

There are different kinds of timeouts you will encounter while working with Browser checks:

| Timeout name          | Timeout origin | Default value | Can it be changed? |
|-----------------------|----------------|---------------|--------------------|
| Browser check timeout | Checkly        | 120 seconds   | No                 |
| Test timeout          | Playwright     | 30 seconds    | Yes                |
| Navigation timeout	  | Playwright     | 30 seconds    | Yes                |
| Action timeout        | Playwright     | no timeout    | Yes                |

Checkly's general Browser check timeout means that all browser checks are capped at **120 seconds**. This timeout overrides all other timeouts listed: Everything in your script needs to happen within those 120 seconds, no matter what. 

Playwright does offer multiple [configurable timeouts](https://playwright.dev/docs/test-timeouts). Make sure you configure these in a way that prevents your check from hitting the general 120 seconds timeout.

## Timeout-related errors

Timeout-related errors are often a sticking point for many beginners. Here we try to explain the most common ones.

### Test timeout of 30000ms exceeded.

### Your check run has reached the maximum run time of 120000 ms.

### Timeout 20000ms exceeded

normally the culprit right before, e.g. page.waitForLoadState: 