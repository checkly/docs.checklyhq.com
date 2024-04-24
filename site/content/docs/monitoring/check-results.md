---
title: Check results
weight: 2
menu:
   platform:
    parent: "Monitoring"
---

You can select any check on the main Checkly dashboard to get an overview of the results they have produced so far. To learn about heartbeat check results, visit the [Heartbeat checks](/docs/heartbeat-checks) section

## Check results overview

Select a check and you will see a breakdown of its recent runs, together with key availability and performance metrics.

![check results overview](/docs/images/monitoring/check-overview.png)

### Summary section

The summary at the top of the page allows for filtering based on the page's data points and the selected timeframe and locations. Retried check runs do not influence this section; only the final results are considered.

<img class="screenshot-partial" alt="check results overview summary" src="/docs/images/monitoring/check-overview-summary.png"/>

Based on the user's selection, the metrics in the summary will also be updated to show the most important numbers at a glance.

### Monitoring results chart

The monitoring results chart shows a summary of the run results in the selected time period where each bar represents a part of that time period. You can change the time period in the summary section. 

Hovering a bar in the chart will show the results of all check runs executed during that time. You can quickly filter the check run results in the right sidepanel by clicking a bar in the chart.

<img class="screenshot-partial" alt="check results overview time ribbon" src="/docs/images/monitoring/check-overview-monitoring-result-chart.png"/>

When retries are enabled, an additional icon highlights that the check result contains multiple check runs.

### Monitoring results sidebar

On the right side you can view the check result broken down per check run and location for the selected time frame. If you select a bar in the monitoring results chart it will filter out the corresponding results in the sidebar. Click any result to navigate to the check results screen for detailed information about the check run.

### Performance

Depending on the type of check, different performance metrics will be shown in the Performance section.

For Browser checks, several performance metrics are shown in separate charts:

1. The total duration of the check run
<img class="screenshot-partial" alt="check overview browser session duration graph" src="/docs/images/monitoring/check-overview-performance-browser.png"/>

2. [Load timings](/docs/browser-checks/tracing-web-vitals/#first-contentful-paint) for the first page navigation
<img class="screenshot-partial" alt="check overview load timings graph" src="/docs/images/monitoring/check-overview-performance-loading.png"/>

3. A breakdown of different error types
<img class="screenshot-partial" alt="check overview errors graph" src="/docs/images/monitoring/check-overview-errors.png"/>

4. An [interactivity](/docs/browser-checks/tracing-web-vitals/#total-blocking-time) summary
<img class="screenshot-partial" alt="check overview interactivity graph" src="/docs/images/monitoring/check-overview-interactivity.png"/>

5. A [visual stability](/docs/browser-checks/tracing-web-vitals/#cumulative-layout-shift) breakdown
<img class="screenshot-partial" alt="check overview visual stability graph" src="/docs/images/monitoring/check-overview-visual-stability.png"/>

For API checks, a detailed response time breakdown is shown:
<img class="screenshot-partial" alt="check overview api performance graph" src="/docs/images/monitoring/check-overview-performance-api.png"/>

For Multistep checks, a response time breakdown is shown per step:
<img class="screenshot-partial" alt="check overview api performance graph" src="/docs/images/monitoring/check-overview-performance-multistep.png"/>

A performance comparison by location will also be included for both types of check:
<img class="screenshot-partial" alt="check overview location performance graph" src="/docs/images/monitoring/check-overview-locations.png"/>

## Navigating individual check results
The check result page will contain results from multiple locations when using [parallel scheduling](/docs/monitoring/global-locations/#scheduling-strategies). Navigate between each location using the sidebar.
<img alt="Viewing multiple attempts from the dropdown" autoplay loop src="/docs/images/monitoring/location-select.gif"></img>


## Browser check results

Individual browser check results contain:

1. A short check summary, including errors broken down by category.
<img class="screenshot-partial" alt="check results browser summary" src="/docs/images/monitoring/check-results-browser-summary.png"/>
2. When using Playwright Test Runner you will have an additional section displaying the test steps, error message, and assets (traces, videos, screenshots). [Read more](/docs/browser-checks/playwright-test) about the additonal functionalities of Playwright Test.
<img class="screenshot-partial" alt="check results browser playwright test report" src="/docs/images/monitoring/check-results-browser-pwt-report.png"/>
3. An error log, only if your script failed.
<img class="screenshot-partial" alt="check results browser error log" src="/docs/images/monitoring/check-results-browser-error-log.png"/>
4. Expandable tabs on page your script navigated to.
<img class="screenshot-partial" alt="check results browser page navigation" src="/docs/images/monitoring/check-results-browser-page-navigations.png"/>
When expanded, each tab shows its own navigation/loading time ribbon and web vitals...
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

## Multistep check results

Multistep check results are navigated using the tree on the left side of the screen. If you are running checks in parallel, first select the location you are interested in.

In the result tree the top node shows the check run log and the check run configuration. Both can be collapsed.

Any errors encountered can be viewed in the 'Errors' node. 

Each Playwright request done is shown as a separate node under the test step in which it was performed. Selecting a request node opens the request details. Here you can view the request and response body, headers and any request parameters. A breakdown of the request timings is also available.

Currently, only requests done using the Playwright `request` are shown as nodes in the tree, requests done via e.g Axios or HTTPS are not.

In the request details you will also find the result of any assertion done as part of the corresponding test step.

<video alt="Using the Multistep check results view" autoplay loop muted src="/docs/images/monitoring/check-results-multistep.mp4"></video>



## Check results with retries

When checks are retried, a dropdown will indicate that the check result contains multiple check runs:
1. The initial failed attempt
2. The final result (which may have failed or succeeded)

When selecting a check run, all data and assets are available for inspection for each attempt.

<img alt="Viewing multiple attempts from the dropdown" autoplay loop src="/docs/images/monitoring/check-retries.gif"></img>

