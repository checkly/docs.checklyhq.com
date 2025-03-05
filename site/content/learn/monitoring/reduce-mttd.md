---
title: Mean Time to Detection Best Practices
displayTitle: How to Detect Problems Faster 
navTitle:  MTTD Best Practices
description: 
date: 2025-02-15
author: Nocnica Mellifera
githubUser: serverless-mom
displayDescription: 
menu:
  learn_monitoring
weight: 120
menu:
  learn_monitoring:
      parent: Availability Metrics
---
When technical organizations enter into Service Level Agreements (SLAs) with clients, along with ensuring reliable code and infrastructure, a significant part of meeting that SLA is ensuring that any downtime events, outages, or other failures are resolved as quickly as possible. Often, teams spend a great deal of time focusing on how problems are investigated, how they’re remediated, and how on-call teams follow playbooks to connect with the relevant engineers to fix the problem. Less focus is given on the first chunk of time spent during any outage: the time between a failure, and anyone in an on-call team knowing a failure has occurred.

![A Resolution Timeline](/learn/images/mttd-1.png)

Mean Time to Repair is a multi-step process with many areas for improvement, but this article focuses on how to shorten the time it takes to detect a problem. Here are the key optimization areas for mean time to detection. 

## Don’t rely on user reports

Do you want to break SLA? If you do, rely on your users to report outages. To do some quick math, say you have a ‘three nines’ SLA with your users to provide 99.9% uptime. On average, you have 3 outages a month, and you don’t work on fixing those outages until a user reports a problem.

[Use our Check Frequency Calculator to work out your own service's time budget and ideal time to detection.](https://check-frequency-calculator.vercel.app/)

99.9% uptime gives you 43 minutes a month as a ‘time budget’ for all outages. With three outages a month, each outage needs to be resolved in under about 14 minutes. And on average it takes users 15 minutes or more to report an outage to your on-call team. So by relying on user reports of outages, you are guaranteeing that your SLA will be broken on an average month.

Notably, many organizations cheat their own metrics by measuring their mean time to repair as starting only after a user reports an outage, when the on-call team is notified. For those teams it seems that their time to detection is always 0 😅. But in reality: user-detected outages add significantly to time to detection and can’t be part of most outages. 

Steps like adding support hotlines and other faster ways for users to report problems are only papering over the fundamental problem: your tech stack should report its own outages before your users have time to get in touch, every time.

How do you stop relying on user reports of problems? In general there are three approaches, all of which should be explored:

- Deployment testing — usually the first thing teams try to reduce user-detected problems is to ramp up testing before each code deployment. This boils down to reducing the number of production outages rather than trying to detect them when they occur. I note this route here since it’s such a frequent response, and because the Playwright tool set that we’ll mention later in this piece is also fundamental to thorough pre-deployment end-to-end testing.
- Anomaly detection — some teams set up alerts to show when certain backend metrics went over a user-set threshold. One example would be an alert to show when a server was at 99% memory usage. This straightforward approach has its limitations, this author recalls when a network outage blocked most users from our service. We got no alerts because, hey, the servers had plenty of memory, and the wait time on the queue was zero! Anomaly detection goes a step beyond simple alerts and warns when anything ‘looks wrong,’ like a popular ecommerce site that’s seeing zero traffic Sunday afternoon. Anomaly detection, often enabled with an AI model, can provide surprising insights and even warn of some pending failures, but anomaly detection won’t catch every issue, and your users will end up reporting some problems.
- Proactive monitoring a.k.a. synthetic monitoring — By actively making requests of your service as a user, the ‘synthetic user’ of ‘synthetic monitoring,’ you can send requests that are a reliable indicator of service available. With requests scripted in Playwright, you can ensure that your synthetic user makes requests just as complex as real users, and that any failure is reported straight to your on-call team with no need to wait for users to pick up the phone.

With its power to find outages before your users do, the rest of this article will focus on the right way to user synthetic monitoring to find outages proactively.

## Check Frequently

Automated tools like [Checkly](https://www.checklyhq.com/) can make sure that every outage is detected quickly and accurately, but if you set the interval between checks too long, you’ll still be relying on users to report some outages. If no checks of your service are running for more than 15 minutes, it’s highly likely that some outages will be discovered by your users before a synthetic monitor can alert you. For more aggressive SLA’s, you may want to [set your check cadence](https://www.checklyhq.com/blog/check-frequency/) to run every minute from at least one location.

## Mitigate alert fatigue

Many of the points listed in this article will revolve around making sure that an alert is emitted as soon as the service isn’t working for some users. But when analyzing slow incident response, there’s another way that our outage detection can fail: alert fatigue. While alert fatigue sounds like a quality of life issue, generating too many alerts can essentially disable your outage detection. If recent incident post-mortems have identified that 1) the recent outage did trigger an alert, but 2) that alert was one of dozens emitted every day, it’s likely that no one is reading those alerts at all. Over-alerting isn’t much better than generating no alerts at all. To control alert fatigue, here are some suggestions in brief:

- Take alert fatigue seriously — false positives (alerts when there was no problem) should trigger investigations and fixes just like false negatives (undetected outages).
- Set retry policies — requests sometimes fail via the internet. Set a reasonable [retry policy](https://www.checklyhq.com/docs/alerting-and-retries/) on your checks so you’re not generating false alarms.
- Use smart tests — using the [auto-waiting](https://www.checklyhq.com/learn/playwright/waits-and-timeouts/) and intelligent user-centric assertions of Playwright will help ensure your tests aren’t too strict and therefore flaky (generating lots of false positives).
- Route alerts intelligently — use a tool like Rootly or Pagerduty to make sure only the right people are getting alerts.

If you take these steps, you can help ensure that a human being is reading all the alerts they receive. The other points included in this article will also help reduce how many alerts your engineers get that they can safely ignore.

## Informative messages

The more information you can cram into an alert will drastically improve your time to detection. Part of this is about alert fatigue: an informative alert message means an on-call team member can easily evaluate whether they should take action, and reduces the temptation to ignore all alerts from one channel. 

Another consideration is how an informative message harnesses our engineers’ capacity to find patterns. An alert about slow response times might be nothing to worry about, but if the alert includes a timeline of response times, the on-call engineer can notice that the slow responses started right when new code was deployed, and that the problem is getting worse!

The ability of on-call teams to see the ‘shape’ of an outage from the alert message is critical for proper escalation, sharing of information, and going from an automated message to a human response.

If you’re using Playwright, [consider adding steps to your test code](https://www.checklyhq.com/blog/improve-your-playwright-documentation-with-steps/), to improve the documentation of what part of a test failed when notifying the on-call team.

## Simulate complex user paths

While other points here have covered the ways we notify the on-call team and what information is offered about the issue. But when we’re faced with false negatives that have missed problems (and forced users to be the first reporters), it’s critical to examine what we’re monitoring and how. 

In the early days of ‘synthetic user monitoring’ the synthetic user was a headless browser that just checked URL’s for a 200 response. We’ve all had experiences where a service responds with a 200 status code and a body of `Internal service error`. 

Beyond parsing pages and following links, a true automated browser is necessary to monitor if our services are online. Further we want to have complex [assertions](https://www.checklyhq.com/learn/playwright/assertions/) available to ask the same questions that our users do. For example, when our user visits our ecommerce site, and searches for products, they expect to get more than one result, and they expect each item will have an ‘add to cart’ button. Users care about these things more than they do exact response times or JavaScript errors, so it’s these complex user paths that should be tested when monitoring our service. 

A tool like [Playwright](https://www.checklyhq.com/docs/browser-checks/playwright-test/) is the best way to really act like a user when interacting with our service. Checkly uses Playwright to let engineers test every aspect of their service with the same expectations their users bring.

## Gather real evidence of failure

A final point, once again related in part to alert fatigue, is making sure that our monitor gathers real evidence of failure. Automated systems can alert for many reasons, and we want to make sure that once a human is investigating it’s easy to differentiate between false alarms and real outages. Three things we’d like to get either at first alert time or shortly thereafter on an alert dashboard.

- Scale - A failed synthetic test shows, essentially, ‘One user could not do X with our service.’ The next questions from an on-call team will probably involve scale: how long has this been happening? Can no users do X or only some? Ideally downtime alerts to an on-call team will have at least initial indicators of scale.
- Geographic distribution - many failures are specific to one region, and a simple report showing that only some users or affected, or that some requests are succesful, will hide the fact that no users in one region have access.

![The Checkly dashboard showing a timeline of failures](/learn/images/mttd-2.png)

*The Checkly dashboard showing a timeline of failures, that some but not all checks are failing, and listing the geographic locations where checks are failing.*

- Traces - How many times have users reported an error, only for the exact error to be difficult to be reproduce, and then the on-call team is trying to replicate a failure with only a vague report to go off of? Ideally every report of a failure would include a full trace showing what loaded succesfully, what errors were thrown, and a waterfall chart of page elements’ loading times.

![A Checkly trace showing a full debug session for a failed check.](/learn/images/mttd-2.png)

*A Checkly trace showing a full debug session for a failed check.*

## Conclusions: Detect Faster to Fix Faster

In this article I’ve argued that detection is a critical step in your time to repair, and thereby critical for meeting your SLA. Detection isn’t just about closer monitoring or a faster rate of monitoring. By engineering notifications and alerts to be informative, timely, and targtetted you can improve time to detection without any increased infrastructure cost, and reduced stress for your on-call team!