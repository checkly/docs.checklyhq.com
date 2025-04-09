---
title: Why Are Teams Missing Their MTTR Targets? Mean time to resolution best practices with examples
displayTitle: Best Practices for Reduced Mean Time To Repair
navTitle:  Reducing Time to Repair
description: 
date: 2025-02-15
author: Nocnica Mellifera
githubUser: serverless-mom
displayDescription: 
menu:
  learn_incidents
weight: 10
menu:
  learn_incidents:
      parent: Repair
---

Missing MTTR and the concomitant SLA targets is a common occurrence among large tech teams. We all start each quarter with a goal of always resolving issues quickly and delivering high uptime for our users. So why do we fail on these goals? This article is a list of the common causes of missed MTTR:

### 1. **Observability Tools Are Falling Short**

Often the longest period of an incident response is the time spent between knowing you have a problem and understanding what’s causing the problem. This is almost definitional, since once you know the nature of the problem it’s generally possible to fix or at least remediate it pretty quickly, for example with a rollback. But what makes this time to understanding the problem so long?

One of the primary challenges is the inadequacy of observability tools. When speaking to enterprise teams, about half of engineers report that their observability solutions require significant manual effort, and that alerts lack sufficient context to triage issues effectively. 

Imagine you’re trying to solve an outage that’s only affecting some users and some features. You may start with a nice dashboard of front end performance monitoring, but once it’s time to really drill in to root causes, you find yourself paging through AWS CloudWatch logs trying to match the time codes of recent failures to see if any errors were logged. When your goals for mean time to repair are in the minutes, ending up in CloudWatch is setting yourself up for failure.

When tools are cumbersome and fail to provide actionable insights, engineers spend more time diagnosing problems, which increases MTTR. 

### 2. **Time to Detect (TTD) Is Overlooked**
Another factor contributing to high MTTR is the time it takes to detect an issue in the first place. Reducing the mean time to detect ([MTTD](https://www.checklyhq.com/learn/monitoring/reduce-mttd/)) is crucial for improving MTTR, as delays in detection can lead to prolonged outages. 

An entire guide on time to detection is available on our Learn site, but in short the most common failures are:

- Reliance on user reporting — if a large class of failures will only ever be reported by users, you’re automatically adding 15 minutes at least to your time to detection. As a rule of thumb, **out of the last 10 incidents, only 1 should be user-reported**.
- Low-frequency monitoring — if you’re using an automated system to check your service’s availability, it’s critical to [set the right frequency for those checks](https://www.checklyhq.com/blog/check-frequency/). Checks that are happening only every 15 minutes won’t provide much better time to detection than waiting for users to report problems.
- Slow alerting — While most teams doing monitoring think quite a bit about the optimal frequency for those checks, less thought is put into the time spent between detection and sending an alert to the on-call team. On more than one occasion this author has seen teams drastically improve their MTTR just by adopting faster standards for how the on-call team got notified (for example adding alert channels beyond email).

Again these concerns and more are in a separate page on [optimizing time to detection](https://www.checklyhq.com/learn/monitoring/reduce-mttd/). 

### 3. **The Complexity of Cloud-Native Environments**

Many organizations are adopting cloud-native architectures, such as containers and microservices, to improve efficiency and scalability. However, this shift has introduced greater complexity, higher data volumes, and increased pressure on engineering teams. Cloud-native architectures have made it harder to discover and troubleshoot incidents. This complexity can significantly delay the time it takes to detect and resolve issues. 

Why is this issue particularly bad with cloud native architectures? The relative ease of deploying new servers, new stacks, even whole new clusters, means that the complexity of operational architectures has increased exponentially since the advent of cloud native architectures. After the fateful instruction of ‘cattle, not pets’ we have found ourselves swamped with an infinitude of small, disposable containers. That’s great until the herd is sick and we cannot diagnose the cause.
If you’re unsure if this is true in your own organization, ask this question of your team:

- If I point to any particular microservice, and a select a common user activity, can you tell me with certainty whether taking down that microservice will affect that user activity?

I believe that most engineers would honestly answer: “no,” and that this was different before cloud native architecture.

## How Can Companies Improve MTTR?

To address these challenges, organizations need to focus on optimizing each stage of the incident response process:

### 1. **Reduce Time to Detect (TTD)**

Improving detection times requires robust monitoring and alerting systems that can quickly identify issues. This involves setting low scrape intervals for data collection and ensuring that observability tools can ingest and generate alerts rapidly. Faster detection allows teams to begin remediation efforts sooner, which can significantly reduce MTTR. This is covered in more detail in our page on [optimizing detection time](https://www.checklyhq.com/learn/monitoring/reduce-mttd/).

### 2. **Streamline Time to Remediate**

Once an issue is detected, the next step is to stop the customer pain by implementing a temporary fix. This can be achieved by: 

- Providing engineers with actionable data and context in alerts. For example, linking alerts to dashboards that show affected services or customers can help engineers prioritize and resolve issues more efficiently.
- Linking alerts with deeper root cause information. While it’s critical to show ‘who is affected and how,’ it’s also supremely important to give some indication of what’s happening internal to our services so that our engineers are not stuck sorting through backend logs trying to match time stamps. For example, Checkly Traces links backend traces with synthetic monitoring data, to show application internals related to any user-facing issue.
- Easy rollbacks. Whether it’s deploying rolled back code right from source control with (for example) GitHub actions, or feature flagging to disable a new feature that’s causing trouble, it’s critical that on-call teams are empowered to get the service back to a working state by rolling back the clock.

With these tools an on-call team can get the system working for users quickly, followed by a longer period of root cause analysis and postmortem.

### 3. **Time to Remediate over Time to Repair**

In our guide on defining MTTR we discussed how the time to remediate (how long it takes to patch the problem such that users are not experiencing an error) versus time to repair (how long it takes to fix the underlying problem). In a simple if outdated example: resetting a server with a memory leak remediates an out-of-memory error, finding and fixing the memory leak repairs the problem.

While time to repair is important, it becomes less critical if detection and remediation times are optimized. If customers are no longer affected by the time the underlying issue is being fixed, the impact of a longer repair time is minimized. Critically, teams should have a clear mental model of remediation versus repair, and while they’re investigating the issue they should be asking: ‘do I have enough information to remediate this issue, can I remediate now and look deeper into the problem after users aren’t experiencing errors?’

Teams should still aim to reduce repair times, and clearly mark issues that are ‘remediated but not fixed’ so that technical debt doesn’t overwhelm on-call infrastructure. One consideration is that many incidents don’t have a clear moment when the issue is perfectly fixed. A problem like a memory leak may be possible to resolve 100%, but a request throttling with a 3rd party API may be transient but also hard to permanently resolve.

## Conclusions: MTTR challenges and opportunities

It’s very difficult to measure any complex human system. As business conditions change, hard performance measurements will naturally change, but if performance is improving or suffering is harder to determine. The 80/20 principle that most work is wasted effort with a small slice having the highest impact remains true in Operations as in so many technical fields. But if you track your time to resolve downtime incidents and other outages, it’s possible to see if things are getting better or worse. And averaging together performance makes it easier to eliminate too much focus on single incidents and their unique factors.