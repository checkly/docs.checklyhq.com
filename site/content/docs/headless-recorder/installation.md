---
title: Installation
weight: 2
menu:
  docs:
    parent: "Headless Recorder"
---

To install Headless Recorder, go to the [Chrome Webstore](https://chrome.google.com/webstore/detail/headless-recorder/djeegiggegleadkkbgopoonhjimgehda)
and install it as follows:

![Headless Recorder Chrome Webstore](/docs/images/browser-checks/chrome-webstore.png)

1. Navigate to the [Chrome Webstore](https://chrome.google.com/webstore/detail/headless-recorder/djeegiggegleadkkbgopoonhjimgehda) with your Chrome browser.
2. Click the "Add to Chrome" button. You will see a camera icon appear in your toolbar.
3. Clicking the camera icon will pop open Headless Recorder.


## Options

Open the options tab by clicking the cogwheel icon. In this tab you will find a set of configuration options that impact
how Headless Recorder generates Playwright/Puppeteer code. Most options are self explanatory, but two very important ones are:

- **add waitForNavigation lines on navigation**: this determines if extra statements are added to wait for browser reloads
when navigating from page to page. Turning this options off can result in failing or hanging scripts.
- **add waitForSelector lines before every page.click()**: setting this option generates a `waitForSelector` statement before
each `page.click()` statement, effectively always guarding for clicking on elements that are not (yet) available on a page.

It is recommended to leave both options checked in all cases.
