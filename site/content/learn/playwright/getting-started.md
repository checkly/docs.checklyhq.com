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
navTitle: Getting started
menu:
  learn:
    parent: "Getting started"
---

The [official documentation](https://playwright.dev/) for Playwright reads:



> Playwright is an open-source framework for cross-browser automation and end-to-end web application testing. It was designed to be a fast, reliable, robust, and evergreen test automation framework. Playwright provides a set of APIs to automate Chromium, Firefox and WebKit browsers. By using the Playwright API, you can write JavaScript, Typescript [and other languages](https://playwright.dev/docs/languages) to create new browser pages, navigate to URLs and then interact with elements on a page. Our focus in this guide will be on the Javascript & Typescript side of things.

You can import Playwright's provided [`test`](https://playwright.dev/docs/api/class-test) and [`expect`](https://jestjs.io/docs/expect) functions to declare tests and add assertions. We'll be using these throughout our e2e examples as a best practice. 
<!-- more -->

## Playwright Features

1. **Mobile Emulation**: Playwright allows you to emulate mobile devices, such as iPhones and iPads, and test how your web application behaves on different screen sizes and orientations.
2. **Headless Mode**: You can run your tests in a headless browser, which is useful for CI/CD pipelines and for running tests in environments where a graphical interface is not available.
3. **Video Recording**: Playwright automatically records videos of your tests, which can be useful for debugging and for creating visual regression tests.
4. **Cross Browser Testing**: Playwright supports multiple browsers, including Chromium, Firefox, and WebKit, allowing you to test your application across different browsers.
5. **Programming Language Support**: Playwright is available in several programming languages, including JavaScript, TypeScript, Python, .NET, and Java, making it accessible to a wide range of developers.
6. **Comprehensive API**: Playwright provides a comprehensive API for automating browser actions, such as navigation, page interaction, and element manipulation.
7. **CI/CD Integration**: Playwright integrates seamlessly with popular CI/CD platforms, such as GitHub Actions, Jenkins, and CircleCI, allowing you to run your tests as part of your continuous integration and delivery process.
8. **Visual Testing**: Playwright supports visual testing, allowing you to compare screenshots of your web application and detect visual changes.
9. **Code Generation**: Playwright includes a code generator that can generate code for your tests, saving you time and reducing the risk of errors.



## Main use cases
1. **Test automation in modern web applications:** verifying that the features we are exposing our users/customers to are actually behaving as expected.
2. **Cross-browser testing:** ensuring applications are working consistently across browsers and rendering engines.
3. **Taking screenshots of web pages:** useful for a variety of different uses going from simple archiving to automated comparison for e.g. visual testing.
4. **Scraping web sites for data:** extracting data from websites for later retrieval or analysis.
5. **Automating interaction of web pages:** speed up and scale any sort of sequence of actions we would like to perform on a website automatically.

In this guide you will find multiple examples showing how to leverage Playwright, with a focus on test automation / active reliability.

## Growth and Adoption

Since its release in January 2020 by Microsoft, Playwright has experienced a surge in usage and popularity. As of March 2023, its GitHub repository has received 48.4k stars and 2.4k forks, and is currently averaging more than 1.2 million NPM downloads per week. Playwright is used by enterprise and open-source development projects alike, including Adobe Spectrum, Visual Studio Code, and React Navigation.

## Further reading
1. [Official Playwright API documentation](https://playwright.dev/)
2. [Official Playwright GitHub repo](https://github.com/microsoft/playwright)
