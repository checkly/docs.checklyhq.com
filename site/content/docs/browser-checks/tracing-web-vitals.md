---
title: Tracing and Web Vitals - Checkly Docs
displayTitle: Tracing and Web Vitals
navTitle: Tracing and Web Vitals
weight: 25
menu:
  resources: 
    parent: "Browser checks"
    identifier: tracing-web-vitals-browser-checks

---

For all your browser checks we automatically collect a comprehensive set of data like **console logs and network requests** 
to help you triage the root cause whenever your check might fail. We also snap a screenshot automatically whenever your 
script encounters an error.

Next to this, we also automatically collect Performance signals (**Web Vitals**) for each of the pages you visit in the browser session.

![tracing and web vitals for Playwright based browser checks](/docs/images/browser-checks/tracing_web_vitals.png)

> Checkly only collects tracing and web vitals data if your browser check meets the following criteria:
> - It is based on **Playwright**.
> - It runs on any **runtime above [2021.06](/docs/runtimes/specs/#npm-packages)**

## Page navigations

For each page you visit, we automatically collect the following:

1. Any `error`, `warning` or `info` level console messages.
2. Any network requests, like `xhr/fetch`, `javascript`, `css` and others.

You can use this data to quickly find issues with the pages you visit. Use cases are:

- Finding critical errors in your JavaScript by scanning the console logs.
- Pinpoint missing images or other resources: they will show a `404` in the network tab.

## Performance tracing with Web Vitals

For each page your script visits, we automatically collect a set of five [Web Vitals](https://web.dev/learn-web-vitals/).
Web Vitals are user focused quality signals for web pages that indicate a good, ok or poor user experience.

### First Contentful Paint

First Contentful Paint (FCP) measures the time from when the page initially starts loading to when any content is rendered
on the page. This content can be anything: text, an image, an svg, etc. In practical terms, when you have a large FCP, 
a user will see a white screen for a long time, doubting whether the page works at all.

[Read more about FCP over at web.dev](https://web.dev/fcp/)

### Largest Contentful Paint

Largest Contentful Paint is similar to FCP, but measures the time it took to render the largest visual item within the
browser viewport. If you have a high LCP, your user might wait too long before the most useful part of your page has loaded.
This makes it hard for the user to determine if your page is useful to them at all.

[Read more about LCP over at web.dev](https://web.dev/lcp/)

### Cumulative Layout Shift

Cumulative Layout Shift (CLS) is an aggregate metric that signals screen elements "jumping around" as the page loads.
You probably have experienced this when trying to click some element on screen and just as you click it, it jumps to another
part of the page. Not great. A low CLS score means you have a stable page.

[Read more about CLS over at web.dev](https://web.dev/cls/)

### Total Blocking Time

Total Blocking Time (TBT) is a metric that reflect the time a web page is "blocked" from receiving any user input because
the main rendering thread busy. A high TBT means a user experiences sluggish behaviour when interacting with your page.

[Read more about TBT over at web.dev](https://web.dev/tbt/)


### Time to First Byte

Time to First Byte indicates how long it took for your server to respond with the first byte of content whenever a browser
requests a page. TTFB can vary from run location to run location of course: when you have servers in the US and are requesting
the page from Japan, expect a higher TTFB.

[Read more about TTFB over at web.dev](https://web.dev/time-to-first-byte/)

> Web Vitals are a part [Google Lighthouse](https://developers.google.com/web/tools/lighthouse), but the two are not the same: Web Vitals are a lighter, higher-level tool built on existing browser APIs. Being less resource-intensive than Lighthouse, Web Vitals can be reliably calculated for you on cloud resources every minute.

## Why are some Web Vitals not reported?

Checkly automatically instruments your Playwright code to collect Web Vitals metrics. However, is some cases we will not
be able to collect a good measurement. There are multiple reasons for this:

1. A Single Page App (SPA) like a React, Vue or Angular app only has one HTML page load event and then relies on route changes.
The underlying [library we use for collecting Web Vitals](https://github.com/GoogleChrome/web-vitals) does not yet account for this.
The folks over at Google are aware of this and [posted an FAQ](https://web.dev/vitals-spa-faq/).

2. Cumulative Layout Shift (CLS) relies on layout events accumulating over time. If your script exits very fast, or triggers
a redirect, there might not be enough time to actually "catch" this metric.

3. Some metrics require a small amount of interaction to effectively "trigger". Clicking a button or other screen element
in your Playwright script can help here.

> We are constantly tweaking and updating our Web Vitals collection code, so expect improvements in the future! 

## Lab metrics vs. Field metrics

Checkly collects "lab" metrics for you. These are different from "field" metrics. 

Lab metrics are collected in a controlled environment and generated by "synthetic" users, in this case your Browser check
scripts. Lab metrics are useful to establish a baseline against which you can determine performance regressions or broken 
deploys before you go live. 

Field metrics are based on real user traffic collected "in the wild". These types of metrics are also known as Real User
Monitoring (RUM) and can vary a ton based on the device, location and network quality of and end user. 

## Automatic screenshots on error

Whenever your Playwright script encounters an error, we will automatically snap a screenshot the moment the error
occurs. Here is an example from real life!

1. Your script clicks on a button using a selector `wait page.click(".my-button-class")`.
2. For some reason, that button does not exist or is not clickable.
3. Playwright waits for the button with the selector to appear. It does not and Playwright throws an error.
4. Checkly automatically calls `page.screenshot()` a screenshot. The screenshot indicates that that specific button was missing.


