---
title: Check results
weight: 2
menu:
  docs:
    parent: "Monitoring"
---

If you have checks running, you can select them on the main Checkly dashboard and get an overview of the results they have produced so far. 

## Overview

The Overview tab offers a summary with key metrics at a glance:

![check results summary](/docs/images/monitoring/check-results-summary.png)

1. **24-hour ratio**: the percentage of successful check runs over the last 24 hours
2. **7-day ratio**: the percentage of successful check runs over the last 7 days
3. **30-day ratio**: the percentage of successful check runs over the last 30 days
4. **average**: average execution time across the last 24 hours
5. **p95**: the [95th percentile](https://www.manageengine.com/network-monitoring/faq/95th-percentile-calculation.html) response time across the last 24 hours
6. **p99**: the [99th percentile](https://en.wikipedia.org/wiki/Percentile) response time across the last 24 hours

You also have access to a graph showing status and response times per location across a timeframe of your choice. 

{{< info >}}
For self-service plans check results will only be [available in aggregate format](/docs/monitoring/how-we-store-data) after 30 days.
{{< /info >}}

![check results graph](/docs/images/monitoring/check-results-graph.png)

Single check runs can be accessed either by selecting a recent (less than 30 days old) execution either on the graph or just below.

![check results list](/docs/images/monitoring/check-results-results.png)

Note that you can access two separate tabs, one for scheduled and one for triggered executions.

## Execution results

Selecting a check execution will expose additional details, depending on whether it belongs to an API or Browser check.

### API check results

API check results expose:

1. The request performed
2. Any assertions that were included in the check
3. All data related to the request and its response, such as

    a. Response body

    b. Request & response headers
    
    c. Query params
    
    d. Check job log

4. Timings, such as

    a. Wait

    b. DNS

    c. TCP

    d. First Byte

    e. Download

![api check results detail page](/docs/images/monitoring/check-results-api.png)

### Browser check results

Browser check results contain:

1. A short check summary
2. The full job log (including any `console.log()` printed by the user)
3. Any screenshots taken during the check execution

![browser check results detail page](/docs/images/monitoring/check-results-browser.png)

## Events

The Events tab shows you alerts, deployments and other key events that have taken place during the execution timeframe of the check.

![check results events tab](/docs/images/monitoring/check-results-events.png)