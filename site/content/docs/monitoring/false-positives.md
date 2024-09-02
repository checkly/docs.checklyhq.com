---
title: Understanding and managing false positives
weight: 10
menu:
  platform:
    parent: "Monitoring"
---

At Checkly, we provide a reliable and performant solution for running synthetic monitoring and API checks across 22 regions. Our infrastructure is designed to be robust, but sometimes, unforeseen issues like server or network problems can crop up—whether on our side or yours. Often, these issues show up as isolated incidents that resolve on their own. However, in the worst cases, they can cause false positives in your check results, where Checkly might report that your site or server is slow or unavailable, even though you know it's up and running.

In this section, we’ll take a closer look at why these intermittent issues can occur and how you can protect your monitoring setup from them.

## Common Causes of Performance Variations

Networking is complex, and hiccups happen. These can occur anywhere—within our infrastructure, on your end, or somewhere in between—and don’t necessarily mean that your server or site is actually down. Here are some common factors that can affect performance:

- **Network Latency:** The time it takes for data to travel between points. This can vary due to distance, routing, or congestion.
- **Packet Loss:** Sometimes data packets don’t make it to their destination and need to be resent, causing delays.
- **Server Response Time:** Both our servers and yours might occasionally take a bit longer to respond.
- **Infrastructure Issues:** Temporary problems like routing errors, server load spikes, or scheduled maintenance.

While these factors are generally well-managed, they can’t be completely avoided. However, you can take steps to make your monitoring setup more resilient.

## What Is an Accepted Failure Rate?

<!--- This section would need to be refined more if we want to keep it i.e. specifiy which specific metrics we are talking about --->

At Checkly, we understand that perfect infrastructure performance is unrealistic. That’s why we define an "accepted failure rate," which is a small percentage of checks that might be impacted by by server- and network anomalies.

Our goal is to keep this failure rate below **X%**, so fewer than **X** out of every 1,000 checks are affected. We continually optimize our infrastructure to keep this rate as low as possible.

## Best Practices to Minimize False Positives

False positives can lead to alert fatigue, but you can keep them to a minimum by following these best practices:

### Use Retries

Retries are your first line of defense against transient issues. By setting up retries, your checks can automatically try again if the first attempt fails because of a temporary glitch. This reduces the impact of brief disruptions and helps prevent false positives.

Learn more about implementing retries: [Retries at Checkly](https://www.checklyhq.com/docs/alerting-and-retries/retries/#retries).

### Run Checks from Multiple Locations

A temporary issue in one location might cause a check to fail, but that doesn't necessarily mean your application is down. With 22 available regions, Checkly lets you run checks from multiple locations simultaneously. This helps you spot the difference between a localized network problem and a real issue with your app.

Learn more about setting up multi-location checks: [Global Location and Scheduling Strategies](https://www.checklyhq.com/docs/monitoring/global-locations/).

### Fine-Tune Your Alerting

Once you’ve implemented retries and multi-location checks, you can adjust your alert settings to avoid unnecessary notifications. For example, you can require failures in multiple locations or after several retries before triggering an alert. This helps you avoid alerts for short-lived, isolated failures that don’t require immediate attention.

Learn more about configuring alerting: [Alert Settings at Checkly](https://www.checklyhq.com/docs/alerting-and-retries/alert-settings/).

## Need Help?

If you’re not sure what’s going on or if an issue keeps popping up without a clear reason, don’t hesitate to reach out. Our support team is here to help you troubleshoot any unusual check performance.
