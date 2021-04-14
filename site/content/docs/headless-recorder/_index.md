---
title: Overview
weight: 1
slug: /
aliases:
- "/docs/puppeteer-recorder/"
- "/docs/headless-recorder"
- "/headless-recorder/overview/"
- "/puppeteer-recorder/"
- "/headless-recorder"
menu:
  docs:
    parent: "Headless Recorder"
    identifier: overview-headless-recorder
---

![Headless Recorder Chrome extension](/docs/images/browser-checks/headless_recorder_1400.png)


> ⭐️ We're working on a new, better version of Headless Recorder. Please read the [roadmap](/docs/headless-recorder/roadmap/) on our plans for the future and the results of our [survey](https://surveys.hotjar.com/s?siteId=717179&surveyId=137462).

Headless Recorder is a Chrome extension that records your browser interactions and generates a Puppeteer or Playwright script.
Use it to create Checkly browser checks without writing any code.

Headless Recorder has the following features:

- Records clicks and type events.
- Records form entries like dropdowns, radio buttons, checkboxes etc.
- Records screenshots.
- Adds `waitForNavigation`, `setViewport`/`setViewportSize` and other useful clauses.
- Generates a Puppeteer or Playwright script, ready for copy & pasting.
- Shows which events are being recorded.
- Offers configuration options to tweak the generated code.
- Is open source. Check the code on the [GitHub repo](https://github.com/checkly/headless-recorder)!

**Next steps**

- [Install Headless Recorder](/docs/headless-recorder/installation/) and tweak some options.
- Learn how to [record scripts](/docs/headless-recorder/basic-usage/).
- Learn about some of the current [limitations](/docs/headless-recorder/development/) of Headless Recorder and how to file bugs and feature request.
