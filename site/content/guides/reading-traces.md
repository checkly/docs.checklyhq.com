---
title: Why did my check fail? A guide to diagnosing failures
displayTitle: Why did my Check Fail? A guide to diagnosing failures
description: >-
  When you get a notification of a failed check, you can often determine the cause right in the Checkly dashboard. This guide covers some the most common failure modes and where to find answers.
author: Nočnica Mellifera
avatar: 'images/avatars/nica-mellifera.png'
tags:
  - FAQ
---

Checkly warns you of failures before they’re reported by users. With well-timed alerts you can find out minutes or hours before you get your first support ticket that something is broken. But once we’ve gotten a notification of a failure, how do we do the first step of root cause analysis: diagnosing the cause of the failure?

Browser checks, especially, involve multiple systems that have to ‘work’ to pass a check, how do we find out if network issues, script errors, or a garbled database row, were possible causes? This article shows you how to go from an alert to the first part of repair: finding the error.

## Diagnosing a problem based on the pattern: interpreting a check dashboard

Whenever you’re working a technical incident, it’s tempting to go to the most detailed information first: checking traces from individual checks is a bit like starting incident investigation in application logs: the answer is in there, but there’s a lot of information to sift through.

How can we look at high-level dashboards showing multiple check runs, and start to diagnose possible causes?

To emphasize: none of the patterns mentioned here are proof positive, and you should always take the second step of looking into the check’s traces. That detailed analysis is covered in the second half of this guide.

### Identifying a growing problem

When you’re looking at the pattern of failures, one question you’d like to answer is: ‘did [x] code release cause this failure?’ To answer this quickly, look for a pattern like the one below, where a small problem grows with time:

![a Checkly dashboard](/guides/images/reading-traces-01.png)


*In this case it looks like a problem has been getting worse for a while, with slow performance causes ‘degraded’ results before checks stop passing entirely*

In this case we can see that degraded results started on or about April 24th. Even though the alerts started a few days later, it’s likely the problem has been growing since late April. Again, this isn’t proof positive since all those results were only ‘degraded,’ a good next step would be to check the resource use of the services. This might be something like a memory leak that’s getting worse with time!

### The comb: failures with set intervals

In the chart below, this check is currently passing, but an oddly regular pattern of failures has been happening for some time. This indicates a common failure mode:


![a Checkly dashboard](/guides/images/reading-traces-02.png)

*This regular failure that never affects all checks look like it might be a failure in one region.*

What would cause some, but not all, checks to fail with some regularity? Checking the list of failure locations, we see that all the checks are coming from one place.


![a Checkly dashboard](/guides/images/reading-traces-03.png)

*Sure enough one geographic region is failing.*

In this case geo-fencing, localization or some other geographic specific setting is causing only one check location to fail. A few settings to detect this issue more reliably:

If you’re often getting failures in one region that’s critical to your business, consider increasing check frequency or setting your checks to ‘parallel runs’ meaning that ever selected geographic region every time 


![a Checkly dashboard](/guides/images/reading-traces-04.png)

*Parallel vs. round-robin checks, each set with a five-minute interval.*

Second, if you’ve selected round-robin checks but still want to detect single-region failures quickly, set your retry strategy to always retry from the same region.


![a Checkly dashboard](/guides/images/reading-traces-05.png)

*Now a failure in Cape Town will run all its check attempts from Cape Town*

To read further about retries, regions, and timing, check out how to [optimize your MTTD with the right check frequency](https://www.checklyhq.com/blog/check-frequency/).

## Diving in and finding the problem: beyond the video

Let’s start with a simple example of a failing test. In this case my web shop’s category view is supposed to look like this:


![a Checkly dashboard](/guides/images/reading-traces-06.png)

*A user expects to be able to find top sellers and hidden gems in the category view.*

But now, my check on this page is failing, and I’d like to figure out why. The pattern is sudden and complete, with all checks failing, starting a few hours ago.

### We all start by checking the video

Reader, I’ll level with you: the purpose of this article is to get you to do more than checking the video on a failed check. But before I offer more routes to check I wish to acknowledge *we all start by checking the video.* A video has the great benefit of showing both the failure and the ‘normal’ behavior of the check up until that point, it reminds us what page we were loading and there’s a good chance that the failure is visual enough to show up right away. 


![a Checkly dashboard](/guides/images/reading-traces-07.png)

*In this example, the gap between the video and what we expect in the screenshot above is significant, the ‘bottom sellers’ section of the page is missing entirely.*

So, of course, we’re all going to check the video capture early in the troubleshooting process. But while the video is nice for finding glaring issues but doesn’t offer much detail beyond that. To know why this page doesn’t look right, we need to go a few steps beyond.

### What loaded and what didn’t: the network tab

The network tab is often a good next step when the video didn’t have our answer: without loading the full trace it’s a quick way to see if anything failed to load or loaded very slowly.


![a Checkly dashboard](/guides/images/reading-traces-08.png)

*The network tab shows the same details you’d get from a browser’s dev tools*

In this case, the only failed kit was a fontawesome library, which seems unlikely to break a page component, so it’s time to move on!

### Check each retry - viewing past attempts

If you’re investigating a check with extremely strange or stochastic results, you might wonder ‘this check retried twice before it reported failure, how did those other check runs go?’ We know since we got an alert the other check runs also failed, but to go deeper just use the drop-down on the top left of the check run viewer.


![a Checkly dashboard](/guides/images/reading-traces-09.png)

You can select each attempt in the drop-down.

### Try the new AI explainer

When trying to interpret a failure, especially during a late night incident response process, it’s helpful to get a summary of how this failure affects users, written in plain English. Translating technical error messages into a more readable format is something that language models excel at, so you may want to try out our AI Impact Analysis tool. For this failure, the analysis looks pretty spot on: users can’t see a section labelled ‘bottom sellers’


![a Checkly dashboard](/guides/images/reading-traces-09a.png)

AI Impact analysis is a beta feature, which you can switch on in your account settings.


![a Checkly dashboard](/guides/images/reading-traces-10.png)

While the AI explainer is helpful in figuring out the scope of the problem, to go further we really need the big guns: the full trace of this test session.

### Pro tools: the full trace

How many times has a user reported a failure somewhere on your site, and you’ve wished they could send a full trace from their dev tools? In some support teams, asking for this browser trace is a common first step in the diagnosis process. For problems detected early with Checkly, the same detailed information is available as soon as you get an alert. Click the trace button to get the whole story.


![a Checkly dashboard](/guides/images/reading-traces-11.png)

*The magic happens under the ‘trace’ button.*

The full trace will load, let’s step through some of the information on the trace view:

![a Checkly dashboard](/guides/images/reading-traces-12.png)

1. The test is broken down into components, and you can scroll through and see what had loaded as each test was happening.
2. Screenshots of the page as loads and formats. You can check a screenshot for each assertion.
3. The network tab that was so useful previously is available here.
4. The console, errors, and log messages from the browser
5. The Call tab which shows exactly how the current playwright call was interpreted. This is so interesting it deserves its own screenshot:

![a Checkly dashboard](/guides/images/reading-traces-13.png)

If you notice that the page took a second or two to fully load, and you’re worried it caused the `expect.toBeVisible` call to fail: probably not! Remember that [Playwright’s auto-waiting](https://www.checklyhq.com/learn/playwright/waits-and-timeouts/) ensures that the element will be found as soon as it loads, and your test won’t fail just because of a flash of unformatted content.

### **Conclusions**

Effective incident diagnosis begins with understanding the patterns in your check failures before diving into detailed traces. Starting with the video replay is natural, as it provides immediate visual context, but the real answers often lie in the network logs, console errors, and full traces. 

Ultimately, Checkly equips you with the data needed to move from alert to resolution efficiently. By combining pattern recognition with detailed trace analysis, you can diagnose issues faster, reduce downtime, and maintain a seamless user experience. For further optimization, explore [fine-tuning check frequencies](https://www.checklyhq.com/blog/check-frequency/) and retry strategies to minimize detection time—because the sooner you find the problem, the sooner you can fix it.