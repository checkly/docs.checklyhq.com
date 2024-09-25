---
title: What is Playwright? A Guide to Playwright Automation
description: 
  Learn how Playwright, a browser automation tool, simplifies testing across Chrome, Firefox, and WebKit. Start building more reliable web applications today.
date: 2020-06-29
author: Giovanni Rago
githubUser: ragog
tags:
  - basics

weight: 1

menu:
  learn:
    parent: "Getting started"
---

The [official documentation](https://playwright.dev/) for Playwright reads:

> Playwright provides a set of APIs to automate Chromium, Firefox and WebKit browsers. By using the Playwright API, you can write JavaScript, Typescript [and other languages](https://playwright.dev/docs/languages) to create new browser pages, navigate to URLs and then interact with elements on a page. Our focus in this guide will be on the Javascript & Typescript side of things. 

You can import Playwright's provided [`test`](https://playwright.dev/docs/api/class-test) and [`expect`](https://jestjs.io/docs/expect) functions to declare tests and add assertions. We'll be using these throughout our e2e examples as a best practice. 
<!-- more -->

## Main use cases
1. **Test automation in modern web applications:** verifying that the features we are exposing our users/customers to are actually behaving as expected.
2. **Cross-browser testing:** ensuring applications are working consistently across browsers and rendering engines.
3. **Taking screenshots of web pages:** useful for a variety of different uses going from simple archiving to automated comparison for e.g. visual testing.
4. **Scraping web sites for data:** extracting data from websites for later retrieval or analysis.
5. **Automating interaction of web pages:** speed up and scale any sort of sequence of actions we would like to perform on a website automatically.

In this guide you will find multiple examples showing how to leverage Playwright, with a focus on test automation / active reliability.

## Further reading
1. [Official Playwright API documentation](https://playwright.dev/)
2. [Official Playwright GitHub repo](https://github.com/microsoft/playwright)
