---
title: Debugging challenges
subTitle: Recurring non-trivial debugging situations and how to solve them
date: 2021-07-26
author: Giovanni Rago
githubUser: ragog
tags:
  - debugging

menu:
  learn:
    parent: "Debugging"
---

Helping users debug a large number of automation scripts across testing tools over many years, some high-level patterns begin to emerge. The issues that come up, even though each one might be unique, start showing their similarities and begin to appear related.

This section aims to define broader categories of errors and failures in order to show the possible underlying causes and make debugging more efficient.

## Obvious vs non-obvious root causes

Unfortunately, problems do not map one-to-one to solutions. If they did, debugging would be very easy. Rather, there can be more than one possible cause for an error.

Sometimes the cause is obvious and sometimes it isn't, and while sometimes it is the obvious one the user should be looking at, sometimes it isn't. That is enough to create some headaches, slow down debugging and potentially whole projects with it. 

More often than not, folks will be looking for a solution to the "obvious" cause, while the not-so-obvious one is actually responsible for the failure - that means they will be trying to solve the wrong problem! This is where a huge amount of time can be needlessly lost.