---
title: Check results
weight: 2
menu:
  docs:
    parent: "Monitoring"
---

If you have checks running, you can select them on the main Checkly dashboard and get an overview of the results they have produced so far. 

## Check overview

Select a check and you will see a breakdown of its recent runs, together with key availability and performance metrics. All results are shown based on the selected timeframe.

![check results overview](/docs/images/monitoring/check-results-summary.png)

Single check runs can be accessed by selecting them on the timeline and clicking `View Details`. A preview of the selected check run also appears just below the timeline.

<img class="screenshot-partial" alt="check results overview top" src="/docs/images/monitoring/result-overview1.png"/>

{{< info >}}
For self-service plans check results will only be [available in aggregate format](/docs/monitoring/how-we-store-data) after 30 days.
{{< /info >}}

Note that you can access two separate tabs, one for scheduled and one for triggered executions.

## Browser check results

Browser check results contain:

1. A short check summary, including errors broken down by category.
<img class="screenshot-partial" alt="check results browser summary" src="/docs/images/monitoring/check-results-browser-summary.png"/>
2. A timeline showing how much time was spent on each page.
<img class="screenshot-partial" alt="check results browser timeline" src="/docs/images/monitoring/check-results-browser-timeline.png"/>
3. An error log, only if your script failed.
<img class="screenshot-partial" alt="check results browser error log" src="/docs/images/monitoring/check-results-browser-error-log.png"/>
4. Expandable tabs on page your script navigated to.
<img class="screenshot-partial" alt="check results browser page navigation" src="/docs/images/monitoring/check-results-browser-page-navigations.png"/>
When expanded, each tab shows its own navigation/loading timeline and web vitals...
<img class="screenshot-partial" alt="check results browser navigation top" src="/docs/images/monitoring/check-results-browser-navigation-top.png"/>
...together with browser console logs, network logs and any screenshots that had been taken (including one screenshot taken automatically on failure).
<img class="screenshot-partial" alt="check results browser navigation bottom" src="/docs/images/monitoring/check-results-browser-navigation-bottom.png"/>
5. A job log for the check.
<img class="screenshot-partial" alt="check results browser job log" src="/docs/images/monitoring/check-results-browser-job-log.png"/>

## API check results

API check results will expose key performance and correctness data about the HTTP response received from the target endpoint.

![api check results detail page](/docs/images/monitoring/check-results-api.png)

These include:

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