---
title: Overview
weight: 7
slug: /
menu:
  docs:
    parent: "API checks"
    identifier: overview-api-checks
---

API checks consist of few parts:

> The following phases are executed under the hood by the Node.js request library and the chai.js assertions library. All checks are executed on Amazon's AWS Lambda infrastructure.


**1. Name and tags**

Start as your mean to go on. Pick a sensible name, something that other members of your team are going to understand. If anything goes wrong, a meaningful name will help identify which alert has triggered.
Tags can relate checks together, they can also determine which checks are shown on your public dashboards.
[Read more about public dashboards](./dashboards.md)
![http request](/docs/images/api-checks/overview-name-tag.png)

**2. The HTTP request**

This is where you configure the method, body, headers etc. which determines the response sent back by your API. [Read more about HTTP request settings](request-settings.md)
![http request](/docs/images/api-checks/overview-http.png)

**3. Setup and teardown scripts**

Setup scripts allow you to do last minute processing of test data and request options. The scripts execute before any requests are made.
Teardown scripts are run after the HTTP request has finished, but before any assertions are validated.
[Read more about scripts](setup-teardown-scripts.md)
![setup and teardown scripts](/docs/images/api-checks/overview-scripts.png)

**4. Response time limits**

Sometimes an API is just slow, but not broken. We call that “degraded” and you can specify when an API checks should be marked as degraded and when it should be marked as failed. [Read more about time limits](limits.md)
![response times](/docs/images/api-checks/overview-response-time.png)

**5. Assertions**

This is where you determine whether the response of the HTTP request is correct or within acceptable bounds.  
[Read more about assertions](assertions.md)
![assertions](/docs/images/api-checks/overview-assertions.png)

**6. Locations**

You can configure your checks to run from our ever-growing amount of global locations or use a Checkly Agent to host your own private location.
Read more about our [public](../monitoring/global-locations.md) and [private](../private-locations/private-locations-getting-started.md) locations.
If you don't select more than one data center location, we will pick a random location when retrying checks if you have "double check" enabled.
![locations](/docs/images/api-checks/overview-locations.png)

**7. Scheduling**

Checkly runs your API checks based on an interval you select. We have a minimum and maximum interval for your API checks.
The quickest schedule you can run is every 10 seconds and the slowest is every 24 hours.
![schedule](/docs/images/api-checks/overview-schedule.png)

**8. Alerting**

Our alerting is pretty flexible. You can configure whichever alerting channel you like for whichever API you like.  
[Read more about managing your alert channels](../alerting/alert-channels/#managing-alert-channels.md)
![alerting](/docs/images/api-checks/overview-alerting.png)
