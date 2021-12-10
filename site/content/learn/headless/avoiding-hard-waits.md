---
title: Avoiding hard waits
date: 2021-11-26
author: Giovanni Rago
githubUser: ragog
tags:
  - best practices
  - waiting

menu:
  learn:
    parent: "Best practices"
---

In a bid to quickly resolve the issue of a page or element not being loaded, many take the shortcut of waiting for a fixed amount of time - adding a hard wait, in other words. This is regarded as an anti-pattern, as it lowers performance and increases the chances of a script breaking (possibly intermittently). Let's explore how those issues arise and what better solutions we can use to avoid them.

<!-- more -->

## The problems of hard waits

Hard waits do one thing and one thing only: wait for the specified amount of time. There is nothing more to them. This makes them dangerous: they are intuitive enough to be favoured by beginners and inflexbile enough to create serious issues.

Let's explore these issues in practical terms through an example. Imagine the following situation: our script is running using a tool without any sort of built-in smart waiting, and we need to wait until an element appears on a page and then attempt to click it. We try to solve this issue with a hard wait, like Puppeteer's `page.waitFor(timeout)`. The following can happen:

1. We can end up waiting for a shorter amount of time than the element takes to load!

ILLUSTRATION: page load starts, element not shown, hard wait, element not there yet

In this case, our hard wait terminates and our click action is attempted too early. The script terminates with an error, possibly of the ["Element not found"](/learn/headless/error-element-not-found) sort.

2. The element can load before our hard wait has expired.

ILLUSTRATION: page load starts, hard wait, element loaded, click performed

While the element is correctly clicked once our wait expires, and our script continues executing as planned, we are wasting precious time - likely on each hard wait we perform. Across multiple scripts and suites, this can add up to noticeable drag on build time.

To summarise, with hard waits we are virtually always waiting too little or too long. In the worst case scenario, the fluctuations in load time between different script executions are enough to make the wait sometimes too long and sometimes too short (meaning we will switch between scenario 1 and 2 from above in an unpredictable manner), making our script fail intermittently. That will result in unpredictable, seemingly random failures, also known as flakiness.

Flakiness, a higher-than-acceptable false failure rate, can be a major problem. It is essentially a source of noise, making it harder to understand what the state of the system we are testing or monitoring really is. Not only that, but stakeholders who routinely need to investigate failures only to find out that they are script-related (instead of system-related) will rapidly lose confidence in an automation setup. 

## How to fix it

To avoid the issues we have mentioned, we have to ditch hard waits completely outside debugging scenarios. That means that hard waits should never appear in production scripts under any circumstance.

Our aim should be to wait just long enough for the element to appear. We want to always be certain the element is available, and never waste any time doing that. Luckily most automation tools and frameworks today offer multiple ways to achieve this. We can call these "smart waits".

ILLUSTRATION: smart waits

don't use hard waits at all (only fine for when writing scripts, not prod)

playwright has built-in mechanisms for waiting, and even if those don't work, there are better ways to wait
essentially, there is never a reason for using hard waits in production, ever.

### built-in

on navigations
https://playwright.dev/docs/navigations#auto-wait

> callout: lazy-loaded pages see explicit waiting

on elements
https://playwright.dev/docs/actionability

### explicit

list methods


