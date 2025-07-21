---
title: Exporting Metrics & Data via Prometheus V2 and Checkly - Checkly Docs
displayTitle: Exporting Metrics & Data via Prometheus V2
navTitle: Prometheus V2
weight: 65
aliases:
  - "/docs/integrations/prometheus/"
menu:
  integrations:
    parent: "Integrations"
---

If you are using [Prometheus](https://prometheus.io/) for monitoring and the popular [Grafana](https://grafana.com/) stack
for dashboarding, you can expose Checkly's core metrics on a dedicated, secured endpoint.

> This page describes a new V2 version of the Prometheus exporter. For information about the old Prometheus exporter, see the [Prometheus V1 docs](/docs/integrations/prometheus-v1/).

## Activation

Activating this integration is simple.

1. Navigate to the <a href="https://app.checklyhq.com/settings/account/integrations" target="_blank">integrations</a> tab on the account screen and click the 'Create Prometheus endpoint' button.
![Prometheus integration step 1](/docs/images/integrations/prometheus_step1.png)

2. We directly create an endpoint for you and provide its URL and the required Bearer token.
![Prometheus integration step 2](/docs/images/integrations/prometheus_v2_step2.png)

3. Create a new job in your Prometheus `prometheus.yml` config and set up a scraping interval. The scrape interval should be above 60 seconds. Add the URL (divided into `metrics_path`, `scheme` and `target`) and `bearer_token`.
Here is an example

```yaml
# prometheus.yml
- job_name: 'checkly'
  scrape_interval: 60s
  metrics_path: '/accounts/993adb-8ac6-3432-9e80-cb43437bf263/v2/prometheus/metrics'
  bearer_token: 'lSAYpOoLtdAa7ajasoNNS234'
  scheme: https
  static_configs:
  - targets: ['api.checklyhq.com']
```

Now restart Prometheus and you should see metrics coming in.

>[!WARNING]
> The Prometheus metrics endpoint has a rate limit of 50 requests per minute.
> The responses from this endpoint are cached during 60 seconds.
> Any request made to this endpoint within 60 seconds of the initial request will receive the cached response.
> We recommend using a scrape interval of 60 seconds.

## Check Metrics

The Prometheus exporter exposes several metrics you can use to monitor the status of your checks, as well as to inspect detailed information such as [Web Vitals](/docs/browser-checks/tracing-web-vitals/).

The following metrics are available to monitor checks:

| Metric | Type | Description |
|--------|------|-------------|
| `checkly_check_status` | Gauge | Indicates whether a given check is currently passing, degraded, or failing. |
| `checkly_check_result_total` | Counter | The number of passing, degraded, and failing check results. |
| `checkly_browser_check_web_vitals_seconds` | Histogram | The [Web Vitals](/docs/browser-checks/tracing-web-vitals/) timings. |
| `checkly_browser_check_duration_seconds` | Histogram | The total check duration. This includes all pages visited and any waits. |
| `checkly_browser_check_errors` | Histogram | The errors encountered during a full browser session. |
| `checkly_api_check_timing_seconds` | Histogram | The response time for the API request, as well as the duration of the different phases. |
| `checkly_url_monitor_timing_seconds` | Histogram | The response time for the HTTP request, as well as the duration of the different phases. |
| `checkly_tcp_check_timing_seconds` | Histogram | The response time for the TCP request, as well as the duration of the different phases. |
| `checkly_multistep_check_duration_seconds` | Histogram | The total check duration. This includes all requests done and any waits. |
| `checkly_time_to_ssl_expiry_seconds` | Gauge | The amount of time remaining before the SSL certificate of the monitored domain expires. See the [SSL certificate expiration docs](/docs/alerting-and-retries/ssl-expiration/) for more information on monitoring SSL certificates with checks. |

The `checkly_check_status` and `checkly_check_result_total` metrics contain a `status` label with values `passing`, `failing`, and `degraded`.
The `checkly_check_status` gauge is `1` when the check has the status indicated by the `status` label and is `0` otherwise.

For example, if a check is passing the result will be:
```bash
checkly_check_status{name="Passing Browser Check",status="passing"} 1
checkly_check_status{name="Passing Browser Check",status="failing"} 0
checkly_check_status{name="Passing Browser Check",status="degraded"} 0
```

`checkly_check_status` can be useful for viewing the current status of a check, whereas `checkly_check_result_total` can be useful for calculating overall statistics. For more information see the [recipes section](#recipes).

The metrics `checkly_browser_check_web_vitals_seconds`, `checkly_browser_check_errors`, and `checkly_api_check_timing_seconds` contain a `type` label.
This label indicates the different Web Vitals, error types, and timing phases being measured.

`checkly_time_to_ssl_expiry_seconds` contains a `domain` label giving the domain of the monitored SSL certificate.

In addition, the check metrics all contain the following labels:

| Label | Description |
|-------|-------------|
| `name` | The name of the check. |
| `check_id` | The unique UUID of the check. |
| `check_type` | Either `api` or `browser`. |
| `muted` | Whether the check is muted, configured to not send alerts. |
| `activated` | Whether the check is activated. Deactivated checks aren't be run. |
| `group` | The name of the check group. |
| `tags` | The tags of the check. |


> You can set `key:value` tags in your checks and groups and they will be exported as custom labels in Prometheus. For instance the tag `env:production` will be exposed as a custom label `env="production"`. You can disable this by adding the query param `disableTagParsing=true`. Please note that Prometheus label names may only contain ASCII letters, numbers, as well as underscores (see the official [docs](https://prometheus.io/docs/concepts/data_model/)). Tags containing other characters in the label name will be sanitized.

> The counter and histogram metrics are reset every hour. These resets can be handled in Prometheus by using the [rate](https://prometheus.io/docs/prometheus/latest/querying/functions/#rate) or [increase](https://prometheus.io/docs/prometheus/latest/querying/functions/#increase) functions.

### PromQL Examples

This section contains a few PromQL queries that you can use to start working with the Prometheus data.

#### Currently failing checks

To graph whether checks are passing or failing, use the query:
```bash
checkly_check_status{status="passing"}
```

Passing checks will have the value `1` while failing and degraded checks will have the value `0`.
This can be used to build a [Grafana table](https://grafana.com/docs/grafana/latest/panels-visualizations/visualizations/table/) of currently failing checks.

#### Failure percentage

To calculate the percentage of check runs that failed in the last 24 hours, use:
```bash
increase(checkly_check_result_total{status="failing"}[24h]) / ignoring(status) sum without (status) (increase(checkly_check_result_total[24h]))
```

#### Histogram averages

The different histogram metrics can all be used to compute averages. For example, query the average web vitals times for a check using:

```bash
sum by(type) (rate(checkly_browser_check_web_vitals_seconds_sum{name="Check Name"}[30m])) / sum by(type) (rate(checkly_browser_check_web_vitals_seconds_count{name="Check Name"}[30m]))
```

## Private Location Metrics

The Prometheus exporter also contains metrics for monitoring [Private Locations](/docs/private-locations/). These metrics can be used to ensure that your Private Locations have enough Checkly Agent instances running to execute all of your checks.

The following metrics are available to monitor Private Locations:

| Metric | Type | Description |
|--------|------|-------------|
| `checkly_private_location_queue_size` | Gauge | The number of check runs scheduled to the Private Location and waiting to be executed. A high value indicates that checks are becoming backlogged and that you may need to [scale your Checkly Agents](/docs/private-locations/scaling-and-redundancy/). |
| `checkly_private_location_oldest_scheduled_check_run` | Gauge | The age in seconds of the oldest check run job scheduled to the Private Location queue. A high value indicates that checks are becoming backlogged. |
| `checkly_private_location_agent_count` | Gauge | The number of agents connected for the Private Location. |

The Private Location metrics all contain the following labels:

| Label | Description |
| ------|-------------|
| `private_location_name` | the name of the Private Location. |
| `private_location_slug_name` | the Private Location's human readable unique identifier. |
| `private_location_id` | the Private Location's UUID. |
