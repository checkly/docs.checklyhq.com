---
title: Optimizing your monitoring for reliability
weight: 4
menu:
  platform:
    parent: "Monitoring"
---

Reliable monitoring depends on delivering accurate alerts, ensuring that you're notified—and if it comes to it, woken up in the middle of the night—only when there’s a real issue. However, false positives can happen for various reasons. In this guide, we focus on one of the most common causes: unpredictable network behavior.

The public internet, with its millions of networks and nodes, can be unpredictable, making occasional hiccups unavoidable. A harmless glitch in the network connection between Checkly and your check target might cause your site to be flagged as slow or unreachable, even when it's running perfectly fine. Thankfully, many of these are just isolated incidents that resolve on their own, and there are ways to protect your monitoring setup from them.

At Checkly, we aim to help you achieve the lowest false positive rate in the market, ensuring you are alerted only when it truly matters.

Read on to learn more about common causes of performance variations and strategies to minimize the false positives they can cause.

## Common Causes of Performance Variations

When setting up your monitoring strategy, it's important to consider a few common factors that can affect networking performance:

- **Network Latency:** The time it takes for data to travel between points. This can vary due to distance, routing, or congestion.
- **Packet Loss:** Sometimes data packets don’t reach their destination and need to be resent, leading to delays.
- **Server Response Time:** Servers might occasionally take longer to respond, or load balancers and backend services could be at capacity.
- **Infrastructure Issues:** Temporary issues like routing errors, server load spikes, or scheduled maintenance can also impact performance.
- **Security-Related Blockages:** Firewalls, DDoS protection, or other security measures might prevent Checkly’s monitoring traffic from reaching your servers if flagged as suspicious. This can disrupt checks and result in false positives.

While these factors are generally well-managed, they can’t be completely avoided. However, you can take steps to make your monitoring setup more resilient.

## Best Practices to Minimize False Positives

False positives caused by network variations can lead to unnecessary alerts, but you can keep them under control by following these best practices:

### Use Retries

Retries are your first line of defense against transient issues. By setting up retries, your checks can automatically try again if the first attempt fails because of a temporary glitch. This reduces the impact of brief disruptions and helps prevent false positives.

While you might want to adjust based on specific use cases, we suggest implementing retries for checks with a high escalation impact as a standard best practice.

Learn more about implementing retries: [Retries at Checkly](https://www.checklyhq.com/docs/alerting-and-retries/retries/#retries).

### Optimize Your Regional Monitoring

Running checks from a specific region is important when you need to monitor your app’s performance in that area. To identify localized failures, implementing retries can help confirm whether the issue is temporary or persistent. However, if you want to understand whether an issue is more widespread, running checks from multiple regions can help you determine if it’s a broader problem with your app.

Depending on your use case, we recommend running checks from at least two different regions to more accurately differentiate between a regional network issue and a genuine application problem.

Learn more about setting up multi-location checks: [Global Location and Scheduling Strategies](https://www.checklyhq.com/docs/monitoring/global-locations/).

### Fine-Tune Your Alerting

Adjust your alert settings to avoid unnecessary notifications. For example, you can require failures in multiple regions or after several retries before firing off an alert. This helps you avoid alerts for short-lived, isolated failures that don’t need immediate attention.

A good starting point is to set alerts to trigger only after a check has failed at least twice (or after two intervals) and has failed in more than one region.

Learn more about fine-tuning your alerts: [Alert Settings at Checkly](https://www.checklyhq.com/docs/alerting-and-retries/alert-settings/).

### Allowlist Checkly Traffic

In some cases, firewalls, load balancers, or security solutions might inadvertently block Checkly's monitoring traffic, which could interfere with running checks successfully. This can happen if your system detects Checkly’s requests as suspicious or treats them as unwanted traffic.

To prevent this, we recommend reviewing your security settings to ensure that Checkly’s IP ranges are included in your allowlist.

You can find Checkly’s current IP ranges here: [Allowlisting & filtering traffic](https://www.checklyhq.com/docs/monitoring/allowlisting/#ip-range-allowlisting).

## Need Help?

If you’re not sure what’s going on or if an issue keeps popping up without a clear reason, don’t hesitate to reach out. Our support team is here to help you troubleshoot any unusual check performance. You can contact us at support@checklyhq.com.
