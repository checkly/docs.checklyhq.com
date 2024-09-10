---
title: Understanding and managing false positives
weight: 10
menu:
  platform:
    parent: "Monitoring"
---

Effective monitoring stands and falls with its accuracy. You want to be alerted-and, if it comes to it, woken up in the middle of the night-only when there's a real issue. However, the reality is that false positives can occur for various reasons. A check might be affected by harmless glitch in the network connection between Checkly and your check target, causing your site to be flagged as slow or unreachable, when, in fact, it is running perfectly fine.

The public internet, with its millions of networks and nodes, can be unpredictable, making occasional hiccups unavoidable. Thankfully, many of these are just isolated incidents that resolve on their own, and there are ways to protect your monitoring setup from them.

In this section, we'll dive into why these issues happen and share strategies on minimizing the impact of false positives, allowing you to more clearly distinguish between a real problem and a simple network blip.

## Common Causes of Performance Variations

When setting up your monitoring strategy, it's important to consider a few common factors that can affect networking performance:

- **Network Latency:** The time it takes for data to travel between points. This can vary due to distance, routing, or congestion.
- **Packet Loss:** Sometimes data packets don’t reach their destination and need to be resent, leading to delays.
- **Server Response Time:** Servers might occasionally take longer to respond, or load balancers and backend services could be at capacity.
- **Infrastructure Issues:** Temporary issues like routing errors, server load spikes, or scheduled maintenance can also impact performance.

While these factors are generally well-managed, they can’t be completely avoided. However, you can take steps to make your monitoring setup more resilient.

## What Is an Accepted Failure Rate?

At Checkly, we work with an accepted failure rate to ensure we're operating within the normal, expected range of performance. This rate accounts for flaky tests—network anomalies between Checkly and your check target that aren’t caused by either party.

We aim to keep this rate below 0.002%. To illustrate: out of A checks, B may result in false positives. Or, if your check runs every C, you might experience an abnormal result D every E.

## Best Practices to Minimize False Positives

False positives can lead to unnecessary alerts, but you can keep them under control by following these best practices:

### Use Retries

Retries are your first line of defense against transient issues. By setting up retries, your checks can automatically try again if the first attempt fails because of a temporary glitch. This reduces the impact of brief disruptions and helps prevent false positives.

While you might want to adjust based on specific use cases, we suggest implementing at least one retry for checks with a high escalation impact as a standard best practice.

Learn more about implementing retries: [Retries at Checkly](https://www.checklyhq.com/docs/alerting-and-retries/retries/#retries).

### Run Checks from Multiple Locations

A temporary issue from one location might cause a check to fail, but that doesn't always mean your application is down. With 22 available regions, Checkly lets you run checks from multiple locations simultaneously. This helps you spot the difference between a localized network problem and a real issue with your app.

We recommend starting with checks from at least two different regions to get a clearer picture and reduce the chance of a false positive caused by a regional glitch.

Learn more about configuring up multi-location checks: [Global Location and Scheduling Strategies](https://www.checklyhq.com/docs/monitoring/global-locations/).

### Fine-Tune Your Alerting

Once you’ve implemented retries and multi-location checks, you can adjust your alert settings to avoid unnecessary notifications. For example, you can require failures in multiple regions or after several retries before firing off an alert. This helps you avoid alerts for short-lived, isolated failures that don’t need immediate attention.

A good starting point set alerts to trigger only after a check has failed at least twice (or after two intervals) and has failed in more than one region.

Learn more about fine-tuning your alerts: [Alert Settings at Checkly](https://www.checklyhq.com/docs/alerting-and-retries/alert-settings/).

## Need Help?

If you’re not sure what’s going on or if an issue keeps popping up without a clear reason, don’t hesitate to reach out. Our support team is here to help you troubleshoot any unusual check performance.
