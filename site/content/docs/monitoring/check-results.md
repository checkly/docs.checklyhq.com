---
title: Check results
weight: 2
menu:
  docs:
    parent: "Monitoring"
---

If you have checks running, you can select them on the main Checkly dashboard and get an overview of the results they have produced so far. 

## Check results overview

Select a check and you will see a breakdown of its recent runs, together with key availability and performance metrics.

![check results overview](/docs/images/monitoring/check-results-summary.png)

### Summary section

The summary at the top of the page allows for filtering based on the page's data points and the selected timeframe and locations. Retried check runs do not influence this section; only the final results are considered.

<img class="screenshot-partial" alt="check results overview summary" src="/docs/images/monitoring/check-overview-bar.png"/>

Based on the user's selection, the metrics in the summary will also be updated to show the most important numbers at a glance. Single tabs in the summary can be clicked to skip to the related section of the page showing a more detailed breakdown of the relevant information.

### Time ribbon

Single check runs can be accessed by selecting them on the time ribbon or by hovering dots and clicking View Details. View Details will open the selected check run in a new browser tab; a simple click on a time ribbon dot will show a preview of the selected check run below it.

<img class="screenshot-partial" alt="check results overview time ribbon" src="/docs/images/monitoring/check-overview-time-ribbon.png"/>

Selecting a check execution will take you to the dedicated check result page for it, which will look different based on whether you had been running a [Browser](#browser-check-results) or an [API check](#api-check-results).

When retries are enabled, an additional icon highlights that the check result contains multiple check runs. All attempts as well as the final result are available to view.

The check retries ratio indicates how many of the total checks run were retried due to an initial failed attempt.

<!-- @TODO: add screenshot of new ribbon (tooltip preview + result table) -->


{{< info >}}
For self-service plans check results will only be [available in aggregate format](/docs/monitoring/how-we-store-data) after 30 days.
{{< /info >}}

### Performance

Depending on the type of check, different performance metrics will be shown in the Performance section.

For Browser checks, several performance metrics are shown in separate charts:

1. The total duration of the browser session
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

A performance comparison by location will also be included for both types of check:
<img class="screenshot-partial" alt="check overview location performance graph" src="/docs/images/monitoring/check-overview-locations.png"/>

## Browser check results

Individual browser check results contain:

1. A short check summary, including errors broken down by category.
<img class="screenshot-partial" alt="check results browser summary" src="/docs/images/monitoring/check-results-browser-summary.png"/>
2. When using Playwright Test Runner you will have an additional section displaying the test steps, error message, and assets (traces, videos, screenshots). [Read more](/docs/browser-checks/playwright-test) about the additonal functionalities of Playwright Test.
<img class="screenshot-partial" alt="check results browser playwright test report" src="/docs/images/monitoring/check-results-browser-pwt-report.png"/>
3. A waterfall timeline showing how much time was spent on each page.
<img class="screenshot-partial" alt="check results browser timeline" src="/docs/images/monitoring/check-results-browser-timeline.png"/>
4. An error log, only if your script failed.
<img class="screenshot-partial" alt="check results browser error log" src="/docs/images/monitoring/check-results-browser-error-log.png"/>
5. Expandable tabs on page your script navigated to.
<img class="screenshot-partial" alt="check results browser page navigation" src="/docs/images/monitoring/check-results-browser-page-navigations.png"/>
When expanded, each tab shows its own navigation/loading time ribbon and web vitals...
<img class="screenshot-partial" alt="check results browser navigation top" src="/docs/images/monitoring/check-results-browser-navigation-top.png"/>
...together with browser console logs, network logs and any screenshots that had been taken (including one screenshot taken automatically on failure).
<img class="screenshot-partial" alt="check results browser navigation bottom" src="/docs/images/monitoring/check-results-browser-navigation-bottom.png"/>
6. A job log for the check.
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


## Check results with retries

When retries are enabled through the ["Double-check on failure"](/docs/alerting/#double-checking) setting, tabs will indicate that the check result contains multiple check runs:
1. The initial failed attempt
2. The final result (which may have failed or succeeded)

When selecting a check run, all data and assets are available for inspection for each attempt.

<!-- @TODO: add a video navigating through the tabs -->