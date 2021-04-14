---
title: Introducing double checks
date: 2018-03-23
author: Tim Nolet
sitemapExclude: true
---

Checkly runs on cloud infrastructure in data centers around the world. As nothing is perfect, this infrastructure
occasionally experiences glitches and slow downs. This is why we added the **double check** option for API and browser checks.
Failing API checks are retried after 5 seconds, browser checks are retried after 30 seconds. This feature is now switched on by
default for all checks.


![](/whats-new/double_check.png)

<!--more-->
