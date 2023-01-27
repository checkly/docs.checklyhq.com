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