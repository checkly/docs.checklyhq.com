---
title: Real User Monitoring (RUM) - Benefits, Challenges, and Alternatives
displayTitle: Real User Monitoring (RUM) - A Practical Guide
navTitle:  Real User Monitoring
description: Discover the benefits, challenges, and top tools for frontend monitoring. Learn how to track performance, detect issues, and optimize user experience.
date: 2024-12-15
author: Nocnica Mellifera
githubUser: serverless-mom
displayDescription: 
  Discover the benefits, challenges, and top tools for frontend monitoring. Learn how to track performance, detect issues, and optimize user experience.
menu:
  learn_monitoring:
    parent: Monitoring Concepts
weight: 50
---

## **Why Real User Monitoring Matters**

Real User Monitoring (RUM) gives you actual performance data from real people using your website or app. Unlike synthetic tests (which simulate users), RUM shows you exactly what your customers experience—the promise is that if even one of your users encounters an error, you’ll know about it.

### **Key Benefits:**

- **Pinpoint Performance Issues** – Discover which pages load slowly or behave poorly on specific devices (e.g., mobile vs. desktop).
- **Reduce User Frustration** – Catch errors before they drive users away.
- **Optimize Business Impact** – Faster pages = happier users = more conversions (sales, signups, engagement).
- **Identify Trends —** Will users trigger this edge case error often? Don’t just speculate, observe!
- **Prioritize Fixes** – Instead of guessing, use real data to decide what to improve first.

**Example:**

If checkout pages take 8 seconds to load on mobile, but only 2 seconds on desktop, RUM helps you find and fix the bottleneck. RUM monitoring shows exactly which users are encountering slow load times, and you can look at historical trends to see if a recent change may have been the cause.

## **How RUM Works: From Data to Insights**

### **1. Data Collection (The "What")**

A lightweight JavaScript snippet (or mobile SDK) tracks:

- **Page load times** How long until the page is usable?
- **Resource timing** Did slow images or APIs delay rendering?
- **User interactions** Clicks, scrolls, form submissions
- **Errors** JavaScript crashes, failed API calls, broken assets

All of this data is collected, generally as a trace with annotations for events and errors, for tramsission by the lightweight RUM code.

### **2. Data Transmission (The "How")**

- Data is sent to a monitoring backend
- **Sampling** (optional) reduces cost by sending only a % of sessions.

### **3. Analysis & Action (The "Why")**

- **Dashboards** show performance trends (e.g., "Mobile users in Europe are 40% slower").
- **Alerts** notify you when error rates spike.
- **Session replay** (in some tools) lets you watch real users struggle with bugs.

**Pro Tip:**

Start with core metrics (load time, error rate), then expand to track business goals (e.g., "How long until users can play a video?").

---

## **Sampling & Storage: Balancing Cost and Detail**

### **The Data Fire Hose Problem**

RUM generates **massive** amounts of data. If you track every click, scroll, and page load for millions of users, costs can spiral. Storing RUM data isn’t just expensive for your storage solutions, it also means incredibly slow queries for trying to see historical performance.

### **Solution: Tiered Storage (Like a "Data Lake")**

1. **Raw Bucket** – Store *everything* (for rare deep dives).
    - Example: Keep 100% of data for 7 days, then archive.
2. **Refined Bucket** – Keep only *key metrics* (for daily dashboards).
    - Example: Sample 10% of sessions to track trends.

**Why This Works:**

- **Engineers** can query raw data when debugging.
- **Product teams** use refined data for high-level trends.

**Inspiration:**

This mirrors the "lakehouse" approach in big data—store first, filter later.

## The limitations of RUM

The data fire hose problem mentioned above points to a more general issue with Real User Monitoring as a solution to observability problems: when compared with a measurement and testing tool using synthetics monitoring, the advantage of RUM  is supposed to be that it measures every user everywhere. However as we see above the first solution to issues of storage and bandwidth is to start sampling data. Suddenly our monitoring of all users became ‘some users, sometimes.’ 

### RUM and the panopticon: you can’t really see everything

The issues with RUM are rather well correlated to the story of another ‘total observability’ solution, the classic panopticon. Originally conceived by Jeremy Bentham in the 1780’s, the idea is familiar to anyone who’s noticed hundreds of camera installations at their local Wal-Mart: a prison or factory where everyone could be observed at any time, but cannot see their observer. 

![A diagram of the Real User Monitoring model](/learn/images/rum-01.jpg)

*Jeremy Bentham’s original Panopticon concept. Image by Blue [Ākāśha](https://commons.wikimedia.org/w/index.php?curid=95988220).*

The promise of the panopticon was a kind of social utopia: perfect behavior since everything can be observed. While this sounds a bit silly in the 21st century, I must make the comparison to the promises of RUM: once we can observe errors experienced by every user, we can fix all the major user pain points and everything will get better. 

In both cases the reality faced problems of practicality: A guard in a panopticon prison can’t actually see everything in the cells he’s guarding, leading to bad behavior only in blind spots. This is comparable to the existence of user categories that don’t run RUM instrumentation well, or don’t successfully transmit data to your monitoring backend, or who experience total crashes of their browser or app: often the users having the worst experience are the ones who don’t show up in real user monitoring.

![A diagram of the Real User Monitoring model](/learn/images/rum-02.jpg)

*The Panopticon, which for nearly a century promised improved conditions for large institutions, proved impractical in reality. Constructions like this one in Cuba are now abandoned. Image by [Friman](https://commons.wikimedia.org/w/index.php?curid=2410607), CC BY-SA 3.0*

Those monitoring providers who sell RUM services will be quick to assure that RUM can be done efficiently, often with no sampling. APM providers with large RUM offerings will promise that you can observe every user, everywhere, and send data about them as much as you like. All I’ll say to this is the people insisting RUM’s data overhead is no problem, are the same people who make money based on how much RUM data you send.

---
**Ready to start low-overhead frontend monitoring today?** check out our practical guide on [how to start frontend monitoring with Checkly and Playwright.](https://www.checklyhq.com/guides/monitoring-ecommerce-apps-using-playwright/)

---

### Sampling and its discontents

Since it is impractical to store every click, scroll, action, and web response for each user, real RUM implementations generally involve some form of sampling. This has some notable drawbacks:

- If you’re sampling only after data storage, the data lake model mentioned above, it means the vast majority of data that you paid to transmit, and process, is getting thrown away relatively soon. Further if your RUM monitoring slows down the user experience at all, it does so for everyone.

This issue is best solved by sampling at the time of data measurement, called ‘head-based sampling,’ where users are assigned to be monitored randomly as their session starts. That means we don’t use resources on a session we’re not going to save. 

![A diagram of the Real User Monitoring model](/learn/images/rum-03.png)

In the diagram above, every sixth session is measured and transmitted, but as you can see in this not-uncommon example, all the slowest sessions have been discarded.

- With random sampling, the chance that a specific user report won’t have RUM data available starts to increase

Problem sessions are almost always edge cases, and so random sampling means that most of those unsual cases are being thrown out. What would be better is to decide at the end of a session if the data was interesting. This is the much vaunted tail-based sampling.

![A diagram of the Real User Monitoring model](/learn/images/rum-04.png)

In this example the longest user session is sent (because it was probably frustrating to the user) and the fastest (because it may contain an error), and the others discarded. In the real world things like the number of spans in the trace would also help determine which to send. 

Both head- and tail-based sampling are concepts that are applicable beyond real user monitoring, and in all cases tail-based sampling proves quite difficult to implement in practice. The situation with RUM is illustrative of the general problem with tail-based sampling: when a user finishes with a session, the RUM code in their browser or application only has the local context to decide if this trace should be sent. This means either arbitrary and simplistic thresholds like ‘only send sessions over X seconds’ or the implementation of yet another complex system to look at recent trends in RUM traces, decide what looks interesting, and individually inform RUM agents if they should send particular traces. An inelegant solution that **still** misses some cases and doesn’t actually monitor every user in every session!

### Another kind of sampling problem: the level of RUM measurement

A key recommendation for monitoring with RUM is to start small: observe overall page load times and errors in the browser, send that data, and build from there. Eventually though we’d like to monitor lots of things about the user session: what’s being loaded, requested, what’s happening in the background, what third party plugins are doing, etc. But by implementing all this added instrumentation it’s unavoidable that we end up slowing down the user experience the more we want to observe. 

Since some of the most concerning user sessions are those that end either in an app crash or the user exiting the page or service, it’s further tempting to have RUM data report frequently during the user session. This may be a necessary step to ensure the most troublesome traces are sent, at least partially, but it further adds to the network overhead. In the end both in trace detail and number of sessions traced, **RUM monitoring by its nature is limited in how closely it can observe all users**.

## Conclusions: RUM is about aggregate performance, not high resolution

Given the concerns about RUM in practice, it rarely succeeds in delivering the promise of detailed data on every user session. If a sales rep were to call and say:
”Jeff Roberts was logging in to view his photos yesterday and all his photos showed error messages, what happened?”

It’s unlikely that Real User Monitoring, as it works in the real world, would be able to provide an answer. Does that mean that we shouldn’t bother with real user monitoring? No, RUM is a core part of monitoring your service, but it’s more about trends and collective observation than high resolution tracing. Consider questions like:

- What percentage of our users experience this error?
- When an image takes more than 8 seconds to load, how many users leave the page?
- What’s the request that’s taking up the most *total* user time (number of requests x time taken)?

These are questions that only RUM can answer easily. 

By focusing on aggregate insights, RUM helps prioritize optimizations that benefit the majority of users, while [synthetic monitoring](https://www.checklyhq.com/learn/monitoring/synthetic-transaction-monitoring/) performs consistent, repeatable observation of every critical path, and logs fill in the gaps for edge cases. The key is balancing depth with practicality—using RUM to guide improvements, not chase an unattainable "perfect observability" ideal. Start small, sample wisely, and correlate RUM data with other telemetry to build a complete picture of your application’s health.