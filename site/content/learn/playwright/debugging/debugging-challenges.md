---
title: Debugging challenges
subTitle: Recurring non-trivial debugging situations and how to solve them
date: 2021-08-05
author: Giovanni Rago
githubUser: ragog
tags:
  - debugging
weight: 28
menu:
  learn:
    parent: "Debugging"
---

Helping users debug a large number of automation scripts across testing tools over many years, some high-level patterns begin to emerge. The issues that come up, even though each one might be unique, start showing their similarities and begin to appear related.

This section aims to define broader categories of errors and failures in order to show the possible underlying causes and make debugging more efficient.

<!-- more -->

## Obvious vs non-obvious root causes

Unfortunately, problems do not map one-to-one to solutions. If they did, debugging would be very easy. Rather, there can be more than one possible cause for an error.

Sometimes the cause is obvious and sometimes it isn't, and while sometimes it is the obvious one the user should be looking at, sometimes it isn't. That is enough to create some headaches, slow down debugging and potentially whole projects with it. 

More often than not, beginners will be looking for a solution to the "obvious" cause, while the not-so-obvious one is actually responsible for the failure - that means they will be trying to solve the wrong problem! This is where a huge amount of time can be needlessly lost.

## Error list

To help avoid stressful and unsuccessful debugging sessions, it might help to consider different possible causes depending on the error you are confronted with:

1. [Error: element not found](/learn/headless/error-element-not-found/)
2. [Error: element not visible](/learn/headless/error-element-not-visible/)
3. [Error: target closed](/learn/headless/error-target-closed/)
4. [Error: wait not respected](/learn/headless/error-wait-not-respected/)
