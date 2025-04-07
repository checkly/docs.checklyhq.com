---
title: Incident Response
displayTitle: Incident Response 
description: Learn Incident Response
date: 2025-04-07
author: Nocnica Mellifera
githubUser: serverless-mom
displayDescription:
---
# Learn the fundamentals of Incident Management

We’ve all been there, the 3AM phone call, the bleary-eye scanning of a Slack channel, the debates over what to say on the status page, the rollbacks, the restarts, and the attempts to find root causes and deploy a fix. Incident management happens every day, and when it’s working well both your users and your leadership may be barely aware of it. But when incidents are severe or when incident management isn’t done well, it’s the only thing anyone wants from your product.

In the last decade as the whole world has grown to accept software-as-a-service, the standards for uptime and responsiveness to issues have increased steadily. While day-long maintenance windows and hours-long outages were par for the course in 2015, now even an outage of a few minutes can affect business health.
Further, expectations about uptime have gone from ‘best practices’ to ‘binding agreements with financial costs for failures,’ with enterprise clients demanding service level agreements (SLAs) with penalty schedules if uptime goals aren’t met.

In this section, start your journey of incident management, beginning with:

- What is incident management? - a map of best practices and fundamentals
- Setting expectations - defining SLA’s and calculating goals
- How to create an on-call schedule - deciding ahead of time who will get woken up with alerts
- Measuring performance
    - Defining Mean Time to Resolution (MTTR)
    - How to shorten MTTR
    - Best practices for Mean Time to Detection (MTTD)
    - DORA metrics to measure team performance

## Getting Started

<div class="cards-list">
{{< doc-card
	  class="two-column-card"
	  headerTag="h3"
	  title="Web Application Monitoring"
	  img="/learn/icons/monitoring.svg"
	  description="Learn all about web application monitoring, performance and reliability and discover top tools."
	  link="/learn/monitoring/web-application-monitoring/"
>}} 
{{< doc-card
	  class="two-column-card"
	  headerTag="h3"
	  title="Frontend Monitoring"
	  img="/learn/icons/monitoring.svg"
	  description="Discover the benefits and top tools for frontend monitoring. Track performance and optimize user experience."
      link="/learn/monitoring/frontend-monitoring/"
>}}
</div>

## Critical Performance Metrics

<div class="cards-list">
{{< doc-card
	  class="two-column-card"
	  headerTag="h3"
	  title="Defining MTTR"
	  img="/learn/icons/metrics.svg"
	  description="Mean Time to Repair (MTTR) is the average time it takes to repair a system or service after a failure occurs. Dive into how it can help you measure performance"
	  link="/learn/monitoring/defining-mttr/"
>}} 
{{< doc-card
	  class="two-column-card"
	  headerTag="h3"
	  title="DORA Metrics"
	  img="/learn/icons/metrics.svg"
	  description="What's the quality of your developer experience? Quantify performance with DORA metrics."
      link="/learn/monitoring/dora-metrics/"
>}}
</div>

## On the Checkly Blog

<div class="cards-list">
{{< doc-card class="three-column-card" title="How to Fight Alert Fatigue with Synthetic Monitoring" description="Learn seven best practices to fight alert fatigue." link="https://www.checklyhq.com/blog/alert-fatigue/" >}}

{{< doc-card class="three-column-card" title="Observability as Code Explained" description="Traditional monitoring has become insufficient for managing complex systems. " link="https://www.checklyhq.com/blog/observability-as-code/" >}}

{{< doc-card class="three-column-card" title="Software Deployment Best Practices for Modern Engineering Teams" description="Five best practices to help you deploy your software more securely and reliably." link="https://www.checklyhq.com/blog/software-deployment-best-practices/" >}}

</div>
