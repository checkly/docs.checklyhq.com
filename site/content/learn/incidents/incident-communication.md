---
title: Best Practices for Communicating During Outages and Incidents
displayTitle: Incident Communication - Best Practices
navTitle:  Incident Communication
description: Lack of communication, or wrong communication, can often be the part of incident response that comes in for the most criticism. While it’s critical to define playbooks for communication, this article will talk in general about the best practices for communicating with users during an incident. 
date: 2025-02-15
author: Nocnica Mellifera
githubUser: serverless-mom
displayDescription: 
menu:
  learn_incidents
weight: 10
menu:
  learn_incidents:
      parent: Communication
---

During the difficult process of incident response, an engineer’s mind quickly goes to fixing the problem. In this author’s time of application development, I’d gladly work in silence for hours as long as I was making progress on a fix. But of course, if our users don’t know what’s happening, it can magnify the impact of an outage the point of causing churn. As the team is trying to identify the root cause and figure out a fix, they’ll always be asking how to communicate with users and when. 

Lack of communication, or wrong communication, can often be the part of incident response that comes in for the most criticism. While it’s critical to define playbooks for communication, this article will talk in general about the best practices for communicating with users during an incident. 

## How soon to communicate about incidents

There’s no single standard for communication time with users, ask different operations engineers, and you’ll get very different answers. To determine the correct time to contact users, consider asking the following general questions:

- Do you want to notify users when you’re only investigating a problem, not even sure if it’s a technical failure on your service or a false report?
- Are you comfortable with users hearing about a failure that may not have an effect on them? For example, would you inform users of an outage even if it was limited to one geographic region, or  would you want to limit who saw that communication to those in the affected region?
- In the last 5 incidents that generated feedback from users, how often was your team’s communication a major problem?

With the answers to these, you should be able to give general guidance to your team so that the person who’s selected by the on-call rotation can make informed decisions about how to notify users.

## Automate communication when possible

During total outages, where some or all users are totally unable to use your service, no amount of delay in notifying affected users will feel acceptable to those users. Users expect that the second your service goes down, the login box on your page will be replaced with a ‘technical difficulties, please stand by’ message.

While users always have high expectations, this one does feel reasonable: after all shouldn’t it be trivial to detect that a service is completely down, then list that on a [status page](https://www.checklyhq.com/docs/status-pages/) automatically? On the other hand, we don’t want to tell users not to log in when the service is working fine. So while it’s best to automate status messages, we require a robust tool to detect these outages.

You should, wherever possible, have an automated system that shows the availability of your service. Such an automated communication tool should do the following:

- Regularly make requests of your key services
- Implement retry logic, checking again if any request fails
- Make requests from a broad geographic area, not relying on a single network route or availability zone
- Output the results of these checks to a publicly available [status page](https://www.checklyhq.com/docs/status-pages/)

Of course, not every outage can result in automated communication. As an example: if a datastore starts returning gibberish records for all users, the service is likely to look healthy to most automated monitors (we’ll note that a sophisticated Playwright check could identify functional problems like this one, but still). As such, it is critical that even with a high quality detection and status communication system, your on-call team still needs the ability to communicate with users, preferably in the same channel as the status automation. This also adds a fallback if the automated system isn’t working during an outage.

## Trust your on-call team

As mentioned elsewhere in our guide to incident response playbooks, having a plan for dealing with outages and other issues is a huge source of psychological safety for an on-call team. However, while a plan is a good thing to have, you must always trust that your team will need to make their own decisions. I’ll draw an example from my own experience:

> One evening a sales person got in touch with the on-call team saying that the site was completely down. The sales person was at the client’s offices and had the site fail during a training as they were showing the interface to 100 engineers. Our tech support team member tried loading the same, frequently used, page and also got a 404 status. We spent a few minutes troubleshooting, switching to different accounts and making sure we weren’t dealing with an invalid browser cache. “Should we update the main page?” asked the tech support person. Clearly, if the site was completely unusable, we should make an update, but I asked her to wait. At the time I barely knew why I made that decision, but in retrospect I recall that I’d been waiting for the last few minutes for the page to load on a very slow mobile connection in our building’s basement. Sure enough, the page loaded fine. The office network was having a hardware problem. And the sales person on location? They’d been using a VPN to our network without realizing!

In the case above, our team was tempted to notify tens of thousands of users of an outage that not one of them would have experienced. There is no hard and fast algorithmic path to deciding if all users need to be notified or a status page updated, there are always small and hard to define indications of an outage’s severity.

## Delegate communications on the on-call team

Any documentation of an incident response process will divide the response into separate stages of detection, classification, communication, et cetera. 

![A Resolution Timeline](/learn/images/incident-response-layers.png)

*The process for a serious outage, with each step done in order and no overlap.*

This is a fine mental model of the process, but the reality is less like a layer cake and more like an English trifle. 

![An english trifle, By JIP - Own work, CC BY-SA 4.0, https://commons.wikimedia.org/w/index.php?curid=50966818](/learn/images/incident-comms-02.png)

*As in this classic English desert, the layers of incident response often blend in the real world*

If two dozen users get in touch from all over the globe, it’s likely we’ll be communicating with all users before we’ve classified the issue. And often we’ll try to communicate before we’ve found a root cause, meaning communication and investigation are happening in parallel. Finally, engineers would like to deploy a fix before the root cause is understood, blending investigation and repair. It’s to be expected that these tasks in the incident response process would overlap, but if you have one person responsible for both technical and business decisions, this blending means enormous stress.

In the anecdote shared in the section above, the support engineer during an incident was responsible for updating the status page, while the on-call ops engineer tried to diagnose the issue, and on-call developers examined recent code changes for possible causes. This kind of delegation is key: a mind that is desperately trying to find the scope and possible cause of an issue has little bandwidth for contemplating a useful status message.

Further, entrusting communications to a customer facing team member means that:

- The support or sales engineer tasked with communication is likely to understand what exactly this outage means for most users, as users average behavior is more clear to someone who works with users directly.
- Customer-facing engineers are often the best people to identify expected behavior for the product, proving enormously helpful during the diagnosis stage.

## Conclusions: Communication Remains a Human Speciality

Effective communication during an incident is just as critical as the technical response itself. While engineers naturally prioritize diagnosing and resolving issues, keeping users informed—accurately and promptly—can significantly mitigate frustration and prevent churn. This article has outlined key best practices for incident communication, emphasizing the importance of timing, automation, delegation, and trust in the on-call team’s judgment.

Determining *when* to communicate involves balancing transparency with caution—not every investigation warrants a broad alert, but prolonged silence can erode trust. Automating status updates where possible ensures users receive immediate, reliable information during full outages, while still allowing for human intervention in complex or ambiguous scenarios. Most importantly, incident response should not rest on a single individual’s shoulders. Delegating communication to customer-facing team members allows technical staff to focus on resolution while ensuring updates are clear, relevant, and empathetic.

Ultimately, incident communication is less about rigid protocols and more about adaptability. Real-world incidents rarely follow a linear process, and teams must be empowered to make judgment calls—whether that means delaying a status update to verify an outage or proactively notifying users before a root cause is found. By combining automation with human expertise, organizations can navigate outages with transparency, efficiency, and minimal disruption to their users.