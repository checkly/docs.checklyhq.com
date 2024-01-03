---
title: Check Pricing
weight: 9
menu:
   platform:
    parent: "Monitoring"
---

Check pricing is based on a number of factors. Here is a breakdown of the things that determine the cost of a check.

### Base cost

Browser checks and API checks have a base price per check run. Always refer to our [pricing page](https://www.checklyhq.com/pricing/) for the latest prices.

The base cost is typically listed as $X per 1k or 10k check runs.

If a browser check is running once per hour with a cost of $5 per 1000 check runs, the monthly base cost for the check would be $3,65.

### Parallel scheduling

When a check is running in [parallel](/docs/monitoring/global-locations/#parallel), it will run once on each selected location per execution. If you change a check from using the round-robin scheduling method to running in parallel, be aware that the cost will multiply by the number of locations you have selected.

Balance the number of locations the check is using to ensure you are quickly made aware of potential issues in critical locations without running an unnecessary amount of checks.

Continuing our example from earlier, if we want our Browser check to run in parallel from 5 locations, the monthly cost will increase from $3,65 to $18,25.

### Retries

When a check is [retried](/docs/alerting-and-retries/retries), this counts as a new check run. A flaky check can increase your check run costs above the expected. If you have problems with flaky checks, ask our community or our support for tips on how to improve check stability and reduce cost.

If our check from earlier has a 20% retry rate, this will increase our cost from $3,65 to $4,40.

### Multistep checks and requests

[Multistep check](/docs/multistep-checks) pricing is slightly different from browser and API checks. A multistep check is billed based on the number of requests done per check run. Each request in a multistep check run is billed as a single regular API check run, as they are performing the same basic operation. 

As an example, let’s say you have 4 API checks, where each check doing one of the `GET`, `POST`, `PUT` and `DELETE` operations towards the same endpoint. If you replace these 4 checks with a single multistep API check that runs 4 requests towards the same endpoint, checking each method, and the check run frequency is the same as before, your cost stays the same

A multistep check with 0 requests is billed as if it has 1 request.

### Heartbeat checks

A set number of [heartbeat checks](/docs/heartbeat-checks) are included in the team and enterprise plans. Checkly does not charge for heartbeat pings. 

If you have reached your maximum number of heartbeat checks and need more, contact our support.