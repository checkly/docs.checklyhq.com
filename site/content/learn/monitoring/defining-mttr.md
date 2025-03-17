---
title: Defining MTTR - what mean time to repair means for your team
displayTitle: What is MTTR? And Why Cant We Agree On It?
navTitle:  What is MTTR?
description: Mean Time to Repair (MTTR) is a critical metric in the world of IT operations and engineering, representing the average time it takes to repair a system or service after a failure occurs. Despite its importance, many teams fail to meet their MTTR goals.
date: 2025-02-15
author: Nocnica Mellifera
githubUser: serverless-mom
displayDescription: 
menu:
  learn_monitoring
weight: 90
menu:
  learn_monitoring:
      parent: Availability Metrics
---
Mean Time to Repair (MTTR) is a critical metric in the world of IT operations and engineering, representing the average time it takes to repair a system or service after a failure occurs. Despite its importance, many teams fail to meet their MTTR goals. MTTR or its corollary may be essentially to meeting your Service Level Agreements (SLA) with your clients, which in their most basic form are an agreement about the amount of time that your service is available in a given period. If unintentional outages (failures) are taking your service offline frequently, and the outages take a long time to resolve, you won’t meet your SLA.

## Understanding MTTR

Originally a term from old school IT and even Operational services, MTTR used to refer to the time it took from a physical device’s breakdown to it its being back in service. For example, when an electric motor would break down, how long before a technician had analyzed the problem, fixed the motor, and it was back driving industrial machinery. MTTR stands for "mean time to repair," but its definition can vary depending on whom you ask. Some interpret it as the time it takes to restore a system to a functional state, while others see it as the time required to completely fix the underlying issue. This ambiguity makes it difficult to benchmark MTTR across organizations, but it doesn’t explain why so many companies fail to meet their own internal targets.

The confusion around MTTR is compounded by the fact that it is sometimes used interchangeably with other terms, such as:

- **Mean Time to Respond**: The time it takes to acknowledge and begin addressing an issue.
- **Mean Time to Restore**: The time it takes to restore service after an outage.
- **Mean Time to Remediate**: The time it takes to fully resolve the root cause of a problem.

![A timeline of various moments in the incident response cycle that can sometimes be called MTTR](/mttr-timeline.png)

Most teams do default to the root meaning, or the original meaning, "mean time to repair," but even within this definition, there is room for interpretation. This lack of clarity can lead to misaligned expectations and ineffective strategies for improving MTTR.

## Calculating MTTR

The Mean Time to Repair is just the arithmatic mean (or average) of your time to resolution from all incidents. The timeline diagram above gives an example of how the time to repair is measured from each incident: it starts when the outage first occurred, to when a fix was deployed. If we had five incidents last month, with times to repair looking like the following table:

| Incident Number | Time to Repair |
| --- | --- |
| 1 | 22 minutes |
| 2 | 9 minutes |
| 3 | 86 minutes |
| 4 | 21 minutes |
| 5 | 147 minutes |

The mean time to repair would be: 

(22 + 9 +86 + 21 + 147 minutes) / 5 incidents =

(285 minutes) / 5 incidents = 

**57.2 minutes** per incident

Note that mean time to repair is not a full indicator of how you’re meeting your SLA, since you must multiply back out the number of incidents you’ve had.

## How MTTR can fall short of measuring performance

It seems a simple thing to say ‘we want the minimum mean time to repair’ for a team and that the resulting optimization of the resolution process will result in better performance for users. As a very general critique, allow me to quote Goodhart’s Law:

> Any observed statistical regularity will tend to collapse once pressure is placed upon it for control purposes.

When we first proposed MTTR as a measure for how well we were meeting our service level agreement (SLA) for our users, the connection between these statistics seemed irrefutable. But talking to senior Ops engineers you will hear many stories about how, despite improvements in MTTR and other metrics, users still complained of broken SLAs. One example:

“We had an enterprise client complain we weren’t meeting our uptime agreement. This was after we’d streamlined the incident response process and put in hard controls for how downtime was measured. The issue it turned out was how slowly we marked downtime as ‘resolved’ on our status page. The client was monitoring that page and using it to show more downtime than we really had.”

On the level of an individual conversation that can seem like a simple miscommunication, but take it from the user’s view: they rely on the status page to know when the service is available after an incident. If your team, despite fixing the issue quickly, is taking 20 minutes to remove the downtime status, isn’t that breaking your SLA?

### Disagreements in measuring MTTR

The above example is a disagreement about what MTTR is measuring, with one person going by how long a service was unavailable based on backend logging, the other basing off the status page, but there are even more cases where it’s hard to agree on a value. What about geographically specific failures? If a service is unavailable in Germany only, does that [geographic-specific outage](https://www.checklyhq.com/docs/monitoring/global-locations/) count as downtime? What if one feature isn’t working for a week, but other users never notice the issue because they never use that feature? Both these questions ask ‘Does MTTR measure the whole system or just parts?’ and every organization will have its own answer to this question. 

To refer back to Goodhart’s Law mentioned in the above section, a confounding issue is the use of a general statistic to measure performance and (often) punish failure. When good engineers are facing penalties for missing SLA or hurting MTTR, they can often become very stingy with what counts as downtime.

## The right strategy for measuring MTTR

The best way to measure MTTR consistently is to use an automated synthetic monitor that’s agreed on before an incident. If a team is trying to examine an incident post-hoc and define the time points where downtime started and ended, motivated reasoning and multiple definitions will make the statistic less reliable. But if a monitoring service is checking often enough to measure both outages and recoveries in high resolution, this results in a statistic that all sides can agree on. Two additional features of a synthetic monitor should be considered, based on the disagreements about measurement that are so common:

- Multiple geographic locations to ensure the service is up for all users
- Complex scripting and customization to ensure all core features are working with each check

With these tools it’s possible to measure an MTTR that everyone can agree on. Note that to get accurate data, you’ll need to [set the right cadence](https://www.checklyhq.com/blog/check-frequency/) for automated checks.

## Conclusion

MTTR is a vital metric for measuring operational performance, but its effectiveness depends on clear definitions, effective tools, and optimized processes. Later articles will discuss the components of a time to repair (time to detect, root cause analysis, and incident response), and propose best practices for meeting SLA.

An automated tool that everyone can agree is observing the user experience from multiple locations and with a full simulation of user paths, can help get us a consistent MTTR measurement. [Try Checkly](http://checklyhq.com) to see how our monitoring tools can warn you faster than ever of an outage.