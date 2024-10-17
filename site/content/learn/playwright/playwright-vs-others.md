---
title: Playwright vs other automation frameworks
description: 
  Learn how Playwright, a browser automation tool, simplifies testing across Chrome, Firefox, and WebKit. Start building more reliable web applications today.
date: 2024-05-01
author: Dan G
githubUser: ragog
tags:
  - basics

weight: 3

menu:
  learn:
    parent: "Getting started"
---


## Puppeteer vs Playwright

The resemblance to Google's [Puppeteer](https://developer.chrome.com/docs/puppeteer) is striking, and for good reason.

In the words of the authors:

> We are the same team that originally built Puppeteer at Google [...]. With Playwright, we'd like to take it one step further and offer the same functionality for *all* the popular rendering engines. We'd like to see Playwright vendor-neutral and shared governed.

In short, Playwright builds on the experience of Puppeteer to provide a way to:
1. run against all major browsers (Chromium/Chrome, Firefox, WebKit/Safari)
2. write more concise scripts (e.g. minimising the need for explicit waits)
3. easily migrate existing codebases (keeping a very similar API)

This is achieved in the form of a compact node library that exposes a high-level API to interact with web pages in a fast, secure, stable and simple way. As it is an open-source project, you can [contribute](https://github.com/microsoft/playwright/blob/master/CONTRIBUTING.md) to it yourself.

