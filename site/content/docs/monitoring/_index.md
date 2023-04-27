---
title: How we run checks
weight: 1
slug: /
aliases:
- /docs/monitoring
menu:
  platform:
    parent: "Monitoring"
---

Checkly runs your API & browser checks every x minutes, based on an interval you select. 
We have different minimum intervals for each check type:

- API checks can be scheduled to run **every 10 seconds**.
- Browser checks can be scheduled to run **every 1 minute**.

You can select one or more data center locations to run your checks from. We advise to **always select at least 2 locations**.
There are two reasons for this:

1. Redundancy: we might have an issue in one location, but not the other. 
2. Double checking: if your check fails and you have "double check" enabled we will retry the check from the other location.

{{< info >}}
Note that **we run checks sequentially**, not in parallel. For example, a 1 minute API check, with data center locations
Paris and Frankfurt selected, will first run in Paris and 1 minute later in Frankfurt.
{{< /info >}}
A picture is a thousand words:

![monitoring and alerting pipeline](/docs/images/monitoring/pipeline.png)

1. A cron process picks up a check based on its schedule, say every 5 minutes. It validates that the check is not in progress at the moment to avoid race conditions. The check is put into a queue to be run from the next configured data center location.
2. If the check is an API check and has a [setup script](/docs/api-checks/setup-teardown-scripts/), the setup script is executed. 
3. The check is executed. If the check fails and "double check" is enabled, the check is retried once in a different location.
The other location is picked, at random, from all the configured locations. If only one location has been selected, then the other location is picked at random from all available locations. Setup scripts are executed again during the retry.
4. If the check is an API check and has a [teardown script](/docs/api-checks/setup-teardown-scripts/), the teardown script is executed.
Teardown scripts are run *before* any assertions are validated.
5. The result is stored in our central database and any alerts are sent where applicable.
