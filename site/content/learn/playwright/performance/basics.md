---
title: Measuring page performance
subTitle: Explaining why it matters and how to assess it
date: 2020-09-30
author: Giovanni Rago
githubUser: ragog
tags:
  - basics
  - performance

weight: 23

menu:
  learn:
    parent: "Performance"
---

The need for fast and responsive applications has never been greater because of the move from [desktop to mobile](https://gs.statcounter.com/platform-market-share/desktop-mobile-tablet/worldwide/). Still, web applications have been increasing in [complexity and size](https://httparchive.org/reports/page-weight). It is clear why the topic of webpage performance is more popular today than it ever was.

This article gives a practical introduction to the whys and hows of web performance without getting lost in the depth of this massive topic. It also explains how to measure performance and gather metrics such as the Web Vitals with headless tools such as Puppeteer and Playwright.

<!-- more -->

## Why performance matters

The time it takes for a service to become usable influences a user's perception. Helpful features, great design and other prominent characteristics become irrelevant when an online service is slow, and users navigate away.

You can build the best web application in the world, but be mindful that each user has limited time to invest in your service to solve their problems. Exceed that amount, and you risk losing them to a different, more performant solution. Especially for new users, a fast experience is essential because they haven't been given proof of the quality of your service yet.

### A competitive differentiator

There is a brighter side to the topic: if low performance can sink an online platform, high performance can very well help it rise to the top. Speed and responsiveness can be a service differentiator, prompting users to choose it over the competition. Therefore an investment in this area will almost always pay off. Some notorious real-world examples from known businesses include:

1. Pinterest decreased user wait time, and [increased both traffic and conversions](https://medium.com/@Pinterest_Engineering/driving-user-growth-with-performance-improvements-cfc50dafadd7).
2. Zalando applied small load time improvements and found a direct correlation with [increased revenue per session](https://engineering.zalando.com/posts/2018/06/loading-time-matters.html).
3. The BBC discovered that every extra page load second led to 10% of [users leaving the page](https://www.creativebloq.com/features/how-the-bbc-builds-websites-that-scale).

## Measuring performance

Given the importance of page performance, it is no coincidence that browsers expose a ton of insights into [performance metrics](https://web.dev/metrics/). Knowing how your application scores against these _across time_ will provide the feedback you need to keep it performant for your users.

Several approaches can be combined to gather the best insights:

1. _Real user monitoring_ to understand what performance actual end-users of your service are experiencing.
2. _Synthetic monitoring_ to proactively gather intel on service performance and find issues before users stumble into them.
3. _Performance testing_ to avoid releasing performance regression to production in the first place.
4. _Regular audits_ to get an overview of your page's performance and suggestions on how to improve it, e.g. with tools such as [Google Lighthouse](https://developers.google.com/web/tools/lighthouse).
### Performance metrics - Google's Web Vitals

With Google pushing for a faster web, [the Web Vitals metrics](https://web.dev/vitals/) should be on your radar. Metrics such as Time to First Byte (TTFB), Total Blocking Time (TBT) or First Contentful Paint (FCP) are good user experience indicators and worth monitoring.

Google recommends focusing on the three most important ones – Largest Contentful Paint (LCP), First Input Delay (FID) and Cumulative Layout Shift (CLS). **These three metrics are considered the Core Web Vitals** and give a good idea of a page’s loading behavior, interactivity, and visual stability.

{{< warning >}}
Not all of Google's Web Vitals are suitable for synthetic monitoring and performance testing.

**First Input Delay** relies on user interactions, and it's best measured using real user monitoring. Use **Total Blocking Time** as an interactivity metric in a lab setting instead.
{{</ warning >}}
## Web Performance evaluation with headless tools

As much as we should be striving to build performant applications, we should commit to monitoring and testing performance to enable continuous feedback and rapid intervention in case of degradation. Playwright and Puppeteer provide a great toolkit to power synthetic monitoring and performance testing.

1. Access to the Web Performance APIs.
2. Whenever testing against Chromium, access to the Chrome DevTools Protocol for traffic inspection, network emulation and more.
3. Easy interoperability with performance libraries from the Node.js ecosystem.

### Web Performance APIs

Modern browsers support many APIs to gather web performance metrics and web vitals.

#### Navigation and Resource Timing API

The Navigation Timing and the Resource Timing performance APIs are W3C specifications. The [MDN docs](https://developer.mozilla.org/en-US/docs/Web/Performance/Navigation_and_resource_timings) define the scope of both:

> Navigation timings are metrics measuring a browser's document navigation events. Resource timings are detailed network timing measurements regarding the loading of an application's resources. Both provide the same read-only properties, but navigation timing measures the main document's timings whereas the resource timing provides the times for all the assets or resources called in by that main document and the resources' requested resources.

[The Navigation Timing API](https://developer.mozilla.org/en-US/docs/Web/API/Navigation_timing_API) allows us to retrieve timestamps of key events in the page load timeline. A Navigation Timing entry includes metrics such as the navigation response time, the used protocol and document load time.

{{< tabs "1" >}}
{{< tab "Playwright" >}}
```js
{{< readfile filename="samples/playwright/basic-performance-navigation.js" >}}
```
{{< run-in-checkly "/samples/playwright/basic-performance-navigation.js" "playwright"  >}}
{{< /tab >}}
{{< tab "Puppeteer" >}}
```js
{{< readfile filename="samples/puppeteer/basic-performance-navigation.js" >}}
```
{{< run-in-checkly "/samples/puppeteer/basic-performance-navigation.js" "puppeteer"  >}}
{{< /tab >}}
{{< /tabs >}}

<details class="console-output">
  <summary>Console output</summary>
  <pre><code>[{
  name: 'https://danube-web.shop/',
  entryType: 'navigation',
  startTime: 0,
  duration: 1243.7999999998137,
  initiatorType: 'navigation',
  nextHopProtocol: 'http/1.1',
  workerStart: 0,
  redirectStart: 0,
  redirectEnd: 0,
  fetchStart: 0.10000000009313226,
  domainLookupStart: 1.2000000001862645,
  domainLookupEnd: 11.100000000093132,
  connectStart: 11.100000000093132,
  connectEnd: 336.8000000002794,
  secureConnectionStart: 102.89999999990687,
  requestStart: 336.89999999990687,
  responseStart: 432.39999999990687,
  responseEnd: 433.70000000018626,
  transferSize: 971,
  encodedBodySize: 671,
  decodedBodySize: 671,
  serverTiming: [],
  workerTiming: [],
  unloadEventStart: 0,
  unloadEventEnd: 0,
  domInteractive: 1128.8999999999069,
  domContentLoadedEventStart: 1128.8999999999069,
  domContentLoadedEventEnd: 1130.8999999999069,
  domComplete: 1235.3999999999069,
  loadEventStart: 1235.3999999999069,
  loadEventEnd: 1235.3999999999069,
  type: 'navigate',
  redirectCount: 0
}]</pre></code>
</details>

[The Resource Timing API](https://developer.mozilla.org/en-US/docs/Web/API/Resource_Timing_API/Using_the_Resource_Timing_API) allows us to zoom in on single resources and get accurate information about how quickly they loaded. For example, we could specifically look at our website's logo:

{{< tabs "2" >}}
{{< tab "Playwright" >}}
```js
{{< readfile filename="samples/playwright/basic-performance-resource.js" >}}
```
{{< run-in-checkly "/samples/playwright/basic-performance-resource.js" "playwright"  >}}
{{< /tab >}}
{{< tab "Puppeteer" >}}
```js
{{< readfile filename="samples/puppeteer/basic-performance-resource.js" >}}
```
{{< run-in-checkly "/samples/puppeteer/basic-performance-resource.js" "puppeteer"  >}}
{{< /tab >}}
{{< /tabs >}}

<details class="console-output">
  <summary>Console output</summary>
  <pre><code>{
  name: 'https://danube-web.shop/static/logo-horizontal.svg',
  entryType: 'resource',
  startTime: 1149.1000000000931,
  duration: 96.89999999990687,
  initiatorType: 'img',
  nextHopProtocol: 'http/1.1',
  workerStart: 0,
  redirectStart: 0,
  redirectEnd: 0,
  fetchStart: 1149.1000000000931,
  domainLookupStart: 1149.1000000000931,
  domainLookupEnd: 1149.1000000000931,
  connectStart: 1149.1000000000931,
  connectEnd: 1149.1000000000931,
  secureConnectionStart: 1149.1000000000931,
  requestStart: 1149.6000000000931,
  responseStart: 1244.3000000002794,
  responseEnd: 1246,
  transferSize: 21049,
  encodedBodySize: 20749,
  decodedBodySize: 20749,
  serverTiming: [],
  workerTiming: []
}</pre></code>
</details>

#### Paint Timing API (`first-paint` and `first-contentful-paint`)

[The Paint Timing API](https://developer.mozilla.org/en-US/docs/Web/API/PerformancePaintTiming) provides information on the first paint and the first contentful paint. Access the entries via `performance.getEntriesByType('paint')` or `performance.getEntriesByName('first-contentful-paint')`.

{{< tabs "3" >}}
{{< tab "Playwright" >}}
```js
{{< readfile filename="samples/playwright/basic-performance-paint-timing.js" >}}
```
{{< run-in-checkly "/samples/playwright/basic-performance-paint-timing.js" "playwright"  >}}
{{< /tab >}}
{{< tab "Puppeteer" >}}
```js
{{< readfile filename="samples/puppeteer/basic-performance-paint-timing.js" >}}
```
{{< run-in-checkly "/samples/puppeteer/basic-performance-paint-timing.js" "puppeteer"  >}}
{{< /tab >}}
{{< /tabs >}}

<details class="console-output">
  <summary>Console output</summary>
  <pre><code>[
  { name: 'first-paint', entryType: 'paint', startTime: 1149.5, duration: 0 },
  { name: 'first-contentful-paint', entryType: 'paint', startTime: 1149.5, duration: 0 }
]</pre></code>
</details>

#### Largest Contentful Paint API (`largest-contentful-paint`)

[The Largest Contentful Paint API](https://developer.mozilla.org/en-US/docs/Web/API/Largest_Contentful_Paint_API) provides information on all large paints. Use this API to evaluate the Core Web Vital [Largest Contentful Paint](https://web.dev/lcp/) (LCP).

{{< info >}}
Large contentful paints are not a single event but rather event streams. A large paint can always be followed by an even larger one.

To evaluate the LCP initialize a `PerformanceObserver`, observe `largest-contentful-paint` entries and access the last emitted paint.
{{</ info >}}

{{< tabs "4" >}}
{{< tab "Playwright" >}}
```js
{{< readfile filename="samples/playwright/basic-performance-largest-contentful-paint.js" >}}
```
{{< run-in-checkly "/samples/playwright/basic-performance-largest-contentful-paint.js" "playwright"  >}}
{{< /tab >}}
{{< tab "Puppeteer" >}}
```js
{{< readfile filename="samples/puppeteer/basic-performance-largest-contentful-paint.js" >}}
```
{{< run-in-checkly "/samples/puppeteer/basic-performance-largest-contentful-paint.js" "puppeteer"  >}}
{{< /tab >}}
{{< /tabs >}}
#### Layout Instability API (`layout-shift`)

[The Layout Instability API](https://developer.mozilla.org/en-US/docs/Web/API/Layout_Instability_API) provides information on all layout shifts. Use this API to evaluate the Core Web Vital [Cumulative Layout Shift](https://web.dev/cls/) (CLS).

{{< info >}}
Layout shifts are no single event but event streams. To calculate CLS initialize a `PerformanceObserver`, observe `layout-shift` entries and sum all shifts.
{{</ info >}}

{{< tabs "5" >}}
{{< tab "Playwright" >}}
```js
{{< readfile filename="samples/playwright/basic-performance-layout-shift.js" >}}
```
{{< run-in-checkly "/samples/playwright/basic-performance-layout-shift.js" "playwright"  >}}
{{< /tab >}}
{{< tab "Puppeteer" >}}
```js
{{< readfile filename="samples/puppeteer/basic-performance-layout-shift.js" >}}
```
{{< run-in-checkly "/samples/puppeteer/basic-performance-layout-shift.js" "puppeteer"  >}}
{{< /tab >}}
{{< /tabs >}}

#### Long Task API (`longtask`)

[The Long Task API](https://developer.mozilla.org/en-US/docs/Web/API/Long_Tasks_API) provides information about all JavaScript executions taking 50 milliseconds or more. Use this API to evaluate the Web Vital and lab metric [Total Blocking Time](https://web.dev/tbt/) (TBT).

{{< info >}}
Long Tasks are no single event but event streams. To calculate TBT initialize a `PerformanceObserver`, observe `longtasks` entries and sum the differences to the maximal JavaScript execution time of 50 milliseconds.
{{</ info >}}

{{< tabs "6" >}}
{{< tab "Playwright" >}}
```js
{{< readfile filename="samples/playwright/basic-performance-long-task.js" >}}
```
{{< run-in-checkly "/samples/playwright/basic-performance-long-task.js" "playwright"  >}}
{{< /tab >}}
{{< tab "Puppeteer" >}}
```js
{{< readfile filename="samples/puppeteer/basic-performance-long-task.js" >}}
```
{{< run-in-checkly "/samples/puppeteer/basic-performance-long-task.js" "puppeteer"  >}}
{{< /tab >}}
{{< /tabs >}}

### Chrome DevTools for performance

If the browser performance APIs are not enough, the Chrome DevTools Protocol offers many great performance tools for us to leverage with Playwright and Puppeteer.

One important example is network throttling, through which we can simulate the experience of users accessing our page with different network conditions.

{{< tabs "7" >}}
{{< tab "Playwright" >}}
```js
{{< readfile filename="samples/playwright/basic-performance-emulation.js" >}}
```
{{< run-in-checkly "/samples/playwright/basic-performance-emulation.js" "playwright"  >}}
{{< /tab >}}
{{< tab "Puppeteer" >}}
```js
{{< readfile filename="samples/puppeteer/basic-performance-emulation.js" >}}
```
{{< run-in-checkly "/samples/puppeteer/basic-performance-emulation.js" "puppeteer"  >}}
{{< /tab >}}
{{< /tabs >}}

The DevTools Protocol is quite extensive. We recommend exploring the [documentation](https://chromedevtools.github.io/devtools-protocol/) and getting a comprehensive overview of its capabilities.

### Additional performance libraries

Lighthouse can easily be used programmatically with Playwright and Puppeteer to gather values and scores for different metrics, like [Time To Interactive (TTI)](https://web.dev/interactive/):

{{< tabs "8" >}}
{{< tab "Playwright" >}}
```js
{{< readfile filename="samples/playwright/basic-performance-lighthouse.js" >}}
```
{{< /tab >}}
{{< tab "Puppeteer" >}}
```js
{{< readfile filename="samples/puppeteer/basic-performance-lighthouse.js" >}}
```
{{< /tab >}}
{{< /tabs >}}

All above examples can be run as follows:
```sh
$ node measure-performance.js
```

## Further reading
1. The comprehensive [MDN Web Performance documentation](https://developer.mozilla.org/en-US/docs/Web/Performance)
2. [web.dev's performance section](https://web.dev/learn/#performance)
3. [Web Performance Recipes With Puppeteer](https://addyosmani.com/blog/puppeteer-recipes/) by Addy Osmani
4. [Getting started with Chrome DevTools Protocol](https://github.com/aslushnikov/getting-started-with-cdp) by Andrey Lushnikov
5. [Get Started with Google Lighthouse](https://developers.google.com/web/tools/lighthouse#get-started)
