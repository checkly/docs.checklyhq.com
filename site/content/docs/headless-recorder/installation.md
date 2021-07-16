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
how Headless Recorder generates Playwright and Puppeteer code.

![Headless Recorder async setting](/docs/images/headless-recorder/recorder_options.png)

The available options are:

- **Wrap code in async function**: determines whether your code is wrapped in an `async` helper function. This is handy when you want save your script and run it from your local machine with a simple `node myscript.js`. Checkly handles both wrapped and unwrapped scripts, but you might want to turn this off to have cleaner-looking checks.
- **Set headless**: sets the `headless` option within Playwright/Puppeteer's launch options, determining whether the tool will spawn a headless browser or a headful one.
- **Add waitForNavigation lines on navigation**: this determines if extra statements are added to wait for browser reloads when navigating from page to page. Recommended for Puppeteer.
- **Add waitForSelector lines before every page.click()**: setting this option generates a `waitForSelector` statement before
each `page.click()` statement, effectively always guarding for clicking on elements that are not (yet) available on a page. Recommended for Puppeteer.
- **Add blank lines between code blocks**: adds line spacing to improve script readability.
- **Show Playwright tab first**: sets the default script output to Playwright.