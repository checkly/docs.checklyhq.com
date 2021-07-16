---
title: Debugging automation scripts
subTitle: How to efficiently determine the root cause of a failure
date: 2021-07-16
author: Giovanni Rago
githubUser: ragog
tags:
  - debugging

menu:
  learn:
    parent: "Best Practices"
---

Automation debugging frequent cases

Element not found
- Obvious: selector
- Not-so-obvious: Click not going through

Wait not “respected”
- Obvious: selector
- Not-so-obvious: element was already in dom, but not visible

Only works some of the time:
- Race condition
- Identify what changes

Script times out
- Obvious: timeouts
- Obvious: bad waiting
- Obvious: too long

Empty screenshots



