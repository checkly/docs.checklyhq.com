---
title: Overview
weight: 46
slug: /
menu:
  docs:
    parent: "Analytics"
    identifier: overview-analytics
---

With the Analytics API, you can request check results data in an aggregated, non-aggregated or summarized way which let you create customizable reports using
your prefered reporting tool.
All available metrics related to the check-type (`API` or `BROWSER`) can be listed and you are able to fetch multiple metrics at once on each request.
Additionally, you can make use of the quick ranges with time window presets, and group results per location or pages. For more flexible results, you can adjust the aggregation interval that fit better for your report.

## Overview

There are three mainly endpoints (more details in the [API docs](https://developers.checklyhq.com/reference/getv1analyticsapichecksid)):

- `/v1/analytics/metrics` which let you request all the available metrics for a specific check-type (`API` or `BROWSER`)
- `/v1/analytics/browser-checks` and `/v1/analytics/api-checks` which return checks summarized data
  - The JSON output includes check's attributes, period requested, grouped `series` and `metadata` section where you'll have additional information about the metrics  to create rich automatic reports:

```JSON
{
    "checkId": "79ad4fe0-589a-4924-a027-d18b12eee9cb",
    "name": "Shopping Cart - Add product",
    "checkType": "BROWSER",
    "activated": true,
    "muted": false,
    "frequency": 5,
    "from": "2023-01-20T12:45:57.494Z",
    "to": "2023-01-27T12:45:57.494Z",
    "tags": [
        "sports"
    ],
    "series": [
        {
            "pageIndex": 0,
            "data": [
                {
                    "pageUrl": "https://mycart.acme.com/login",
                    "pageIndex": 0,
                    "responseTime_avg": 7216.8896,
                    "TTFB_avg": 746.9548609294588,
                    "TTFB_p99": 1059.7
                }
            ]
        },
        {
            "pageIndex": 1,
            "data": [
                {
                    "pageUrl": "https://mycart.acme.com/cart",
                    "pageIndex": 1,
                    "responseTime_avg": 7216.8896,
                    "TTFB_avg": 239.41101193049596,
                    "TTFB_p99": 310.8
                }
            ]
        },
        {
            "pageIndex": 2,
            "data": [
                {
                    "pageUrl": "https://mycart.acme.com/cart/add",
                    "pageIndex": 2,
                    "responseTime_avg": 7216.8896,
                    "TTFB_avg": 1.3732638888888888,
                    "TTFB_p99": 0
                }
            ]
        }
    ],
    "metadata": {
        "responseTime_avg": {
            "unit": "milliseconds",
            "label": "Response time for the full script",
            "aggregation": "avg"
        },
        "TTFB_avg": {
            "unit": "milliseconds",
            "label": "Time To First Byte",
            "aggregation": "avg"
        },
        "TTFB_p99": {
            "unit": "milliseconds",
            "label": "Time To First Byte",
            "aggregation": "p99"
        }
    },
    "pagination": {
        "page": 1,
        "limit": 10
    }
}
```


### Using the Analytics API

Here you will see an example of a request using [Postman](https://www.postman.com/) where the `/v1/analytics/browser-check` endpoint returns aggregated
data (`TTFB_p50` and `TTFB_p90`) for the last 7 days grouping by page.

![analytics request with postman](/docs/images/analytics/analytics-request-with-postman.png)

> You **must** add the `X-Checkly-Account` and `Authorization` headers to authenticate.

### Building a Grafana dashboard

Following these instructions you'll see how to use the **Analytics API** within a [Grafana](https://grafana.com/) dashboard:

1. Creating the Data Source

First, you need to create the Data Source with the Analytics API connection. Installing the [JSON API](https://grafana.com/grafana/plugins/marcusolsson-json-datasource/) plugin you'll be able to consume any REST API and handle JSON response output.

![grafana data source creation](/docs/images/analytics/grafana-data-source-creation.png)

2. Configuring a component

Then, you can pick a **Time series** component and configure it by selecting the `Checkly Analytics API` data source and setting the HTTP required header and query parameters to fetch the output JSON. You'll find detailed parameters documentation in the [API docs](https://developers.checklyhq.com/reference/getv1analyticsapichecksid)

In the following image you'll see all required configuration for a component:

- ![#cc66ff](https://placehold.co/15x15/cc66ff/cc66ff.png) `Fields`
- ![#cc9900](https://placehold.co/15x15/cc9900/cc9900.png) `Path`
- ![#3399ff](https://placehold.co/15x15/3399ff/3399ff.png) `Query parameters`
- ![#ff0000](https://placehold.co/15x15/ff0000/ff0000.png) `Header`
- ![#33cc66](https://placehold.co/15x15/33cc66/33cc66.png) `Variables` (optional)

![grafana component configuration](/docs/images/analytics/grafana-component-configuration.png)

1. Designing the dashboard

You can mix multiple data presentation components to create useful and beautiful showing different response. The following screenshot image shows a dashboard with three types of results: aggregated, non-aggregated and summarized grouped by location.

![grafana dashboard design](/docs/images/analytics/grafana-dashboard-design.png)

### Creating reports with Google Sheets

You can start creating your reports by making using our public Google Sheets report example template. The spreadsheet includes the `=ChecklyAPI()` function to consume the Checkly Public API just entering configuring your credentials.

1. Make a copy of our public Google Sheets template (available [here](https://docs.google.com/spreadsheets/d/1ChcFMzuO2LOJVqu7kLGjqXf-0WmnD49_ghRLmm-OQAc/edit#gid=747858019))
2. Add your `Account Id` and `API Key` in the Apps Script code (be careful if you'll share your spreadsheet with your credentials)
![google sheets apps script menu](/docs/images/analytics/google-sheets-apps-script-menu.png)
![google sheets apps script credentials](/docs/images/analytics/google-sheets-apps-script-credentials.png)
1. Navigate the `Metrics` and `Checks` pages to confirm `Checkly Public API` requests are working
2. Go to the `Analytics Report` page, pick a check, pick a metric and see if the chart shows the correct information
![google sheets report](/docs/images/analytics/google-sheets-reports.png)
![google sheets report summarized](/docs/images/analytics/google-sheets-reports-summarized.png)

You'll find dropdown cells to select the check, number of results, quick time range presets, or grouping attribute.
