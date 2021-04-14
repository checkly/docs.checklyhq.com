---
title: Introducing Browser Checks V2
date: 2018-10-02
author: Tim Nolet
featured_image: "https://checklyhq.com/whats-new/browser_checks_v2.png"
sitemapExclude: true
---

![](/whats-new/browser_checks_v2.png)

As of today all Checkly's browser checks are running on the second iteration of the browser checks site transaction monitoring system.
This upgrade brings the following benefits:

- **Every valid Puppeteer script is now a valid check.** If your Puppeteer script passes, your check passes.
- **Assertions are now optional.** You can still use assertions (more on that below) but you don't need to. A failing
script is enough to signal something is wrong and trigger an alert.
- **More and better logging**. We now report debug and console logs directly to the user on each run. This makes debugging
flaky checks a lot easier.
- **Use Chai.js assertions**. When you do want to use assertions, you can now use all functions from the popular Chai.js library.

We are confident that this new iteration will make monitoring your vital site transactions a lot easier.  

<!--more-->

## What are browser checks?

A browser check is a Node.js script that starts up a Chrome browser, loads a web page and interacts with that web page.
The script validates assumptions you have about that web page, for instance:

- Is my shopping cart visible?
- Can users add products to the shopping cart?
- Can users log in to my app?

[Learn more about browser checks](/docs/browser-checks/quickstart/)
